<template>
  <v-card :title="'Controller #' + controlId" class="my-4 px-4">
    <v-slider
      v-model="power"
      step="1"
      thumb-label
      @update:model-value="sendPower()"
    ></v-slider>
    <v-slider
      v-model="direction"
      :min="0"
      :max="2"
      step="1"
      thumb-label
      track-fill-color="transparent"
      v-on:end="sendDirection()"
    >
      <template v-slot:thumb-label="{ modelValue }">
        {{ directionLabel[modelValue] }}
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
    const direction = ref(1);

    function sendPower() {
      console.log(
        `Sending power: ${power.value} to control ID: ${props.controlId}`
      );
      if (props.controlId !== undefined) {
        bluetoothStore.writePower(props.controlId, power.value);
      }
    }

    function sendDirection() {
      if (props.controlId !== undefined) {
        bluetoothStore.writeDirection(props.controlId, direction.value);
        power.value = 0;
        bluetoothStore.writePower(props.controlId, power.value);
      }
    }

    return {
      power,
      direction,
      directionLabel,
      bluetoothStore,
      sendPower,
      sendDirection,
    };
  },
});
</script>
