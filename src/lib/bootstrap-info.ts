export function getBootstrapTips() {
  return (
    `-------------------------------------------------\n` +
    `Node app is running!\n` +
    `\tPORT: \t\t3000\n` +
    `\tNODE VERSION: \t${process.version}\n` +
    `\tSTARTUP TIME: \t${new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour12: false,
    })}\n` +
    `-------------------------------------------------\n`
  )
}
