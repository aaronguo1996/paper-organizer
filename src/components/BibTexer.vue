<template>
    <b-modal
        id="modal-upload-bibtex"
        title="Upload BibTex File"
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
        </b-form-group>
        <b-button variant="outline-primary" size="sm" @click="uploadBibtex(bibtexFile)">
            <b-icon-upload class="mr-1"/>Upload
        </b-button>
    </b-modal>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                bibtexFile: null
            }
        },
        methods: {
            ...mapActions('papers', {
                uploadBibtex: 'uploadByBibTex'
            })
        }
    }
</script>
