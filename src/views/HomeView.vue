<script setup>
import { ref, reactive } from 'vue'
import FileSelector from '@/components/FileSelector.vue';
import StudentSelector from '@/components/StudentSelector.vue';
import SubjectSelector from '@/components/SubjectSelector.vue';
import { RouterLink } from 'vue-router';
import DisplayResults from '@/components/DisplayResults.vue';

const studentList = reactive([]);

const updateStudents = (row) => {
  studentList.push({
    name: row.name,
    subjects: [
      {
        subject: 'eng', 
        score: row.eng,
        subIsChecked: false
      },
      {
        subject: 'history', 
        score: row.history,
        subIsChecked: false
      },
      {
        subject: 'math',
        score: row.math,
        subIsChecked: false
      }
    ],
    isChecked: false
  })
  console.log(studentList.length)
  console.log(studentList[0])
};



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
    <FileSelector @update-students="updateStudents" :studentList="studentList"/>
    <p>Select students:</p>
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
    />
    <br>
    <button @click="filterList">Done</button>
    <DisplayResults
      v-for="(student, index) in resultList"
      :student="student" :index="index" 
    />
  </main>
</template>
