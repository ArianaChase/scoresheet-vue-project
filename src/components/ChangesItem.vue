<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import { useStore } from '@/stores/store.js';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia'

const store = useStore()
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

const changesList = store.changesList

const deleteChange = () => {
    console.log('item changeslist: ', changesList)
    //const currentChangeIndex = changesList.findIndex(obj => obj.index === props.index)
    changesList.splice(props.index, 1)
}


</script>


<template>
    <div class="item">
        <div class="labels-grid-container">
            <p class="label-grid-item"><b># of Change: </b>{{ index + 1 }}</p>
            <p class="label-grid-item"><b>Student name: </b>{{ student }}</p>
            <p class="label-grid-item"><b>Subject: </b>{{ subject }}</p>
            <p class="label-grid-item"><b>Score: </b>{{ score }}</p>
        </div>
        <div>
            <Icon icon="mdi:trash-outline" width="30" height="30"  style="color: #800a0a" class="icon" @click="deleteChange"/>
        </div>
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
    margin-bottom: 15px;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 2px 2px #0b6b26;
}

.labels-grid-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2rem;

}


.icon:hover {
    opacity: 60%;
}

.icon:active {
    opacity: 80%;
}


</style>