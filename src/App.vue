<template>
    <div id="app" class="mx-0 px-0">
        <SideBar/>
        <AllPapers id="allPapers" v-if="display==='allPapers'"/>
        <ExportList id="export" v-if="display==='export'"/>
        <AllTags id="allTags" v-if="display==='allTags'"/>
    </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import AllPapers from './components/papers/AllPapers.vue'
import AllTags from './components/tags/AllTags.vue'
import ExportList from './components/papers/ExportList.vue'
import {mapState} from 'vuex'

export default {
    name: 'App',
    components: {
        AllPapers,
        SideBar,
        ExportList,
        AllTags,
    },
    computed: {
        ...mapState({
            display: state => state.displayStack
        })
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
  position: relative;
  color: #2c3e50;
  font-size: 11pt;
}

.full-screen {
  overflow: scroll;
}

.nav-sidebar a:hover {
    color: #fff !important;
    transition: color 0.3s;
}

.nav-sidebar:hover {
    background-color: #005082 !important;
    transition: background-color 0.3s;
}

.tag {
    height: 100%;
    width: 5px !important;
}

.tag-col {
    flex-grow: 0 !important;
    padding-right: 0 !important;
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

.btn-outline-primary {
    border-color: #000839 !important;
    color: #000839 !important;
}

.btn-outline-primary:hover {
    background-color: #000839 !important;
    color: #fff !important;
    transition: all 0.3s;
}

.btn-primary, .dropdown-item.active, .dropdown-item:active,
.page-item.active .page-link {
    border-color: #000839 !important;
    background-color: #000839 !important;
    color: #fff !important;
}

.page-link, .btn-link {
    color: #000839 !important;
}

.sidebar {
    background-color: #000839 !important;
}

.bg-mine {
    background-color: #000839 !important;
}

.arrow {
    position: relative;
    height: 4.5rem;
    width: 240px;
    color: #fff;
}

.no-glow {
    outline: none !important;
    box-shadow: none;
}

.arrow-right:after {
    content: '';
    position:absolute;
    flex-grow: 0;
    width: 0;
    height: 0;
    border-top: 2.25rem solid transparent;
    border-bottom: 2.25rem solid transparent;
    border-left: 30px solid #000839;
    left: 100%;
    z-index: 100;
}

.arrow-left:before {
    content: '';
    position:absolute;
    flex-grow: 0;
    width: 0;
    height: 0;
    border-top: 2.25rem solid transparent;
    border-bottom: 2.25rem solid transparent;
    border-left: 30px solid #fff;
    left: 0;
    z-index: 99;
}

.mr-half {
    margin-right: .1rem !important;
}

.small {
    display: block;
    line-height: 1.25rem;
}

a:focus, a:active {
    outline: none !important;
}

.nav-arrow-active .bg-mine {
    background-color: #000839 !important;
}

.nav-arrow-inactive .bg-mine {
    background-color: #ddd !important;
}

.nav-arrow-inactive:after {
    border-left-color: #ddd !important;
}

.nav-arrow-success .bg-mine {
    background-color: #06623b !important;
}

.nav-arrow-success:after {
    border-left-color: #06623b !important;
}

.my-success {
    color: #06623b !important;
}
</style>
