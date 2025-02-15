<template>
  <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Video Link</h5>
        </div>
        <div class="modal-body" style="max-height: calc(100vh - 200px);overflow: auto;">

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "ModalCreateQuestionnaire",
    props: {
      open: {
        defaut: false
      }
    }
  });

</script>