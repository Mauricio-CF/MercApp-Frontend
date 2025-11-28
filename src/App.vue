<template>
  <div>
    <HeaderBar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";

export default {
  components: { HeaderBar },
};
</script>