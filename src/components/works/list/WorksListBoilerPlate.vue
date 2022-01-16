<template>
  <span class="text mobile-works-list">-rw-r--r--</span>
  <span class="text mobile-works-list">1</span>
  <span class="text mobile-works-list">johnny</span>
  <span class="text mobile-works-list">staff</span>
  <span class="text mobile-works-list">{{ months[new Date().getMonth()] }}</span>
  <span class="text mobile-works-list">{{ new Date().getDate() }}</span>
  <span class="text mobile-works-list">{{ new Date().getHours() }}:{{ new Date().getMinutes() }}</span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { MONTHS } from '@/assets/constants';

export default class WorksListBoilerPlate extends Vue {
  months: string[] = MONTHS;
}
</script>
