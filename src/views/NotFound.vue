<template>
    <div class="flex-center">
      <div class="grid">
        <h1>Not Found. You are on non-existent page</h1><br>
        <h2>Return to <RouterLink :to="{name: 'home'}">main page</RouterLink></h2>
      </div>
    </div>
  </template>
  
  <style>
  .flex-center{
    display: flex;
    justify-content: center;
    place-items: center;
  }
  .grid {
    display: grid;
  }
  </style>
  