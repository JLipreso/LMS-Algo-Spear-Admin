<template>
  <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Video Link</h5>
        </div>
        <div class="modal-body" style="max-height: calc(100vh - 200px);overflow: auto;">
          <div class="row">
            <div class="col-5">
              <div class="card">
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Youtube Video Link</label>
                    <div class="input-group input-group-merge">
                      <span class="input-group-text"><i class="bx bx-link"></i></span>
                      <input v-model="form.video_link" type="text" class="form-control"/>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Video Title</label>
                    <input v-model="form.title" type="text" class="form-control"/>
                  </div>
                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label">Video Code</label>
                      <input v-model="form.video_code" type="text" class="form-control"/>
                    </div>
                    <div class="col-6">
                      <label class="form-label">Video Group</label>
                      <select v-model="form.video_group_refid" class="form-control">
                        <option value="0">Select Group</option>
                        <option v-for="(group, gi) in video_groups" :key="gi" :value="group?.video_group_refid">{{ group?.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea v-model="form.description" class="form-control" rows="9"></textarea>
                  </div>
                  <div class="d-flex justify-content-end mt-4">
                    <button class="btn btn-primary w-50" @click="onUpdateVideo()">Update</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="card">
                <iframe class="w-100" height="380" :src="`https://www.youtube.com/embed/${ form.video_code }`" title="This African Man’s A.I Prosthetics Shocked U.S Engineers - BYE BYE DISABILITIES!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div class="card-body">
                  <h4 class="text-dark">{{ form?.title ? form?.title : 'Video full title here' }}</h4>
                  <p>{{ form?.description ? form?.description : 'Video full description here' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { fetchAllVideoGroup, printDevLog, updateVideoTutorial, lsGetUser, SystemMessage } from "@/uikit-api";

  export default defineComponent({
    name: "ModalVideoLinkAdd",
    emits: ['refresh', 'closed'],
    props: {
      open: {
        default: false,
        type: Boolean
      },
      video: {
        default: {},
        type: Object
      }
    },
    data() {
      return {
        video_groups: [] as any,
        form: {}
      }
    },
    methods: {
      closeModal() {
        this.$emit("closed");
      },
      async onFetchVideoGroup() {
        await fetchAllVideoGroup().then( async (video_groups) => {
          this.video_groups = video_groups;
        }); 
      },
      async onUpdateVideo() {
        await updateVideoTutorial(this.form).then( async (response) => {
          if(response?.success) {
            this.$toast.success('Updated successfully');
            this.form = {};
            setTimeout(() => {
              this.$emit('closed');
            }, 1200);
          }
          else {
            this.$toast.warning(response?.message);
          }
        });
      }
    },
    watch: {
      open: async function () {
        if(this.open) {
          const user = await lsGetUser() as any;
          if(user) {
            this.form               = this.video;
            this.form.created_by    = user?.user_refid;
            await this.onFetchVideoGroup().then( async () => {
              printDevLog("Edit Video Data:", toRaw(this.$data));
            });
          }
          else {
            this.$toast.warning(SystemMessage()['NO_ACTIVE_USER']);
            localStorage.clear();
            this.$router.replace('/');
          } 
        }
      }
    }
  });

</script>
<style scoped>
  .display {
    display: block;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>