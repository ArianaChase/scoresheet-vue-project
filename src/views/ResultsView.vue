<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { defineEmits, defineProps } from 'vue';
import Handsontable from 'handsontable';
import ResultsChart from '@/components/ResultsChart.vue';






</script>

<template>
  <div>
    <h1>Results</h1>
    <ResultsChart />
  </div>
  
</template>



<style lang="scss" scoped>

</style>