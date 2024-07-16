<script setup>
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import FileHandler from './FileHandler.vue';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router'; 
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'


const props = defineProps({
    subject: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
})

const store = useStore()
const { subjectCheckbox } = storeToRefs(store)
console.log(subjectCheckbox.value)

</script>

<template>
    <div>
        <input type="checkbox" @change="$emit('toggle-checked-subject', index)"/>
        <span>{{ subject.subject }}</span>
    </div>
</template>


<style lang="scss" scoped>

</style>