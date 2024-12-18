export interface Connection {
  name: string;
  serviceUUID: string;
  isConnected: boolean;
  bleDevice: BluetoothDevice | undefined;
  server: BluetoothRemoteGATTServer | undefined;
  service: BluetoothRemoteGATTService | undefined;
  characteristics: ControlServiceCharacteristics | undefined;
}

export interface ControlServiceCharacteristics {
  power: Characteristics | undefined;
  direction: Characteristics | undefined;
}

export interface Characteristics {
  uuid: string;
  instance: BluetoothRemoteGATTCharacteristic | undefined;
}