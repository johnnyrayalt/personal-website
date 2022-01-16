<template>
  <Header />
  <Navigation />
  <router-view></router-view>
</template>

<style lang="scss"></style>
<script>
import Navigation from '@/components/mastHeader/Navigation';
import Header from '@/components/mastHeader/Header';

export default {
  components: { Navigation, Header },
};
</script>