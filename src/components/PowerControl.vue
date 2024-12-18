<template>
  <v-card :title="'Controller #' + controlId" class="my-4 px-4">
    <v-slider
      v-model="power"
      step="1"
      thumb-label
      v-on:end="sendValue()"
    ></v-slider>
    <v-slider
      v-model="direction"
      :min="-1"
      :max="1"
      step="1"
      thumb-label
      track-fill-color="transparent"
    >
      <template v-slot:thumb-label="{ modelValue }">
        {{ directionLabel[modelValue + 1] }}
      </template>
    </v-slider>
  </v-card>
</template>
<script lang="ts">
import { useBluetoothStore } from "@/stores/bluetooth";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PowerController",
  props: {
    controlId: Number,
  },
  setup(props) {
    const directionLabel = ["In", "N", "Out"];
    const bluetoothStore = useBluetoothStore();
    const power = ref(0);
    const direction = ref(0);

    function sendValue() {
      if (props.controlId !== undefined) {
        bluetoothStore.writePower(props.controlId, power.value);
      }
    }

    return {
      power,
      direction,
      directionLabel,
      bluetoothStore,
      sendValue,
    };
  },
});
</script>
