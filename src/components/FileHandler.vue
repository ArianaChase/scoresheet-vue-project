<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'
import axios from 'axios';

const props = defineProps({
    
})

const store = useStore()

const emit = defineEmits(['send-excel-data']) //update-students is emitted every time the rowToObj function is completed, and triggers the studentList to update

const studentList = store.studentList
const {e, fileUploaded} = storeToRefs(store)
const hot = ref();
const hotElement = ref();
const fileName = ref();


const handleFileUpload = (event) => {
    fileUploaded.value = true
    studentList.length = 0

    const file = event.target.files[0];
    fileName.value = event.target.files[0].name
    console.log(fileName)
    const reader = new FileReader();

    reader.onload = async (e) =>  { //after reading the file... (e = the results of reading) //ensures that the rowToObject function is done running (including sending dadta to php) before going to the second row
    const data = new Uint8Array(e.target.result); //changing results into readable form
    const ogWorkbook = XLSX.read(data, { type: 'array' }); //part 2 of above
    console.log('uploaded workbook: ', ogWorkbook)
    emit('send-excel-data', ogWorkbook);

  
    const range = XLSX.utils.decode_range(ogWorkbook.Sheets.Table['!ref']); 

    for (let x = 1; x <= range.e.r; ++x) {
        await rowToObject(ogWorkbook.Sheets.Table, x)

    }
    

    }
    reader.readAsArrayBuffer(file);

}

const rowToObject = async (sheet, rowIndex)=> {

    const range = XLSX.utils.decode_range(sheet['!ref']);
    const headers = [];
    const row = {};

        // Get column headers
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: range.s.r };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        headers.push(sheet[cellRef].v);
        console.log(sheet[cellRef].v)
    }

        // Get cell values for the row
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: rowIndex };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const header = headers[C];
        row[header] = sheet[cellRef] ? sheet[cellRef].v : undefined;
    }

    console.log(row)
    console.log("this is a loop for: ", row.name)

    try {
        const response = await axios.post('http://localhost/scoresheet-backend/scoresheet_processing.php', {
            action: "process_file", //sent POST request to processing file to update student database
            student_id: rowIndex, //specify the items in $data array
            student_name: row.name,
            student_math: row.Math,
            student_english: row.English,
            student_history: row.History,
            student_amt: range.e.r //how many students are there (last row index)
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
        });

        console.log(response.data)
        console.log("this math score: ", row.Math)


    } catch (error) {
        console.log(error)
}
}
//catch (error) {
   // console.log('error in filehandler', error)
//}

</script>

<template>
    <div class="h-alignment">
        <label class="custom-file-upload">
            <input type="file" ref="fileInput" @change="handleFileUpload"/>
            Import File
        </label>
        <p> {{ fileName }}</p>
    </div>
</template>


<style lang="scss" scoped>

.h-alignment {
    display:flex;
    gap: 10px;
    height: 1em;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: none;
    font-size: 15px;
    background-color: rgb(237, 172, 107);
    padding: 5px;
}

.custom-file-upload:hover {
    background-color: rgb(170, 92, 63);
    color: white
}

.custom-file-upload:active {
    background-color: rgb(212, 156, 116);
}

</style>