<template>
  <div class="lucky-draw">
    <div class="panel-area">
      <ul class="lottery-list">
        <li v-for="item in 8" :key="item">{{item}}</li>
      </ul>
      <a href="javascript:;"
         :style="{
          transform:`rotate(${rolltDeg}deg)`
        }"
         @click="handleLottery"
         class="btn-lottery"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuckyDraw',
  data () {
    return {
      lottery: [],
      rolltDeg: 0,
      lotteryIdx: 1, // 抽奖下标
      rollingTime: 0
    }
  },
  mounted () {
  },
  methods: {
    handleLottery () {
      setTimeout(() => {
        let data = {
          idx: Math.floor(Math.random() * 8)
        }
        this.roll(data)
      }, 300)
    },
    roll (data) {
      console.log(data.idx)
      const ROUND = 360
      const ROUND_TIMES = 3
      const TOTAL = 8
      const OFFSET = 22.5
      let nowRotate = ROUND / TOTAL * data.idx - OFFSET - this.rolltDeg % ROUND + ROUND * ROUND_TIMES

      this.rolltDeg = this.rolltDeg + nowRotate
      this.rollingTime++
      setTimeout(() => {
        this.lotteryIdx = data.idx
      }, 100)
    }
  }
}
</script>

<style lang="scss" scope>
  @import '../styles//luckyDraw';
</style>
