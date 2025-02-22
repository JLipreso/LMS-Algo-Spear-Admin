<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="d-flex justify-content-between align-items-center">
              <ElemPageTitle page_group="People" page_title="Students" />
              <button class="btn btn-primary" @click="()=>{ modal.create.open = true; }">Register</button>
            </div>
            <div class="card">
              <h5 class="card-header">Student Masterlist</h5>
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
                    <tr v-for="(student, si) in students?.data" :key="si">
                      <td>{{ (si + 1) * students?.current_page }}</td>
                      <td>{{ student?.lastname }}</td>
                      <td>{{ student?.firstname }}</td>
                      <td>{{ student?.email }}</td>
                      <td>{{ dateTimeToString(student?.created_at) }}</td>
                      <td>
                        <span v-if="student?.active == 1" class="d-block w-100 badge bg-success">Active</span>
                        <span v-else class="d-block w-100 badge bg-secondary">Inactive</span>
                      </td>
                      <td><button class="btn btn-primary btn-sm" @click="onEditUser(student)">Edit</button></td>
                      <td><button class="btn btn-danger btn-sm" @click="onDeleteUser(student)">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalAddStudent :open="modal.create.open" @closed="()=>{ modal.create.open = false }" @refresh="onFetchStudents(1)" />
    <ModalEditStudent :open="modal.edit.open" :info="modal.edit.info" @closed="()=>{ modal.edit.open = false }" @refresh="onFetchStudents(1)"/>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { deleteStudent, printDevLog, userStudentFetchPaginate, dateTimeToString, SystemMessage } from "@/uikit-api";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ModalAddStudent from './components/ModalAdd.vue';
  import ModalEditStudent from './components/ModalEdit.vue';
  import Swal from 'sweetalert2';

  export default defineComponent({
    components: { ModalEditStudent, ModalAddStudent, ElemProgressbar, ElemPageTitle, SectionMenu, SectionNavbar },
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
        students: {} as any
      }
    },
    methods: {
      async onFetchStudents(page: number) {
        this.loading.table = true;
        await userStudentFetchPaginate({ page: page }).then( async (students) => {
          this.loading.table  = false;
          this.students       = students;
        });
      },
      async onDeleteUser(user: any) {
        printDevLog("Delete User:", toRaw(user));
        Swal.fire({
          title: "COnfirmation",
          text: "Delete " + user?.firstname + " " + user?.lastname + "?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Delete"
        }).then( async (result) => {
          if(result.isConfirmed) {
            this.loading.table = true;
            await deleteStudent({ user_refid: user?.user_refid }).then( async (response) => {
              this.loading.table = false;
              if(response?.success) {
                await this.onFetchStudents(1).then( async () => {
                  this.$toast.success(SystemMessage()['DELETE_SUCCESS']);
                });
              }
              else {
                this.$toast.warning(response?.message);
              }
            });
          }
        });
      },
      async onEditUser(user: any) {
        this.modal.edit.open = true;
        this.modal.edit.info = user;
      }
    },
    async mounted() {
      await this.onFetchStudents(1).then( async () => {
        printDevLog("Students:", toRaw(this.$data));
      });
    },
  });
</script>