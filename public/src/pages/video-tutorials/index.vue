<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <ElemPageTitle page_group="Courses" page_title="Video Tutorials" />
            <div class="card">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-header">Video Masterlist</h5>
                <button class="btn btn-primary me-3" @click="onAddVideoLink()">
                  <i class="bi bi-link-45deg me-2"></i>
                  <span>Link Video</span>
                </button>
              </div>
              <ElemProgressbar :loading="loading.table"/>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Topic</th>
                      <th>Title</th>
                      <th>Registered Date</th>
                      <th style="width: 80px;">Edit</th>
                      <th style="width: 80px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><button class="btn btn-primary btn-sm w-100">Edit</button></td>
                      <td><button class="btn btn-danger btn-sm w-100">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalVideoLinkAdd :open="modal.add_video.open" :reset="modal.add_video.reset" @closed="()=>{ modal.add_video.open = false }" />
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ModalVideoLinkAdd from "@/components/ModalVideoLinkAdd.vue";
import { randomNumbers } from '@/uikit-api';

  export default defineComponent({
    components: { ModalVideoLinkAdd, ElemProgressbar, ElemPageTitle, SectionMenu, SectionNavbar },
    data() {
      return {
        loading: {
          table: true
        },
        modal: {
          add_video: {
            open: false,
            reset: 0
          }
        }
      }
    },
    methods: {
      async onAddVideoLink() {
        this.modal.add_video.open     = true;
        this.modal.add_video.reset    = randomNumbers();
      }
    }
  });
</script>