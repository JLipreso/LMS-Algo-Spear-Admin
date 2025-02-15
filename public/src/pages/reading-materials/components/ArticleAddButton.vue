<template>
  <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-3" @click="()=>{ $router.push('/reading-materials-create'); }" >
    <img class="w-100" src="/src/assets/img/reading-material-banner.jpg" />
    <div class="card">
      <div class="py-4" style="cursor: pointer;">
        <h1 class="text-center"><i class="bi bi-plus-circle-fill"></i></h1>
        <p class="text-center">Create Article</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "ArticleAddButton",
  });

</script>