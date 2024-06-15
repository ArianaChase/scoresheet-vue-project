
<script setup>
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import FileHandler from './FileHandler.vue';
import router from '@/router';
import { useRouter, useRoute } from 'vue-router'; 

const route = useRoute()

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
    studentList: {
        type: Object,
        required: true
    },
    changesList: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['update-changes-list', 'update-students', 'push-changes-to-studentList', 'go-to-results-page'])
const studentName = ref();
const subjectSelect = ref();
const scoreField = ref();
const workbook = ref();
const hot = ref();
const hotElement = ref();
const sheet = ref();

const change = reactive({
    name: studentName,
    subject: subjectSelect,
    score: scoreField
}) 

const sendExcelData = (data) => {
    workbook.value = data
    const sheetName = workbook.value.SheetNames[0]
    sheet.value = XLSX.utils.sheet_to_json(workbook.value.Sheets[sheetName], { header: 1 });
}

const onAddClick = () => {
    emits('update-changes-list', change)
}    

const onDoneClick = () => {
    try {
    updateExcel(),
    console.log('Emitting event'); // Add this line
    emits('push-changes-to-studentList', 'go-to-results-page')
    router.push({ name: 'results'})
    } catch (error) {
        console.log('error PUSHCHANGES in initial form', error)
    }
}

const updateExcel = () => {
    //console.log(sheet.value)
    const changesList = props.changesList
    for (let x = 0; x < changesList.length; x++) {
        console.log(changesList[x].name)
        const exists = props.studentList.some(obj => obj.name === changesList[x].name);
    
        if (exists == false) {
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
            sheet.value.push(rowData.value)
        } else {
            const dupeArray = sheet.value.findIndex(arr => arr.includes(changesList[x].name)); //iterates over the array and finds the array that includes 'henry'
        
            if (changesList[x].subject == "English") {
                sheet.value[dupeArray][1] = changesList[x].score
            } else if (changesList[x].subject == "Math") {
                sheet.value[dupeArray][1] = changesList[x].score
            } else if (changesList[x].subject == "History") {
                sheet.value[dupeArray][1] = changesList[x].score
            }
        }

    }
}

const triggerUpdateStudents = (data) => {
    try { 
        //console.log(data)
        emits('update-students', data)
    } catch (error) {
        console.log('error in initial form')
    }
}



//const triggerUpdateStudents3 = () => {
   // for (let C = 0; C <= rows.value.length; ++C) {
     //  emit('update-students', rows.value[C])
   /// }
//}



</script>

<template>
    <div>
        <FileHandler @send-excel-data="sendExcelData" @trigger-update-students="triggerUpdateStudents" :studentList="props.studentList" />
    </div>
    <div ref="hotElement"></div>
    <div>
        <h1>Add/Edit Students' grades</h1>
            <span>Student Name: </span>
        <input type="text" v-model="studentName">
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
        <span v-if="scoreField > 100" class="errorMsg"> Please enter a valid score</span>
    </div>
    <div class="h-alignment">
        <button class="button" @click="onAddClick">Add</button>
        <div>
            <button class="button" @click="onDoneClick">Done</button>
        </div>
    </div>
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
