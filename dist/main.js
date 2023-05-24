"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("./tokenizer");
const parser_1 = require("./parser");
const input = '2 + 2 * 2';
const tokens = (0, tokenizer_1.tokenizer)(input);
const ast = (0, parser_1.parser)(tokens);
console.log(ast);
