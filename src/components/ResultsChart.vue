<script setup>
import { ref, computed, onMounted } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';
import { useStore } from '@/stores/store.js';
import { storeToRefs } from 'pinia'

const store = useStore()
const {workbook} = storeToRefs(store)
//console.log(workbook)
const sheetName = workbook.value.SheetNames[0];
const sheet = XLSX.utils.sheet_to_json(workbook.value.Sheets[sheetName], {header: 1});
const hot = ref();
const hotElement = ref();

console.log(sheet)
if (hot.value) {
      hot.value.destroy();
    }
    else {
    }

onMounted(() => {hot.value = new Handsontable(hotElement.value, {
    data: sheet,
    rowHeaders: true,
    colHeaders: sheet.shift(),
    contextMenu: true,
    licenseKey: 'non-commercial-and-evaluation'
});})


</script>

<template>
    <div>
        <div ref="hotElement"></div>
    </div>
</template>

<style lang="scss" scoped>

</style>