import { ExpressionNode, TokenType } from './types'

export function evaluateAST(
    ast: ExpressionNode | undefined
): number | undefined {
    if (!ast) return undefined

    if (ast.type === TokenType.NUMBER) {
        return ast.value
    }

    if (ast.type === TokenType.OPERATOR) {
        const left = evaluateAST(ast.left)
        const right = evaluateAST(ast.right)

        if (!left || !right) throw new Error('Nieprawidłowe drzewo składniowe')

        switch (ast.value) {
            case '+':
                return left + right
            case '-':
                return left - right
            case '*':
                return left * right
            case '/':
                return left / right
        }
    }
}
