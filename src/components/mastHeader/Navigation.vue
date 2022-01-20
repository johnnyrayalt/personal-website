<template>
  <nav>
    <ul>
      <li>
        <button @click="toggleExpanded">works()</button>
        <ul v-show="defaultExpanded.works">
          <li>
            <router-link :to="'/works/art'" @click="collapseAll">.art();</router-link>
          </li>
          <li>
            <router-link :to="'/works/professional'" @click="collapseAll">.professional();</router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/about">about();</router-link>
      </li>
      <li>
        <button @click="toggleExpanded">contact()</button>
        <ul v-show="defaultExpanded.contact">
          <li>
            <a href="https://www.linkedin.com/in/johnnyrayalt/" target="_blank" rel="noreferrer">.linkedIn();</a>
          </li>
          <li>
            <a href="mailto:johnnyrayalt@gmail.com" target="_blank" rel="noreferrer">.email();</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="https://github.com/johnnyrayalt" target="_blank" rel="noreferrer">github();</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

export default class Navigation extends Vue {
  defaultExpanded: { [name: string]: boolean } = {
    works: false,
    contact: false,
    main: false,
  };

  @Watch('defaultExpanded')
  toggleExpanded(e: any): void {
    const expand = e.target.innerText;

    Object.keys(this.defaultExpanded).forEach((key) => {
      expand.includes(key)
        ? (this.defaultExpanded[key] = !this.defaultExpanded[key])
        : (this.defaultExpanded[key] = false);
    });
  }

  @Watch('defaultExpanded')
  collapseAll(): void {
    Object.keys(this.defaultExpanded).forEach((key) => (this.defaultExpanded[key] = false));
  }
}
</script>