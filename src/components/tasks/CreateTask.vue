<template>
    <b-modal
        :id="'modal-new-task-'+paper.ID"
        @ok="handleSubmit"
        hide-header>
        <b-form @submit.stop.prevent>
            <b-form-group
                label="Paper Title">
                <b-form-input readonly
                    :value="paper.title">
                </b-form-input>
            </b-form-group>
            <b-form-group
                label="Authors">
                <b-form-tags 
                    v-model="paper.author"
                    placeholder=""
                    disabled>
                </b-form-tags>
            </b-form-group>
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="State Date">
                        <b-form-datepicker 
                            disabled
                            :value="new Date()"
                            v-model="task.start_time"></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group
                        label="Due Date">
                        <b-form-datepicker v-model="task.end_time"></b-form-datepicker>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="Tags">
                        <b-form-tags v-model="task.tags"></b-form-tags>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <hr/>
            <b-form-group
                label="Subtasks">
                <b-form-checkbox-group
                    stacked>
                    <b-container
                        v-for="(subtask, i) in task.subtasks"
                        :key="i">
                        <b-row>
                            <b-col>
                                <b-form-checkbox disabled
                                    class="my-2">
                                    <b-form-input
                                        :disabled="i !== editableId"
                                        autofocus
                                        ref="checkbox-inputs"
                                        v-model="subtask.item" 
                                        @keyup.enter="(e) => disableInput(e)"
                                        @blur="(e) => disableInput(e)"
                                        @keyup="(e) => changeInput(subtask, e)"
                                        class="border-0 py-0"
                                        style="height: 1.5rem !important; border-bottom: 1px dashed #ddd !important; background-color: transparent !important;"></b-form-input>
                                </b-form-checkbox>
                            </b-col>
                            <b-col style="flex-grow: 0">
                                <b-link @click="editSubtask(subtask, i)" class="text-secondary"><b-icon-pencil/></b-link>
                            </b-col>
                            <b-col style="flex-grow: 0">
                                <b-link @click="deleteSubtask(subtask)" class="text-secondary"><b-icon-trash/></b-link>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-form-checkbox-group>
                <b-form-input
                    placeholder="Add a new subtask and press Enter"
                    v-model="lastValue"
                    ref="lastInput"
                    @keyup.enter="addSubtask"
                    class="mt-3"
                    ></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        props: {
            initialPaper: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                paper: this.initialPaper,
                lastValue: null,
                editableId: null,
                task: {
                    start_time: new Date(),
                    end_time: null,
                    tags: [],
                    subtasks: [],
                },
            }
        },
        methods: {
            addSubtask() {
                this.task.subtasks = this.task.subtasks.concat({
                    item: this.lastValue,
                    status: false
                });
                this.lastValue = null;
            },
            deleteSubtask(v) {
                this.task.subtasks = this.task.subtasks.filter(elmt => elmt !== v);
            },
            changeInput(subtask, evt) {
                this.$set(subtask, 'item', evt.target.value);
                console.log(this.task.subtasks)
            },
            editSubtask(subtask, i) {
                this.editableId = i;
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        this.$refs['checkbox-inputs'][i].focus()
                    })
                });
            },
            disableInput() {
                this.editableId = null;
            },
            handleSubmit() {
                console.log(this.checked);
            },
        },
    }
</script>
