<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SectionMenu/>
      <div class="layout-page">
        <SectionNavbar/>
        <div class="content-wrapper">
          <div class="container-xxl h-100">
            <ElemPageTitle page_group="Courses" page_title="Create Reading Materials" />
            <div class="row">
              <div class="col-8 p-0 m-0 h-100">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="mb-3">
                          <label class="form-label">Article Title</label>
                          <input v-model="form.title" type="email" class="form-control"/>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="mb-3">
                          <label class="form-label">Topic</label>
                          <select v-model="form.topic_refid" class="form-control">
                            <option value="0">Select Topic</option>
                            <option v-for="(topic, ti) in article_topic" :key="ti" :value="topic?.topic_refid">{{ topic?.name }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <input v-model="form.description" type="email" class="form-control"/>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Content</label>
                      <JLArticleEditor 
                        :value="form.content" 
                        editor_id="jl-html-editor-ghtr54"
                        :reset="reset"
                        @input="onEditorReleased"
                      />
                    </div>
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-primary" @click="updateArticle()" >Update</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                1
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
  import { updateArticle, fetchSingleArticle, fetchAllArticleTopic, printDevLog } from '@/uikit-api';
  import JLArticleEditor from "@/uikit-api/article-editor/component/JLArticleEditor.vue";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";

  export default defineComponent({
    components: { JLArticleEditor, ElemPageTitle, SectionMenu, SectionNavbar },
    data() {
      return {
        reset: 0,
        article_refid: "",
        article_topic: [] as any,
        form: {
          article_refid: '',
          topic_refid: '',
          title: '',
          description: '',
          content: ''
        }
      }
    },
    methods: {
      async onFetchSingleArticle() {
        await fetchSingleArticle({ article_refid: this.article_refid }).then( async (response) => {
          if(response.length > 0) {
            this.form.article_refid   = response[0]['article_refid'];
            this.form.topic_refid     = response[0]['topic_refid'];
            this.form.title           = response[0]['title'];
            this.form.description     = response[0]['description'];
            this.form.content         = response[0]['content'];
          }
        });
      },
      async updateArticle() {
        await updateArticle(this.form).then( async (response) => {
          if(response?.success) {
            this.$toast.success("Updated successfully");
            this.$router.replace("/reading-materials");
          }
          else {
            this.$toast.success("Fail to update, try again later");
          }
        });
      },
      onEditorReleased(event: any) {
        this.form.content = event?.content;
      },
    },
    async mounted() {
      this.article_refid = this.$route.params?.article_refid + '';
      await fetchAllArticleTopic().then( async (article_topic) => {
        this.article_topic = article_topic;
        await this.onFetchSingleArticle().then( async () => {
          printDevLog("Edit Article:", toRaw(this.$data));
        });
      });
    },
  });
</script>