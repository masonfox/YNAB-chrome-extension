<template>
  <div
    class="absolute inset-0 z-30 overflow-hidden bg-black bg-opacity-30 h-full w-full"
  >
    <section class="inset-y-0 h-full flex justify-center items-center">
      <div class="w-10/12">
        <div class="h-full flex flex-col p-5 bg-white shadow-xl rounded">
          <slot></slot>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>
