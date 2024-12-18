<template>
  <v-app>
    <v-layout>
      <menu-bar></menu-bar>
      <v-main>
        <v-container class="px-6">
          <bluetooth-modal></bluetooth-modal>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "./components/MenuBar.vue";
import BluetoothModal from "./components/BluetoothModal.vue";

export default defineComponent({
  name: "App",
  components: {
    MenuBar,
    BluetoothModal,
  },

  data() {
    return {
      //
    };
  },
});
</script>
