<template>
    <div class="alert alert-info">
        <p>{{ title }}</p>
        <p>{{message}}</p>
        <input class="form-control" type="text" v-model="input">
        <button class="btn btn-info mt-2" @click="doaction">Click</button>
    </div>
</template>
<script>
export default{
    name:'HelloWorld',
    props:{
      title:String
    },
    data(){
        return{
            message:'Hello Vue!',
            input:'no name'
        }
    },
    mehtods:{
        doaction(){
            console.log('hellow');
            this.message= 'Hellow' + this.input;
            this.$emit('result-event',this.input);
        }
    }
}
</script>