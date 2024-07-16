
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
const changesList = store.changesList
//const sheet = ref();
const studentList = store.studentList
const sheetName = ref();
const noFileErrorMsg = ref(false)
const { fileUploaded } = storeToRefs(store)


const change = reactive({
    //id: changesList.length,
    name: studentName,
    subject: subjectSelect,
    score: scoreField
}) 

const sendExcelData = (data) => {
    workbook.value = data
    sheetName.value = workbook.value.SheetNames[0]
    //sheet.value = XLSX.utils.sheet_to_json(workbook.value.Sheets[sheetName], { header: 1 });
    store.$patch({
        workbook: workbook
    })
}

const onAddClick = () => {
    console.log('file uploaded: ', fileUploaded.value)
    store.updateChangesList(change)
    noFileErrorMsg.value = false
    console.log(changesList)
}    

const onDoneClick = () => {
    try {
        if (fileUploaded.value == true) {
        updateExcel(),
        store.pushChangesToStudentList()
        router.push({ name: 'results'})
        noFileErrorMsg.value = false
        console.log('error appear (onDoneClick): ', noFileErrorMsg.value)
        } else {
        makeNewExcel(),
        store.pushChangesToStudentList()
        router.push({ name: 'results'})
        }
    
    } catch (error) {
        console.log('error PUSHCHANGES in initial form', error)
    }
}

const makeNewExcel = () => {
    console.log('makeNewExcel good')
    const newSheet = ref([])
    const newWorkbook = XLSX.utils.book_new();

    const changesList = store.changesList

    for (let x = 0; x < changesList.length; x++) {
        const exists = newSheet.value.some(obj => obj.name === changesList[x].name);

        if (exists == false) {

            const rowData = ref({name: '', English: null, Math:null, History:null})
            rowData.value.name = changesList[x].name

            if (changesList[x].subject == "English") {
                rowData.value.English = changesList[x].score

            } else if (changesList[x].subject == "Math") {
                rowData.value.Math = changesList[x].score

            } else if (changesList[x].subject == "History") {
                rowData.value.History = changesList[x].score
            }
            newSheet.value.push(rowData.value)
            console.log('rowData value: ', rowData.value)
    } else {
            const dupeArray = newSheet.value.findIndex(arr => arr.name == changesList[x].name); //iterates over the array and finds the array that includes 'henry'
            if (changesList[x].subject == "English") {
                newSheet.value[dupeArray].English = changesList[x].score
            } else if (changesList[x].subject == "History") {
                newSheet.value[dupeArray].History = changesList[x].score
            } else if (changesList[x].subject == "Math") {
                newSheet.value[dupeArray].Math = changesList[x].score
            }
    }}
    console.log(newSheet.value)
    XLSX.utils.book_append_sheet(newWorkbook, XLSX.utils.json_to_sheet(newSheet.value, 'Table'))

    store.$patch({
        workbook: newWorkbook
    })
    fileUploaded.value = true    
    console.log(workbook.value)
    

}

const updateExcel = () => {
    console.log('updated Excel')
    const changesList = store.changesList
    const sheetName = workbook.value.SheetNames[0]
    const sheet = XLSX.utils.sheet_to_json(workbook.value.Sheets[sheetName]);
    console.log(sheet)
    for (let x = 0; x < changesList.length; x++) {
        const exists = sheet.some(obj => obj.name === changesList[x].name);
    
        if (exists == false) {
            const rowData = ref([])
            rowData.value.name = changesList[x].name
    
            if (changesList[x].subject == "English") {
                rowData.value.English = changesList[x].score

            } else if (changesList[x].subject == "Math") {
                rowData.value.Math = changesList[x].score

            } else if (changesList[x].subject == "History") {
                rowData.value.History = changesList[x].score
            }
            sheet.push(rowData.value)
            console.log('rowData value: ', rowData.value)
    } else {
            console.log(sheet)
            const dupeArray = sheet.findIndex(arr => arr.name == changesList[x].name); //iterates over the array and finds the array that includes 'henry'
            if (changesList[x].subject == "English") {
                sheet[dupeArray].English = changesList[x].score
            } else if (changesList[x].subject == "History") {
                sheet[dupeArray].History = changesList[x].score
            } else if (changesList[x].subject == "Math") {
                sheet[dupeArray].Math = changesList[x].score
            }
    }
    console.log(sheet)

    } 
    workbook.value.Sheets[sheetName] = XLSX.utils.json_to_sheet(sheet);
    //console.log(workbook.value)
    store.$patch({
        workbook: workbook
    })
}

</script>

<template>
    <div class="form">
        <h1>Add/Edit Students' grades</h1>
        <br>
        <div class="form-options">
            <div>
                <FileHandler @send-excel-data="sendExcelData" />
            </div>
            <div style="height: 30px"></div>
            <div>
                <span><b>Student Name: </b></span>
                <input type="text" v-model="studentName">
                <span v-if="studentName == ''" class="errorMsg"> Please enter a name</span>
            </div>
            <br>
            <div>
                <span><b>Target Subject: </b></span>
                <select v-model="subjectSelect">
                    <option disabled selected value>--</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Math">Math</option>
                </select>
            </div>
            <br>
            <div>
                <span><b>Score: </b></span>
                <input type="number" max="100" min="0" v-model="scoreField">
                <span v-if="scoreField > 100 || typeof scoreField === 'string'" class="errorMsg"> Please enter a valid score</span>
            </div>
        </div>
        
    </div>
    <br>
    <div class="h-alignment">
        <button class="button" @click="onAddClick">Add</button>
        <div>
            <button class="button" @click="onDoneClick">Done</button>
        </div>
    </div>
    <p v-show="noFileErrorMsg" class="errorMsg">Please upload a file!</p>
</template>


<style lang="scss" scoped>


.h-alignment {
    display: flex;
}

.form-options {
    gap: 20px;
}
.form {
    display: flex;
    flex-direction: column;
}

</style>
