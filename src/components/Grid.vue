<template>
    <b-container class="px-0">
        <b-container v-if="rows>1">
            <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            limit="3"
            align="right"
            aria-controls="my-table"
            ></b-pagination>
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
    import { mapState } from 'vuex'
    import EntryCard from './EntryCard'

    export default {
        name: 'Grid',
        components: {
            EntryCard
        },
        data() {
            return {
                perPage: 20,
                currentPage: 1,
                selectedKeys: ["title", "author", "keyword"]
            }
        },

        computed: {
            rows() {
                return this.items.length
            },
            ...mapState({
                items: state => state.papers.all
            }),
            currentPageItems() {
                let lengthAll = this.items.length;
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
