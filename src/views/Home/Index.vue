<template>
  <div class="hello">
    home

  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  ref,
  watch
  } from 'vue';

import { useRouter } from 'vue-router'

export default {
  name: 'Index',
  props: {
    msg: String,
  },
  setup() {


    return {

    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
