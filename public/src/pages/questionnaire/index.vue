<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="d-flex justify-content-between align-items-center">
              <ElemPageTitle page_group="Assessment" page_title="Questionnaire" />
              <button class="btn btn-primary" @click="() => { modal.create.open = true }">Create</button>
            </div>
            <div class="card">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-header">Questionnaires</h5>
                <div class="px-2">
                  <select class="form-control" style="width: 160px;" @change="onChangePage">
                    <option value="0">Select Page</option>
                    <option v-for="(page, pi) in questionnaire?.page_links" :key="pi" :value="page?.page_no">{{ page?.page_label }}</option>
                  </select>
                </div>
              </div>
              <ElemProgressbar :loading="loading.table"/>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Question</th>
                      <th>Answer Type</th>
                      <th style="width: 90px;">Edit</th>
                      <th style="width: 90px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(question, qi) in questionnaire?.data" :key="qi">
                      <td>{{ (qi + 1) * questionnaire?.current_page }}</td>
                      <td class="text-wrap">{{ question?.question }}</td>
                      <td>{{ question?.is_choices == 0 ? 'Input':'Choices' }}</td>
                      <td><button class="btn btn-primary btn-sm w-100" @click="onEditRequest(question)" >Edit</button></td>
                      <td><button class="btn btn-danger btn-sm w-100" @click="onDeleteRequest(question)" >Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalCreateQuestionnaire :open="modal.create.open" @closed="() => { modal.create.open = false }" />
    <ModalEditQuestionnaire :open="modal.edit.open" :info="modal.edit.info" @closed="() => { modal.edit.open = false }" />
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { questionnaireFetchPaginate } from "@/uikit-api";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ModalCreateQuestionnaire from './components/ModalCreate.vue';
  import ModalEditQuestionnaire from './components/ModalEdit.vue';
  import ElemProgressbar from "@/components/ElemProgressbar.vue";
import Swal from 'sweetalert2';

  export default defineComponent({
    components: { ElemProgressbar, ModalEditQuestionnaire, ModalCreateQuestionnaire, ElemPageTitle, SectionMenu, SectionNavbar },
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
            info: {}
          }
        },
        questionnaire: {} as any
      }
    },
    methods: {
      async onFetchPaginate(page: number) {
        this.loading.table = true;
        await questionnaireFetchPaginate({ page: page }).then( async (questionnaire) => {
          this.loading.table = false;
          this.questionnaire = questionnaire;
        });
      },
      async onChangePage(event: any) {
        await this.onFetchPaginate(event?.target?.value);
      },
      async onEditRequest(info: any) {
        this.modal.edit.info = info;
        this.modal.edit.open = true;
      },
      async onDeleteRequest(info: any) {
        Swal.fire({
          title: "Confirmation",
          text: "Delete selected questionnaire?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Delete"
        }).then( async (result) => {
          if(result.isConfirmed) {
            
          }
        });
      }
    },
    async mounted() {
      await this.onFetchPaginate(1).then( async () => {

      });
    },
  });
</script>