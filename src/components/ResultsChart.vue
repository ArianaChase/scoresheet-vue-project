<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';


const hot = ref();
const hotElement = ref();


</script>

<template>
    <div>
        <div ref="hotElement"></div>
    </div>
</template>
<style lang="scss" scoped>

</style>