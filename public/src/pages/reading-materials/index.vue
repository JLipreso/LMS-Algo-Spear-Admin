<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper" style="height: calc(100vh - 80px); overflow: auto;">
          <div class="container-xxl flex-grow-1 container-p-y">
            <ElemPageTitle page_group="Courses" page_title="Reading Materials" />
            <div class="row">
              <ArticleAddButton/>
              <ArticleCard v-for="(article, ai) in articles" :key="ai" :article="article" @edit="onEdit" @delete="onDelete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { fetchAllArticles, printDevLog, dateTimeToString, deleteArticle } from "@/uikit-api";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import ArticleAddButton from "./components/ArticleAddButton.vue";
  import ArticleCard from "./components/ArticleCard.vue";
  import Swal from 'sweetalert2';

  export default defineComponent({
    components: { ArticleAddButton, ArticleCard, ElemPageTitle, SectionMenu, SectionNavbar },
    setup() {
      return {
        dateTimeToString
      }
    },
    data() {
      return {
        articles: {} as any
      }
    },
    methods: {
      async onFetchArtilce() {
        await fetchAllArticles().then( async (articles) => {
          this.articles = articles;
        });
      },
      async onEdit(article: any) {
        this.$router.push('/reading-materials-edit/' + article?.article_refid );
      },
      async onDelete(article: any) {
        Swal.fire({
          title: "Confirmation",
          text: "Delete '" + article?.title + "' ?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Delete"
        }).then( async (result) => {
          if(result.isConfirmed) {
            await deleteArticle({ article_refid: article?.article_refid }).then( async (response) => {
              if(response?.success) {
                this.$toast.success('Delete successfully.');
                await this.onFetchArtilce();
              }
              else {
                this.$toast.warning('Fail to delete, try again later.');
              }
            });
          }
        });
      },
    },
    async mounted() {
      await this.onFetchArtilce().then( async () => {
        printDevLog("Reading Materials:", toRaw(this.$data));
      });
    },
  });
</script>