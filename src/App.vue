<template>
    <b-container id="app" class="mx-0 px-0">
        <SideBar style="width:15%; background: #202040"/>
        <AllPapers style="margin-left:20%; margin-top:50px; width:90%"/>
    </b-container>
</template>

<script>
import SideBar from './components/SideBar.vue'
import AllPapers from './components/AllPapers.vue'

export default {
  name: 'App',
  components: {
    AllPapers,
    SideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 11pt;
}

ul.nav li a:hover {
    color: #fff !important;
    transition: color 0.3s;
}

ul.nav li:hover {
    background-color: #543864 !important;
    transition: background-color 0.3s;
}
</style>
