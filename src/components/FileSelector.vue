<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';


const emit = defineEmits(['update-students', 'send-excel-data']) //update-students is emitted every time the rowToObj function is completed, and triggers the studentList to update
const props = defineProps({
    studentList: {
        type: Object,
        required: true
    },
    changesList: {
        type: Object,
        required: true
    }
});

//const triggerUpdateChangesList = (data) => {
    //emit('update-changes-list', data)
//}

const originalFile = ref();
const hot = ref();
const hotElement = ref();
const fileInput = ref();

//const rowtext = ref("e");
const handleFileUpload = (event) => {

    props.studentList.length = 0
    const file = event.target.files[0];
    originalFile.value = file
    const reader = new FileReader();

    reader.onload = (e) => { //after reading the file... (e = the results of reading)
    const data = new Uint8Array(e.target.result); //changing results into readable form
    const workbook = XLSX.read(data, { type: 'array' }); //part 2 of above
    //emit("send-excel-data", workbook)
    
    console.log(workbook)
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Do something with the workbook, for example, log the sheet names
    //console.log(workbook)
    console.log(sheetName)
    console.log(workbook.Sheets)
    const range = XLSX.utils.decode_range(workbook.Sheets.Table['!ref']); 
    
    for (let x = 1; x <= range.e.r; ++x) {
        rowToObject(workbook.Sheets.Table, x)
    }
    
    //console.log(range.e.c)
    if (hot.value) {
      hot.value.destroy();
    }
    else {
    }

    hot.value = new Handsontable(hotElement.value, {
      data: sheet,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      licenseKey: 'non-commercial-and-evaluation'
    });
    
    
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
    console.log(row)
    

    emit('update-students', row)
    
};

const saveChanges = () => {
      // Check if hot instance exists before accessing its data
      if (hot.value) {
        const editedData = hot.value.getData();
        const ws = XLSX.utils.aoa_to_sheet(editedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Table');
        const updatedFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([updatedFile], { type: originalFile.value.type });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = originalFile.value.name;
        console.log(originalFile.value.name)
        a.click();
        URL.revokeObjectURL(a.href);
      } else {
        alert('No data to save!');
      }
    };



</script>

<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileUpload" />
    </div>
    
    <div ref="hotElement"></div>
    <button ref="saveBtn" @click="saveChanges" v-if="hot">Save Changes</button>

</template>

<style lang="scss" scoped>

</style>