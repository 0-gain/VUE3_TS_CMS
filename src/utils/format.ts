/**
 * 2023-01-14T06:41:49.000Z
 * T:表示分隔符
 * Z:表示的是UTC
 * UTC:世界标准时间，在标准时间上加上8小时，即东八区区时间，也就是北京时间
 */
export const formatUTCToLocalTime = (dateTime: string) => {
  // 转换为Date对象
  return new Date(+new Date(dateTime) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/(T|Z)/gi, ' ')
    .split('.')[0]
}

export const formatCount = (count: number) => {
  // 判断长度是否大于1000
  if (count < 1000) return count
  // 转化为数组
  const arr = Array.from(count.toString())
  const ans = []
  let counts = 0
  for (let i = arr.length - 1; i >= 0; i--) {
    counts++
    if (counts > 3 && i) {
      ans.unshift(',')
      counts = 1
    }
    ans.unshift(arr[i])
  }
  return ans.join('')
}
