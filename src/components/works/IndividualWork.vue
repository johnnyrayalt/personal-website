<template>
  <div class="individual-work-container">
    <WorkInfo :details="{ name: workData.name, year: workData.year }" />
    <WorkDescription :description="workData.description" />
    <WorkLink v-if="workData.link !== 'none'" :link="workData.link" />
    <ImageScroll v-if="workData.hasImages" :images="images" :alt-text="workData.altText" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WorkInfo from '@/components/works/workBody/WorkInfo.vue';
import WorkDescription from '@/components/works/workBody/WorkDescription.vue';
import WorkLink from '@/components/works/workBody/WorkLink.vue';
import ImageScroll from '@/components/works/ImageScroll.vue';
import { ProjectSchema } from '@/assets/constants';

@Options({
  components: {
    WorkInfo,
    WorkDescription,
    WorkLink,
    ImageScroll,
  },
})
export default class IndividualWork extends Vue {
  @Prop() workData!: ProjectSchema;
  @Prop() images!: [];
}
</script>