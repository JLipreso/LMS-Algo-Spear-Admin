
<template>
    <div class="col-lg-6 col-md-12 col-6 mb-4">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-start justify-content-between">
            <div class="avatar flex-shrink-0">
              <img src="/src/assets/img/as-multimedia.png" alt="Credit Card" class="rounded"/>
            </div>
          </div>
          <span>Video Tutorial</span>
          <h3 class="card-title text-nowrap mb-1">{{ count }}</h3>
          <small class="text-success fw-semibold">View Data</small>
        </div>
      </div>
    </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      count: {
        default: 0,
        type: Number
      }
    }
  });

</script>