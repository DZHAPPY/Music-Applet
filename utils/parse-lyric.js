const timeReg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
export function ParseLyric(lrc) {
    const lyricInfos = []
    const lyricLines = lrc.split("\n")
    for (const line of lyricLines) {
        const result = timeReg.exec(line)
        if(!result) continue
        const minute = result[1] * 60 * 1000
        const second = result[2] * 1000
        const millisecond = result[3].length === 2 ? result[3] * 10 : result[3] * 1
        const time = minute + second + millisecond
        const text = line.replace(timeReg,'')
        lyricInfos.push({time,text})
    }
    return lyricInfos
}