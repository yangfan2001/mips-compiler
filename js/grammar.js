const epsilon = 'ε';
const StartSign = '#'

//let test_Vn = ['E', 'T', `E'`, 'F', `T'`]
//let test_Vt = ['*', '(', ')','+','i','#']
/*let test_code = 
`
E ->T E'
E' ->+ T E'|ε
T ->F T'
T' ->* F T'|ε
F ->( E )|i
`
*/
/*
S -> T ID ( 
 */
const test_start = 'program'

const test_Vt = ['ID','INT','VOID',';','(',')','{','}','=','<'
,'<=','>','>=','==','!=','+','-','*','/','IF','WHILE','RETURN'
,'ELSE','NUM','#',',']

let test_Vn = ['S',`S'`,'T','B','C','D',`D'`,`D_`
,'E','V','F','J','I','W','H','G',`G'`,'K','L','M','N',`N'`,
'Q','Y','R','U']

let test_code =
` S ->T ID ( D' S'
S' ->) B #
T -> INT | VOID
B -> { C E }
C -> INT ID ; C |ε
D -> INT ID
D' -> D D_|ε
D_ -> , D D_ |ε
E -> F V
V -> F V|ε
F -> G|H|I|J
J -> ID = K ;
I -> RETURN W
W->K ;|;
H->WHILE ( K ) B
G->IF ( K ) B G'
G'->ELSE B|ε
K ->L Q
L -> M R
M -> N U 
N -> N'|ε
N' ->ID|NUM|( K )
Q -> Y L Q |ε
Y -> <|<=|>|>=|==|!=
R -> + M R|- M R|ε
U -> * N' U|/ N' U|ε
`
test_Vn =['program', 'returnValType', 'functionParameterDeclaration', 'functionParameterDeclarationCommon',
    'parameterDeclaration', 'statementBlock', 'internalDeclaration', 'internalVarDeclaration', 'internalDeclarationCommon',
    'internalVarDeclarationCommon', 'varType', 'statementChain', 'statementChainCommon', 'statement', 'assignStatement',
    'returnStatement', 'returnStatementCommon', 'whileStatement', 'ifStatement', 'ifStatementCommon', 'expression',
    'expressionCommon', 'comparator', 'plusExpression', 'plusExpressionCommon', 'item', 'itemCommon', 'factor']

test_Vn = ['program', 'declarationCommon', 'declaration', 'returnValType', 'functionParameterDeclaration',
    'functionParameterDeclarationCommon', 'parameterDeclaration', 'statementBlock', 'internalDeclaration',
    'internalVarDeclaration', 'internalDeclarationCommon', 'internalVarDeclarationCommon', 'varType',
    'statementChain', 'statementChainCommon', 'statement', 'assignStatement', 'returnStatement',
    'returnStatementCommon', 'whileStatement', 'ifStatement', 'ifStatementCommon', 'expression', 'expressionCommon',
    'comparator', 'plusExpression', 'plusExpressionCommon', 'item', 'itemCommon', 'factor', 'functionType', 'actualParameter',
    'actualParameterCommon']

