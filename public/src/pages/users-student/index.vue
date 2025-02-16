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
                      <td><button class="btn btn-primary btn-sm">Edit</button></td>
                      <td><button class="btn btn-danger btn-sm">Delete</button></td>
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
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { printDevLog, userStudentFetchPaginate, dateTimeToString } from "@/uikit-api";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ModalAddStudent from './components/ModalAdd.vue';

  export default defineComponent({
    components: { ModalAddStudent, ElemProgressbar, ElemPageTitle, SectionMenu, SectionNavbar },
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
      }
    },
    async mounted() {
      await this.onFetchStudents(1).then( async () => {
        printDevLog("Students:", toRaw(this.$data));
      });
    },
  });
</script>