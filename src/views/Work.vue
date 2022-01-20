<template>
  <IndividualWork :workData="workData" :images="images"/>
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
  workData: ProjectSchema = {} as ProjectSchema;
  images: any = [];

  async created() {
    this.workData = this.getWorkData();
    this.workData.hasImages ? await this.getImages() : false;
  }

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

  async getImages(): Promise<void> {
    const url = `/images/${this.workData!.name}/large`
      .replace(` `, `_`)
      .toLocaleLowerCase();

    return await fetch(url).then(response => {
      response.json().then(body => this.images = body.data);
    });
  }

  getWorkData(): ProjectSchema {
    return this.adapt(WORKS_LIST.filter((w) => w.key === this.work)[0]);
  }
}
</script>
