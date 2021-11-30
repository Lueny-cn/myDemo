import enableInlineVideo from 'iphone-inline-video'
import EventBus from './EventBus'
import './requestAnimationFrame.polyfill'

// eslint-disable-next-line
export default class VideoToCavnas {
  constructor (option) {
    const defaultOption = {
      src: '',
      autoplay: true,
      loop: true,
      canvas: null,
      width: 375,
      height: 500
    }
    this.options = {
      ...defaultOption,
      ...option
    }

    this.radio = window.devicePixelRatio
    this.video = null // video

    this.event = new EventBus()
    this.intCanvas()
    this.initVideo()
  }

  intCanvas () {
    let { canvas } = this.options
    if (!canvas) {
      canvas = document.createElement('canvas')

      document.body.appendChild(canvas)
    }
    canvas.width = this.options.width
    canvas.height = this.options.height
    this.ctx = canvas.getContext('2d')
  }

  play () {
    this.video.play()
  }

  initVideo () {
    const {
      loop,
      src,
      autoplay
    } = this.options

    const video = document.createElement('video')
    video.autoplay = autoplay
    video.mute = true
    video.volume = 0
    video.muted = true
    video.loop = loop
    video.setAttribute('x-webkit-airplay', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('playsinline', 'true')
    video.style.display = 'none'
    video.src = src
    video.crossOrigin = 'anonymous'
    video.addEventListener('canplay', (...args) => {
      this.playing = true
      this.event.emit('on-play', ...args)
    })
    video.addEventListener('error', (...args) => {
      this.event.emit('on-error', ...args)
    })
    video.addEventListener('ended', (...args) => {
      this.event.emit('on-end', ...args)
    })

    video.addEventListener('play', () => {
      window.requestAnimationFrame(() => {
        this.drawFrame()
      })
    })
    enableInlineVideo(video, { everywhere: true })
    document.body.appendChild(video)
    this.video = video
  }

  drawFrame () {
    if (this.playing) {
      this.drawWebglFrame()
    }
    window.requestAnimationFrame(() => {
      this.drawFrame()
    })
  }

  drawWebglFrame () {
    const { ctx, video } = this
    const { width, height } = this.options
    ctx.drawImage(video, 0, 0, width, height)
  }
}
