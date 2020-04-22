<template>
    <b-container class="px-3">
        <NewEntryForm/>
        <BibTexer/>
        <b-container class="border-bottom mb-3">
            <b-row>
                <b-col cols="2">
                    <h3 class="my-3 text-left font-weight-bold">All Papers</h3>
                </b-col>
                <b-col cols="9" class="text-left my-3">
                    <b-form-row>
                        <b-button variant="outline-primary" size="sm" class="mr-1" v-b-modal.modal-new-entry>
                            <b-icon-plus></b-icon-plus>
                            Add New Entry
                        </b-button>
                        <b-button variant="outline-primary" size="sm" class="mr-1" v-b-modal.modal-upload-bibtex>
                            <b-icon-upload class="mr-1"/>
                            Upload BibTex
                        </b-button>
                        <b-button ref="searchBtn" variant="outline-primary" size="sm" @click="toSearchBar">
                            <b-icon-search class="mr-1"/>
                            Search
                        </b-button>
                        <b-col ref="searchBar" class="pl-0" style="visibility:hidden; width:20px">
                            <div size="sm" class="input-group input-group-sm">
                                <div ref="searchIcon" class="input-group-prepend">
                                    <div class="input-group-text"><b-icon-search class="mr-1"/></div>
                                </div>
                                <b-form-input ref="searchIn" size="sm" type="search" placeholder="Search by paper title, authors, ..."
                                    v-on:focusout="toSearchBtn"
                                    ></b-form-input>
                            </div>
                        </b-col>
                    </b-form-row>
                </b-col>
            </b-row>
        </b-container>
        <Grid/>        
    </b-container>
</template>

<script>
import Grid from './Grid.vue'
import NewEntryForm from './NewEntryForm.vue'
import BibTexer from './BibTexer.vue'

export default {
    name: 'AllPapers',
    components: {
        Grid,
        NewEntryForm,
        BibTexer,
    },
    methods: {
        toSearchBar () {
            this.$refs.searchBtn.style="display:none";
            this.$refs.searchBar.style="visibility:visible; max-width:auto; transition: width .3s";
            this.$refs.searchIn.focus();
        },
        toSearchBtn () {
            this.$refs.searchBtn.style="display:inline-block";
            this.$refs.searchBar.style="visibility:hidden";
        }
    }
}
</script>
