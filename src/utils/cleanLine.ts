export function cleanLine(line: string) {
  const regexList = [/^\s*[\r\n]/gm, /[A-Za-z].*\n/g, /^\s+/gm]
  let cleanLine = line

  regexList.forEach((regex) => {
    cleanLine = cleanLine.replace(regex, '')
  })

  return cleanLine
}
