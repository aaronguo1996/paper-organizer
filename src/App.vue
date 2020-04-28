<template>
    <div id="app" class="mx-0 px-0">
        <b-row no-gutters>
            <b-col cols="2"><SideBar class="sidebar"/></b-col>
            <b-col class="full-screen px-3 mb-5"><AllPapers/></b-col>
        </b-row>
    </div>
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
html, body {
  height:100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 11pt;
}

#all-papers {
  padding-top:50px;
  height: 100vh;
}

.full-screen {
  height: 100vh;
  overflow: scroll;
}

ul.nav li a:hover {
    color: #fff !important;
    transition: color 0.3s;
}

ul.nav li:hover {
    background-color: #005082 !important;
    transition: background-color 0.3s;
}

.tag {
    height: 5px;
    width: 50px !important;
    margin-right: 5px;
}

.tag-unread {
    background-color: #543864;
}

.tag-to-read {
    background-color: #ff6363;
}

.tag-read {
    background-color: #06623b;
}

.tag-in-read {
    background-color: #ffbd69;
}

a {
    color: #ffa41b !important;
}

.btn-outline-primary {
    border-color: #005082 !important;
    color: #005082 !important;
}

.btn-outline-primary:hover {
    background-color: #005082 !important;
    color: #fff !important;
    transition: all 0.3s;
}

.btn-primary, .dropdown-item.active, .dropdown-item:active,
.page-item.active .page-link {
    border-color: #005082 !important;
    background-color: #005082 !important;
    color: #fff !important;
}

.page-link {
    color: #005082 !important;
}

.sidebar {
    background-color: #000839 !important;
}
</style>
