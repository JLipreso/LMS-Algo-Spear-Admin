<template>
  <div class="card mt-4">
    <h5 class="card-header">Recent Quizzes</h5>
    <div class="table-responsive text-nowrap">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="bg-dark text-white">No</th>
            <th class="bg-dark text-white">Name</th>
            <th class="bg-dark text-white">Date Started</th>
            <th class="bg-dark text-white">Total</th>
            <th class="bg-dark text-white">Score</th>
            <th class="bg-dark text-white" style="width: 80px;">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(q, i) in quiz" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ q?.user_name }}</td>
            <td>{{ dateTimeToString(q?.quiz_date) }}</td>
            <td>{{ q?.total }}</td>
            <td>{{ q?.score }} (<small class="text-warning fw-bold">{{ onCalculateResult(q?.score, q?.total)['percentage'] }}</small>)</td>
            <td v-html="onCalculateResult(q?.score, q?.total)['status_hml']"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">

  import { dateTimeToString, calculateQuizResult } from '@/uikit-api';
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      quiz: {
        default: {} as any,
        type: Object
      }
    },
    setup() {
      return {
        dateTimeToString, calculateQuizResult
      }
    },
    methods: {
      onCalculateResult(score: number, total: number) {
        const result    = calculateQuizResult(score, total, 75);
        var status_hml  = '';
        if((result.status).toLocaleLowerCase() == 'pass') {
          status_hml = "<button class='btn btn-success btn-sm w-100' style='border-radius: 30px;'>Passed</button>";
        }
        else {
          status_hml = "<button class='btn btn-danger btn-sm w-100' style='border-radius: 30px;'>Fail</button>";
        }
        return {
          percentage: result.percentage,
          status: result.status,
          status_hml: status_hml
        }
      }
    }
  });

</script>