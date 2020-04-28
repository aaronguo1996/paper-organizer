<template>
    <div>
        <b-list-group-item
            class="px-0 py-3 my-2 rounded-0">
            <b-row>
                <b-col>
                    <b-row class="mx-0 px-3">
                        <div :class="'tag tag-'+paper.status"
                        v-if="paper.status"></div>
                        <div class="tag tag-unread"
                        v-else></div>
                    </b-row>
                    <b-row class="mx-0 pt-2 px-3">
                        <h5> {{paper.title}}</h5>
                    </b-row>
                    <b-row class="mx-0 px-3">
                        {{paper.author.join("; ")}}
                    </b-row>
                    <b-row
                        class="mx-0 pt-2 mb-3">
                        <b-col class="text-nowrap text-truncate">
                        <b-button
                            v-for="t in paper.keyword"
                            :key="t"
                            variant="outline-primary"
                            class="mr-1 badge font-weight-bold"
                            size="sm"
                            >{{t}}</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="mx-0">
                <b-col
                    v-if="paper.abstract && paper.abstract.length > 0"
                    style="overflow: hidden; text-overflow: ellipsis;
                    line-height: 1.5em; height: 6em;"
                    ><span class="font-weight-bold">Abstract:</span>
                    {{paper.abstract}}
                </b-col>
                <b-col v-else>
                    <span>(No Abstract Available)</span>
                </b-col>
            </b-row>
            <b-row align-h="end" class="mt-3">
                <b-col cols="5">
                    <b-dropdown
                        variant="primary"
                        size="sm"
                        class="mr-2">
                        <template v-slot:button-content>
                            <b-icon-controller class="mr-2"/>Set Status as
                        </template>
                        {{paper.status}}
                        <b-dropdown-item-button>
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='unread'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            Unread
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='to read'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            To Read
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='in read'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            In Read
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='read'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            Read
                        </b-dropdown-item-button>
                    </b-dropdown>
                    <b-button
                        variant="primary"
                        size="sm"
                        class="mr-2"
                        style="width:80px"
                        @click="toggleCollapse(paper.ID)">
                        <b-icon-pencil class="mr-2"/>Edit</b-button>
                    <b-button
                        variant="primary"
                        size="sm"
                        ><b-icon-trash class="mr-2"/>Delete</b-button>
                </b-col>
            </b-row>
        </b-list-group-item>
        <EditEntryForm :initial-paper="paper"/>
    </div>
</template>

<script>
    import EditEntryForm from './EditEntryForm'

    export default {
        props: {
            initialPaper: {
                type: Object,
                required: true
            }
        },
        components: {
            EditEntryForm
        },
        data() {
            return {
                paper: this.initialPaper
            }
        },
        methods: {
            toggleCollapse(modalId) {
                this.$root.$emit('bv::show::modal', modalId)
            },
        },
    }
</script>
