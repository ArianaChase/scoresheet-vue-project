<script setup>
import { ref, reactive } from 'vue'
import FileSelector from '@/components/FileSelector.vue';
import StudentSelector from '@/components/StudentSelector.vue';
import SubjectSelector from '@/components/SubjectSelector.vue';
import { RouterLink } from 'vue-router';
import DisplayResults from '@/components/DisplayResults.vue';
import StudentItem from '@/components/StudentItem.vue';
import InitialForm from '@/components/InitialForm.vue';
import * as XLSX from 'xlsx';


const studentList = reactive([]);
const changesList = reactive([])

const updateStudents = (row) => {
  //console.log(row)
  studentList.push({
    id: studentList.length + 1,
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
  //console.log(studentList.length)
  //console.log(studentList[0])
  //console.log(studentList[0].subjects)
};


const updateChangesList = (changeObj) => {
  changesList.push({
    name: changeObj.name,
    subject: changeObj.subject,
    score: changeObj.score
  })


}

const pushChangesToStudentList = () => {
  console.log('pushed change successfully')
  console.log("changesList: ", changesList)
  for (let x = 0; x < changesList.length; x++) {
    const stuName = changesList[x].name
    studentList.push({
      id: studentList.length + 1,
      name: stuName,
      subjects: [
      {
        subject: 'eng', 
        score: '',
        subIsChecked: false
      },
      {
        subject: 'history', 
        score: '',
        subIsChecked: false
      },
      {
        subject: 'math',
        score: '',
        subIsChecked: false
      }
      ],
      isChecked: false
    })
    const newStudentIndex = studentList.length - 1; 
    if (changesList[x].subject == "English") {
      studentList[newStudentIndex].subjects[0].score = changesList[x].score
    } else if (changesList[x].subject == "Math") {
      studentList[newStudentIndex].subjects[2].score = changesList[x].score
    } else if (changesList[x].subject == "History") {
      studentList[newStudentIndex].subjects[1].score = changesList[x].score
    } 
  }
  console.log("studentList: ", studentList)
}

const goToResultsPage = () => {
  
}






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
      <InitialForm 
        @update-changes-list="updateChangesList" 
        @push-changes-to-studentList="pushChangesToStudentList" 
        @update-students="updateStudents" 
        @go-to-results-page="goToResultsPage"
        :studentList="studentList" 
        :changesList="changesList"  />
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
