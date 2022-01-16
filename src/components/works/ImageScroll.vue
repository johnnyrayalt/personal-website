<template>
  <div>images: {</div>
  <ul>
    <li v-for="image in images" :key="image.id">
      <img :src="image.url" :alt="setAltText()" />
    </li>
  </ul>
  <span>}</span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class ImageScroll extends Vue {
  @Prop() images!: { id: number; url: string }[];
  @Prop() altText!: string;

  setAltText(): string {
    return this.altText !== 'none' ? this.altText : '';
  }
}
</script>
