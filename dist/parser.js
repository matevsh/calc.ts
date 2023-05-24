"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const types_1 = require("./types");
function parser(tokens) {
    var _a, _b;
    const expressionStack = [];
    for (const token of tokens) {
        if (token.type === 'NUMBER') {
            expressionStack.push({ type: types_1.TokenType.NUMBER, value: token.value });
        }
        else if (token.type === 'OPERATOR') {
            while (expressionStack.length >= 2 &&
                token.precedence <=
                    // @ts-ignore
                    expressionStack[expressionStack.length - 1].precedence) {
                const right = expressionStack.pop();
                const left = expressionStack.pop();
                if (!right || !left) {
                    throw new Error('Nieprawidłowe drzewo składniowe');
                }
                expressionStack.push({
                    type: types_1.TokenType.OPERATOR,
                    value: token.value,
                    precedence: token.precedence,
                    left,
                    right,
                });
            }
            expressionStack.push(token);
        }
    }
    while (expressionStack.length > 1) {
        const right = expressionStack.pop();
        const left = expressionStack.pop();
        if (!right || !left) {
            throw new Error('Nieprawidłowe drzewo składniowe');
        }
        expressionStack.push({
            type: types_1.TokenType.OPERATOR,
            value: (_a = expressionStack[expressionStack.length - 1]) === null || _a === void 0 ? void 0 : _a.value,
            precedence: (_b = expressionStack[expressionStack.length - 1]) === null || _b === void 0 ? void 0 : _b.precedence,
            left,
            right,
        });
    }
    if (expressionStack.length !== 1) {
        throw new Error('Nieprawidłowe drzewo składniowe');
    }
    return expressionStack[0];
}
exports.parser = parser;
