<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    index: {
        type: Number,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
})


</script>


<template>
    <div>
       <p># of Change: {{ index + 1 }}</p>
       <p>Student name: {{ student }}</p>
       <p>Subject: {{ subject }}</p>
       <p>Score: {{ score }}</p>
    </div>
</template>
<style lang="scss" scoped>

</style>