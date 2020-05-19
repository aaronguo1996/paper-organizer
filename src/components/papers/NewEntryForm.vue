<template>
    <b-modal
        id="modal-new-entry"
        title="Add New Entry"
        size="lg"
        hide-footer
        hide-header
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk">
        <b-tabs no-nav-style
            active-nav-item-class="nav-arrow-active"
            @activate-tab="handleSwitch"
            ref="tabs"
            v-model="activeTab"
            align="center">
            <b-tab title-item-class="mr-half no-glow">
                <template v-slot:title>
                    <b-row class="arrow arrow-right" :class="getClass(0)" style="width: 240px">
                        <b-col class="bg-mine pl-4 py-2">
                            <b-row>
                                <b-col class="font-weight-bold h5">
                                    Step 1
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <small class="small">Search by paper title and authors</small>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </template>
                <b-container class="p-4">
                    <form ref="form" autocomplete="off" @submit.stop.prevent="handleSubmit">
                        <b-form-group
                            label="Title"
                            label-for="dropdown-form-title"
                            :state="nameState"
                            invalid-feedback="Paper title is required">
                            <b-form-input
                                id="dropdown-form-title"
                                size="sm"
                                placeholder="Paper Title"
                                :state="nameState"
                                v-model="paper.title"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Authors" label-for="dropdown-form-authors" @submit.stop.prevent>
                            <b-form-tags
                                id="dropdown-form-authors"
                                size="sm"
                                v-model="paper.author"
                                placeholder="author1, author2, author3, ..."
                            ></b-form-tags>
                        </b-form-group>
                        <b-row align-h="end" class="pt-3 pr-3">
                            <b-button v-if="!loadingState" type="submit" variant="primary">Next Step</b-button>
                            <b-button v-if="loadingState" variant="primary" disabled>
                                <b-spinner small></b-spinner>
                                Loading...
                            </b-button>
                        </b-row>
                    </form>
                </b-container>
            </b-tab>
            <b-tab title-item-class="mr-half"
                :disabled="completedSteps.length < 1">
                <template v-slot:title>
                    <b-row class="arrow arrow-left arrow-right" :class="getClass(1)">
                        <b-col class="bg-mine py-2 pl-5" style="width: 240px">
                            <b-row>
                                <b-col class="font-weight-bold h5">
                                    Step 2
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <small class="small">Select correct paper info</small>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </template>
                <b-container class="p-4">
                    <b-form autocomplete="off" @submit.stop.prevent="handleSelection">
                        <b-form-group id="input-group-4">
                            <b-form-checkbox-group v-model="checked" id="checkboxes-4">
                                <b-form-checkbox
                                    v-for="p in papers"
                                    :key="p.title"
                                    :value="p"
                                    class="my-2">
                                <b-container>
                                    <b-row>{{p.title}}</b-row>
                                    <b-row v-if="p.author"><small style="color: #555">{{p.author.join('; ')}}</small></b-row>
                                </b-container>
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                        <b-row align-h="end" class="pt-3 pr-3">
                            <b-button v-if="!loadingState" type="submit" variant="primary">Next Step</b-button>
                            <b-button v-if="loadingState" variant="primary" disabled>
                                <b-spinner small></b-spinner>
                                Loading...
                            </b-button>
                        </b-row>
                    </b-form>
                </b-container>
            </b-tab>
            <b-tab title-item-class="mr-half"
                :disabled="completedSteps.length < 2">
                <template v-slot:title>
                    <b-row class="arrow arrow-left" :class="getClass(2)">
                        <b-col class="bg-mine py-2 pl-5" style="width:200px !important">
                            <b-row>
                                <b-col class="font-weight-bold h5">
                                    Step 3
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <small class="small">Add selections to database</small>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </template>
                <b-container class="px-5 pt-4">
                    <b-row
                        v-for="(p, i) in checked"
                        :key="JSON.stringify(p)"
                        :value="p"
                        class="my-2">
                        <b-row>
                            <b-col v-if="i >= loadingIndex && loadingState" style="flex-grow: 0!important">
                                <b-spinner small></b-spinner>
                            </b-col>
                            <b-col v-else style="flex-grow: 0!important">
                                <b-icon-check-circle class="my-success"/>
                            </b-col>
                            <b-col>
                                <b-row>{{p.title}}</b-row>
                                <b-row v-if="p.author"><small style="color: #555">{{p.author.join('; ')}}</small></b-row>
                            </b-col>
                        </b-row>
                    </b-row>
                    <b-row class="my-success text-center" v-if="completedSteps.length == 3">
                        <b-col class="font-weight-bold my-3"> All added to database! </b-col>
                    </b-row>
                    <b-row class="text-center my-3" @click="resetModal">
                        <b-col><b-button variant="primary">Close Window</b-button></b-col>
                    </b-row>
                </b-container>
            </b-tab>
        </b-tabs>
    </b-modal>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                nameState: null,
                paper: {
                    title: '',
                    author: []
                },
                completedSteps: [],
                activeTab: 0,
                checked: [],
                loadingState: false,
                loadingIndex: 0,
            }
        },
        computed: {
            ...mapState({
                papers: state => state.papers.addCandidates.filter(elmt => elmt.author)
            })
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.nameState = null
                this.completedSteps = []
                this.activeTab = 0
                this.checked = []
                this.$bvModal.hide('modal-new-entry')
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return;
                }
                this.loadingState = true;
                this.$store.dispatch('papers/getPossiblePaper', {paper: this.paper})
                    .then(() => {
                        this.completedSteps = this.completedSteps.concat(0);
                        console.log(this.completedSteps);
                        this.$nextTick(() => this.activeTab = this.activeTab + 1)
                        console.log(this.activeTab);
                        console.log(this.$refs.tabs.value);
                        this.loadingState = false;
                        // this.$bvModal.hide('modal-new-entry')
                        // this.$bvModal.show('modal-select-add')
                    });
            },
            handleSelection() {
                this.completedSteps = this.completedSteps.concat(1);
                console.log(this.completedSteps);
                this.$nextTick(() => this.activeTab = this.activeTab + 1);
                this.checked.map(p => {
                    this.loadingState = true;
                    this.$store.dispatch('papers/updatePaperInfo', {old: p, paper: p})
                        .then(() => {
                            this.loadingIndex = this.loadingIndex + 1;
                        });
                });
                this.loadingState = false;
                this.$nextTick(() => this.completedSteps = this.completedSteps.concat(2));
                console.log(this.completedSteps);
            },
            handleSwitch(newIdx, oldIdx, evt) {
                this.activeTab = newIdx;
                // maintain the completedSteps
                console.log(this.completedSteps)
                this.completedSteps = this.completedSteps.filter(elmt => elmt <= newIdx);
                console.log(this.completedSteps)
                console.log(newIdx, oldIdx, evt);
            },
            getClass(idx) {
                if(idx === this.activeTab) {
                    return {
                        "nav-arrow-active": true,
                        "nav-arrow-inactive": false,
                        "nav-arrow-success": false,
                    }           
                } else if(idx in this.completedSteps) {
                    return {
                        "nav-arrow-inactive": false,
                        "nav-arrow-success": true,
                        "nav-arrow-active": false
                    }
                } else {
                    return {
                        "nav-arrow-inactive": true,
                        "nav-arrow-success": false,
                        "nav-arrow-active": false
                    }
                }
            },
        }
    }
</script>
