<template>
  <List :works="getWorksList()" />
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import List from '@/components/works/list/List.vue';
import { Schema, WORKS_LIST } from '@/assets/constants';

@Options({
  components: {
    List,
  },
})
export default class WorksList extends Vue {
  @Prop() worksRoot!: string;

  getWorksList(): Schema[] {
    return WORKS_LIST.filter((work) => work.type === this.worksRoot);
  }
}
</script>
