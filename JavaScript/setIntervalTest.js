// get setInterval delay in chrome, if tab of run this script is not active, will get amazing delayTime
function getIntervalDelay(countTime = 10, wait = 500) {
  let now = Date.now()
  let count = countTime
  let delayTime = 0
  const COUNT = count
  return new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      // console.log('now count:', count)
      if (--count === 0) {
        clearInterval(timer)
        resolve(Date.now() - (now + wait * COUNT))
      } else {
        window.__delayTime = `count:${count} delay: ${Date.now() - (now + wait * (COUNT - count))}ms`
      }
    }, wait)
  })
}
let time = await getIntervalDelay(10000, 500)
console.log(`delay time: ${time}ms`)
