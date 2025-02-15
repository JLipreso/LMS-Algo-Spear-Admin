<template>
  <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-3" >
    <div class="card">
      <img class="w-100" src="/src/assets/img/reading-material-banner.jpg" />
      <div class="card-body">
        <h5>{{ article?.title }}</h5>
        <p>Posted on {{ dateTimeToString(article?.created_at) }}</p>
        <div>
          <button class="btn btn-secondary btn-sm w-100">Edit</button>
          <button class="btn btn-danger btn-sm w-100 mt-3">Delete</button>
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
    emits: [''],
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
      editArticle() {

      }
    }
  });

</script>