let grammar_template = `program -> decList
decList -> dec|dec1
dec1 -> dec dec1|ε  
dec -> INT ID decType|VOID ID funcDecl
decType -> varDecl|funcDecl
varDecl -> ;
funcDecl -> ( formalParameter ) statementBlock
formalParameter -> parameterList|void;
parameterList -> parameter parameter1
parameter1 -> , parameter parameter1|ε 
parameter -> INT ID
statementBlock -> { innerDecl statementList }
innerDecl -> innerVarDecl ; innerVarDecl1|ε
innerVarDecl1 -> innerVarDec ; innerVarDecl1
innerVarDecl -> INT ID
statementList  -> statement statement1
statement1 -> statement statement1 |ε
statement -> ifStatement|whileStatement|returnStatement|assignStatement
assignStatement -> ID = expr
returnStatement -> RETURN expr
whileStatement -> WHILE ( expr ) statementBlock
ifStatement -> IF( expr ) statementBlock elseStatement
elseStatement -> ELSE statementBlock |ε
expr -> addExpr expr1|ε
expr1 -> relop addExpr expr1||ε
relop -> <|<=|>|>=|==|!=
addExpr -> item addExpr1
addExpr1 -> + item addExpr1| - item addExpr2|ε
item -> factor item1
item1 -> * factor item1| / factor item1|ε
factor -> NUM | ( expr ) |ID ftype
ftype -> call|ε
call -> ( realPara )
realPara -> realParaList|ε
realPraList -> expr realPraList1
realPraList1 -> , expr realPraList1||ε
`

let Vn_tempate = ['program','decList','dec1','dec','decType','varDecl','funcDecl'
,'formalParameter','parameter1','parameter','parameterList','statementBlock'
,'innerDecl','innerVarDecl1','innerVarDecl','statementList','statement1','statement'
,'assignStatement','returnStatement','whileStatement','ifStatement','elseStatement',
'expr','expr1','relop','addExpr','addExpr1','item','item1','factor','ftype','call',
'realPara','realParaList','realParaList1']




Vn_tempate = ['program', 'declarationChain', 'typeSpecifier', 'declaration',
    'completeFunction', 'declareFunction', 'formalParaList', 'para', 'block',
    'statementChain', 'statement', 'assignStatement', 'returnStatement', 'iterStatement',
    'ifStatement', 'expression', 'primaryExpression', 'operator', 'actualParaList']

grammar_template = `
program -> declarationChain #
declarationChain -> declaration declarationChain|ε
typeSpecifier -> INT|VOID
declaration -> typeSpecifier ID ;|completeFunction
completeFunction -> declareFunction block
declareFunction -> typeSpecifier ID ( formalParaList )
formalParaList -> ε|para|para , formalParaList|void
para -> typeSpecifier ID
block -> { statementChain }
statementChain -> statement statementChain|ε
statement -> declaration|ifStatement|iterStatement|returnStatement|assignStatement
assignStatement -> ID = expression ;
returnStatement -> RETURN expression ;|RETURN ;
iterStatement -> WHILE ( expression ) block
ifStatement -> IF ( expression ) block|IF ( expression ) block ELSE block
expression -> primaryExpression|primaryExpression operator expression
primaryExpression -> NUM|( expression )|ID ( actualParaList )|ID
operator -> +|-|*|/|<|<=|>=|>|==|!=
actualParaList -> expression|expression , actualParaList|ε
`




grammar_template = `program -> declaration declarationCommon
declarationCommon -> declaration declarationCommon|ε
declaration -> returnValType ID ( functionParameterDeclaration ) statementBlock
returnValType -> INT|VOID|SHORT
functionParameterDeclaration -> parameterDeclaration functionParameterDeclarationCommon|ε
functionParameterDeclarationCommon -> , parameterDeclaration functionParameterDeclarationCommon|ε
parameterDeclaration -> varType ID
statementBlock -> { internalDeclaration statementChain }
internalDeclaration -> internalVarDeclaration internalDeclarationCommon|ε
internalVarDeclaration -> varType ID internalVarDeclarationCommon
internalDeclarationCommon -> ; internalDeclaration|ε
internalVarDeclarationCommon -> , ID internalVarDeclarationCommon|ε
varType -> INT|SHORT
statementChain -> statement statementChainCommon
statementChainCommon -> statementChain|ε
statement -> ifStatement|whileStatement|returnStatement|assignStatement
assignStatement -> ID = expression ;
returnStatement -> RETURN returnStatementCommon|ε
returnStatementCommon -> expression ;|;
whileStatement -> WHILE ( expression ) statementBlock
ifStatement -> IF ( expression ) statementBlock ifStatementCommon
ifStatementCommon -> else statementBlock|ε
expression -> plusExpression expressionCommon
expressionCommon -> comparator expression|ε
comparator -> <|<=|>|>=|==|!=
plusExpression -> item plusExpressionCommon
plusExpressionCommon -> + plusExpression|- plusExpression|ε
item -> factor itemCommon
itemCommon -> * item|/ item|ε
factor -> NUM|( expression )|ID functionType
functionType -> ( actualParameter )|ε
actualParameter -> expression actualParameterCommon|ε
actualParameterCommon -> , expression actualParameterCommon|ε
`

Vn_tempate = ['program', 'declarationCommon', 'declaration', 'returnValType', 'functionParameterDeclaration',
    'functionParameterDeclarationCommon', 'parameterDeclaration', 'statementBlock', 'internalDeclaration',
    'internalVarDeclaration', 'internalDeclarationCommon', 'internalVarDeclarationCommon', 'varType',
    'statementChain', 'statementChainCommon', 'statement', 'assignStatement', 'returnStatement',
    'returnStatementCommon', 'whileStatement', 'ifStatement', 'ifStatementCommon', 'expression', 'expressionCommon',
    'comparator', 'plusExpression', 'plusExpressionCommon', 'item', 'itemCommon', 'factor', 'functionType', 'actualParameter',
    'actualParameterCommon']

