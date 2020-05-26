<template>
    <div>
        <b-list-group-item
            class="px-0 py-0 my-2 rounded-0">
            <b-row>
                <b-col class="tag-col">
                    <div :class="'tag tag-'+paper.status.split(' ').join('-')"
                    v-if="paper.status"></div>
                    <div class="tag tag-unread"
                    v-else></div>
                </b-col>
                <b-col class="px-0 py-3">
                    <b-row class="mx-0 pt-2 px-3">
                        <h5> {{paper.title}}</h5>
                    </b-row>
                    <b-row class="mx-0 mb-2 px-3">
                        <b-link
                            v-for="(a, i) in paper.author"
                            :key="a+i"
                            @click="filterPaper({
                                criteria: {author:{'$all': [a]}},
                                display: 'author: ' + a
                                })"
                            class="text-secondary"
                            >
                            {{a}}<span v-if="i !== paper.author.length - 1" class="mr-1">;</span>
                        </b-link>
                    </b-row>
                    <b-row v-if="paper.keyword || paper.tags"
                        class="mx-0">
                        <b-col>
                        <b-button
                            v-for="t in ([...paper.keyword, ...paper.tags])"
                            :key="t"
                            variant="outline-primary"
                            class="mr-1 badge font-weight-bold"
                            size="sm"
                            @click="filterPaper({
                                criteria: {'$or': [{tags:{'$all': [t]}},{keyword:{'$all': [t]}}]},
                                display: 'tags: ' + t
                                })"
                            >{{t}}</b-button>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col style="flex-grow: 0 !important" class="pr-5 pt-3">
                    <b-dropdown size="sm" toggle-class="text-decoration-none" variant="link" no-caret>
                        <template v-slot:button-content>
                            <b-icon-three-dots-vertical/>
                        </template>
                        <b-dropdown-item>Set status as</b-dropdown-item>
                        <b-dropdown-item-button
                            @click="setPaperStatus('unread')">
                            <b-icon-check class="mr-2"
                            v-if="!paper.status || paper.status==='unread'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            Unread
                        </b-dropdown-item-button>
                        <b-dropdown-item-button
                            @click="setPaperStatus('to read')">
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='to read'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            To Read
                        </b-dropdown-item-button>
                        <b-dropdown-item-button
                            @click="setPaperStatus('in read')">
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='in read'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            In Read
                        </b-dropdown-item-button>
                        <b-dropdown-item-button
                            @click="setPaperStatus('read')">
                            <b-icon-check class="mr-2"
                            v-if="paper.status==='read'"/>
                            <b-icon-blank class="mr-2"
                            v-else/>
                            Read
                        </b-dropdown-item-button>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                            size="sm"
                            class="mr-2"
                            @click="toggleCollapse(paper.ID)">
                            <b-icon-pencil class="mr-2"/>
                            Edit
                            </b-dropdown-item-button>
                        <b-dropdown-item-button
                            size="sm"
                            @click="toggleTask"
                            ><b-icon-list-task class="mr-2"/>
                            Create task from
                            </b-dropdown-item-button>
                        <b-dropdown-item-button
                            size="sm"
                            @click="deletePaper(paper)"
                            ><b-icon-trash class="mr-2"/>
                            Delete
                            </b-dropdown-item-button>
                    </b-dropdown>
                </b-col>
            </b-row>
            <!-- b-row class="mx-0">
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
            </b-row -->
        </b-list-group-item>
        <EditEntryForm :initial-paper="paper"/>
        <CreateTask :initial-paper="paper"/>
    </div>
</template>

<script>
    import EditEntryForm from './EditEntryForm'
    import CreateTask from '../tasks/CreateTask'
    import {mapActions} from 'vuex'

    export default {
        props: {
            initialPaper: {
                type: Object,
                required: true
            }
        },
        components: {
            EditEntryForm,
            CreateTask
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
            toggleTask() {
                this.$root.$emit('bv::show::modal', 'modal-new-task-' + this.paper.ID);
            },
            ...mapActions('papers', {
                deletePaper: 'deletePaperFromDatabase',
                filterPaper: 'filterPaperBy',
            }),
            setPaperStatus(status) {
                if(!this.paper.status || this.paper.status !== status) {
                    this.$store.dispatch('papers/updatePaperInfo', {
                        old: this.paper,
                        paper: {...this.paper, status}
                    })
                    this.$store.dispatch('papers/updatePaperField', {
                        paper: this.paper,
                        field: 'status',
                        v: status
                    });
                }
            }
        },
    }
</script>
