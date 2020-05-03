<template>
    <b-col
        class="px-3 text-center"
        cols="0">
        <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            :dropleft=true
            size="sm"
            class="px-0 py-0">
            <template v-slot:button-content>
                <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
            </template>
            <b-dropdown-item
            @click="toggleCollapse(paper.ID)"><b-icon-pencil class="mr-3"/>Edit</b-dropdown-item>
            <b-dropdown-item><b-icon-trash class="mr-3"/>Delete</b-dropdown-item>
            <b-dropdown-item><b-icon-flag class="mr-3"/>Report</b-dropdown-item>
        </b-dropdown>
    </b-col>
</template>
