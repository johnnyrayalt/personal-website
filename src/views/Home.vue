<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navigation from '@/components/mastHeader/Navigation.vue';

@Options({
  components: {
    Navigation,
  },
})
export default class Home extends Vue {}
</script>
