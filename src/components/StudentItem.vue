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
    <div class="item">
       <p># of Change: {{ index + 1 }}</p>
       <p>Student name: {{ student }}</p>
       <p>Subject: {{ subject }}</p>
       <p>Score: {{ score }}</p>
    </div>
</template>
<style lang="scss" scoped>

.item {
    display: flex;
    border: none;
    background: #ececec;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 20px;
    gap: 20px;
}


</style>