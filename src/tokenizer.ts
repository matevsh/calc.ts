// [
//     { type: 'OPERATOR', value: '(', precedence: 3 },
//     { type: 'OPERATOR', value: '(', precedence: 3 },
//     { type: 'NUMBER', value: 2, precedence: 0 },
//     { type: 'OPERATOR', value: '+', precedence: 1 },
//     { type: 'NUMBER', value: 2, precedence: 0 },
//     { type: 'OPERATOR', value: ')', precedence: 3 },
//     { type: 'OPERATOR', value: '*', precedence: 2 },
//     { type: 'NUMBER', value: 2, precedence: 0 },
//     { type: 'OPERATOR', value: ')', precedence: 3 },
//     { type: 'OPERATOR', value: '+', precedence: 1 },
//     { type: 'NUMBER', value: 2, precedence: 0 }
// ]

import { type Token, TokenType } from './types'

const NUMBERS = '0123456789'
const OPERATORS = '+-*/'

type PrecedenceKey = keyof typeof OPERATOR_PRECEDENCE
const OPERATOR_PRECEDENCE = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 3,
    ')': 3,
}

function findNumber(input: string) {
    let number = ''

    while (input) {
        const [char] = input

        if (NUMBERS.includes(char)) {
            number += char
            input = input.slice(1)
        } else {
            break
        }
    }

    return {
        value: parseInt(number),
        len: number.length,
    }
}

export function tokenizer(input: string) {
    const tokens: Array<Token> = []

    while (input) {
        const [char] = input

        if (char === '(') {
            tokens.push({ type: TokenType.LEFT_PAREN, value: '(' })
            input = input.slice(1)
            continue
        }

        if (char === ')') {
            tokens.push({ type: TokenType.RIGHT_PAREN, value: ')' })
            input = input.slice(1)
            continue
        }

        if (NUMBERS.includes(char)) {
            const { value, len } = findNumber(input)
            input = input.slice(len)

            tokens.push({
                type: TokenType.NUMBER,
                value,
            })
            continue
        }

        if (OPERATORS.includes(char)) {
            const precedence = OPERATOR_PRECEDENCE[char as PrecedenceKey]
            tokens.push({ type: TokenType.OPERATOR, value: char, precedence })
            input = input.slice(1)
            continue
        }

        if (char === ' ') {
            input = input.slice(1)
            continue
        }

        throw new SyntaxError(`Unknown character: ${char}`)
    }

    return tokens
}
