<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'

const store = useStore()

const emit = defineEmits(['send-excel-data']) //update-students is emitted every time the rowToObj function is completed, and triggers the studentList to update

const studentList = store.studentList
const {e, fileUploaded} = storeToRefs(store)
const hot = ref();
const hotElement = ref();


const handleFileUpload = (event) => {
    fileUploaded.value = true
    studentList.length = 0

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => { //after reading the file... (e = the results of reading)
    const data = new Uint8Array(e.target.result); //changing results into readable form
    const ogWorkbook = XLSX.read(data, { type: 'array' }); //part 2 of above
    console.log(ogWorkbook)
    emit('send-excel-data', ogWorkbook);

    //console.log(ogWorkbook)
    const range = XLSX.utils.decode_range(ogWorkbook.Sheets.Table['!ref']); 

    for (let x = 1; x <= range.e.r; ++x) {
        rowToObject(ogWorkbook.Sheets.Table, x)

    }
    

    }
    reader.readAsArrayBuffer(file);

}

const rowToObject = (sheet, rowIndex)=> {
    try {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const headers = [];
    const row = {};

        // Get column headers
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: range.s.r };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        headers.push(sheet[cellRef].v);
        //console.log(cellAddress)
    }

        // Get cell values for the row
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: rowIndex };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const header = headers[C];
        row[header] = sheet[cellRef] ? sheet[cellRef].v : undefined;
    }
    //console.log(row)
    store.updateStudents(row)
} catch (error) {
    console.log('error in filehandler')
}
};
</script>

<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileUpload" />
    </div>
    <div ref="hotElement"></div>

</template>


<style lang="scss" scoped>

</style>