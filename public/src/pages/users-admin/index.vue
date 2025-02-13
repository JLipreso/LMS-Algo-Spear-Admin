<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <ElemPageTitle page_group="People" page_title="Admin" />
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
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { printDevLog, userAdminFetchPaginate, dateTimeToString } from "@/uikit-api";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";

  export default defineComponent({
    components: { ElemProgressbar, ElemPageTitle, SectionMenu, SectionNavbar },
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
      }
    },
    async mounted() {
      await this.onFetchAdmins(1).then( async () => {
        printDevLog("Admins:", toRaw(this.$data));
      });
    },
  });
</script>