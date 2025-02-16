<template>
    <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Admin</h5>
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
                  <div class="col-12">
                    <label class="form-label">Email</label>
                    <input v-model="form.email" type="text" class="form-control"/>
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
            <button type="button" class="btn btn-primary" @click="onCreateAdmin()">Create Admin</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  
    import { defineComponent } from 'vue';
    import { createAdmin, lsGetUser } from "@/uikit-api";
  
    export default defineComponent({
      name: "ModalAddAdmin",
      emits: ['refresh', 'closed'],
      props: {
        open: {
          default: false,
          type: Boolean
        }
      },
      components: { },
      data() {
        return {
          swiper: {} as any,
          form: {
            firstname: '', 
            lastname: '', 
            email: '', 
            password: '', 
            confirm_password: '',
            created_by: '', 
            active: 0
          }
        }
      },
      methods: {
        closeModal() {
          this.$emit("closed");
        },
        async onResetForm() {
          this.form.firstname         = '';
          this.form.lastname          = '';
          this.form.email             = '';
          this.form.password          = '';
          this.form.confirm_password  = '';
          this.form.created_by        = '';
          this.form.active            = 0;
          return true;
        },
        async onCreateAdmin() {
          var user = await lsGetUser() as any;
          if(user?.user_refid) {
            this.form.created_by = user?.user_refid;
            await createAdmin(this.form).then( async (response) => {
              if(response?.success) {
                this.$toast.success("Admin registered successfully");
                await this.onResetForm().then( async () => {
                  this.$emit('refresh');
                });
              }
              else {
                this.$toast.warning(response?.message);
              }
            });
          }
          else {
            this.$toast.warning("No active user found");
            this.$router.replace("/");
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