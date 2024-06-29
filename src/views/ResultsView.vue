<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';
import ResultsChart from '@/components/ResultsChart.vue';
import { useStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const showButtonIsClicked = ref(false)

const showButton = () => {
  showButtonIsClicked.value = true
  return showButtonIsClicked.value
}


</script>

<template>
  <div>
    <h1>Results</h1>
    <button @click="showButton" v-if="!showButtonIsClicked">Show</button>
    <ResultsChart v-if="showButtonIsClicked"/>
  </div>
  
</template>



<style lang="scss" scoped>

</style>