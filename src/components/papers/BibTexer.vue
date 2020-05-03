<template>
    <b-modal
        id="modal-upload-bibtex"
        ref="modal-upload-bibtex"
        title="Upload BibTex File"
        @hidden="resetModal"
        @show="resetModal"
        hide-footer>
        <b-form-group
            label="BibTex file"
            invalid-feedback="File is required">
            <b-form-file
                id="bibtex-file"
                size="sm"
                :state="Boolean(bibtexFile)"
                v-model="bibtexFile"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                required/>
            <p v-if="uploadState" class="valid-feedback">Upload Success</p>
        </b-form-group>
        <b-button variant="outline-primary" size="sm" @click="uploadBibtex(bibtexFile)">
            <b-icon-upload class="mr-1"/>Upload
        </b-button>
    </b-modal>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                bibtexFile: null
            }
        },
        computed: {
            ...mapState({
                uploadState: state => state.papers.uploadState
            })
        },
        methods: {
            ...mapActions('papers', {
                resetUploadState: 'resetUploadState'
            }),
            uploadBibtex() {
                this.$store.dispatch('papers/uploadByBibTex', this.bibtexFile);
                this.$refs['modal-upload-bibtex'].hide();
            },
            resetModal() {
                this.resetUploadState();
            }
        }
    }
</script>
