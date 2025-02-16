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
                <table class="table table-striped text-dark">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Reference ID</th>
                      <th>Title</th>
                      <th>Registered Date</th>
                      <th style="width: 80px;">Edit</th>
                      <th style="width: 80px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-for="(video, vi) in video_tutorials?.data" :key="vi">
                      <td>{{ (vi + 1) * video_tutorials?.current_page }}</td>
                      <td>{{ video?.video_refid }}</td>
                      <td class="text-wrap">{{ video?.title }}</td>
                      <td>{{ dateTimeToString(video?.created_at) }}</td>
                      <td><button class="btn btn-primary btn-sm w-100" @click="onEditVideo(video)">Edit</button></td>
                      <td><button class="btn btn-danger btn-sm w-100" @click="onDeleteVideo(video)" >Delete</button></td>
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
    <ModalVideoLinkEdit :open="modal.edit_video.open" :video="modal.edit_video.video" @closed="()=>{ modal.edit_video.open = false }" />
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { videoTutorialDelete, randomNumbers, videoTutorialFetchPaginate, printDevLog, dateTimeToString } from '@/uikit-api';
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ModalVideoLinkAdd from "@/components/ModalVideoLinkAdd.vue";
  import ModalVideoLinkEdit from "@/components/ModalVideoLinkEdit.vue";
import Swal from 'sweetalert2';
  
  export default defineComponent({
    components: { ModalVideoLinkEdit, ModalVideoLinkAdd, ElemProgressbar, ElemPageTitle, SectionMenu, SectionNavbar },
    setup() {
      return {
        dateTimeToString
      }
    },
    data() {
      return {
        loading: {
          table: false
        },
        modal: {
          add_video: {
            open: false,
            reset: 0
          },
          edit_video: {
            open: false,
            video: {}
          }
        },
        video_tutorials: {} as any
      }
    },
    methods: {
      async onAddVideoLink() {
        this.modal.add_video.open     = true;
        this.modal.add_video.reset    = randomNumbers();
      },
      async onFetchVideoTutorials(page: number) {
        this.loading.table      = true;
        await videoTutorialFetchPaginate({ page: page}).then( async (video_tutorials) => {
          this.loading.table    = false;
          this.video_tutorials  = video_tutorials;
        });
      },
      onEditVideo(video: any) {
        this.modal.edit_video.open  = true;
        this.modal.edit_video.video = video; 
      },
      onDeleteVideo(video: any) {
        Swal.fire({
          title: "Confirmation",
          text: "Delete " + video?.title + "?",
          showCancelButton: true,
          confirmButtonText: "Delete",
          icon: "question",
        }).then( async (result) => {
          if(result.isConfirmed) {
            await videoTutorialDelete(video?.video_refid).then( async (response) => {
              if(response?.success) {
                await this.onFetchVideoTutorials(1);
              }
              else {
                this.$toast.warning(response?.message);
              }
            });
          }
        });
      }
    },
    async mounted() {
      await this.onFetchVideoTutorials(1).then( async () => {
        printDevLog("Video Tutorial:", toRaw(this.$data));
      });
    }
  });
</script>