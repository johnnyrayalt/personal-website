<template>
  <li v-for="(detail, key) in details" :key="key">{{ key }}: {{ detail }}</li>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class WorkInfo extends Vue {
  @Prop() details!: { name: string; year: string };
}
</script>
