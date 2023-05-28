import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { evaluateAST } from './evaluator'

const input = '10 + 10 * 10'

const tokens = tokenizer(input)
const ast = parser(tokens)
console.log(evaluateAST(ast))
