<template>
  <v-layout column fill-height>
    <v-flex text-xs-center>
      <benchmark
        v-for="{ name, values } in benchmarks"
        :key="name"
        :name="name"
        :data="values"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Benchmark from "@/components/Benchmark"
import json from "@/assets/OpenGeode.json"

export default {
  components: {
    Benchmark
  },
  computed: {
    benchmarks() {
      return json
    }
  }
}
</script>
