<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['update-students'])
const props = defineProps({
    studentList: {
        type: Object,
        required: true
    }
});

const handleFileUpload = (event) => {

    props.studentList.length = 0

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

        // Do something with the workbook, for example, log the sheet names
    //console.log(workbook)
    const range = XLSX.utils.decode_range(workbook.Sheets.Table['!ref']);
    
    for (let x = 1; x <= range.e.r; ++x) {
        rowToObject(workbook.Sheets.Table, x)
    }

    //console.log(range.e.c)

    };
    reader.readAsArrayBuffer(file);
};

const rowToObject = (sheet, rowIndex)=> {
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

    emit('update-students', row)
    
};

</script>

<template>
    <div>
        <input type="file" @change="handleFileUpload" />
    </div>
</template>

<style lang="scss" scoped>

</style>