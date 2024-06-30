<script setup>
import { ref, reactive } from 'vue'
import StudentSelector from '@/components/StudentSelector.vue';
import SubjectSelector from '@/components/SubjectSelector.vue';
import { RouterLink } from 'vue-router';
import DisplayResults from '@/components/DisplayResults.vue';
import StudentItem from '@/components/StudentItem.vue';
import InitialForm from '@/components/InitialForm.vue';
import * as XLSX from 'xlsx';
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'

const store = useStore()
const studentList = store.studentList
const changesList = store.changesList
const { workbook } = storeToRefs(store)

console.log(workbook.value)
const toggleChecked =  (studentIndex) => {
  studentList[studentIndex].isChecked = !studentList[studentIndex].isChecked
}

const toggleCheckedSubject = (subjectIndex) => {
  for (let x = 0; x <= studentList.length - 1; ++x) {
    studentList[x].subjects[subjectIndex].subIsChecked = !studentList[x].subjects[subjectIndex].subIsChecked
  }
}

const resultList = reactive([])

const filterList = () => {

  resultList.length = 0
  
  for (let x = 0; x <= studentList.length - 1; ++x) {
    if (studentList[x].isChecked == true) {
      resultList.push(studentList[x])
    }
  }


  console.log(resultList)
}




</script>

<template>
  <main>
    <!-- <FileSelector @update-students="updateStudents" @send-excel-data="sendExcelData" :studentList="studentList" :changesList="changesList"/>-->
    <div>
      <InitialForm />
    </div>
    <div>
        <h1>Edits:</h1>
    </div>
    <StudentItem 
      v-for="(student, index) in changesList"
      :student="student.name" :subject="student.subject" :score="student.score" :index="index"
    />
    <!--<p>Select students:</p>
     <StudentSelector 
      v-for="(student, index) in studentList" 
      :student="student" :index="index"
      @toggle-checked="toggleChecked"
    />
    <p>Select subjects:</p>
    <SubjectSelector 
      v-for="(subject, index) in studentList[0]?.subjects"
      :subject="subject" :index="index"
      @toggle-checked-subject="toggleCheckedSubject"
    /> -->
    <!--<br>
    <button @click="filterList">Done</button> -->
    <!--<DisplayResults
      v-for="(student, index) in resultList"
      :student="student" :index="index" 
    />-->
  </main>
</template>