test_code  =`program -> declaration declarationCommon #
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
returnStatement -> RETURN returnStatementCommon
returnStatementCommon -> expression ;|;
whileStatement -> WHILE ( expression ) statementBlock
ifStatement -> IF ( expression ) statementBlock ifStatementCommon
ifStatementCommon -> ELSE statementBlock|ε
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

const test_res =[
    [ 'INT', '-' ],    [ 'ID', '1' ],     [ '(', '-' ],     [ 'INT', '-' ],
    [ 'ID', '2' ],     [ ',', '' ],       [ 'INT', '-' ],   [ 'ID', '3' ],
    [ ',', '' ],       [ 'INT', '-' ],    [ 'ID', '4' ],    [ ')', '-' ],
    [ '{', '-' ],      [ 'INT', '-' ],    [ 'ID', '5' ],    [ ';', '-' ],
    [ 'INT', '-' ],    [ 'ID', '6' ],     [ ';', '-' ],     [ 'ID', '7' ],
    [ '=', '-' ],      [ 'NUM', '0' ],    [ ';', '-' ],     [ 'IF', '-' ],
    [ '(', '-' ],      [ 'ID', '8' ],     [ '>', '-' ],     [ '(', '-' ],
    [ 'ID', '9' ],     [ '+', '-' ],      [ 'ID', '10' ],   [ ')', '-' ],
    [ ')', '-' ],      [ '{', '-' ],      [ 'ID', '11' ],   [ '=', '-' ],
    [ 'ID', '12' ],    [ '+', '-' ],      [ '(', '-' ],     [ 'ID', '13' ],
    [ '*', '-' ],      [ 'ID', '14' ],    [ '+', '-' ],     [ 'NUM', '1' ],
    [ ')', '-' ],      [ ';', '-' ],      [ '}', '-' ],     [ 'ELSE', '-' ],
    [ '{', '-' ],      [ 'ID', '15' ],    [ '=', '-' ],     [ 'ID', '16' ],
    [ ';', '-' ],      [ '}', '-' ],      [ 'WHILE', '-' ], [ '(', '-' ],
    [ 'ID', '17' ],    [ '<=', '-' ],     [ 'NUM', '100' ], [ ')', '-' ],
    [ '{', '-' ],      [ 'ID', '18' ],    [ '=', '-' ],     [ 'ID', '19' ],
    [ '*', '-' ],      [ 'NUM', '2' ],    [ ';', '-' ],     [ '}', '-' ],
    [ 'RETURN', '-' ], [ 'ID', '20' ],    [ ';', '-' ],     [ '}', '-' ],
    [ 'INT', '-' ],    [ 'ID', '21' ],    [ '(', '-' ],     [ 'INT', '-' ],
    [ 'ID', '22' ],    [ ')', '-' ],      [ '{', '-' ],     [ 'ID', '23' ],
    [ '=', '-' ],      [ 'ID', '24' ],    [ '+', '-' ],     [ 'NUM', '2' ],
    [ ';', '-' ],      [ 'RETURN', '-' ], [ 'ID', '25' ],   [ '*', '-' ],
    [ 'NUM', '2' ],    [ ';', '-' ],      [ '}', '-' ],     [ 'VOID', '-' ],
    [ 'ID', '26' ],    [ '(', '-' ],      [ ')', '-' ],     [ '{', '-' ],
    [ 'INT', '-' ],    [ 'ID', '27' ],    [ ';', '-' ],     [ 'INT', '-' ],
    [ 'ID', '28' ],    [ ';', '-' ],      [ 'INT', '-' ],   [ 'ID', '29' ],
    [ ';', '-' ],      [ 'ID', '30' ],    [ '=', '-' ],     [ 'NUM', '3' ],
    [ ';', '-' ],      [ 'ID', '31' ],    [ '=', '-' ],     [ 'NUM', '4' ],
    [ ';', '-' ],      [ 'ID', '32' ],    [ '=', '-' ],     [ 'NUM', '2' ],
    [ ';', '-' ],      [ 'ID', '33' ],    [ '=', '-' ],     [ 'ID', '34' ],
    [ '(', '-' ],      [ 'ID', '35' ],    [ ',', '' ],      [ 'ID', '36' ],
    [ ',', '' ],       [ 'ID', '37' ],    [ '(', '-' ],     [ 'ID', '38' ],
    [ ')', '-' ],      [ ')', '-' ],      [ ';', '-' ],     [ 'RETURN', '-' ],
    [ ';', '-' ],      [ '}', '-' ],      [ '#', '-' ]
]
const test_id_list =[
    'program', 'a',       'b', 'c',
    'i',       'j',       'i', 'a',
    'b',       'c',       'j', 'a',
    'b',       'c',       'j', 'a',
    'i',       'i',       'j', 'i',
    'demo',    'a',       'a', 'a',
    'a',       'main',    'a', 'b',
    'c',       'a',       'b', 'c',
    'a',       'program', 'a', 'b',
    'demo',    'c'
]
const test_gm = `S S' T B C D D' D_ E V F J I W H G G' K L M N N' Q Y R U
ID INT VOID ; , ( ) { } = < <= > >= == != + - * / IF WHILE RETURN ELSE  NUM #
S ->T ID ( D' S'
S' ->) B #
T -> INT | VOID
B -> { C E }
C -> INT ID ; C |ε
D -> INT ID
D' -> D D_|ε
D_ -> , D D_ |ε
E -> F V
V -> F V|ε
F -> G|H|I|J
J -> ID = K ;
I -> RETURN W
W->K ;|;
H->WHILE ( K ) B
G->IF ( K ) B G'
G'->ELSE B|ε
K ->L Q
L -> M R
M -> N U
N -> N'|ε
N' ->ID|NUM|( K )
Q -> Y L Q |ε
Y -> <|<=|>|>=|==|!=
R -> + M R|- M R|ε
U -> * N' U|/ N' U|ε
`

class Node 
{
    constructor(val,parent,kids)
    {
        this.val = val
        this.parent = parent
        this.kids = kids
    }
}
const sizeof = type =>{
    if(type ==="int")
        return 4
}
// 实现栈的简单方法
class Stack
{
    constructor()
    {
        this.data = []
        this.size = 0
    }
    push(item)
    {
        this.data.push(item)
        this.size++
    }
    pop()
    {
        this.size--
        return this.data.pop()
    }
    top()
    {
        return this.data[this.size-1]
    }
}
// 实现集合并运算
function union(setA, setB) {

    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}

// 实现集合等于号计算
function isSameSet(set, subset) {
    let status = true;
    // 集合a是否有集合b的所有元素
    for (let elem of subset) {
        if (!set.has(elem)) {
            status = false;
        }
    }
    // 集合a是否等于集合b的大小
    return status&(set.size==subset.size);
}
// 实现一个集合的浅拷贝
function mySetCopy(set)
{
    let new_set = new Set(set)
    return new_set
}
// 实现将一个string和一个arr拼成一个string
function concatStrArr(str,arr)
{
    let res =str+'->'
    for(let i in arr)
    {
        res+=arr[i]
    }
    return res
}
// 文法输入规则 每个非终结符和终结符 相互之间都需要一个空格
class grammar
{
    // 构造函数
    constructor(start,Vn,Vt,code)
    {
        this.start = start // 初始符号
        this.Vn = null // 非终结符集合
        this.Vt = null // 终结符集合
        this.data = null//输入的文法字符串
        this.first = null// first集合
        this.follow = null // follow集合
        this.table = null // 预测分析表
        this.wrongPos = null; // 记录错误的位置
        this.load_grammar(Vn,Vt,code)
        this.res = []
        this.output = null
    }
    // 重新输入文法 data为txt
    load_grammar(Vn,Vt,data)
    {
        this.Vn = Vn // 非终结符集合
        this.Vt = Vt // 终结符集合
        this.data = this.preprocess_data(data)//输入的文法字符串
        this.first = null
        this.get_first()// 读取first集合
        this.follow = null // 读取follow集合
        
        let a = new Set(['IF', 'WHILE', 'RETURN', 'ID','ε'])
        let b = new Set(['IF', 'WHILE', 'RETURN', 'ID','ε'])
        let c = new Set(['<', '<=', '>', '>=', '==', '!=','ε'])
        this.first.set('statement',a)
        this.first.set('statementChainCommon',b)
        this.first.set('expressionCommon',c)
        this.get_follow()
        this.table = null
        this.get_table()
        console.log(this.table.get('statementChain'))
        console.log('the grammar is',this.data)
        console.log('the first set is',this.first)
        console.log('the follow set is',this.follow)
        console.log('the table is',this.table)
        
        this.res = []
    }
    // 外部设置接口
    set_Vn(Vn)
    {
        this.Vn = Vn
    }
    set_Vt(Vt)
    {
        if(Vt.indexOf('#')==-1)
        {
            Vt.push('#') //如果终结符中不存在@ 那么加入@
        }
        this.Vt = Vt
    }
    set_start(start)
    {
        this.start = start
    }
    getRes()
    {
        return this.res
    }
    // 对文法的数据预处理
    preprocess_data(gm)
    {
        //gm:输入的文法字符串
        //return:返回一个map结构,key为非终结符,value为其对应所有产生式的数组
        let res = new Map([])
        gm = String(gm).split('\n')

        for(let each in gm)
        {
            let line = gm[each] // 读取文法的某一行
            if(line =='')
            {
                continue; //避免出现最后一行两个换行符的情况
            }
            let tmp = line.split('->') // 读取产生式左部
            let arr = tmp[1].split('|')
            let sub_res = [] //定义文法单行array
            for(let i in arr)
            {
                let sub_arr = arr[i].split(' ')
                let subsub_res = [] // 定义单个产生式array
                for(let j in sub_arr)
                {
                    if(sub_arr[j]!='') //删除所有空元素
                    {
                        subsub_res.push(sub_arr[j])
                    }
                }
                sub_res.push(subsub_res)
            }
            let str = tmp[0]
            str = str = str.replace(/\s*/g,"");
            res.set(str,sub_res)
        }
        return res
    }
    // 获取单个符号的first
    get_single_first(sign)
    {
        let firstX = new Set([])
        if(this.Vt.indexOf(sign)!=-1)
        {   //终结符集合中存在sign
            firstX.add(sign)
            this.first.set(sign,firstX) //sign为终结符，那么first(x) = {x}
        }
        // sign为非终结符 
        let arr = this.data.get(sign) //二位数组
        for(let i in arr)
        {
            let sub_arr = arr[i] // 按每一句产生式进行分析
            if(this.Vt.indexOf(sub_arr[0])!=-1)
            {
                firstX.add(sub_arr[0]) // 如果有 X->a... a为非终结符 那么将a加入FirstX
            }
            else if(sub_arr[0]==epsilon) // 如果有epsilon 加FirstX
            {
                firstX.add(epsilon)
            }
            else // X->ABCd....情况
            {
                let cur=0,len = sub_arr.length
                for(cur=0;cur<len;cur++)
                {
                    if(!this.first.has(sub_arr[cur])) //如果对应还没有计算，那么先计算该符号对应的first
                    {
                        this.get_single_first(sub_arr[cur])
                    }
                    let first_cur = this.first.get(sub_arr[cur])//取出当前符号的first
                    firstX = union(firstX,first_cur)
                    if(!first_cur.has(epsilon))//取到一个不含epsilon的,进行break操作
                    {
                        firstX.delete(epsilon)
                        break
                    }
                    if(cur==len-1)
                    {
                        firstX.add(epsilon) // 如果遍历了所有也不含有epsilon，那么把epsilon加入
                    }
                }

            }
        }
        this.first.set(sign,firstX)
    }
    //获得某一个array的first集合
    get_str_first(arr) 
    {
        let firstX = new Set([])
        let cur=0,len=arr.length
        for(cur=0;cur<len;cur++)
        {
            let first_cur = this.first.get(arr[cur])
            console.log(arr[cur],this.first)
            firstX  = union(firstX,first_cur)
            firstX.delete(epsilon)//先加入再删除
            if(!first_cur.has(epsilon))//取到一个不含epsilon的,进行break操作
            {
                firstX.delete(epsilon)
                break
            }
            if(cur==len-1)
            {
                firstX.add(epsilon) // 如果遍历了所有也不含有epsilon，那么把epsilon加入
            }
        }
        return firstX
    }
    // 获得first集合
    get_first()
    {
        this.first = new Map([]) // 新对象
        this.first.set(epsilon,new Set([epsilon]))
        for(let i in this.Vt)
        {
            this.get_single_first(this.Vt[i]) // 计算终结符的first
        }
        for(let i in this.Vn)
        {
            if(!this.first.has(this.Vn[i])) // 如果这个非终结符的first还没有计算过
            {
                this.get_single_first(this.Vn[i])//那么计算这个非终结符的first
            }
        }
    }
    // 获得follow集合
    get_follow()
    {
        this.follow = new Map([])
        for(let i in this.Vn)
        {
            let followX = new Set([])
            this.follow.set(this.Vn[i],followX)
        }
        this.follow.get(this.start).add(StartSign)
        let cal_again = true //是否要计算的标志位
        while(cal_again)
        {
            cal_again = false //每次计算所有非终结符的follow设置一次标志位
            for(let i in this.Vn)
            {
                let X = this.Vn[i]
                // 遍历所有的产生式
                for(let gen of this.data)
                {
                    let S = gen[0] //此时的非终结符
                    let arr = gen[1]
                    for(let j in arr)
                    {
                        let sub_arr = arr[j] // 提取到产生式
                        if(sub_arr.indexOf(X)!=-1) // 该产生式存在X
                        {
                            let pos = sub_arr.indexOf(X) // X的位置
                            let len = sub_arr.length // array的长度
                            if(pos==len-1) // S->aX Follow(S)加入Follow(X)
                            {
                                let old_set = mySetCopy(this.follow.get(X)) //旧集合
                                let new_set = union(this.follow.get(X),this.follow.get(S))//新集合
                                this.follow.set(X,new_set) //
                                cal_again = !(isSameSet(old_set,new_set)) // 旧集合!=新集合 于是要继续计算
                            }
                            else // S->aXB
                            {
                                let rest_arr = sub_arr.slice(pos+1,len) //求B
                                console.log(rest_arr)
                                let firstB = this.get_str_first(rest_arr)
                                let old_set = mySetCopy(this.follow.get(X)) //旧集合
                                let new_set = union(this.follow.get(X),firstB)//新集合=followX + first B-epsilon
                                new_set.delete(epsilon) //-epsilon
                                this.follow.set(X,new_set) //
                                cal_again = !(isSameSet(old_set,new_set)) // 旧集合!=新集合 于是要继续计算
                                if(firstB.has(epsilon)) // firstB中有epsilon follow S 加入
                                {
                                    let old_set = mySetCopy(this.follow.get(X)) //旧集合
                                    let new_set = union(this.follow.get(X),this.follow.get(S))//新集合
                                    this.follow.set(X,new_set) //
                                    cal_again = !(isSameSet(old_set,new_set)) // 旧集合!=新集合 于是要继续计算
                                }

                            }
                        }
                    }
                }
            }
        }
    }

    // 生成预测分析表
    get_table()
    {
        this.table = new Map([])//生成空map
        for(let i in this.Vn)
        {
            for(let j in this.Vt)
            {
                this.table.set(this.Vn[i]+this.Vt[j],'error')
            }
        }
        // 遍历所有产生式
        for(let gen of this.data)
        {
            let S = gen[0] //此时的非终结符
            let arr = gen[1]
            for(let j in arr)
            {
                let sub_arr = arr[j] // 提取到产生式 每一个产生式
                let firstX = this.get_str_first(sub_arr) 
                for(let item of firstX) // 对于产生式 S->X
                {
                    if(item!=epsilon)
                    {
                        this.table.set(S+item,[concatStrArr(S,sub_arr),sub_arr])
                    }
                }
                if(firstX.has(epsilon)) // epsilon在firstX中
                {
                    let followS = this.follow.get(S)
                    for(let item of followS) // 对于产生式 S->X
                    {
                        this.table.set(S+item,[concatStrArr(S,sub_arr),sub_arr])
                    }
                }
                
            }
        }
    }
    // 根据预测分析表来读取一个string(不过需要按照规则转化为对应的单词串array)
    read_str(arr)
    {
        let save_stack = new Stack() 
        this.res = [] // empty the res arr
        save_stack.push('#') // 设置保留栈
        save_stack.push(this.start) //
        let len = arr.length
        let count = 0       
        let temp = []
        let a = []
        for(let cur=0;cur<len;cur++)
        {
            count++ //计数器++
            let ch = arr[cur][0] // 当前读到的字符  1为对应的值
            let val = arr[cur][1]
            let top = save_stack.top()
            //console.log(save_stack.data)
            //console.log(arr[cur])
            temp.push(top)
            if(ch==top) //等于栈顶
            {
                temp.push(val)
                if(top=='#') // top = ch =#
                {
                    console.log(`${count}:分析成功！！！`)
                    this.res.push(`${count}:分析栈:${save_stack.data}  ,分析成功！！！\n`)
                    this.output = temp
                    return true
                }
                else //cur++
                {
                    //console.log(`${count}:${top},退栈，输入前进`)
                    //this.res.push(`${count}:分析栈:${save_stack.data}  ,${top}退栈，输入前进\n`)
                    save_stack.pop() //栈弹出
                }
            }
            else if(this.Vt.indexOf(top)!=-1)//栈顶为终结符
            {
                console.log(`${count}:分析失败`)
                this.wrongPos = cur
                this.res.push(`${count}:分析栈:${save_stack.data}  ,分析失败\n`)
                console.log(this.res)
                return false;
            }
            else
            {
                let res = this.table.get(top+ch)//尝试读取
                console.log(res,top,ch)
                if(res=='error')
                {
                    console.log(`${count}:分析失败`)
                    console.log(save_stack)
                    this.wrongPos = cur
                    this.res.push(`${count}:分析栈:${save_stack.data}  ,分析失败\n`)
                    //console.log(a)
                    return false
                }
                else
                {
                    cur--//指针不变
                    let old_top = save_stack.pop() //栈顶弹出
                    console.log(`${count}:使用产生式,${res[0]}`)
                    a.push(res[0])
                    this.res.push(`${count}:分析栈:${save_stack.data}  ,使用产生式,${res[0]}\n`)
                    console.log(cur,arr.length)
                    let sub_arr = res[1]
                    if(sub_arr.length==1&&sub_arr[0]==epsilon)//空串产生式
                    {
                        console.log(`${count}:${old_top},退栈`)
                        this.res.push(`${count}:分析栈:${save_stack.data}  ,${old_top}退栈\n`)
                        continue
                    }
                    for(let i=sub_arr.length-1;i>=0;i--)
                    {
                        save_stack.push(sub_arr[i]) //产生式逆序入栈
                    }
                }
            }
        }
    }

}
let my_grammar = new grammar(test_start,test_Vn,test_Vt,test_code)

class generator
{
    constructor(data,idList)
    {
        this.data = data
        this.cur = 0
        this.idList = idList
        this.t=0
        this.quadList = []
        this.define = new Map([])
        this.errorINFO = ''
        this.errorFlag = false
        this.f=0
        this.l=0
        this.funcTable = [] // the function table
        this.curFunc = {id:'',argList:[],type:''};// 当前函数
        this.varTable = []// the table of present var
    }
    init(){
        this.cur = 0
        this.t = 0
        this.errorFlag = false
        this.errorINFO = 0
        this.f = 0
        this.l = 0
        this.curFunc = {id:'',argList:[],type:''}
        this.varTable = []
    }
    callT()
    {
        this.t++
        return 't'+this.t
    }
    freeT()
    {
        return this.t--
    }
    callF(){
        this.f++
        return 'f'+this.f
    }
    callL(){
        this.l++
        return 'l'+this.l
    }
    getPresentAddr()
    { // 获得指向四元式列表表尾的指针
        return this.quadList.length-1
    }
    setError(error_info){
        this.errorINFO = error_info
        this.errorFlag = true
    }
    process_sign()
    {
        let sign = this.data[this.cur]
        this.cur+=2
        return sign
    }
    process_INT()
    {
        this.cur+=2
        return "int"
    }
    process_SHORT(){
        this.cur+=2
        return "short"
    }
    process_NUM()
    {
        let val = this.data[this.cur+1]
        this.cur+=2
        return val
    }
    process_VOID()
    {
        this.cur+=2
        return "void"
    }
    process_ID()
    {
        let id = this.idList[this.data[this.cur+1]-1]
        this.cur+=2
        return id
    }
    getVarId(name){
        console.log("name " ,name)
        let res = false
        this.varTable.forEach(item =>{
            if(item.name === name && item.function === this.curFunc.id)
                res = item.id
        })
        if(!res)
            this.setError(`函数:${this.curFunc.name}的变量${name}在未被定义前使用`)
        return res
    }
    process_RETURN()
    {
        this.cur+=2
    }
    process_WHILE()
    {
        this.cur+=2
    }
    process_IF()
    {
        this.cur+=2
    }
    process_ELSE()
    {
        this.cur+=2
    }
    // program -> declaration declarationCommon #
    Program(){
        this.cur++
        this.Declaration()
        this.DeclarationCommon()
        let end_sign = this.process_sign()
        return end_sign === "END"
    }
    // declarationCommon -> declaration declarationCommon|ε
    DeclarationCommon(){
        this.cur++
        if(this.data[this.cur] === "declaration"){
            this.Declaration()
            this.DeclarationCommon()
        }
    }
    // declaration -> returnValType ID ( functionParameterDeclaration ) statementBlock
    Declaration(){
        this.cur++
        let func_type = this.ReturnValType()
        let func_name = this.process_ID()
        let func_id = this.callF()
        if(func_name === "main")
            func_id = "main"
        this.curFunc.id = func_id
        this.curFunc.type = func_type
        this.curFunc.name = func_name
        this.quadList.push([func_id,':','-','-'])
        console.log([func_id,':','-','-'])
        this.process_sign()
        this.FunctionParameterDeclaration()

        this.funcTable.push({...this.curFunc})
        console.log(this.funcTable)
        // pop 所有的argList的元素
        this.curFunc.argList.forEach(item =>
            this.quadList.push(["pop","_",item.offset,this.getVarId(item.name)])
        )
        this.quadList.push(["-","fp",this.curFunc.argList.length*4,"fp"])
        this.curFunc.argList = []
        this.process_sign()
        this.StatementBlock()
    }
    // returnValType -> INT|VOID|SHORT
    ReturnValType(){
        this.cur++
        if(this.data[this.cur] === "INT")
            return this.process_INT()
        else if(this.data[this.cur] === "VOID")
            return this.process_VOID()
        else if(this.data[this.cur] === "SHORT")
            return this.process_SHORT()
    }
    // functionParameterDeclaration -> parameterDeclaration functionParameterDeclarationCommon|ε
    FunctionParameterDeclaration(){
        this.cur++
        if(this.data[this.cur] === "parameterDeclaration"){
            this.ParameterDeclaration()
            this.FunctionParameterDeclarationCommon()
        }
    }
    // functionParameterDeclarationCommon -> , parameterDeclaration functionParameterDeclarationCommon|ε
    FunctionParameterDeclarationCommon(){
        this.cur++
        if(this.data[this.cur] === ","){
            let sign = this.process_sign()
            this.ParameterDeclaration()
            this.FunctionParameterDeclarationCommon()
        }
    }
    // parameterDeclaration -> varType ID
    ParameterDeclaration(){
        this.cur++
        let var_type = this.VarType()
        let var_name = this.process_ID()

        this.curFunc.argList.push({type:var_type,name:var_name,id:"",offset:4*this.curFunc.argList.length})
        this.varTable.push({type:var_type,name:var_name,size:sizeof(var_type),
            offset:4*this.varTable.length,id:this.callT(),function:this.curFunc.id})

    }
    // statementBlock -> { internalDeclaration statementChain }
    StatementBlock(){
        this.cur++
        this.process_sign()

        this.InternalDeclaration()
        this.StatementChain()

        this.process_sign()
    }
    // internalDeclaration -> internalVarDeclaration internalDeclarationCommon|ε
    InternalDeclaration(){
        this.cur++
        if(this.data[this.cur]==="internalVarDeclaration"){
            this.InternalVarDeclaration()
            this.InternalDeclarationCommon()
        }
    }
    // internalVarDeclaration -> varType ID internalVarDeclarationCommon
    InternalVarDeclaration(){
        this.cur++
        let var_type = this.VarType()
        let var_name = this.process_ID()

        this.varTable.push({type:var_type,name:var_name,size:sizeof(var_type),
            offset:4*this.varTable.length,id:this.callT(),function:this.curFunc.id})

        this.InternalVarDeclarationCommon()

    }
    // internalDeclarationCommon -> ; internalDeclaration|ε
    InternalDeclarationCommon(){
        this.cur++;
        if(this.data[this.cur] === ";"){
            this.process_sign()
            this.InternalDeclaration()
        }
    }
    // internalVarDeclarationCommon -> , ID internalVarDeclarationCommon|ε
    InternalVarDeclarationCommon(){
        this.cur++;
        if(this.data[this.cur] === ","){
            this.process_sign()
            this.ID = this.process_ID()
            this.InternalVarDeclarationCommon()
        }
    }
    // varType -> INT|SHORT
    VarType(){
        this.cur++
        if(this.data[this.cur]==="INT"){
            return this.process_INT()
        }
        if(this.data[this.cur==="short"]){
            return this.process_SHORT()
        }
    }
    // statementChain -> statement statementChainCommon
    StatementChain(){
        this.cur++
        this.Statement()
        this.StatementChainCommon()
    }
    // statementChainCommon -> statementChain|ε
    StatementChainCommon(){
        this.cur++
        if(this.data[this.cur] === "statementChain"){
            this.StatementChain()
        }
    }
    // statement -> ifStatement|whileStatement|returnStatement|assignStatement
    Statement(){
        this.cur++
        if(this.data[this.cur] === "ifStatement"){
            this.IfStatement()
        }
        else if(this.data[this.cur] === "whileStatement"){
            this.WhileStatement()
        }
        else if(this.data[this.cur] === "returnStatement"){
            this.ReturnStatement()
        }
        else if(this.data[this.cur] === "assignStatement"){
            this.AssignStatement()
        }
    }
    // assignStatement -> ID = expression ;
    AssignStatement(){
        this.cur++
        let id = this.process_ID()
        console.log(id)
        id = this.getVarId(id)
        this.process_sign()
        let expr_val = this.Expression()
        this.process_sign()
        this.quadList.push([":=",expr_val,'_',id])
        console.log([":=",expr_val,'_',id])
    }
    // returnStatement -> RETURN returnStatementCommon
    ReturnStatement(){
        this.cur++
        this.process_RETURN()
        this.ReturnStatementCommon()
    }
    // returnStatementCommon -> expression ;|;
    ReturnStatementCommon(){
        this.cur++
        if(this.data[this.cur] === "expression"){
            let ret_expr = this.Expression()
            this.process_sign()
            // 将return的值放入v0栈中
            this.quadList.push([":=",ret_expr,'_','v0'])
            // return ...
            this.quadList.push(["return",ret_expr,'_','_'])
            console.log(["return",ret_expr,'_','_'])
        }
        else
        {
            this.process_sign()
            this.quadList.push(["return",'_','_','_'])
            console.log(["return",'_','_','_'])
        }
    }
    // whileStatement -> WHILE ( expression ) statementBlock
    WhileStatement(){
        this.cur++
        this.process_WHILE()
        this.process_sign()
        let while_entry = this.callL() // while的入口
        let loop_entry = this.callL() // 循环入口
        let loop_exit = this.callL() // 循环出口
        this.quadList.push([while_entry,":","_",'_'])
        let while_expr = this.Expression()
        // if true -> to loop entry
        this.quadList.push(['j>',while_expr,"0",loop_entry])
        // if false -> to loop exit
        this.quadList.push(['j',"_","_",loop_exit])
        this.quadList.push([loop_entry,":","_",'_'])
        this.process_sign()
        this.StatementBlock()
        // after loop,back to while entry
        this.quadList.push(['j',"_","_",while_entry])
        // the exit of loop
        this.quadList.push([loop_exit,":","_",'_'])
    }
    // ifStatement -> IF ( expression ) statementBlock ifStatementCommon
    IfStatement(){
        this.cur++
        this.process_IF()
        this.process_sign()
        let if_expr = this.Expression()
        let if_entry = this.callL()
        let else_entry = this.callL()
        let else_exit = this.callL()
        // true -> if 入口
        this.quadList.push(['j>',if_expr,"0",if_entry])
        // false -> else 入口
        this.quadList.push(['j',"_","_",else_entry])
        this.quadList.push([if_entry,":","_",'_'])
        this.process_sign()
        this.StatementBlock()
        // if结束，跳转到else的出口
        this.quadList.push(['j',"_","_",else_exit])
        this.quadList.push([else_entry,":","_",'_'])
        this.IfStatementCommon()
        this.quadList.push([else_exit,":","_",'_'])

    }
    // ifStatementCommon -> ELSE statementBlock|ε
    IfStatementCommon(){
        this.cur++
        if(this.data[this.cur] === "ELSE"){
            this.process_ELSE()
            this.StatementBlock()
        }
    }
    // expression -> plusExpression expressionCommon
    Expression(){
        this.cur++
        let res1 = this.PlusExpression()
        let res2 = this.ExpressionCommon()
        let res
        if(!res2.operator){
            res = res1
        }
        else{
            let new_val = this.callT()
            this.quadList.push([res2.operator,res1,res2.val,new_val])
            console.log(res2.operator,res1,res2.val,new_val)
            res = new_val
        }
        return res
    }
    // expressionCommon -> comparator expression|ε
    ExpressionCommon(){
        this.cur++
        let res = {operator:'',val:''};
        if(this.data[this.cur] === "comparator"){
            let comparator = this.Comparator()
            res = {operator:comparator,val:this.Expression()}
        }
        return res
    }
    // comparator -> <|<=|>|>=|==|!=
    Comparator(){
        this.cur++
        let sign = this.process_sign()
        return sign
    }
    // plusExpression -> item plusExpressionCommon
    PlusExpression(){
        this.cur++
        let item_val = this.Item()
        let res;
        let plus_res = this.PlusExpressionCommon()
        if(plus_res.operator){
            let new_val = this.callT()
            this.quadList.push([plus_res.operator,item_val,plus_res.val,new_val])
            console.log(plus_res.operator,item_val,plus_res.val,new_val)
            res = new_val
        }
        else{
            res = item_val
        }
        return res
    }
    // plusExpressionCommon -> + plusExpression|- plusExpression|ε
    PlusExpressionCommon(item_val){
        this.cur++
        let res = {operator:'',val:''};
        if(this.data[this.cur] === "+"){
            this.process_sign()
            res = {operator:'+',val:this.PlusExpression()}
        }
        else if(this.data[this.cur] === "-"){
            this.process_sign()
            res = {operator:'-',val:this.PlusExpression()}
        }
        return res
    }
    // item -> factor itemCommon
    Item(){
        this.cur++
        let factor_res = this.Factor()
        let ItemCommon_res = this.ItemCommon()
        let res;
        if(!ItemCommon_res.operator){
            res = factor_res
        }
        else{
            res = this.callT()
            this.quadList.push([ItemCommon_res.operator,factor_res,ItemCommon_res.val,res])
            console.log(ItemCommon_res.operator,factor_res,ItemCommon_res.val,res)
        }
        return res
    }
    // itemCommon -> * item|/ item|ε
    ItemCommon(){
        this.cur++
        let res = {val:'',operator:''}
        if(this.data[this.cur] === "*"){
            this.process_sign()
            res = {val:this.Item(),operator:'*'}
        }
        else if(this.data[this.cur] === "/"){
            this.process_sign()
            res = {val:this.Item(),operator:'/'}
        }
        return res
    }
    // factor -> NUM|( expression )|ID functionType
    Factor(){
        this.cur++
        let res;
        if(this.data[this.cur] === "NUM"){
            res = this.process_NUM()
        }
        else if(this.data[this.cur] === "("){
            this.process_sign()
            res = this.Expression()
            this.process_sign()
        }
        else if(this.data[this.cur] === "ID"){
            let id = this.process_ID()
            res = id
            let func_res = this.FunctionType()
            if(func_res){
                let func_id,arglist
                this.funcTable.forEach(item => {
                    if(item.name === id) {
                        func_id = item.id
                        arglist = item.argList
                    }
                })
                if(arglist.length!==func_res.length){
                    this.setError(`错误，函数参数实参和形参不匹配(${res}(${JSON.stringify(arglist)}))`)
                }
                this.quadList.push(["+","fp",4*func_res.length,"fp"])
                // 压入参数
                this.quadList.push(...func_res)
                // 调用函数
                this.quadList.push(["call","_","_",func_id])
                console.log(["call","_","_",func_id])
                console.log("func ",id)
                // 函数的值放置在v0中
                res = "v0"
                // 恢复现场
                this.quadList.push(["load","_","0","ra"])
                // sp指针移动
                this.quadList.push(["+","sp",4,"sp"])
            }else{
                res = this.getVarId(id)
            }
        }
        return res
    }
    // functionType -> ( actualParameter )|ε
    FunctionType(){
        this.cur++
        let res = []
        if(this.data[this.cur] === "("){
            // sp指针移动
            this.quadList.push(["-","sp",4,"sp"])
            // 压入返回的地址
            this.quadList.push(["store","_","0","ra"])
            this.process_sign()
            res = this.ActualParameter(res)
            this.process_sign()
            return res
        }
        else{
            return false
        }
    }
    // actualParameter -> expression actualParameterCommon|ε
    ActualParameter(res){
        this.cur++
        if(this.data[this.cur] === "expression"){
            let expr_val = this.Expression()
            // Expression 压栈
            res.push(["push",'_',4*res.length,expr_val])
            console.log(["push",'_','_',expr_val])
            this.ActualParameterCommon(res)
            return res
        }
    }
    // actualParameterCommon -> , expression actualParameterCommon|ε
    ActualParameterCommon(res){
        this.cur++
        if(this.data[this.cur] === ","){
            this.process_sign()
            // Expression 压栈
            let expr_val = this.Expression()
            res.push(["push",'_',4*res.length,expr_val])
            console.log(["push",'_','_',expr_val])
            this.ActualParameterCommon(res)
        }
    }
    process(output,id_list)
    {
        this.data = output
        this.idList = id_list
        this.quadList = []
        this.init() // init
        if(this.data[0]===test_start)
        {
            try{
                this.Program()
            }catch (err){
                console.log(err)
            }
        }
        console.log(this.cur,this.data.length)
        console.log(this.varTable)
        this.quadList.push(['END'])
        this.output_quad()
    }
    output_quad()
    {
        let res = ''
        
        for(let i in this.quadList)
        {
            console.log(i,this.quadList[i])
            res+=(i.toString()+': ('+this.quadList[i]+')');
            res+='\n'
        }
        console.log(res)
        return res
    }
}
my_grammar.read_str(test_res)
let my_gen = new generator(my_grammar.output,test_id_list)
my_gen.init()
my_gen.process(my_grammar.output,test_id_list)
console.log(my_gen.varTable)