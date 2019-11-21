<template>
  <v-layout column fill-height>
    <v-flex text-xs-center>
      <v-btn @click="goIndex">
        Back to index
      </v-btn>
      <span class="display-1  ">{{ project }} documentation</span>
      <iframe 
        ref="docFrame"
        width="100%"
        style="border: none;"
        scrolling="no"
        :src="page"/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "DocFrame",
  props: {
    project: {
      required: true,
      type: String
    }
  },
  computed: {
    page() {
      return '/docs/' + this.project + '/index.html';
    }
  },
  mounted() {
    this.$refs.docFrame.addEventListener("load", ()=>{
      this.$refs.docFrame.style.height = this.$refs.docFrame.contentWindow.document.body.offsetHeight + "px";
    });
  },
  methods: {
    goIndex() {
      this.$refs.docFrame.src = this.page;
    }
  }
}
</script>
