<template>
  <span>description: [</span>
  <li v-for="sentence in description" :key="sentence.length">"{{ sentence }}",</li>
  <span>],</span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class WorkDescription extends Vue {
  @Prop() description!: string[];
}
</script>
