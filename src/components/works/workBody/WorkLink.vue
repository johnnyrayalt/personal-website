<template>
  <div>
    <span
      >link: <a :href="generateUrl()" target="_blank" rel="noreferrer">{{ link }}</a
      >,</span
    >
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class WorkLink extends Vue {
  @Prop() link!: string;

  generateUrl(): string {
    return `https://${this.link}/`;
  }
}
</script>
