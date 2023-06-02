export enum TokenType {
    NUMBER,
    OPERATOR,
    LEFT_PAREN,
    RIGHT_PAREN,
}

export type OperatorToken = {
    type: TokenType.OPERATOR
    value: string
    precedence: number
}

type NumberToken = {
    type: TokenType.NUMBER
    value: number
}

type LeftParenToken = {
    type: TokenType.LEFT_PAREN
    value: '('
}

type RightParenToken = {
    type: TokenType.RIGHT_PAREN
    value: ')'
}

export type Token =
    | NumberToken
    | OperatorToken
    | LeftParenToken
    | RightParenToken

type ExpressionOperatorNode = {
    type: TokenType.OPERATOR
    value: string
    precedence: number
    left: ExpressionNode
    right: ExpressionNode
}

export type ExpressionNode = NumberToken | ExpressionOperatorNode
export type OperatorNode = OperatorToken | LeftParenToken
