<template>
  <div>images: {</div>
  <ul>
    <li v-for="image in images" :key="image + uuid()">
      <img :src='image' alt=''>
    </li>
  </ul>
  <span>}</span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { v4 as uuid } from 'uuid';

export default class ImageScroll extends Vue {
  @Prop() images!: any;
  @Prop() altText!: string;

  uuid() {
    return uuid();
  }

  setAltText(): string {
    return this.altText !== 'none' ? this.altText : '';
  }
}
</script>
