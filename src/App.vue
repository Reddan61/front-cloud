<template>
  <div class="wrapper">
    <Loader v-if="loading"/>
    <router-view v-else></router-view>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Loader from "./components/svg/IconPacMan"

  const store = useStore();

  const loading = computed(() => {
    return store.state.auth.loading;
  })
</script>

<style lang = "scss">
  .wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  *{
    padding: 0;
    margin: 0;
    border: 0;
  }
  *,*:before,*:after{
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  :focus,:active{outline: none;}
  a:focus,a:active{outline: none;}

  nav,footer,header,aside{display: block;}

  html,body{
    font-family: "Roboto", sans-serif;
    height: 100%;
    color:#606060;
    width: 100%;
    font-size: 100%;
    line-height: 1;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    &::-webkit-scrollbar {
      width:14px;
    }
    // &::-webkit-scrollbar-track {
    // }
    &::-webkit-scrollbar-thumb {
      border: 3px solid transparent;
      border-radius: 9px;
      background-clip: content-box;
      background-color: rgb(96,96,96);
    }
    &::-webkit-scrollbar-track-piece {
      background-color: rgb(249,249,249);
    }
  }
  input,button,textarea{font-family:inherit;}

  input::-ms-clear{display: none;}
  button{cursor: pointer;}
  button::-moz-focus-inner {padding:0;border:0;}
  a, a:visited{text-decoration: none;}
  a:hover{text-decoration: none;}
  ul li{list-style: none;}
  img{vertical-align: top;}

  h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: 400;}
</style>