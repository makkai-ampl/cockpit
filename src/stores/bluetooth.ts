/// <reference types="web-bluetooth" />

import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  Connection,
  ControlServiceCharacteristics,
} from "@/interfaces/bluetoothConfig";

export const useBluetoothStore = defineStore("bluetooth", () => {
  const serviceArch = reactive([
    {
      name: "Controller1",
      service: "19b10000-e8f2-537e-4f6c-d104768a1215",
      characteristics: {
        power: "19b10001-e8f2-537e-4f6c-d104768a1216",
        direction: "19b10001-e8f2-537e-4f6c-d104768a1217",
      },
    },
  ]);

  const connections: Connection[] = reactive([]);

  async function connectDevice(serviceName: string) {
    console.log(`Attempting to connect to: ${serviceName}`);

    const connectionInfo = serviceArch.filter(
      (info) => info.name === serviceName
    );

    if (connectionInfo.length == 0) {
      console.error("Service not found.");
      return;
    }

    const connection: Connection = {
      name: serviceName,
      serviceUUID: connectionInfo[0].service,
      isConnected: false,
      bleDevice: undefined,
      server: undefined,
      service: undefined,
      characteristics: undefined,
    };

    // Web Bluetooth APIのフィルター設定を改善
    const params = {
      filters: [
        {
          name: serviceName, // デバイス名でフィルター
          services: [connection.serviceUUID], // サービスUUIDでフィルター
        },
      ],
      optionalServices: [connection.serviceUUID], // オプションサービス指定
    };

    console.log("Requesting device with params:", params);

    try {
      connection.bleDevice = await navigator.bluetooth.requestDevice(params);
      console.log("Device selected:", connection.bleDevice.name);
    } catch (error) {
      console.error("Device selection cancelled or failed:", error);
      return;
    }

    try {
      console.log("Connecting to GATT server...");
      connection.server = await connection.bleDevice?.gatt?.connect();

      console.log("Getting primary service...");
      connection.service = await connection.server?.getPrimaryService(
        connection.serviceUUID
      );

      if (connection.service !== undefined) {
        console.log("Service found, getting characteristics...");

        const characteristics: ControlServiceCharacteristics = {
          power: {
            uuid: connectionInfo[0].characteristics.power,
            instance: await connection.service.getCharacteristic(
              connectionInfo[0].characteristics.power
            ),
          },
          direction: {
            uuid: connectionInfo[0].characteristics.direction,
            instance: await connection.service.getCharacteristic(
              connectionInfo[0].characteristics.direction
            ),
          },
        };

        connection.characteristics = characteristics;
        console.log("All characteristics obtained successfully");
      }

      connection.isConnected = true;
      connections.push(connection);
      console.log("Connection established successfully!");
    } catch (error) {
      console.error("Failed to connect:", error);
      console.log("Connection failed. Please try again.");
    }
  }

  async function writePower(serviceId: number, value: number) {
    console.log(`Writing power value: ${value}`);
    const valueArray = new Uint8Array(1);
    valueArray[0] = value;
    try {
      await connections[serviceId].characteristics?.power?.instance?.writeValue(
        valueArray
      );
      console.log("Power write succeeded");
    } catch (error) {
      console.error("Failed to write power:", error);
    }
  }

  async function writeDirection(serviceId: number, value: number) {
    console.log(`Writing direction value: ${value}`);
    const valueArray = new Uint8Array(1);
    valueArray[0] = value;
    try {
      await connections[
        serviceId
      ].characteristics?.direction?.instance?.writeValue(valueArray);
      console.log("Direction write succeeded");
    } catch (error) {
      console.error("Failed to write direction:", error);
    }
  }

  return {
    serviceArch,
    connections,
    connectDevice,
    writePower,
    writeDirection,
  };
});
