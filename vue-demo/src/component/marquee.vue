<template>
  <div class="vux-marquee" :style="{height: itemHeight / rem+ 'rem'}">
    <ul
      class="vux-marquee-box"
      ref="box"
      :style="{
              'transform': `translate3d(0,${currenTranslateY}px,0)`
          }"
      :class="[noAnimate ? 'notransition':'transition']"
    >
      <slot></slot>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'marquee',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    },
    duration: {
      type: Number,
      default: 300
    },
    direction: {
      type: String,
      default: 'up'
    },
    itemHeight: Number,
    rem: {
      type: Number,
      default: 75
    }
  },
  created () {},
  beforeDestroy () {
    this.destroy()
  },
  data () {
    return {
      currenTranslateY: 0,
      height: '',
      length: 0,
      currentIndex: 0,
      noAnimate: false
    }
  },
  methods: {
    goMore () {
      this.start()
    },
    destroy () {
      this.timer && clearInterval(this.timer)
    },
    init () {
      this.destroy()
      if (this.cloneNode) {
        this.$refs.box.removeChild(this.cloneNode)
      }
      this.cloneNode = null
      let firstItem = this.$refs.box.firstElementChild
      if (!firstItem) {
        return false
      }
      this.length = this.$refs.box.children.length
      this.height = firstItem.offsetHeight
      if (this.loop) {
        if (this.direction === 'up') {
          this.cloneNode = firstItem.cloneNode(true)
          this.$refs.box.appendChild(this.cloneNode)
        } else {
          this.cloneNode = this.$refs.box.lastElementChild.cloneNode(true)
          this.$refs.box.insertBefore(this.cloneNode, firstItem)
        }
      }
      return true
    },
    start () {
      if (this.direction === 'down') this.go(false)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (!this.loop && this.currentIndex === this.length - 1) {
          clearInterval(this.timer)
          return
        }
        if (this.direction === 'up') {
          this.currentIndex += 1
          this.currenTranslateY = -this.currentIndex * this.height
        } else {
          this.currentIndex -= 1
          this.currenTranslateY = -(this.currentIndex + 1) * this.height
        }
        if (this.currentIndex === this.length) {
          if (this.loop) {
            setTimeout(() => {
              this.go(true)
            }, this.duration)
          }
        } else if (this.currentIndex === -1) {
          setTimeout(() => {
            this.go(false)
          }, this.duration)
        } else {
          this.noAnimate = false
        }
      }, this.interval + this.duration)
    },
    go (toFirst) {
      this.noAnimate = true
      if (toFirst) {
        this.currentIndex = 0
        this.currenTranslateY = 0
      } else {
        this.currentIndex = this.length - 1
        this.currenTranslateY = -(this.currentIndex + 1) * this.height
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.vux-marquee {
  width: 100%;
  overflow: hidden;
}

.vux-marquee-box {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;

  li {
    margin: 0;
    width: 100%;
  }
}

.transition {
  transition: transform 0.3s;
  -webkit-transition: -webkit-transform 0.3s;
}

.notransition {
  transition: transform 0;
  -webkit-transition: -webkit-transform 0s;
}
</style>
