<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';
import ResultsChart from '@/components/ResultsChart.vue';
import { useStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'
import { saveAs } from 'file-saver';
import StudentSearch from '@/components/StudentSearch.vue';
import SubjectSelector from '@/components/SubjectSelector.vue';

const store = useStore()

const { workbook, subjectCheckbox } = storeToRefs(store)
const studentList = store.studentList


const showButtonIsClicked = ref(false)
const newFileName = ref('')

const showButton = () => {
  if (workbook.value.Sheets != undefined) {
    showButtonIsClicked.value = true
  } else {
    
  }
}
  
for (let y = 0; y <= studentList.length - 1; ++y) {
        for (let i = 0; i <= studentList[0].subjects.length -1; ++i) {
            studentList[y].subjects[i].subIsChecked = false
        }
    }
  
subjectCheckbox.value = false
  
const saveFile = () => {
    const saveFile = XLSX.write(workbook.value, { bookType: 'xlsx', type: 'array' });
    console.log(saveFile)
    saveAs(new Blob([saveFile], { type: 'application/octet-stream' }), newFileName.value + '.xlsx');
    
}

</script>

<template>
  <div class="main">
    <h1>Results</h1>
    <div>
      <button class="button" @click="showButton" v-if="!showButtonIsClicked">Show</button>
      <ResultsChart v-if="showButtonIsClicked"/>
      <div>
        <span v-if="showButtonIsClicked" style="font-weight: bold">Save this scoresheet: </span>
        <input type="text" v-if="showButtonIsClicked" v-model="newFileName"/>
        <button class="button" @click="saveFile" v-if="showButtonIsClicked">Save File</button>
      </div>
      <StudentSearch v-if="showButtonIsClicked"/>


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