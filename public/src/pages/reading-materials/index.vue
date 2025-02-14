<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper" style="height: calc(100vh - 80px); overflow: auto;">
          <div class="container-xxl flex-grow-1 container-p-y">
            <ElemPageTitle page_group="Courses" page_title="Reading Materials" />
            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-3">
                <img class="w-100" src="https://marketplace.canva.com/EADaiOc6T_o/3/0/1600w/canva-green-and-white-simple-blog-post-guide-linkedin-article-cover-image-k4HqWyb5gDA.jpg" />
                <div class="card">
                  <div class="py-4" style="cursor: pointer;">
                    <h1 class="text-center"><i class="bi bi-plus-circle-fill"></i></h1>
                    <p class="text-center">Create Article</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-3" v-for="(article, ai) in 24" :key="ai">
                <div class="card">
                  <img class="w-100" src="https://marketplace.canva.com/EADaiOc6T_o/3/0/1600w/canva-green-and-white-simple-blog-post-guide-linkedin-article-cover-image-k4HqWyb5gDA.jpg" />
                  <div class="card-body">
                    <h5>Article Title here</h5>
                    <p>It is the main/feature story that appears with a picture on the front cover of a newspaper or magazine</p>
                    <div class="d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";

  export default defineComponent({
    components: { ElemPageTitle, SectionMenu, SectionNavbar },
  });
</script>