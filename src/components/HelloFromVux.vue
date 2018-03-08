<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUXS" value="cool" is-link></cell>
    </group>

    <div style="text-align:center; margin-top:20px;">
      <x-button mini plain @click.native="addhome">加入主畫面</x-button>
      <x-button mini plain @click.native="addNotif">開啟提醒</x-button>
    </div>
    
  </div>
</template>

<script>
import { Group, Cell, XButton } from "vux";
import {AddtoHomescreen,AddNotification} from '../main.js'; //從main.js引入這兩個函數

export default {
  components: {
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      msg: "Hello World!"
    };
  },
  methods: {
    addhome() {
      AddtoHomescreen();
    },
    addNotif() {
      AddNotification();
    }
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
