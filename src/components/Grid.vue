<template>
    <b-container class="px-0">
        <b-container>
            <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            hide-goto-end-buttons
            hide-ellipsis
            limit="3"
            align="right"
            aria-controls="my-table"
            ></b-pagination>
        </b-container>
        <!-- b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        ></b-table-->
        <b-container class="text-left">
            <b-row class="mx-0 my-3 font-weight-bold">
                <b-col cols="5" v-if="selectedKeys.includes('title')">Title</b-col>
                <b-col v-if="selectedKeys.includes('first_author')">First Author</b-col>
                <b-col v-if="selectedKeys.includes('last_author')">Last Author</b-col>
                <b-col v-if="selectedKeys.includes('authors')">Authors</b-col>
                <b-col v-if="selectedKeys.includes('tags')">Tags</b-col>
                <b-col cols="2" v-if="selectedKeys.includes('created_time')">Created Time</b-col>
                <b-col
                    class="px-3 text-center"
                    cols="0">
                    <b-dropdown
                        variant="link"
                        toggle-class="text-decoration-none"
                        no-caret
                        :dropleft=true
                        class="px-0 py-0">
                        <template v-slot:button-content>
                            <b-icon-plus-circle></b-icon-plus-circle>
                        </template>
                        <b-dropdown-form>
                            <b-form-group>
                                <b-form-checkbox-group v-model="selectedKeys">
                                    <b-form-checkbox 
                                        v-for="f in paperFields"
                                        :key="f"
                                        class="mb-2"
                                        :value="f">{{f}}</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                        </b-dropdown-form>
                    </b-dropdown>
                </b-col>
            </b-row>
            <b-list-group
                id="my-table"
                :per-page="perPage"
                :current-page="currentPage">
                <b-list-group-item
                    class="px-0 py-3 rounded-0"
                    v-for="paper in currentPageItems"
                    :key="paper.id">
                    <b-row class="mx-0">
                        <b-col
                            cols="5" 
                            class="text-truncate"
                            v-if="selectedKeys.includes('title')"
                            >{{paper.title}}</b-col>
                        <b-col v-if="selectedKeys.includes('first_author') && paper.author">{{paper.author[0]}}</b-col>
                        <b-col v-if="selectedKeys.includes('last_author')">{{paper.authors[paper.author.length - 1]}}</b-col>
                        <b-col
                            v-if="selectedKeys.includes('author')"
                            class="text-truncate text-nowrap"
                            >{{paper.author.join("; ")}}</b-col>
                        <b-col
                            class="text-nowrap text-truncate"
                            v-if="selectedKeys.includes('keywords')"
                            >
                            <b-badge
                                v-for="t in paper.keywords"
                                :key="t"
                                variant="info"
                                class="mr-1"
                                >{{t}}</b-badge>
                        </b-col>
                        <b-col cols="2"
                            v-if="selectedKeys.includes('created_time')"
                            >{{paper.created_time}}</b-col>
                        <b-col
                            class="px-3 text-center"
                            cols="0">
                            <b-dropdown
                                variant="link"
                                toggle-class="text-decoration-none"
                                no-caret
                                :dropleft=true
                                size="sm"
                                class="px-0 py-0">
                                <template v-slot:button-content>
                                    <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
                                </template>
                                <b-dropdown-item><b-icon-pencil class="mr-3"/>Edit</b-dropdown-item>
                                <b-dropdown-item><b-icon-trash class="mr-3"/>Delete</b-dropdown-item>
                                <b-dropdown-item><b-icon-flag class="mr-3"/>Report</b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
        </b-container>
    </b-container>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Grid',
        data() {
            return {
                perPage: 10,
                currentPage: 1,
                selectedKeys: ["title", "first_author", "tags"]
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
                if(this.items.length !== 0)
                    return Object.keys(this.items[0]).concat(["first_author", "last_author"]);
                else
                    return []
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
