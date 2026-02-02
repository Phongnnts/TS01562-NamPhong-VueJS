<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand">Lab 7 - 27 - Nguyễn Nam Phong</a>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" v-for="i in 4" :key="i">
          <a class="nav-link" href="#" @click="$emit('change', i)"> Bài {{ i }} </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
