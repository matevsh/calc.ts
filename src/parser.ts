import { ExpressionNode, Token, TokenType } from './types'

export function parser(tokens: Array<Token>): ExpressionNode {
    const expressionStack: ExpressionNode[] = []

    for (const token of tokens) {
        if (token.type === 'NUMBER') {
            expressionStack.push({ type: TokenType.NUMBER, value: token.value })
        } else if (token.type === 'OPERATOR') {
            while (
                expressionStack.length >= 2 &&
                token.precedence <=
                    // @ts-ignore
                    expressionStack[expressionStack.length - 1].precedence
            ) {
                const right = expressionStack.pop()
                const left = expressionStack.pop()

                if (!right || !left) {
                    throw new Error('Nieprawidłowe drzewo składniowe')
                }

                expressionStack.push({
                    type: TokenType.OPERATOR,
                    value: token.value,
                    precedence: token.precedence,
                    left,
                    right,
                })
            }

            expressionStack.push(token)
        }
    }

    while (expressionStack.length > 1) {
        const right = expressionStack.pop()
        const left = expressionStack.pop()

        if (!right || !left) {
            throw new Error('Nieprawidłowe drzewo składniowe')
        }

        expressionStack.push({
            type: TokenType.OPERATOR,
            value: expressionStack[expressionStack.length - 1]?.value,
            precedence: expressionStack[expressionStack.length - 1]?.precedence,
            left,
            right,
        })
    }

    if (expressionStack.length !== 1) {
        throw new Error('Nieprawidłowe drzewo składniowe')
    }

    return expressionStack[0]
}
