<template>
    <b-card
        :title="task.paper.title"
        >
        <b-button
            class="badge"
            variant="outline-primary"
            v-for="tag in task.tags"
            >{{tag}}</b-button>
    </b-card>
</template>

<script>

    export default {
        props: {
            initialTask: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                task: this.initialTask
            }
        }
    }

</script>
