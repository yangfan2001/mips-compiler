//定义文件的基本动作

/*定义选择代码文件表单的基本事件*/
$('#selectCode').change(function (e) { 
    e.preventDefault();
    fileMsg = e.currentTarget.files;
    let fileName = fileMsg[0].name;
    console.log(fileName);//js-dom.png
    //类型 
    let fileType = fileMsg[0].type;
    console.log(fileType);//image/png
    let file = fileMsg[0]
    if(file) //如果文件上传成功
    {  // 创建filereader对象
        let reader= new FileReader()
        reader.readAsText(file,'UTF-8') // 以UTF-8编码格式读取文件
        reader.onload = function (e) {//读取文件内容
            $('#inputCode').val(this.result); // 对textarea进行赋值操作
        }
    }
});

function getTextInput()
{
    return $('#inputCode').val()
}
// 词法分析反馈
function SyntacticReact(code)
{
    MyMachine.init() //初始化
    MyMachine.updateCode(code) // 加载用户输入的代码到对象中
    if(MyMachine.preprocess()==false)
    { // 预处理存在错误
        $('#Modal').modal('show')
        $('#ModalBody').empty();// 清空模态框
        $('#ModalBody').append(`<text>注释未闭合
        </text>`);
        return false
    }
    else
    {
        let pos = MyMachine.process() // 进行词法分析
        if(pos==-1)
        {
            res = MyMachine.getRes()
            return MyMachine.transferNext()
        }
        else
        {
            $('#ModalHead').empty()
            $('#ModalHead').append('<h4 class="modal-title">错误提示❌/h4>')
            $('#Modal').modal('show')
            console.log()
            $('#ModalBody').empty();// 清空模态框
            $('#ModalBody').append(`<text>${MyMachine.getCode().slice(0,pos)}
            <mark>${MyMachine.getCode()[pos]}</mark>
            </text>`);
            return false
        }
    }
}
// 查看中间代码的模态框点击事件
$('#checkMiddleCodeButton').click(function (e) {
    e.preventDefault();
    $('#Modal2').modal('show')
    e.preventDefault();
    let content = my_gen.output_quad()
    let modalWindow = $('#ModalWindow')
    modalWindow.empty()
    modalWindow.append(content)
});
// 语法分析反馈
function GrammarReact(code,grammar)
{
    console.log(code)
    let tmp = []
    for(let i in code)
    {
        if(code[i]!='')
        {
            tmp.push(code[i])
        }
    }

    my_grammar.load_grammar(test_Vn,test_Vt,test_code)
    let status = my_grammar.read_str(tmp)
    if(!status)//失败了
    {
        let str = ''
        for(let i in code)
        {
            if(i==my_grammar.wrongPos)
            {
                str+=` <mark>${code[i][0]}</mark>`
            }
            else
            {
                str+=`<text>${code[i][0]}</text>`
            }
        }
        $('#Modal').modal('show')
        $('#ModalBody').empty();// 清空模态框
        $('#ModalBody').append(str);
        return
    }

    my_gen.init()
    console.log(my_grammar.output)
    my_gen.process(my_grammar.output,MyMachine.id_list)


    if(my_gen.errorFlag)
    {
        $('#Modal').modal('show')
        $('#ModalBody').empty()// 清空模态框
        $('#ModalBody').append(`<mark>${my_gen.errorINFO}</mark>`)
        return
    }
    // 生成汇编代码
    mipsGen.init(my_gen.quadList)
    mipsGen.genMipsCode()
    let info = ''
    mipsGen.res.forEach(
        item => info+=item+'\n'
    )
    $('#ProcessRes').val(info);

}
// 定义提交按钮点击的基本事件
$('#submitButton').click(function (e) { 
    e.preventDefault();
    let code = getTextInput()
    if(!code){}
    let grammar = test_code
    let SyntacticRes = SyntacticReact(code)
    if(SyntacticRes)//词法分析器进行响应)
    {
        GrammarReact(SyntacticRes,grammar)
    }
    
});
// 定义显示语法点击的基本事件
$('#checkGmButton').click(function (e) { 

    $('#Modal2').modal('show')
    e.preventDefault();
    let modalWindow = $('#ModalWindow')
    modalWindow.empty()
    modalWindow.append(test_code)
});
// 定义下载按钮点击的基本事件
$('#downloadCode').click(function (e) {
    let content = ''
    mipsGen.res.forEach(
        item => content+=item+'\n'
    )

    var aLink = document.createElement('a');
    var blob = new Blob([content], {
        type: 'text/plain'
    });
    var evt = new Event('click');
    aLink.download = "mipsCode";
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
    URL.revokeObjectURL(blob);
});

// 定义填充案例按钮点击的基本事件
$('#fillExample').click(function (e) { 
    e.preventDefault();
    $('#inputCode').val(test_code1);
});
//实现Map转化为文本形式
function MapToStr(name,my_map)
{
    res = `${name}集合的结果为:\n`
    for(let item of my_map.entries())
    {
        res+=`${name}{${item[0]}}->{`
        for(let sign of item[1])
        {
            res+=sign+','
        }
        res+=`}\n`
    }
    res+=`\n`
    return res
}