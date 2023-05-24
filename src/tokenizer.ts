import { type Token, TokenType } from './types'

const NUMBERS = '0123456789'
const OPERATORS = '+-*/'

type PrecedenceKey = keyof typeof OPERATOR_PRECEDENCE
const OPERATOR_PRECEDENCE = {
    num: 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
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

        if (NUMBERS.includes(char)) {
            const { value, len } = findNumber(input)
            input = input.slice(len)

            tokens.push({
                type: TokenType.NUMBER,
                value,
                precedence: OPERATOR_PRECEDENCE.num,
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
