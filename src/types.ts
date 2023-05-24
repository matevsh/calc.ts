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

export type ExpressionNode = {
    type: TokenType
    value?: number | string
    precedence?: number
    left?: ExpressionNode
    right?: ExpressionNode
}
