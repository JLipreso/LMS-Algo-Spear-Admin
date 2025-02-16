<template>
  <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Admin</h5>
        </div>
        <div class="modal-body" style="max-height: calc(100vh - 200px);overflow: auto;">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">First name</label>
                  <input v-model="form.firstname" type="text" class="form-control"/>
                </div>
                <div class="col-6">
                  <label class="form-label">Last name</label>
                  <input v-model="form.lastname" type="text" class="form-control"/>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Email</label>
                  <input v-model="form.email" type="text" class="form-control"/>
                </div>
                <div class="col-6">
                  <label class="form-label">Status</label>
                  <select v-model="form.active" class="form-control">
                    <option :value="1">Active</option>
                    <option :value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control"/>
                </div>
                <div class="col-6">
                  <label class="form-label">Confirm Password</label>
                  <input v-model="form.confirm_password" type="password" class="form-control"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
          <button type="button" class="btn btn-primary" @click="onUpdateAdmin()">Update Admin</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { updateAdmin } from "@/uikit-api";

  export default defineComponent({
    name: "ModalEditAdmin",
    emits: ['refresh', 'closed'],
    props: {
      open: {
        default: false,
        type: Boolean
      },
      info: {
        default: {} as any,
        type: Object
      }
    },
    components: { },
    data() {
      return {
        swiper: {} as any,
        form: {
          admin_refid: '',
          firstname: '', 
          lastname: '', 
          email: '', 
          password: '', 
          confirm_password: '',
          active: 0
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit("closed");
      },
      async onResetForm() {
        this.form.admin_refid       = '';
        this.form.firstname         = '';
        this.form.lastname          = '';
        this.form.email             = '';
        this.form.password          = '';
        this.form.confirm_password  = '';
        this.form.active            = 0;
        return true;
      },
      async onUpdateAdmin() {
        await updateAdmin(this.form).then( async (response) => {
          if(response?.success) {
            this.$toast.success("Updated successfully");
            this.onResetForm();
          }
          else {
            this.$toast.warning(response?.message);
          }
        });
      }
    },
    watch: {
      open: function () {
        if(this.open) {
          this.form.admin_refid       = this.info?.admin_refid; 
          this.form.firstname         = this.info?.firstname; 
          this.form.lastname          = this.info?.lastname; 
          this.form.email             = this.info?.email; 
          this.form.password          = this.info?.password; 
          this.form.confirm_password  = this.info?.password; 
          this.form.active            = this.info?.active; 
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