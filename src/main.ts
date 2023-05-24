import { tokenizer } from './tokenizer'
import { parser } from './parser'

const input = '2 + 2 * 2'

const tokens = tokenizer(input)
const ast = parser(tokens)

console.log(ast)
