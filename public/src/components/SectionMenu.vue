<template>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <h3>Algo Spear</h3>
    </div>
    <div class="menu-inner-shadow"></div>
    <ul class="menu-inner py-1">
      <li class="menu-item" :class="{ active : $route.name == 'dashboard' ? true : false }">
        <router-link class="menu-link" to="/dashboard">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </router-link>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Courses</span>
      </li>
      <li class="menu-item" :class="{ active : $route.name == 'reading_materials' ? true : false }">
        <router-link class="menu-link" to="/reading-materials">
          <i class="menu-icon tf-icons bx bxs-book-reader"></i>
          <div data-i18n="Basic">Reading Materials</div>
        </router-link>
      </li>
      <li class="menu-item" :class="{ active : $route.name == 'video_tutorials' ? true : false }">
        <router-link class="menu-link" to="/video-tutorials">
          <i class="menu-icon tf-icons bx bxs-video-recording"></i>
          <div data-i18n="Basic">Video Tutorials</div>
        </router-link>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Assessment</span>
      </li>
      <li class="menu-item" :class="{ active : $route.name == 'questionnaire' ? true : false }">
        <router-link class="menu-link" to="/questionnaire">
          <i class="menu-icon tf-icons bx bxs-adjust-alt"></i>
          <div>Questionnaire</div>
        </router-link>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">People</span>
      </li>
      <li class="menu-item" :class="{ active : $route.name == 'users_student' ? true : false }">
        <router-link class="menu-link" to="/users-student">
          <i class="menu-icon tf-icons bx bx-user"></i>
          <div>Students</div>
        </router-link>
      </li>
      <li class="menu-item" :class="{ active : $route.name == 'users_admin' ? true : false }">
        <router-link class="menu-link" to="/users-admin">
          <i class="menu-icon tf-icons bx bxs-user-account"></i>
          <div>Admin</div>
        </router-link>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">System</span>
      </li>
      <li class="menu-item">
        <div class="px-4">
          <button class="btn btn-danger w-100" @click="onLogout()" >
            <i class="bi bi-power me-2"></i>
            <span>Logout</span>
          </button>
        </div>
      </li>
    </ul>
  </aside>
</template>
<script lang="ts">

  import Swal from 'sweetalert2';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SectionMenu",
    methods: {
      async onLogout() {
        Swal.fire({
          title: "Confirmation",
          text: "Logout admin panel?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Logout"
        }).then( async (result) => {
          if(result.isConfirmed) {
            localStorage.clear();
            this.$router.replace("/");
          }
        });
      }
    }
  });
</script>