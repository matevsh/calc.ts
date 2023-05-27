import { ExpressionNode, OperatorToken, Token, TokenType } from './types'

export function parser(tokens: Token[]): ExpressionNode {
    const expressionStack: ExpressionNode[] = []
    const operatorStack: OperatorToken[] = []

    for (const token of tokens) {
        if (token.type === 'NUMBER') {
            expressionStack.push({ type: TokenType.NUMBER, value: token.value })
            continue
        }

        if (token.type === 'OPERATOR') {
            while (
                operatorStack.length > 0 &&
                token.precedence <=
                    operatorStack[operatorStack.length - 1].precedence
            ) {
                const operatorToken = operatorStack.pop()
                if (!operatorToken) {
                    throw new Error('Nieprawidłowy token operatora')
                }

                const right = expressionStack.pop()
                const left = expressionStack.pop()

                if (!right || !left) {
                    throw new Error('Nieprawidłowe drzewo składniowe')
                }

                const operatorNode: ExpressionNode = {
                    type: TokenType.OPERATOR,
                    value: operatorToken.value,
                    precedence: operatorToken.precedence,
                    left,
                    right,
                }
                expressionStack.push(operatorNode)
            }

            operatorStack.push(token)
        }
    }

    while (operatorStack.length > 0) {
        const operatorToken = operatorStack.pop()
        if (!operatorToken) {
            throw new Error('Nieprawidłowy token operatora')
        }

        const right = expressionStack.pop()
        const left = expressionStack.pop()

        if (!right || !left) {
            throw new Error('Nieprawidłowe drzewo składniowe')
        }

        const operatorNode: ExpressionNode = {
            type: TokenType.OPERATOR,
            value: operatorToken.value,
            precedence: operatorToken.precedence,
            left,
            right,
        }
        expressionStack.push(operatorNode)
    }

    if (expressionStack.length !== 1) {
        throw new Error('Nieprawidłowe drzewo składniowe')
    }

    return expressionStack[0]
}
