<template>
  <v-app-bar :elevation="3">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Cockpit</v-app-bar-title>
    <v-btn icon @click="bluetoothStore.isActive = true">
      <v-icon>mdi-bluetooth-settings</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item :to="{ name: 'home' }" title="Home"></v-list-item>
      <v-list-item :to="{ name: 'setting' }" title="Setting"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBluetoothModalStore } from "@/stores/bluetoothModal";

export default defineComponent({
  name: "MenuBar",

  setup() {
    const drawer = ref(false);
    const bluetoothStore = useBluetoothModalStore();
    return {
      drawer,
      bluetoothStore,
    };
  },
});
</script>
