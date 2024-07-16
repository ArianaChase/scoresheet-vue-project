<script setup>
import { ref, reactive } from 'vue'
import SubjectSelector from '@/components/SubjectSelector.vue';
import { RouterLink } from 'vue-router';
import DisplayResults from '@/components/DisplayResults.vue';
import ChangesItem from '@/components/ChangesItem.vue';
import InitialForm from '@/components/InitialForm.vue';
import * as XLSX from 'xlsx';
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'

const store = useStore()
const studentList = store.studentList
const changesList = store.changesList
const { workbook } = storeToRefs(store)




console.log(workbook.value)

const clearChanges = () => {
  changesList.length = 0
}



const toggleChecked =  (studentIndex) => {
  studentList[studentIndex].isChecked = !studentList[studentIndex].isChecked
}



const resultList = reactive([])





</script>

<template>
  <main class="main">
    <div class="left-panel">
      <div class="form-box">
        <InitialForm />
      </div>
    </div>
    <div class="right-panel">
      <div class="h-alignment">
          <h1>Edits:</h1>
          <button class="button" @click="clearChanges">Clear</button>
      </div>
      <ChangesItem 
        v-for="(student, index) in changesList"
        :student="student.name" :subject="student.subject" :score="student.score" :index="index"
      />
    </div>

  </main>
</template>
<style>


.main {
  display: flex;
  height: 100vh;
}

.errorMsg {
    color: red;
}

.left-panel {
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: #F19C79;
    height: 100%;
    padding: 10px;
    font-family: "Roboto", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;    
}

.right-panel {
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: #CBDFBD;
    height: 100%;
    padding: 10px;
    font-family: "Roboto", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;

}

.form-box {
  margin:10px;
  background-color: #F6F4D2;
  padding: 20px;
}
.h-alignment {
    display: flex;
    align-items: center;
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