<template>
  <v-layout column justify-center align-left>
    <v-flex v-for="project in projects" :key="project.title" xs12 sm8 ma-3>
      <v-card nuxt :to="project.route">
        <v-card-title primary-title class="headline">
          {{ project.title }}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    projects: [
      {
        title: "OpenGeode",
        route: "opengeode"
      }
    ]
  })
}
</script>
