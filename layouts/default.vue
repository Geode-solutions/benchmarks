<template>
  <v-app>
    <v-app-bar dark app clipped-left color="primary">
        <v-btn text active-class="" nuxt to="/">
      <v-app-bar-nav-icon>
        <v-icon large>$vuetify.icons.logo</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Geode-solutions</v-toolbar-title>
        </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          nuxt
          :to="item.to"
          :key="index"
          v-for="(item, index) in items"
        >
          <span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { title: 'OpenGeode', to: '/opengeode' }
        ]
      }
    }
  }
</script>

<style scoped> *{ text-transform: none !important; } </style>
