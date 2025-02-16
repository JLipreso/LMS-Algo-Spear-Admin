<template>
  <div class="modal fade" :class="{ show: open, display: open }" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Questionnaire</h5>
        </div>
        <div class="modal-body" style="max-height: calc(100vh - 200px);overflow: auto;">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Answer Type</label>
                  <select class="form-control" @change="onChangeAnsweType">
                    <option value="choices">Choices</option>
                    <option value="input">Input</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label">Category</label>
                  <select v-model="form.category_refid" class="form-control">
                    <option :value="0">Select Category</option>
                    <option v-for="(cat, ci) in categories" :key="ci" :value="cat?.group_refid">{{ cat?.name }}</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Question</label>
                <textarea v-model="form.question" class="form-control" rows="3"></textarea>
              </div>
              <swiper :auto-height="true" :slides-per-view="1" :space-between="0" @swiper="onSwiper">
                <swiper-slide class="swiper-no-swiping">
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
                <swiper-slide class="swiper-no-swiping">
                  <div class="mb-3">
                    <label class="form-label">Input answer</label>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Answer</span>
                      <input v-model="form.answer" type="text" class="form-control">
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal()">Close</button>
          <button class="btn btn-primary" @click="onSubmitQuestionnaire" >Create Questionnaire</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent, toRaw } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { createQuestionnaire, fetchAllQuestionnaireCategory, lsGetUser, printDevLog } from "@/uikit-api";

  export default defineComponent({
    name: "ModalVideoLinkAdd",
    emits: ['refresh', 'closed'],
    props: {
      open: {
        default: false,
        type: Boolean
      }
    },
    components: { Swiper, SwiperSlide },
    data() {
      return {
        swiper: {} as any,
        categories: [] as any,
        form: {
          category_refid: "0",
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
        this.form.choice_a      = '';
        this.form.choice_b      = '';
        this.form.choice_c      = '';
        this.form.choice_d      = '';
        this.form.answer        = '';
      },
      onResetForm() {
        this.form.category_refid  = '0';
        this.form.question        = '';
        this.form.choice_a        = '';
        this.form.choice_b        = '';
        this.form.choice_c        = '';
        this.form.choice_d        = '';
        this.form.answer          = '';
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
      async fetchAllCategory() {
        await fetchAllQuestionnaireCategory().then( async (categories) => {
          this.categories = categories;
        });
      },
      async onSubmitQuestionnaire() {
        await createQuestionnaire(this.form).then( async (response) => {
          if(response?.success) {
            this.$toast.success("Questionnaire created");
            this.onResetForm();
          }
          else {
            this.$toast.warning(response?.message);
          }
        });
      }
    },
    watch: {
      open: async function () {
        if(this.open) {
          var user = await lsGetUser() as any;
          if(user?.user_refid) {
            this.form.created_by = user?.user_refid;
          }
          await this.fetchAllCategory().then( async () => {
            printDevLog("Create Questionnaire:", toRaw(this.$data));
          });
        }
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