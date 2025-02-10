<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";

  export default defineComponent({
    components: { SectionMenu, SectionNavbar },
  });
</script>