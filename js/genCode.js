// 中间代码模版
const test_middle_code = [
    [ 'f1', ':', '-', '-' ],
    [ 'pop', '_', 0, 't1' ],
    [ 'pop', '_', 4, 't2' ],
    [ 'pop', '_', 8, 't3' ],
    [ '-', 'fp', 12, 'fp' ],
    [ ':=', '0', '_', 't4' ],
    [ '+', 't2', 't3', 't6' ],
    [ '>', 't1', 't6', 't7' ],
    [ 'j>', 't7', '0', 'l1' ],
    [ 'j', '_', '_', 'l2' ],
    [ 'l1', ':', '_', '_' ],
    [ '*', 't2', 't3', 't8' ],
    [ '+', 't8', '1', 't9' ],
    [ '+', 't1', 't9', 't10' ],
    [ ':=', 't10', '_', 't5' ],
    [ 'j', '_', '_', 'l3' ],
    [ 'l2', ':', '_', '_' ],
    [ ':=', 't1', '_', 't5' ],
    [ 'l3', ':', '_', '_' ],
    [ 'l4', ':', '_', '_' ],
    [ '<=', 't4', '100', 't11' ],
    [ 'j>', 't11', '0', 'l5' ],
    [ 'j', '_', '_', 'l6' ],
    [ 'l5', ':', '_', '_' ],
    [ '*', 't5', '2', 't12' ],
    [ ':=', 't12', '_', 't4' ],
    [ 'j', '_', '_', 'l4' ],
    [ 'l6', ':', '_', '_' ],
    [ ':=', 't4', '_', 'v0' ],
    [ 'return', 't4', '_', '_' ],
    [ 'f2', ':', '-', '-' ],
    [ 'pop', '_', 0, 't13' ],
    [ '-', 'fp', 4, 'fp' ],
    [ '+', 't13', '2', 't14' ],
    [ ':=', 't14', '_', 't13' ],
    [ '*', 't13', '2', 't15' ],
    [ ':=', 't15', '_', 'v0' ],
    [ 'return', 't15', '_', '_' ],
    [ 'main', ':', '-', '-' ],
    [ '-', 'fp', 0, 'fp' ],
    [ ':=', '3', '_', 't16' ],
    [ ':=', '4', '_', 't17' ],
    [ ':=', '2', '_', 't18' ],
    [ '-', 'sp', 4, 'sp' ],
    [ 'store', '_', '0', 'ra' ],
    [ '-', 'sp', 4, 'sp' ],
    [ 'store', '_', '0', 'ra' ],
    [ '+', 'fp', 4, 'fp' ],
    [ 'push', '_', 0, 't18' ],
    [ 'call', '_', '_', 'f2' ],
    [ 'load', '_', '0', 'ra' ],
    [ '+', 'sp', 4, 'sp' ],
    [ '+', 'fp', 12, 'fp' ],
    [ 'push', '_', 0, 't16' ],
    [ 'push', '_', 4, 't17' ],
    [ 'push', '_', 8, 'v0' ],
    [ 'call', '_', '_', 'f1' ],
    [ 'load', '_', '0', 'ra' ],
    [ '+', 'sp', 4, 'sp' ],
    [ ':=', 'v0', '_', 't16' ],
    [ 'return', '_', '_', '_' ],
    [ 'END' ]
]


