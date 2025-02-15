<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl h-100">
            <ElemPageTitle page_group="Courses" page_title="Create Reading Materials" />
            <div class="row">
              <div class="col-8 p-0 m-0 h-100">
                <div class="card">
                  <div class="card-body">
                    <div class="mb-3">
                      <label class="form-label">Article Title</label>
                      <input type="email" class="form-control"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <input type="email" class="form-control"/>
                    </div>
                    <div class="mb-3">
                      <div class="d-flex justify-content-between">
                        <label class="form-label">Content</label>
                        <Toolbar :editor_id="id" />
                      </div>
                      <div :id="id" class="form-control" :contenteditable="true" style="height: 400px;"></div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                1
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
  import Toolbar from "@/uikit-api/article-editor/component/Toolbar.vue";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";

  export default defineComponent({
    components: { Toolbar, ElemPageTitle, SectionMenu, SectionNavbar },
    data() {
      return {
        id: "article-editor-xghstrfd",
        input: ""
      }
    },
    methods: {
      
    }
  });
</script>