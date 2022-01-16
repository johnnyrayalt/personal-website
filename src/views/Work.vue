<template>
  <IndividualWork :workData="getWorkData()" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IndividualWork from '@/components/works/IndividualWork.vue';
import { Prop } from 'vue-property-decorator';
import { ProjectSchema, Schema, WORKS_LIST } from '@/assets/constants';

@Options({
  components: {
    IndividualWork,
  },
})
export default class Work extends Vue {
  @Prop() work!: string;

  adapt(work: Schema): ProjectSchema {
    return {
      name: work.name,
      year: work.year,
      description: work.description,
      link: work.link ? work.link : 'none',
      hasImages: work.hasImages,
      altText: work.altText ? work.altText : 'none',
    };
  }

  getWorkData(): ProjectSchema {
    return this.adapt(WORKS_LIST.filter((w) => w.key === this.work)[0]);
  }
}
</script>
