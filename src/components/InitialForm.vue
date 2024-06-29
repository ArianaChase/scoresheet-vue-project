
<script setup>
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import FileHandler from './FileHandler.vue';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router'; 
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'

const store = useStore()

defineOptions({
  inheritAttrs: false
})


const emits = defineEmits(['update-changes-list', 'update-students', 'push-changes-to-studentList', 'go-to-results-page'])
const studentName = ref();
const subjectSelect = ref();
const scoreField = ref();
const { workbook } = storeToRefs(store);
const hot = ref();
const hotElement = ref();
const sheet = ref();
const studentList = store.studentList
const sheetName = ref();
const noFileErrorMsg = ref(false)
const { fileUploaded } = storeToRefs(store)

console.log(fileUploaded.value)

const change = reactive({
    name: studentName,
    subject: subjectSelect,
    score: scoreField
}) 

const sendExcelData = (data) => {
    workbook.value = data
    sheetName.value = workbook.value.SheetNames[0]
    sheet.value = XLSX.utils.sheet_to_json(workbook.value.Sheets[sheetName], { header: 1 });
    store.$patch({
        workbook: workbook
    })
}

const onAddClick = () => {
    console.log(fileUploaded.value)
    if (fileUploaded.value == true) {
        store.updateChangesList(change)
        noFileErrorMsg.value = false
        console.log(noFileErrorMsg.value)
    } else {
        noFileErrorMsg.value = true
        console.log(noFileErrorMsg.value)

    }
    
}    

const onDoneClick = () => {
    try {
        if (fileUploaded.value == true) {
        updateExcel(),
        store.pushChangesToStudentList()
        router.push({ name: 'results'})
        noFileErrorMsg.value = false
        console.log(noFileErrorMsg.value)
    } else {
        noFileErrorMsg.value = true
        console.log(noFileErrorMsg.value)

    }} catch (error) {
        console.log('error PUSHCHANGES in initial form', error)
    }
}

const updateExcel = () => {
    console.log('updated Excel')
    //console.log(sheet.value)
    const changesList = store.changesList
    const sheetName = workbook.value.SheetNames[0]
    const sheet = XLSX.utils.sheet_to_json(workbook.value.Sheets[sheetName], { header: 1 });
    
    for (let x = 0; x < changesList.length; x++) {
        //console.log(changesList[x].name)
        const exists = studentList.some(obj => obj.name === changesList[x].name);
    
        if (exists == false) {
            //console.log('we made it to exists == false')
            const rowData = ref(['','','',''])
            rowData.value[0] = changesList[x].name
    
            if (changesList[x].subject == "English") {
                rowData.value[1] = changesList[x].score

            } else if (changesList[x].subject == "Math") {
                rowData.value[2] = changesList[x].score

            //console.log(1)
            } else if (changesList[x].subject == "History") {
                rowData.value[3] = changesList[x].score
            }
            sheet.push(rowData.value)
            //console.log(rowData.value)
    } else {
            console.log(sheet)
            const dupeArray = sheet.findIndex(arr => arr.includes(changesList[x].name)); //iterates over the array and finds the array that includes 'henry'
            if (changesList[x].subject == "English") {
                sheet[dupeArray][1] = changesList[x].score
            } else if (changesList[x].subject == "Math") {
                sheet[dupeArray][1] = changesList[x].score
            } else if (changesList[x].subject == "History") {
                sheet[dupeArray][1] = changesList[x].score
            }
    }
    //console.log(sheet)

    } 
    workbook.value.Sheets[sheetName] = XLSX.utils.json_to_sheet(sheet);
    console.log(workbook.value)
    store.$patch({
        workbook: workbook
    })
}

</script>

<template>
    <div>
        <FileHandler @send-excel-data="sendExcelData" />
    </div>
    <div ref="hotElement"></div>
    <div>
        <h1>Add/Edit Students' grades</h1>
            <span>Student Name: </span>
        <input type="text" v-model="studentName">
        <span v-if="studentName == ''" class="errorMsg"> Please enter a name</span>
        <br>
        <span>Target Subject: </span>
        <select v-model="subjectSelect">
            <option disabled selected value>--</option>
            <option value="English">English</option>
            <option value="Math">Math</option>
            <option value="History">History</option>
        </select>
        <br>
        <span>Score: </span>
        <input type="number" max="100" min="0" v-model="scoreField">
        <span v-if="scoreField > 100 || typeof scoreField === 'string'" class="errorMsg"> Please enter a valid score</span>
    </div>
    <div class="h-alignment">
        <button class="button" @click="onAddClick">Add</button>
        <div>
            <button class="button" @click="onDoneClick">Done</button>
        </div>
    </div>
    <p v-show="noFileErrorMsg" class="errorMsg">Please upload a file!</p>
</template>


<style lang="scss" scoped>

.errorMsg {
    color: red;
}

.h-alignment {
    display: flex;
}

.button {
    border: none;
    margin: 10px;
}

.button:hover {
    background-color: rgb(92, 92, 92);
    color: white
}
.button:active {
    background-color: rgb(148, 148, 148);
}

</style>
