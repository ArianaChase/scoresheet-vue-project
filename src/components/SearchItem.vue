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

const calculateAverage = () => {
    let average = 0
    let count = 0
    for (let x = 0; x < props.result.subjects.length; ++x) {
        if (props.result.subjects[x].subIsChecked) {
            average += props.result.subjects[x].score
            count += 1
        }
    }
    console.log(average / count)

    return average / count
}



</script>

<template>
    <div>
        <p><b>Name: </b>{{ props.result.name }}</p>
        <p v-for="(subject, index) in props.result.subjects">
        <span v-if="subject.subIsChecked">
            {{ result.subjects[index].subject }}: {{ result.subjects[index].score }}
        </span>
        </p>
        <p>Average: {{ calculateAverage() }}</p>
    </div>
    
</template>

<style lang="scss" scoped>

</style>