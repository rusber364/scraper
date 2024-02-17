import { program } from 'commander'

program.option('-p, --port').parse()

export function definePort(port = 3000) {
  return +program.args[0] || port
}
