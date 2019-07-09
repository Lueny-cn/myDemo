<template>
  <div class="prize-msg" v-if="msgs&&msgs.length">
    <marquee :itemHeight="56" :rem="75" :interval="5000">
      <marqueeitem v-for="(value,index) in msgs" :key="'prize-msg'+index">
        <p class="clearfix">
          <i :title="value.nick">{{value.nick.length>4 ? value.nick.slice(0,4)+'...': value.nick}}</i>
          <span>
            完成任务，获得
            <i>{{value.name}}</i>
          </span>
        </p>
      </marqueeitem>
    </marquee>
  </div>
</template>

<script>
import marquee from './marquee.vue'
import marqueeitem from './marquee-item.vue'

export default {
  props: ['msgs'],
  data () {
    return {}
  },
  watch: {},
  directives: {},
  filters: {},
  components: {
    marquee,
    marqueeitem
  },
  created () {},
  mounted () {},
  methods: {
    getUserLogo (ptype, purl) {},
    getMsg () {}
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/reset.scss";
@import "../styles/func.scss";

.prize-msg {
  margin: 0 auto;
  line-height: p2r(56);

  ul {
    width: 100%;
    margin: 0 auto;
    li {
      width: 100%;
      height: p2r(56);
      line-height: p2r(56);
      position: relative;

      .congratulate {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          width: p2r(24);
          height: p2r(22);
          left: p2r(-32);
          top: p2r(8);
        }
      }

      p {
        height: 100%;
        overflow: hidden;
        i {
          overflow: hidden;
          width: p2r(170);
          height: p2r(56);
          line-height: p2r(56);
          font-style: normal;
          color: #fac81b;
        }
        span {
          width: p2r(60);
          height: p2r(56);
          line-height: p2r(56);
        }
      }
    }
  }
}
</style>
