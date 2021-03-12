<template>
  <div id="app">
    <Navbar :items="navItems">
      <template v-slot:header>
        
      </template>
    </Navbar>
  </div>
</template>

<script>
import Layout from '@/pages/Layout.vue'

import Navbar from '@/components/Navbar.vue'
import Events from '@/pages/Events.vue'

export default {
  name: 'App',
  data: function () {
    return {
      navItems: [
        { name: 'Events',  component: Events },
        { name: 'Layout',  component: Layout },


      ]
    }
  },
  components: {
    Navbar
  },

 created () {

  //  UnrealEngine.initialize();
  //  UnrealEngine.isConnected();
  },



}
</script>
<style scoped lang="scss">

#app {
  font-family: 'Open Sans', sans-serif;
  text-align: center;
}
#app {
  display: flex;
  flex-direction: column;
  height:100%;
  font-family: 'Open Sans', sans-serif;
}
a {
  text-decoration:none !important;
}
i.fa-lightbulb {
  margin-left: 3px;
}
#logo-link {
  padding-top: 3px;
  p {
    display: none;
  }
}
.logo-item {
  display: inline-flex;
  align-items: center;
  font-size: 19px;
}
.logo-item img {
  padding: 0;
}
.onpoint-logo {
  margin: 5px;
  width: 40px;
  height: 40px;
  ;
}
@media only screen and (min-width: 680px) {
  .onpoint-logo {
    margin-top: 0;
    margin-left: 0;
    margin-right: 10px;
  }
}
</style>

<style lang="scss">
html, body {
  height: 100vh;
  max-width: 100%;
  overflow: hidden !important;
  background-color: #1f1f21;
  overscroll-behavior: none;
}
body {
  margin: 0;
  padding: 0;
}
* {
  color: $accent-color;
  user-select: none;
}
*, *:before, *:after {
  box-sizing: border-box;
}
a, a:visited {
  outline:none;
  color: $accent-color;
  text-decoration:none !important;
}
a:hover {
  text-decoration:none;
}
input, textarea {
  background-color: red;
}
ul {
  list-style-type: none;
}
::-webkit-scrollbar-track {
  background-color: rgba(255,255,255, 0.2);
  border-radius: 8px;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
  width: 12px;
}
::-webkit-scrollbar:horizontal {
  height: 12px;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #d67358bf;
}

.drawer {
    min-height: 50px;
    width: 100%;
    grid-row-start: 2;
}

#panels{
  min-height: 50px;
  grid-column-start: 2;
  grid-row-start: 2;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  width: 100%;
  height: 100%;

  align-items: center;
  align-content: center;

  transition: width 0.2s ease;
}

</style>
