export default function SvgaAnimation (option) {
  let {
    src,
    containerId,
    loop = 1,
    endCallBack = () => {}
  } = option

  if (!src) return

  src = src.replace(/^(http|https):/, location.protocol)
  let parser = new window.SVGA.Parser(containerId)
  let player = new window.SVGA.Player(containerId)

  if (parser) {
    if (src.indexOf('svga') !== -1) {
      parser.load(src, function (videoItem) {
        player.loops = loop
        player.setVideoItem(videoItem)
        player.startAnimation()
        player.onFinished(() => {
          endCallBack && endCallBack()
        })
      })
    } else {
      player.stopAnimation()
    }
  }
}
