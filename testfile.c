/*这是用于测试的代码123*/
/*123你好*/
//123，2022快乐

int program(int a,int b,int c)
{
 int i;
 int j;
 i=0;  
 if(a>(b+c))
 {
  j=a+(b*c+1);
 }
 else
{
  j=a;
}
while(i<100)
{
  i=j*2+i;
}
 return i;
}
int demo(int a)
{
 a=a+2;
 return a*2;
}
void main()
{
    int a;
    int b;
    int c;
    a=3;
    b=4;
    c=2;
    a=program(a,b,demo(c));
    return;
}
