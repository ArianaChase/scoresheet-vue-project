<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';

const emit = defineEmits(['trigger-update-students', 'send-excel-data']) //update-students is emitted every time the rowToObj function is completed, and triggers the studentList to update
const props = defineProps({
    studentList: {
        type: Object,
        required: true
    }
});

const hot = ref();
const hotElement = ref();

const handleFileUpload = (event) => {
    props.studentList.length = 0

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => { //after reading the file... (e = the results of reading)
    const data = new Uint8Array(e.target.result); //changing results into readable form
    const workbook = XLSX.read(data, { type: 'array' }); //part 2 of above
    emit('send-excel-data', workbook);

    //console.log(workbook)
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
    const range = XLSX.utils.decode_range(workbook.Sheets.Table['!ref']); 

    for (let x = 1; x <= range.e.r; ++x) {
        rowToObject(workbook.Sheets.Table, x)

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
    emit('trigger-update-students', row)
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