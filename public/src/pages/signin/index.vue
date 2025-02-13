<template>
  <div class="position-absolute w-100 h-100">
    <div class="h-100 d-flex justify-content-center align-items-center">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="card" style="width: 400px;">
            <div class="card-body">
              <div class="app-brand justify-content-center mb-4">
                <router-link class="app-brand-link gap-2" to="/">
                  <span class="app-brand-text demo text-body fw-bolder">AlgoSpear</span>
                </router-link>
              </div>
              <p class="mb-4 text-center">Please sign-in to your account</p>
              <div class="mb-3">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="form.email" type="text" class="form-control"  placeholder="Enter your email"/>
                </div>
                <div class="mb-3 form-password-toggle">
                  <label class="form-label" for="password">Password</label>
                  <div class="input-group input-group-merge">
                    <input v-model="form.password" type="password" class="form-control" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"/>
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                  </div>
                </div>
                <div class="mb-3">
                  <button class="btn btn-primary d-grid w-100" @click="login()">Sign in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  
  import { defineComponent } from 'vue';
  import { isAuthenticated, userAdminSignIn } from "@/uikit-api";

  export default defineComponent({
    name: "SignInPage",
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async redirect() {
        if(isAuthenticated()) {
          this.$router.replace('/dashboard');
        }
      },
      async login() {
        this.loading = false;
        await userAdminSignIn(this.form).then( async (response) => {
          this.loading = false;
          if(response.success) {
            this.$router.replace('/dashboard');
          }
          else {
            this.$toast.warning(response?.message)
          }
        });
      }
    },
    async mounted() {
      await this.redirect();
    },
  });

</script>