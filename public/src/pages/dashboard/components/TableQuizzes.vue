<template>
  <div class="card mt-4">
    <h5 class="card-header">Recent Quizzes</h5>
    <div class="table-responsive text-nowrap">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Date Started</th>
            <th>Total</th>
            <th>Score</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Lipreso, Jason</td>
            <td>Feb 18, 2025</td>
            <td>75</td>
            <td>5</td>
            <td><span class="text-danger">FAIL</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Lipreso, Jason</td>
            <td>Feb 18, 2025</td>
            <td>15</td>
            <td>15</td>
            <td><span class="text-success">PASSED</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Lipreso, Jason</td>
            <td>Feb 18, 2025</td>
            <td>75</td>
            <td>0</td>
            <td><span class="text-danger">FAIL</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {}
  });

</script>