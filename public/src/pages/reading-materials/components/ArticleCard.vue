<template>
  <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-3" >
    <div class="card">
      <img class="w-100" src="/src/assets/img/reading-material-banner.jpg" />
      <div class="card-body">
        <h5 class="text-dark">{{ article?.title }}</h5>
        <p><small>Posted on {{ dateTimeToString(article?.created_at) }}</small></p>
        <div class="row">
          <div class="col-6">
            <button class="btn btn-secondary btn-sm w-100" @click="onEditArticle()">Edit</button>
          </div>
          <div class="col-6">
            <button class="btn btn-danger btn-sm w-100" @click="onDeleteArticle()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { dateTimeToString } from "@/uikit-api";

  export default defineComponent({
    name: "ArticleCard",
    emits: ['edit', 'delete'],
    props: {
      article: {
        default: {} as any,
        type: Object
      }
    },
    setup() {
      return {
        dateTimeToString
      }
    },
    methods: {
      onEditArticle() {
        this.$emit('edit', this.article );
      },
      onDeleteArticle() {
        this.$emit('delete', this.article );
      }
    }
  });

</script>