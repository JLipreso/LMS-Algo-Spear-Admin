<template>
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">{{ page_group }} /</span> {{ page_title }}</h4>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "ElemPageTitle",
    props: {
      page_group: {
        default: 'Page Group',
        type: String
      },
      page_title: {
        default: 'Page Name',
        type: String
      }
    }
  });
</script>