<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    student: {
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
    for (let x = 0; x < props.student.subjects.length; ++x) {
        if (props.student.subjects[x].subIsChecked) {
            average += props.student.subjects[x].score
            count += 1
        }
    }
    console.log(average / count)

    return average / count
}

</script>



<template>
    <div>
        <h2>{{ student.name }}'s Results</h2>
    </div>
    <p v-for="(subject, index) in student.subjects">
        <span v-if="subject.subIsChecked">
            {{ student.subjects[index].subject }}: {{ student.subjects[index].score }}
        </span>
    </p>
    <p>Average: {{ calculateAverage() }}</p>
    <!-- <p v-for="(subject, index) in subjects"> {{ subject }}</p> -->
</template>



<style lang="scss" scoped>

</style>