<template>
    <b-modal
        :id="paper.ID"
        :title="paper.ID"
        :ref="paper.ID"
        size="lg"
        class="py-3 border">
        <b-container>
            <b-form autocomplete="off" ref="form">
                <b-form-row
                    v-for="fieldList in sortedFields"
                    :key="fieldList.toString()">
                    <b-col
                        v-for="field in fieldList"
                        :key="field">
                        <b-form-group :label="capitalizeFirst(field)"> 
                            <b-form-textarea
                                :value="paper[field] || ''"
                                v-if="field === 'abstract' || (paper[field] && typeof paper[field] !== 'object' && paper[field].toString().length > 150)"
                                required
                                rows="6"
                                max-rows="6"
                                @keyup="updatePaperField({paper, field, v: $event.target.value})"
                                :placeholder="'Enter paper '+field.toString().toLowerCase()"
                            ></b-form-textarea>
                            <b-form-input
                                :value="paper[field]"
                                v-else-if="paper[field] && typeof paper[field] !== 'object'"
                                @keyup="updatePaperField({paper, field, v: $event.target.value})"
                                required
                                :placeholder="'Enter paper '+field.toString().toLowerCase()"
                            ></b-form-input>
                            <b-form-tags
                                :value="paper[field] || []"
                                v-else
                                @input="(v) => updatePaperField({paper, field, v})"
                                required
                                :placeholder="'paper '+field.toString().toLowerCase()+'s'"
                            ></b-form-tags>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-container>
        <template v-slot:modal-footer>
            <b-button type="button" class="mr-1" variant="primary" @click="handleSubmit({old: oldPaper, paper})">Update</b-button>
            <b-button type="button" variant="secondary" @click="reset">Cancel</b-button>
        </template>
    </b-modal>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'EditEntryForm',
        props: {
            initialPaper: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                oldPaper: {...this.initialPaper},
                paper: this.initialPaper,
            }
        },
        methods: {
            ...mapActions('papers', {
                updatePaperField: 'updatePaperField',
            }),
            handleSubmit({old, paper}) {
                console.log(old, paper)
                this.$store.dispatch('papers/updatePaperInfo', {old, paper});
                this.$refs[this.paper.ID].hide();
            },
            capitalizeFirst(name) {
                return name.charAt(0).toUpperCase() + name.slice(1)
            },
            reset() {
                this.$refs[this.paper.ID].hide();
            },
        },
        computed: {
            sortedFields() {
                const keys = Object.keys(this.paper);
                const reservedKeys = ["title", "author", "abstract", "keyword", "tags"];
                const skippedKeys = ["ID", "created_time", "modified_time", "timestamp"];
                var reducedKeys = keys.filter(item => reservedKeys.indexOf(item) < 0 && skippedKeys.indexOf(item) < 0);
                // sort fields by their value length
                reducedKeys.sort((a, b) => this.paper[a].toString().length - this.paper[b].toString().length);

                // group fields into rows
                var sortedKeys = []
                for (let i in reservedKeys) {
                    const k = reservedKeys[i];
                    sortedKeys.push([k]);
                }

                var accumList = [];
                for (let i in reducedKeys) {
                    const k = reducedKeys[i];
                    const len = this.paper[k].toString().length;
                    if(50 / accumList.length < len) {
                        sortedKeys.push(accumList);
                        accumList = [k];
                    } else {
                        accumList.push(k);
                    }
                }
                if(accumList.length > 0) {
                    sortedKeys.push(accumList);
                }
                return sortedKeys;
            }
        }
    }
</script>
