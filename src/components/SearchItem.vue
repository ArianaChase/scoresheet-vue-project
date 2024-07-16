<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import { useStore } from '@/stores/store.js';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia'

const props = defineProps({
    result: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },

})

</script>

<template>
    <div>
        <p><b>Name: </b>{{ props.result.name }}</p>
        <p v-for="(subject, index) in props.result.subjects">
        <span v-if="subject.subIsChecked">
            {{ result.subjects[index].subject }}: {{ result.subjects[index].score }}
        </span>
        </p>
    </div>
    
</template>

<style lang="scss" scoped>

</style>