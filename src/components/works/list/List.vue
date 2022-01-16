<template>
  <div class="works-list-container">
    <div class="text">{{ `> ls -al` }}</div>
    <div class="text">{{ `total ${works.length + 2}` }}</div>
    <ul>
      <li>
        <WorksListBoilerPlate />
        <span class="text mobile-works-list">.</span>
      </li>
      <li>
        <WorksListBoilerPlate />
        <span class="text mobile-works-list">..</span>
      </li>
      <li v-for="work in works" :key="work.id">
        <router-link :to="`/works/${work.type}/${work.key}`">
          <WorksListBoilerPlate />
          <span>{{ work.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WorksListBoilerPlate from '@/components/works/list/WorksListBoilerPlate.vue';
import { Schema } from '@/assets/constants';

@Options({
  components: {
    WorksListBoilerPlate,
  },
})
export default class List extends Vue {
  @Prop() works!: Schema[];
}
</script>
