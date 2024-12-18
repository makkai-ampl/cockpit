import { defineStore } from "pinia";
import { ref } from "vue";

export const useBluetoothModalStore = defineStore("bluetoothModal", () => {
  const isActive = ref(false);

  return {
    isActive,
  };
});
