<template>
  <loginFreee v-if="current == 0" @authevent="getauthresult"/>
  <testFreee v-else-if="current == 1" />
 </template>

<script>
import loginFreee from './components/loginFreee.vue' 
import testFreee from './components/testFreee.vue'

export default {
  name: 'App',
  components: {
    'loginFreee': loginFreee,
    'testFreee': testFreee,
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {
    getauthresult(e){
      console.log('getAuthResult' +  e);
      this.current = 1;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
