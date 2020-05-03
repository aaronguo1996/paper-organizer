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
                    v-model="checked"
                    stacked>
                    <b-form-checkbox
                        v-for="subtask in task.subtasks"
                        :value="subtask.item"
                        :key="subtask.item">
                        {{subtask.item}}
                    </b-form-checkbox>
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
                checked: [],
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
            handleSubmit() {
                console.log(this.checked);
            },
        },
    }
</script>
