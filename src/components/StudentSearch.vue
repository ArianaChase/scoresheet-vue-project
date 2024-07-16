<script setup>
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import FileHandler from './FileHandler.vue';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router'; 
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'
import SubjectSelector from './SubjectSelector.vue';
import SearchItem from './SearchItem.vue';

const store = useStore()

const studentList = store.studentList
const noStudentFound = ref(false)

const showResults = ref(false)
const resultsList = reactive([])
const searched_student_name = ref(null)
const { subjectCheckbox } = storeToRefs(store)

const toggleCheckedSubject = (subjectIndex) => {
  for (let x = 0; x <= studentList.length - 1; ++x) {
    studentList[x].subjects[subjectIndex].subIsChecked = !studentList[x].subjects[subjectIndex].subIsChecked
  }
}

const searchConfirm = () => {
    noStudentFound.value = false
    showResults.value = true
    resultsList.length = 0

    for (let x = 0; x <= studentList.length - 1; ++x) {
        if (studentList[x].name == searched_student_name.value) {
            resultsList.push(studentList[x])
  }
  
    if (resultsList.length == 0) {
        noStudentFound.value = true
    } else {
        noStudentFound.value = false
    }

}
console.log(studentList, resultsList)
}


</script>

<template>
    <div>
        <span style="font-weight: bold">Search for a student</span>
    </div>
    <br>
    <div class="form-options">
            <div>
                <span><b>Student Name: </b></span>
                <input type="text" v-model="searched_student_name" >
                <span v-if="searched_student_name == ''" class="errorMsg"> Please enter a name</span>
            </div>
            <br>
            <SubjectSelector 
                v-for="(subject, index) in studentList[0]?.subjects"
                :subject="subject" :index="index"
                @toggle-checked-subject="toggleCheckedSubject"
            />
            <div>
                <button class="button" @click="searchConfirm">Search</button>
            </div>
            <SearchItem v-if="showResults"
                v-for="(result, index) in resultsList"
                :result="result" :index="index"

            />
            <div class="errorMsg" v-if="noStudentFound">
                <p>No Student Found</p>
            </div>
    </div>
</template>



<style lang="scss" scoped>

</style>