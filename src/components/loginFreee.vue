<template>
  <div class="container">
    <div class="form-group col-sm-8" id="content">
      <h2>freee API サンプル</h2>
      <form id="authForm" method="post" action="/auth">
        <div class="form-group col-xs-2">
          <input class="form-control" v-model="client_id" placeholder="Client ID" type="text" >
        </div>
        <div class="form-group">
          <input class="form-control col-xs-2" v-model="client_secret" placeholder="Client Secret" type="text" >
        </div>
        <div class="form-group">
          <input class="form-control"  v-model="redirect_uri" placeholder="Redirect URL" type="text" >
        </div>
        <div class="form-group">
          <button type="button" id="auth" v-on:click="authenticate">認証</button>
          <button type="button" id="test" v-on:click="test">認証</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginFreee',
  data(){
    return{
      client_id: '',
      client_secret: '',
      redirect_uri: ''
   }
  },
  created(){
    if (sessionStorage.getItem('freee_initial')) {
      const save_val = JSON.parse(sessionStorage.getItem('freee_initial'));
      console.log(save_val);
      this.client_id = save_val.id;
      this.client_secret = save_val.secret;  
      this.redirect_uri = save_val.redirect;
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    let code = params.get('code');
    let saveThis = this;

    if (code){
      console.log(code);
      const url = new URL(window.location.href);
      url.searchParams.delete('code');
      history.replaceState('', '', url.pathname);

      let postData = {};
      postData.client_id = this.client_id;
      postData.client_secret = this.client_secret;
      postData.redirect_uri = this.redirect_uri;
      postData.code = code;
    
      this.axios.post('/auth', postData)
      .then(function (response) {
        console.log(response.data);
        sessionStorage.setItem('freee_token',response.data);
        saveThis.$emit('authevent');
      })
    }
    console.log('mounted')
  },
  methods: {
    authenticate() {
      const initial_data = {
        'id': this.client_id,
        'secret': this.client_secret,
        'redirect': this.redirect_uri,
      };
      sessionStorage.setItem('freee_initial', JSON.stringify(initial_data));
      const URL = 'https://accounts.secure.freee.co.jp/public_api/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=code';
      location.href = URL;
    },
    test(){
      this.$emit('authevent');
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
