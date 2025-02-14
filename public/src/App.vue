

<template>
  <RouterView />
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import { useHead } from '@unhead/vue'
  import { isAuthenticated } from './uikit-api';
  
  export default defineComponent({
    name: 'MainApp',
    components: { RouterView },
    setup() {
      return {
        isAuthenticated
      }
    },
    watch: {
      $route: async function () {
        const route = this.$route;
        useHead({ title: route.meta?.title + '' })
        if(route.meta?.requiresAuth && !isAuthenticated()) {
          this.$router.replace('/');
        }
      }
    }
  });


</script>