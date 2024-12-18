<template>
  <v-dialog max-width="500" v-model="bluetoothModalStore.isActive">
    <v-card title="Bluetooth Setting">
      <v-btn color="primary" @click="searchDevice">Search</v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBluetoothModalStore } from "@/stores/bluetoothModal";
import { useBluetoothStore } from "@/stores/bluetooth";

export default defineComponent({
  name: "BluetoothModal",
  setup() {
    const bluetoothModalStore = useBluetoothModalStore();
    const bluetoothStore = useBluetoothStore();

    const word = ref("");
    function searchDevice() {
      bluetoothStore
        .connectDevice("Controller1")
        .then(() => (bluetoothModalStore.isActive = false));
    }

    return {
      bluetoothModalStore,
      searchDevice,
    };
  },
});
</script>
