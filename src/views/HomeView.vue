<template>
  <template
    v-for="(_, index) in bluetoothStore.$state.connections"
    :key="index"
  >
    <power-control :control-id="index"></power-control>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import PowerControl from "@/components/PowerControl.vue";
import { useBluetoothStore } from "@/stores/bluetooth";

export default defineComponent({
  name: "HomeView",

  components: {
    PowerControl,
  },

  setup() {
    const bluetoothStore = useBluetoothStore();
    return {
      bluetoothStore,
    };
  },
});
</script>
