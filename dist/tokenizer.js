"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = void 0;
const types_1 = require("./types");
const NUMBERS = '0123456789';
const OPERATORS = '+-*/';
const OPERATOR_PRECEDENCE = {
    num: 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};
function findNumber(input) {
    let number = '';
    while (input) {
        const [char] = input;
        if (NUMBERS.includes(char)) {
            number += char;
            input = input.slice(1);
        }
        else {
            break;
        }
    }
    return {
        value: parseInt(number),
        len: number.length,
    };
}
function tokenizer(input) {
    const tokens = [];
    while (input) {
        const [char] = input;
        if (NUMBERS.includes(char)) {
            const { value, len } = findNumber(input);
            input = input.slice(len);
            tokens.push({
                type: types_1.TokenType.NUMBER,
                value,
                precedence: OPERATOR_PRECEDENCE.num,
            });
            continue;
        }
        if (OPERATORS.includes(char)) {
            const precedence = OPERATOR_PRECEDENCE[char];
            tokens.push({ type: types_1.TokenType.OPERATOR, value: char, precedence });
            input = input.slice(1);
            continue;
        }
        if (char === ' ') {
            input = input.slice(1);
            continue;
        }
        throw new SyntaxError(`Unknown character: ${char}`);
    }
    return tokens;
}
exports.tokenizer = tokenizer;
