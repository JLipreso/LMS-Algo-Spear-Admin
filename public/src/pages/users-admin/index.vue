<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="d-flex justify-content-between align-items-center">
              <ElemPageTitle page_group="People" page_title="Admin" />
              <button class="btn btn-primary" @click="onAddNewAdmin()" >New Admin</button>
            </div>
            <div class="card">
              <h5 class="card-header">Admin Masterlist</h5>
              <ElemProgressbar :loading="loading.table"/>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Surname</th>
                      <th>Given name</th>
                      <th>Email</th>
                      <th>Registered Date</th>
                      <th style="width: 80px;">Active</th>
                      <th style="width: 80px;">Edit</th>
                      <th style="width: 80px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-for="(admin, si) in admins?.data" :key="si">
                      <td>{{ (si + 1) * admins?.current_page }}</td>
                      <td>{{ admin?.lastname }}</td>
                      <td>{{ admin?.firstname }}</td>
                      <td>{{ admin?.email }}</td>
                      <td>{{ dateTimeToString(admin?.created_at) }}</td>
                      <td>
                        <span v-if="admin?.active == 1" class="d-block w-100 badge bg-success">Active</span>
                        <span v-else class="d-block w-100 badge bg-secondary">Inactive</span>
                      </td>
                      <td><button class="btn btn-primary btn-sm" @click="onEditAdmin(admin)">Edit</button></td>
                      <td><button class="btn btn-danger btn-sm" @click="onDeleteAdmin(admin)">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalAddAdmin :open="modal.create.open" @closed="()=>{ modal.create.open = false }" @refresh="onFetchAdmins(1)" />
    <ModalEditAdmin :open="modal.edit.open" :info="modal.edit.info" @closed="()=>{ modal.edit.open = false }" @refresh="onFetchAdmins(1)"/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { printDevLog, userAdminFetchPaginate, dateTimeToString, deleteAdmin } from "@/uikit-api";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ModalAddAdmin from "./components/ModalAdd.vue";
  import ModalEditAdmin from './components/ModalEdit.vue';
  import Swal from 'sweetalert2';

  export default defineComponent({
    components: { ModalEditAdmin, ModalAddAdmin, ElemProgressbar, ElemPageTitle, SectionMenu, SectionNavbar },
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
          create: {
            open: false
          },
          edit: {
            open: false,
            info: {} as any
          }
        },
        admins: {} as any
      }
    },
    methods: {
      async onFetchAdmins(page: number) {
        this.loading.table    = true;
        await userAdminFetchPaginate({ page: page }).then( async (admins) => {
          this.loading.table  = false;
          this.admins         = admins;
        });
      },
      async onAddNewAdmin() {
        this.modal.create.open = true;
      },
      async onEditAdmin(admin: any) {
        this.modal.edit.open = true;
        this.modal.edit.info = admin;
      },
      async onDeleteAdmin(admin: any) {
        printDevLog("Delete User:", toRaw(admin));
        Swal.fire({
          title: "Confirmation",
          text: "Delete " + admin?.firstname + " " + admin?.lastname + " ?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Delete"
        }).then( async (result) => {
          if(result?.isConfirmed) {
            await deleteAdmin({ admin_refid: admin?.user_refid }).then( async (response) => {
              if(response?.success) {
                this.$toast.success("Admin deleted successfully");
                this.onFetchAdmins(1);
              }
              else {
                this.$toast.warning("Fail to delete admin, try again later.");
              }
            });
          }
        });
      }
    },
    async mounted() {
      await this.onFetchAdmins(1).then( async () => {
        printDevLog("Admins:", toRaw(this.$data));
      });
    },
  });
</script>