const OPERATOR = 0;
const ARG1 = 1;
const ARG2 = 2;
const ARG3 = 3;
// 数据段位置
const DATA_SEGMENT = 10000000
// 定义可以使用的寄存器范围
const REG_NUM_MIN = 7,REG_NUM_MAX=25;
// template {id:t1,type:"register"/"memory",num:,cnt}
let VarAllocTable = [

]
// mips的32位的寄存器
const registers = [
    {num:"$0",sign:"$zero",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$1",sign:"$at",val:0,allocated:false,cnt:0},//
    {num:"$2",sign:"$v0",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$3",sign:"$v1",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$4",sign:"$a0",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$5",sign:"$a1",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$6",sign:"$a2",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$7",sign:"$a3",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$8",sign:"$t0",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$9",sign:"$t1",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$10",sign:"$t2",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$11",sign:"$t3",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$12",sign:"$t4",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$13",sign:"$t5",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$14",sign:"$t6",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$15",sign:"$t7",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$16",sign:"$s0",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$17",sign:"$s1",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$18",sign:"$s2",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$19",sign:"$s3",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$20",sign:"$s4",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$21",sign:"$s5",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$22",sign:"$s6",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$23",sign:"$s7",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$24",sign:"$t8",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$25",sign:"$t9",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$26",sign:"$k0",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$27",sign:"$k1",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$28",sign:"$gp",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$29",sign:"$sp",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$30",sign:"$fp",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
    {num:"$31",sign:"$ra",val:0,allocated:false,cnt:0},// zero 零号寄存器，始终为0
]

class mipsGenerator{
    constructor() {
        this.middle_code = []
        this.res = []
        this.memoryOffset = 0
    }
    init(middle_code){
        this.middle_code = middle_code
        this.res = []
        this.memoryOffset = 0
        VarAllocTable = []
        registers.forEach(item => item.allocated = false)
    }
    getRegister(id){
        let AllocRes = {num:'',type:''},suc=false,inMem = false,MemVar
        // 遍历VarTable,查看是否已经分配
        if(id!=="tmp"){
            VarAllocTable.forEach(item=>{
                if(item.id === id){
                    AllocRes = {num:item.num,type:item.type}
                    suc = true
                    item.cnt++
                    if(item.type === "register")
                        registers[item.num].cnt++
                    if(item.type === "memory"){
                        inMem = true
                        MemVar = item
                    }
                }
            })
        }
        if(suc){
            if(!inMem)
                return AllocRes
            else{ // 调用自身，获取一个寄存器
                let regID = this.getRegister("tmp").num
                // 把其读取到内存中
                this.res.push(`lw $${regID} ${DATA_SEGMENT+MemVar.num}`)
                // 修改变量在VarTable的值
                VarAllocTable.forEach(item =>{
                    if(item.id === id){
                        item.id = "register"
                        item.num = regID
                    }
                })
                return {num:regID,type:"register"}
            }
        }
        // 遍历所有可用的寄存器
        let minUsedReg = {cnt:Infinity,num:" ",val:""}
        for(let i=REG_NUM_MIN;i<REG_NUM_MAX;i++) {
            if(!registers[i].allocated){
                // 如果寄存器还没有分配,分配
                registers[i].allocated = true
                registers[i].val = id
                registers[i].cnt = 1
                suc = true
                VarAllocTable.push({id:id,num:i,type:'register',cnt:1})
                AllocRes = {num:i,type:"register"}
                break
            }
            if(registers[i].cnt<minUsedReg.cnt){
                minUsedReg.cnt = registers[i].cnt
                minUsedReg.num = i
                minUsedReg.val = registers[i].val
            }
        }
        // 如果没成功的话，把最少使用的寄存器换到内存中
        if(!suc){//$存入内存
            this.res.push(`sw $${minUsedReg.num} ${(DATA_SEGMENT+this.memoryOffset)}`)
            VarAllocTable.forEach(item =>{
                if(item.id === minUsedReg.val){
                    item.type = "memory"
                    item.num = this.memoryOffset
                }
            })
            this.memoryOffset+=4
            AllocRes = {num:minUsedReg.num,type:"register"}
            VarAllocTable.push({id:id,num:minUsedReg.num,type:'register',cnt:1})
            registers[minUsedReg.num].val = id
            // 生成地址码
        }
        return AllocRes
    }
    // 查看一个变量的值在当前四元式后是否还会被使用(可以根据块来优化)
    isStillUsed(id,quad_num){
        // 遍历后续四元式
        for(let i=0;i<this.middle_code.length;i++){
            let quad = this.middle_code[i]
            let operator = quad[OPERATOR]
            let use3oplist = ['j','j>','j<','j>=','j<=','push']
            let arg1 = quad[ARG1],arg2 = quad[ARG2],arg3 = quad[ARG3]
            if(i == quad_num){
                continue
            }
            if(id === arg1 || id === arg2){
                if(id === "t7"){
                    console.log(12)
                }
                return true
            }
            if(id === arg3 && use3oplist.indexOf(operator) !== -1){
                if(id === "t7"){
                    console.log(12)
                }
                return true
            }
        }
        console.log("buused",id)
        return false
    }
    // 尝试释放一个变量
    tryFreeVal(id,quad_num){
        if(!this.isStillUsed(id,quad_num)){
            let var_info
            VarAllocTable.forEach((item, index, arr)=>{
                if(item.id === id){
                    registers[item.num].allocated = false
                }
            })
        }
    }
    // 释放一个寄存器
    freeRegister(quad_num){
        registers[reg_num].allocated = false
    }
    genMipsCode(){
        mipsGen.res.push('addiu $sp, $zero, 0x10018000')
        mipsGen.res.push('or $fp, $sp, $zero')
        mipsGen.res.push('jal  main')
        mipsGen.res.push('j  end')
        for(let item in this.middle_code) {
            let quad = this.middle_code[item]
            console.log(quad[OPERATOR], quad[ARG1], quad[ARG2], quad[ARG3])
            let arg1 = quad[ARG1], arg2 = quad[ARG2], arg3 = quad[ARG3]
            // 根据运算符对每条四元式选择生成的汇编码
            let op = quad[OPERATOR]
            let instr;
            // the label
            if(arg1 === ":"){
                instr = `${op}:`
                this.res.push(instr)
            }
            else if(op ==="push"){
                let offset = Number(arg2)
                let reg_id
                if(arg3!=="v0")
                    reg_id = registers[this.getRegister(arg3).num].num
                else
                    reg_id = "$v0"
                instr = `sw ${reg_id}, ${offset}($fp)`
                this.res.push(instr)
            }
            else if(op ==="pop"){
                let offset = Number(arg2)
                let reg_id = registers[this.getRegister(arg3).num].num
                instr = `lw ${reg_id}, ${offset}($fp)`
                this.res.push(instr)
            }
            else if(op==="store"){
                instr = `sw $${arg3}, ${arg2}($sp)`
                this.res.push(instr)
            }
            else if(op==="load"){
                instr = `lw $${arg3}, ${arg2}($sp)`
                this.res.push(instr)
            }
            else if(op==="call"){
                instr = `jal ${arg3}`
                this.res.push(instr)
            }
            else if(op ==="j"){// jump...
                instr = `j ${arg3}`
                this.res.push(instr)
            }
            else if(op ==="j>"){
                let reg_id = '$'+this.getRegister(arg1).num
                // if greater than it then jump
                instr = `bgt ${reg_id},$zero,${arg3}`
                this.res.push(instr)
            }
            // res -> a>b
            else if(op ===">"||op==="<"|op==="!="|op==="=="){
                let sign;
                if(op===">")
                    sign = "sgt"
                else if(op === "<")
                    sign = "slt"
                else if(op === "!=")
                    sign = "sne"
                else if(op ==="==")
                    sign = "seq"
                let num1 = Number(arg1)
                let num2 = Number(arg2)
                let regRes = '$'+this.getRegister(arg3).num
                let reg1,reg2
                if(num1){
                    instr = `add $a1,$zero,${num1}`
                    this.res.push(instr)
                    reg1 = "$a1"
                }
                else
                    reg1 = "$"+this.getRegister(arg1).num
                if(num2){
                    instr = `add $a2,$zero,${num2}`
                    this.res.push(instr)
                    reg2 = "$a2"

                }
                else
                    reg2 = "$"+this.getRegister(arg2).num
                instr = `${sign} ${regRes},${reg1},${reg2}`
                this.res.push(instr)
            }
            else if(op === "return"){
                instr = "jr $ra"
                this.res.push(instr)
            }
            else if(op === ":="){
                let num1 = Number(arg1)
                if(arg3 === "v0"){
                    let reg1 = '$'+this.getRegister(arg1).num
                    instr = `add $v0,$zero,${reg1}`
                }
                else if(arg1 === "v0"){
                    let reg1 = '$'+this.getRegister(arg3).num
                    instr = `add ${reg1},$zero,$v0`
                }
                else{
                    let regRes = '$'+this.getRegister(arg3).num
                    if(!isNaN(num1)){
                        instr = `add ${regRes},$zero,${num1}`
                    }else{
                        let reg1 = '$'+this.getRegister(arg1).num
                        instr = `add ${regRes},$zero,${reg1}`
                    }
                }
                this.res.push(instr)
            }
            else if(op ==="-"||op ==="+"){
                let sign = op ==="-"?"sub":"add"
                if(arg1 ==="sp"||arg1==="fp"){
                    let num = Number(arg2)
                    instr = `${sign} $${arg1},$${arg1},${num}`
                }
                else{
                    let num1 = Number(arg1)
                    let num2 = Number(arg2)
                    let regRes = '$'+this.getRegister(arg3).num
                    if(num1&&num2){
                        instr = `${sign} ${regRes},${num1},${num2}`
                    }
                    else if(num1){
                        let reg2 = '$'+this.getRegister(arg1).num
                        instr = `${sign} ${regRes},${reg2},${num1}`
                    }
                    else if(num2){
                        let reg1 = '$'+this.getRegister(arg2).num
                        instr = `${sign} ${regRes},${reg1},${num2}`
                    }
                    else{
                        let reg1 = '$'+this.getRegister(arg1).num
                        let reg2 = '$'+this.getRegister(arg2).num
                        instr = `${sign} ${regRes},${reg1},${reg2}`
                    }
                }
                this.res.push(instr)
            }
            else if(op ==="*"||op ==="/"){
                let sign = op ==="*"?"mul":"div";
                let num1 = Number(arg1),num2 = Number(arg2)
                let reg1,reg2
                if(num1){
                    instr = `add $a1,$zero,${num1}`
                    this.res.push(instr)
                    reg1 = "$a1"
                }
                else
                    reg1 = "$"+this.getRegister(arg1).num
                if(num2){
                    instr = `add $a2,$zero,${num2}`
                    this.res.push(instr)
                    reg2 = "$a2"
                }
                else
                    reg2 = "$"+this.getRegister(arg2).num
                let reg_res = "$"+this.getRegister(arg3).num
                instr = `${sign} ${reg_res} ${reg1} ${reg2}`
                this.res.push(instr)
            }
            this.tryFreeVal(arg1,item)
            this.tryFreeVal(arg2,item)
        }

        mipsGen.res.push('end:')
    }

}

const mipsGen = new mipsGenerator()
mipsGen.init(test_middle_code)

console.log(registers)
console.log(VarAllocTable)

mipsGen.genMipsCode()

mipsGen.res.forEach(item => console.log(item))
console.log(VarAllocTable)