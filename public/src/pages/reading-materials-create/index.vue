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
                      <JLArticleEditor :reset="reset" @input="onEditorReleased" />
                    </div>
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-primary" @click="onSubmitArticle()">Submit</button>
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

  import { defineComponent } from 'vue';
  import JLArticleEditor from "@/uikit-api/article-editor/component/JLArticleEditor.vue";
  import ElemPageTitle from "@/components/ElemPageTitle.vue";
  import SectionMenu from "@/components/SectionMenu.vue";
  import SectionNavbar from "@/components/SectionNavbar.vue";
  import { createReferenceID, createArticle, lsGetUser, fetchAllArticleTopic, randomNumbers } from '@/uikit-api';

  export default defineComponent({
    components: { JLArticleEditor, ElemPageTitle, SectionMenu, SectionNavbar },
    data() {
      return {
        reset: 0,
        input: "",
        article_topic: [] as any,
        form: {
          topic_refid: "0",
          article_refid: "",
          title: "",
          description: "",
          content: "",
          created_by: ""
        }
      }
    },
    methods: {
      onClearForm() {
        this.form.topic_refid     = "0";
        this.form.article_refid   = "";
        this.form.title           = "";
        this.form.description     = "";
        this.form.content         = "";
        this.reset                = randomNumbers();
      },
      onInit() {
        this.form.article_refid = createReferenceID('ART');
      },
      onEditorReleased(event: any) {
        this.form.content = event?.content;
      },
      async onSubmitArticle() {
        var user  = await lsGetUser() as any;
        if(user?.user_refid) {
          this.form.created_by = user?.user_refid;
          await createArticle(this.form).then( async (response) => {
            if(response?.success) {
              this.onClearForm();
              this.$toast.success("Posted successfully");
            }
            else {
              this.$toast.warning(response?.message);
            }
          });
        }
        else {
          this.$toast.warning("No active user");
          this.$router.replace('/');
        }
      }
    },
    async mounted() {
      await fetchAllArticleTopic().then( async (article_topic) => {
        this.article_topic = article_topic;
        this.onInit();
      });
    },
  });
</script>