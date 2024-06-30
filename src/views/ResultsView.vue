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
  <div class="main">
    <h1>Results</h1>
    <div>
      <button class="button" @click="showButton" v-if="!showButtonIsClicked">Show</button>
      <ResultsChart v-if="showButtonIsClicked"/>
    </div>
  </div>
  
</template>



<style lang="scss" scoped>

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #CBDFBD;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;    
}

.button {
    font-size: 15px;
    height: 30px;
    border: none;
    margin: 10px;
    background-color: rgb(237, 172, 107);
}

.button:hover {
    background-color: rgb(170, 92, 63);
    color: white
}
.button:active {
    background-color: rgb(212, 156, 116);
}


</style>