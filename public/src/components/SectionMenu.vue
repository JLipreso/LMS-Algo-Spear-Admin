<template>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <h3>Algo Spear</h3>
    </div>
    <div class="menu-inner-shadow"></div>
    <ul class="menu-inner py-1">
      <li class="menu-item active">
        <a href="index.html" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </a>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Courses</span>
      </li>
      <li class="menu-item">
        <router-link class="menu-link" to="/reading-materials">
          <i class="menu-icon tf-icons bx bxs-book-reader"></i>
          <div data-i18n="Basic">Reading Materials</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link class="menu-link" to="/video-tutorials">
          <i class="menu-icon tf-icons bx bxs-video-recording"></i>
          <div data-i18n="Basic">Video Tutorials</div>
        </router-link>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Assessment</span>
      </li>
      <li class="menu-item">
        <a href="cards-basic.html" class="menu-link">
          <i class="menu-icon tf-icons bx bxs-alarm-exclamation"></i>
          <div data-i18n="Basic">Exercises</div>
        </a>
      </li>
      <li class="menu-item">
        <a href="cards-basic.html" class="menu-link">
          <i class="menu-icon tf-icons bx bxs-adjust-alt"></i>
          <div>Quizzes</div>
        </a>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Visualizations</span>
      </li>
      <li class="menu-item">
        <a href="cards-basic.html" class="menu-link">
          <i class="menu-icon tf-icons bx bxs-data"></i>
          <div>Data Structures</div>
        </a>
      </li>
      <li class="menu-item">
        <a href="cards-basic.html" class="menu-link">
          <i class="menu-icon tf-icons bx bxl-algolia"></i>
          <div>Algorithms</div>
        </a>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">People</span>
      </li>
      <li class="menu-item">
        <a href="cards-basic.html" class="menu-link">
          <i class="menu-icon tf-icons bx bx-user"></i>
          <div>Students</div>
        </a>
      </li>
      <li class="menu-item">
        <a href="cards-basic.html" class="menu-link">
          <i class="menu-icon tf-icons bx bxs-user-account"></i>
          <div>Staff</div>
        </a>
      </li>
    </ul>
  </aside>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "SectionMenu",
  });
</script>