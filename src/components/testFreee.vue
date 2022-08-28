<template>
  <div class="container">
    <p>ログインしています。</p>
    <button id="username">ユーザー名確認</button><br>
    <span><button id="accout_items">勘定一覧</button><input type="text" id="company_id" v-model="company_id"></span><br>
    <button id="logout">トークン破棄</button><br>
    <span><p>access_token:</p><input type="text"  v-model="access_token" style="width:650px" /></span><br>
    <span><P>refresh_token:</p><p>{{refresh_token}}</p></span>
  </div>
  <div id="content">
  </div>
</template>

<script>

export default {
  name: 'testFreee',
  data(){
    return{
        access_token: '',
        refresh_token: '',
        company_id: '',
    }
  },
  created(){
    if (sessionStorage.getItem('freee_initial')) {
        console.log("test");
    }
  },
  methods: {
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
