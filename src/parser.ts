import { ExpressionNode, OperatorToken, Token, TokenType } from './types'

function createExpression(expr: ExpressionNode[], oper: OperatorToken[]) {
    const operatorToken = oper.pop()
    if (!operatorToken) {
        throw new Error('Nieprawidłowy token operatora')
    }

    const right = expr.pop()
    const left = expr.pop()

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
    expr.push(operatorNode)
}

export function parser(tokens: Token[]): ExpressionNode {
    const expressionStack: ExpressionNode[] = []
    const operatorStack: OperatorToken[] = []

    for (const token of tokens) {
        if (token.type === 'NUMBER') {
            expressionStack.push({ type: TokenType.NUMBER, value: token.value })
            continue
        }

        if (token.type === 'OPERATOR') {
            const prevOperator = operatorStack[operatorStack.length - 1]

            while (
                operatorStack.length &&
                token.precedence <= prevOperator?.precedence
            ) {
                createExpression(expressionStack, operatorStack)
            }

            operatorStack.push(token)
        }
    }

    while (operatorStack.length > 0) {
        createExpression(expressionStack, operatorStack)
    }

    if (expressionStack.length !== 1) {
        throw new Error('Nieprawidłowe drzewo składniowe')
    }

    return expressionStack[0]
}
