import {
    ExpressionNode,
    OperatorNode,
    OperatorToken,
    Token,
    TokenType,
} from './types'

function createExpression(expr: ExpressionNode[], oper: OperatorNode[]) {
    const operatorToken = oper.pop()
    if (!operatorToken || operatorToken.type !== TokenType.OPERATOR) {
        throw new Error('Nieprawidłowy token operatora')
    }

    const right = expr.pop()
    const left = expr.pop()

    if (!right || !left) {
        throw new Error(`Nieprawidłowe drzewo składniowe ${expr} ${oper}`)
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

export function parser(tokens: Token[]): ExpressionNode | undefined {
    const expressionStack: ExpressionNode[] = []
    const operatorStack: OperatorNode[] = []

    for (const token of tokens) {
        if (token.type === TokenType.NUMBER) {
            expressionStack.push({ type: TokenType.NUMBER, value: token.value })
            continue
        }

        if (token.type === TokenType.OPERATOR) {
            while (
                operatorStack.length &&
                operatorStack.at(-1)?.type === TokenType.OPERATOR &&
                token.precedence <=
                    (operatorStack.at(-1) as OperatorToken)?.precedence
            ) {
                createExpression(expressionStack, operatorStack)
            }

            operatorStack.push(token)
            continue
        }

        if (token.type === TokenType.LEFT_PAREN) {
            operatorStack.push(token)
            continue
        }

        if (token.type === TokenType.RIGHT_PAREN) {
            while (
                operatorStack.length &&
                operatorStack.at(-1)?.type !== TokenType.LEFT_PAREN
            ) {
                createExpression(expressionStack, operatorStack)
            }

            if (operatorStack.at(-1)?.type === TokenType.LEFT_PAREN) {
                operatorStack.pop()
            }
        }
    }

    while (operatorStack.length > 0) {
        createExpression(expressionStack, operatorStack)
    }

    if (expressionStack.length !== 1) {
        throw new Error('Nieprawidłowe drzewo składniowe')
    }

    return expressionStack.at(0)
}
