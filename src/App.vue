<template>
  <div id="app">
    <Navbar />
    <router-view class="mt-10" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  width: 300px;
  height: 465px;
}

pre {
  display: block;
  font-family: Consolas;
  white-space: pre-wrap;
  background: #f5f5f5;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ddd;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
