<template>
    <!-- here is a list of compact papers -->
    <b-container class="px-5 my-5">
        <b-container class="border-bottom mb-3">
            <b-row>
                <b-col cols="2">
                    <h3 class="my-3 text-left font-weight-bold">Export List</h3>
                </b-col>
            </b-row>
        </b-container>
        <b-form-row>
            <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0 w-75"
                >
                <b-input-group size="sm">
                    <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                    ></b-form-input>
                    <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-form-row>
        <b-table
            class="text-left px-5 pt-3"
            striped
            responsive="sm"
            :filter-included-fields="['title', 'author', 'keyword', 'tags']"
            :filter="filter"
            :items="papers"
            :fields="fields">
            <template v-slot:cell(select)="row">
                <span class="text-center text-middle align-middle">
                <b-form-checkbox
                    v-model="selected"
                    :value="row.item"
                    class="mr-0"
                    ></b-form-checkbox></span>
            </template>
            <template v-slot:cell(title)="row">
                <div class="text-truncate text-nowrap" style="width:500px">
                    {{ row.item.title }}
                </div>
            </template>
            <template v-slot:cell(author)="row">
                <div class="text-truncate text-nowrap" style="width:300px">
                    {{ row.item.author.join('; ') }}
                </div>
            </template>
        </b-table>
    </b-container>
</template>

<script>

import {mapState} from 'vuex'

export default {
    data() {
        return {
            selected: [],
            fields: ['select', 'title', 'author'],
            filter: '',
        }
    },
    computed: {
        ...mapState({
            papers: state => state.papers.all
        }),
    },
}
</script>