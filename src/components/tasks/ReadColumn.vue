<template>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
            }
        },
        computed: {
            ...mapState({
                tasks: state => state.tasks.all
            }),
        }
    }
</script>
