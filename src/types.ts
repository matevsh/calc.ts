export enum TokenType {
    NUMBER = 'NUMBER',
    OPERATOR = 'OPERATOR',
}

export type NumberToken = {
    type: 'NUMBER'
    value: number
    precedence: number
}

export type OperatorToken = {
    type: TokenType.OPERATOR
    value: string
    precedence: number
}

export type Token = NumberToken | OperatorToken

type ExpressionNumberNode = {
    type: TokenType.NUMBER
    value: number
}

type ExpressionOperatorNode = {
    type: TokenType.OPERATOR
    value: string
    precedence: number
    left: ExpressionNode
    right: ExpressionNode
}

export type ExpressionNode = ExpressionNumberNode | ExpressionOperatorNode
