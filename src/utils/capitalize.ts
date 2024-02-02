export function capitalize(line: string) {
  return line.charAt(0).toUpperCase().concat(line.slice(1))
}

export function lineCapitalized(line: string) {
  return line.split(' ').map(capitalize).join(' ')
}
