/// <reference types="vite/client" />

// Declare @highlightjs/vue-plugin
declare module '@highlightjs/vue-plugin' {
  import { Plugin } from 'vue';
  const plugin: Plugin;
  export default plugin;
}


declare module '../../../utils/camera' {
    export default function createCamera(): any;
}

define: {
    global: {}
}