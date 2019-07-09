<template>
  <div class="other">
    <h1>other page</h1>
    <prize-msg class="msg-wrap" :msgs="msg"></prize-msg>
  </div>
</template>
<script>
import PrizeMsg from '../component/PrizeMsg'
export default {
  name: 'other',
  components: {
    PrizeMsg
  },
  data () {
    return {
      msg: [
        {
          nick: 'l啦啦啦',
          name: '金币x10'
        },
        {
          nick: '大叔大婶',
          name: '金币x10'
        },
        {
          nick: '洒水多',
          name: '金币x10'
        },
        {
          nick: 'wqw',
          name: '金币x10'
        }
      ]
    }
  },
  mounted () {}
}
</script>

<style lang="scss">
  @import "../styles/reset.scss";
  @import "../styles/func.scss";

  .msg-wrap {
    background: grey;
  }

</style>
