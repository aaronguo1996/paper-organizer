<template>
    <b-modal
        id="modal-new-entry"
        title="Add New Entry"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk">
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
                <b-form-input
                    id="dropdown-form-authors"
                    size="sm"
                    placeholder="author1, author2, author3, ..."
                ></b-form-input>
            </b-form-group>
            <b-form-row>
                <b-col>
                    <b-form-group label="Year" label-for="dropdown-form-year" @submit.stop.prevent>
                        <b-form-input
                            id="dropdown-form-year"
                            size="sm"
                            placeholder="YYYY"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Journal" label-for="dropdown-form-journal" @submit.stop.prevent>
                        <b-form-input
                            id="dropdown-form-journal"
                            size="sm"
                            placeholder="Journal or conference name"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-group
                label="Source"
                label-for="dropdown-form-source"
                invalid-feedback="Source has to be an url"
                @submit.stop.prevent>
                <b-form-input
                    id="dropdown-form-source"
                    size="sm"
                    placeholder="url, arxiv, doi, ..."
                    type="url"
                ></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                nameState: null,
                paper: {
                    title: ''
                }
            }
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.nameState = null
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
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-new-entry')
                })
            }
        }
    }
</script>
