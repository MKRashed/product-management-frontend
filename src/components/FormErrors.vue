<template>
  <div>
    <p v-for="(error,index) in errors" :key="index">{{error}}</p>
  </div>
</template>

<script setup>
  defineProps({errors: {type:Array, required: true}})
</script>

<style scoped>

</style>