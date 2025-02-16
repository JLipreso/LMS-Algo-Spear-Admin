<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <ElemPageTitle page_group="Home" page_title="Dashboard" />
            <div class="row">
              <div class="col-lg-8 mb-4 order-0">
                <SectionWelcome/>
                <TableQuizzes/>
              </div>
              <div class="col-lg-4 col-md-4 order-1">
                <div class="row">
                  <CardStudentCounts :count="students"/>
                  <CardAdminCounts :count="admins"/>
                  <CardReadingMaterialsCounts :count="reading_materials"/>
                  <CardVideoTutorialCounts :count="video_tutorials"/>
                </div>
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
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import SectionWelcome from './components/Welcome.vue';
  import CardStudentCounts from "./components/CardStudentCounts.vue";
  import CardAdminCounts from "./components/CardAdminCounts.vue";
  import CardReadingMaterialsCounts from "./components/CardReadingMaterialsCounts.vue";
  import CardVideoTutorialCounts from "./components/CardVideoTutorialCounts.vue";
  import TableQuizzes from './components/TableQuizzes.vue';
  import { countAdmins, countReadingMaterials, countStudents, countVideoTutorials, printDevLog } from '@/uikit-api';

  export default defineComponent({
    components: { TableQuizzes, CardVideoTutorialCounts, CardReadingMaterialsCounts, CardAdminCounts, CardStudentCounts, SectionWelcome, ElemPageTitle, SectionMenu, SectionNavbar },
    data() {
      return {
        students: 0,
        admins: 0,
        reading_materials: 0,
        video_tutorials: 0
      }
    },
    methods: {
      async counter() {
        await countStudents().then( async (students) => {
          this.students = students;
          await countAdmins().then( async (admins) => {
            this.admins = admins;
            await countReadingMaterials().then( async (reading_materials) => {
              this.reading_materials = reading_materials;
              await countVideoTutorials().then( async (video_tutorials) => {
                this.video_tutorials = video_tutorials;
              });
            });
          });
        });
      }
    },
    async mounted() {
      await this.counter().then( async () => {
        printDevLog("Counter Data:", toRaw(this.$data));
      });
    },
  });
</script>