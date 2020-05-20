<template>

    <b-container class="px-5">
        <b-container>
            <b-row align-h="start" align-v="end">
                <b-col sm class="text-left pb-2">
                    <b-button
                        pill
                        href="#" 
                        variant="outline-secondary"
                        class="badge mr-1 pl-2"
                        v-for="(f,i) in filters"
                        :key="i">
                        {{f.display}}
                        <b-icon-x
                            @click="refilter(f)"
                            ></b-icon-x>
                        </b-button>
                </b-col>
                <b-col  v-if="rows>perPage">
                    <b-container>
                        <b-pagination
                        @change="(p) => setPage(p)"
                        :value="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        limit="3"
                        align="right"
                        aria-controls="my-table"
                        ></b-pagination>
                        </b-container>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="text-left" v-if="items.length">
            <b-list-group
                id="my-table"
                :per-page="perPage"
                :current-page="currentPage">
                <div
                    v-for="paper in currentPageItems"
                    :key="paper.ID">
                    <EntryCard :initial-paper="paper"/>
                </div>
            </b-list-group>
        </b-container>
        <b-container class="align-middle" v-if="!items.length">
            <h3 style="padding: 80px 0">You have no paper in the database yet</h3>
        </b-container>
    </b-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import EntryCard from './EntryCard'

    export default {
        name: 'Grid',
        components: {
            EntryCard
        },
        data() {
            return {
                perPage: 20,
                // currentPage: 1,
                selectedKeys: ["title", "author", "keyword"]
            }
        },

        methods: {
            refilter(f) {
                this.$store.dispatch('papers/removeFilter', f);
            },
            ...mapActions('papers',{
                setPage: 'setPage',
            }),
        },

        computed: {
            rows() {
                return this.items.length
            },
            ...mapState({
                items: state => state.papers.all,
                filters: state => state.papers.filters,
                currentPage: state => state.papers.currentPage
            }),
            currentPageItems() {
                const lengthAll = this.items.length;
                var nbPages = 0;
                var paginated_items = [];
                for (let i = 0; i < lengthAll; i = i + this.perPage) {
                    paginated_items[nbPages] = this.items.slice(
                        i,
                        i + this.perPage
                    );
                    nbPages++;
                }
                return paginated_items[this.currentPage-1];
            },
            paperFields() {
                return ["title","author","keyword","first_author","last_author"]
            }
        },


        created () {
            this.$store.dispatch('papers/getAllPapers')
        },
    }
</script>

<style>
.dropdown .dropdown-toggle-no-caret {
    padding: 0 !important;
}

.dropdown-item {
    font-size: 10pt !important;
    padding: 1em 2em !important;
}
</style>
