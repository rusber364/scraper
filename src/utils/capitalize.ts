export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function lineCapitalized(line: string) {
  return line.split(' ').map(capitalize).join(' ')
}
