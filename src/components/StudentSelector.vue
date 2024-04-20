<script setup>
import { defineProps, defineEmits } from 'vue';
 
defineEmits(['toggle-checked'])

const props = defineProps({
    student: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required:true
    }
})

//console.log(props.student)
//console.log(props.student.name)
</script>

<template>
    <div>
        <input type="checkbox" @change="$emit('toggle-checked', index)"/>
        <span> {{ student.name }} </span>
        
    </div>
</template>


<style lang="scss" scoped>

</style>