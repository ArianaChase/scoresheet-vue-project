<script setup>
import { defineProps, defineEmits } from 'vue';

defineEmits(['toggle-checked-subject'])

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

</script>

<template>
    <div>
        <input type="checkbox" @change="$emit('toggle-checked-subject', index)"/>
        <span>{{ subject.subject }}</span>
    </div>
</template>


<style lang="scss" scoped>

</style>