<template>
  <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Questionnaire</h5>
        </div>
        <ElemProgressbar :loading="loading.progressbar"/>
        <div class="modal-body" style="max-height: calc(100vh - 200px);overflow: auto;">
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <div class="d-flex justify-content-between">
                  <label class="form-label">Question</label>
                  <select class="border-0" @change="onChangeAnsweType">
                    <option value="choices">Choices</option>
                    <option value="input">Input</option>
                  </select>
                </div>
                <textarea v-model="form.question" class="form-control" rows="3"></textarea>
              </div>
              <swiper :auto-height="true" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
                <swiper-slide>
                  <div class="mb-3">
                    <label class="form-label">Input value for option A</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">A.</span>
                      <input v-model="form.choice_a" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Input value for option B</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">B.</span>
                      <input v-model="form.choice_b" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Input value for option C</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">C.</span>
                      <input v-model="form.choice_c" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Input value for option D</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">D.</span>
                      <input v-model="form.choice_d" type="text" class="form-control">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Select Answer</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Answer</span>
                      <select v-model="form.answer" class="form-control">
                        <option value="0">Select Answer</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                      </select>
                    </div>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="mb-3">
                    <label class="form-label">Input answer</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Answer</span>
                      <input v-model="form.answer" type="text" class="form-control">
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-primary" @click="onSubmitQuestionnaire" >Submit Questionnaire</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { updateQuestionnaire } from "@/uikit-api";
  import ElemProgressbar from '@/components/ElemProgressbar.vue';

  export default defineComponent({
    name: "ModalVideoLinkAdd",
    emits: ['refresh', 'closed'],
    props: {
      open: {
        default: false,
        type: Boolean
      },
      info: {
        default: {} as any,
        type: Object
      }
    },
    components: { ElemProgressbar, Swiper, SwiperSlide },
    data() {
      return {
        swiper: {} as any,
        loading: {
          progressbar: false
        },
        form: {
          question_refid: "",
          question: "",
          is_choices: 1,
          choice_a: "",
          choice_b: "",
          choice_c: "",
          choice_d: "",
          answer: "",
          created_by: ""
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit("closed");
      },
      onSwiper(event: any) {
        this.swiper = event;
      },
      onResetChoiceForm() {
        this.form.choice_a      = this.info?.choice_a;
        this.form.choice_b      = this.info?.choice_b;
        this.form.choice_c      = this.info?.choice_c;
        this.form.choice_d      = this.info?.choice_d;
        this.form.answer        = this.info?.answer;
      },
      onResetForm() {
        this.form.question      = '';
        this.form.choice_a      = '';
        this.form.choice_b      = '';
        this.form.choice_c      = '';
        this.form.choice_d      = '';
        this.form.answer        = '';
      },
      onChangeAnsweType(event: any) {
        if(event?.target?.value == 'input') {
          this.swiper.slideTo(1);
          this.form.is_choices    = 0;
          this.onResetChoiceForm();
        }
        else {
          this.swiper.slideTo(0);
          this.form.is_choices    = 1;
          this.onResetChoiceForm();
        }
      },
      async onSubmitQuestionnaire() {
        await updateQuestionnaire(this.form).then( async (response) => {
          console.log(updateQuestionnaire);
        });
      }
    },
    watch: {
      info: function () {
        this.loading.progressbar    = true;
        this.form.question_refid    = this.info?.question_refid;
        this.form.question          = this.info?.question;
        this.form.is_choices        = this.info?.is_choices;
        this.form.choice_a          = this.info?.choice_a;
        this.form.choice_b          = this.info?.choice_b;
        this.form.choice_c          = this.info?.choice_c;
        this.form.choice_d          = this.info?.choice_d;
        this.form.answer            = this.info?.answer;
        this.form.created_by        = this.info?.created_by;
        setTimeout(()=> {
          if(this.info?.is_choices == 1) {
            this.swiper.slideTo(0);
          }
          else {
            this.swiper.slideTo(1);
          }
          this.loading.progressbar = false;
        },800);
      }
    }
  });

</script>
<style scoped>
  .display {
    display: block;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>