<template>
    <b-navbar
        sticky
        type="light"
        variant="light"
        >
        <b-navbar-brand href="#">Paper Organizer</b-navbar-brand>

        <b-navbar-nav class="ml-auto" align="end">
            <b-nav-form
                class="mr-3"
                autocomplete="off" 
                @submit.stop.prevent="handleSubmit">
                <b-input-group>
                    <b-form-input size="sm" placeholder="Search" v-model="searchKey"></b-form-input>
                    <template v-slot:append>
                        <b-button
                            size="sm"
                            @click="handleSubmit()"
                            ><b-icon-search size="sm"></b-icon-search></b-button>
                    </template>
                </b-input-group>
                <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
            </b-nav-form>

            <b-nav-item link-classes="nav-bar-link" href="#allPapers" @click="locate('allPapers')">All Papers</b-nav-item>
            <b-nav-item link-classes="nav-bar-link" >Read Progress</b-nav-item>
            <b-nav-item link-classes="nav-bar-link" href="#allTags" @click="locate('allTags')">Tags</b-nav-item>
            <b-nav-item link-classes="nav-bar-link" href="#export" @click="locate('export')">Export</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                searchKey: "",
            }
        },
        methods: {
            ...mapActions('papers', {
                filterPaper: 'filterPaperBy',
                clearFilter: 'removeAllFilters',
            }),
            ...mapActions({
                setDisplay: 'changeDisplay',
            }),
            locate(v) {
                this.clearFilter()
                    .then(() => {
                        this.setDisplay(v);
                    })
            },
            handleSubmit() {
                this.setDisplay('allPapers');
                this.clearFilter()
                    .then(() => {
                        this.filterPaper({
                            criteria: {'$or':[
                                {'title': {'$regex': '.*'+this.searchKey+'.*', '$options': 'i',}},
                                {'author':{'$regex': '.*'+this.searchKey+'.*', '$options': 'i'}},
                                {'keyword':{'$elemMatch':{'$regex': '.*'+this.searchKey+'.*', '$options': 'i'}}},
                                {'tags':{'$elemMatch':{'$regex': '.*'+this.searchKey+'.*', '$options': 'i'}}},
                            ]},
                            display: 'all: ' + this.searchKey
                        })}
                    )
            }
        }
    }
</script>