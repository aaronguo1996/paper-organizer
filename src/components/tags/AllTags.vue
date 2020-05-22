<template>
    <b-container class="pr-3 mt-5 text-left w-75">
        <b-container class="border-bottom mb-3">
            <b-row>
                <b-col>
                    <h3 class="my-3 text-left font-weight-bold">Literature by Tags</h3>
                </b-col>
            </b-row>
        </b-container>
        <b-container
            v-for="(group, cls) in tagGroups"
            :key="cls">
            <b-row>
                <b-col cols="3" style="flex-grow: 0!important;">
                    <h4>By {{cls}}</h4>
                </b-col>
            <!-- {{group}} -->
                <b-col>
                    <b-container
                        v-for="(elmt, tag) in group"
                        :key="tag"
                        class="mb-3">
                        <b-container align-h="start" class="mb-3">
                            <span class="h5">
                                {{tag}}
                            </span>
                            <!-- <b-col><b-badge>{{e.length}}</b-badge></b-col> -->
                        </b-container>
                        <!-- {{elmt}} -->
                        <ul>
                        <li
                            v-for="paper in elmt"
                            :key="paper.title"
                            class="mb-2">
                            <span class="h6 mr-3">{{paper.title}}</span><br>
                            <span>{{paper.author.join('; ')}}</span>
                        </li>
                        </ul>
                    </b-container>
                </b-col>
            </b-row>
            <hr>
            <!-- <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text> -->
        </b-container>
    </b-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters('papers', {
            tagGroups: 'groupByTags',
        })
    }
}
</script>