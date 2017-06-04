<template>
  <div>
    app
    {{store_num}}
    {{$store.state.num}}
    <List></List>
  </div>
</template>
<script type="text/javascript">
  //引入菜单
  import List from './list.vue' ;
  import Vue from 'vue' ;
  
  export default {
    name:'app',
    data(){
      return {num:0}
    },
    computed:{
      store_num(){
        return this.$store.state.num
      }
    },
    mounted(){
      console.log(this)
    },
    components:{
      List:List
    }
  }
</script>

