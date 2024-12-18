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
        // direction: ""
      },
    },
  ]);

  const connections: Connection[] = reactive([]);

  async function connectDevice(serviceName: string) {
    const connectionInfo = serviceArch.filter(
      (info) => info.name === serviceName
    );

    if (connectionInfo.length == 0) {
      console.log("Service not found.");
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

    const params = {
      filters: [{ services: [connection.serviceUUID] }],
    };

    try {
      connection.bleDevice = await navigator.bluetooth.requestDevice(params);
    } catch (error) {
      console.log("canceled");
      return;
    }

    try {
      connection.server = await connection.bleDevice?.gatt?.connect();
      connection.service = await connection.server?.getPrimaryService(
        connection.serviceUUID
      );
      if (connection.service !== undefined) {
        const characteristics: ControlServiceCharacteristics = {
          power: {
            uuid: connectionInfo[0].characteristics.power,
            instance: await connection.service.getCharacteristic(
              connectionInfo[0].characteristics.power
            ),
          },
          direction: undefined,
        };
        connection.characteristics = characteristics;
      }
      connection.isConnected = true;
      connections.push(connection);
    } catch (error) {
      console.log(error);
      console.log("failed to connect.");
    }
  }

  async function writePower(serviceId: number, value: number) {
    const valueArray = new Uint8Array(1);
    valueArray[0] = value;
    try {
      await connections[serviceId].characteristics?.power?.instance?.writeValue(
        valueArray
      );
      console.log("succeeded");
    } catch (error) {
      console.log("Failed to write.");
    }
  }

  return {
    serviceArch,
    connections,
    connectDevice,
    writePower,
  };
});
