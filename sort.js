/**
 * Created by gd on 2017/2/7.
 */

window.onload=function(){

    class Sort{
        constructor(length,type,wrap){
            this.length=length;
            this.type=type;
            this.wrap=wrap;
            this.arry=[];
            this.animateArr=[];
        }

        creatView(){

            for(let i=0;i<this.length;i++){
                this.arry.push(Math.ceil(Math.random()*this.length))
            };
            this.arry = [...new Set(this.arry)];

            this.wrap.innerHTML="";
            for(let i=0;i<this.arry.length;i++){
                let el=document.createElement("p");
                Object.assign(el.style,{
                    width:"20px",
                    position:"absolute",
                    backgroundColor:"black",
                    left: (i+1)*25+"px",
                    bottom: "10px",
                    height: 10*this.arry[i]+"px",
                    transition:"left .8s ease"
                })
                el.className="item"+this.arry[i];
                this.wrap.appendChild(el)
            }
        }

        sort(){
            switch (this.type){
                case 1:
                    this.creatView()
                    this.animateArr=[];
                    this.bubble();
                    this.animation();
                    break;
                case 2:
                    this.creatView()
                    this.animateArr=[];
                    this.arry=this.quickSort(this.arry)
                    this.animation()
                    break;
                case 3:
                    this.creatView()
                    this.animateArr=[];
                    this.selectSort();
                    this.animation()
                    break;
                case 4:
                    this.creatView()
                    this.animateArr=[];
                    this.insertSort();
                    this.animation()
                    break;
            }
        }

        /*冒泡排序*/
        bubble(){
            for(let i=0;i<this.arry.length-1;i++){
                for(let j=i+1;j<this.arry.length;j++){

                    if(this.arry[i]>this.arry[j]){
                        let iValue=this.arry[i]
                        let jValue=this.arry[j]
                        let animate=function(){
                            return new Promise(function(reslove){
                                setTimeout(function(){
                                    let afterL=document.querySelector(".item"+iValue).style.left;
                                    let beforeL=document.querySelector(".item"+jValue).style.left;
                                    document.querySelector(".item"+iValue).style.left=beforeL;
                                    document.querySelector(".item"+jValue).style.left=afterL
                                    reslove();
                                },1000)
                            })
                        }
                        this.animateArr.push(animate);
                        let temp=this.arry[i];
                        this.arry[i]=this.arry[j]
                        this.arry[j]=temp;
                    }
                }
            }
        }

        /*快速排序*/
        quickSort(arr){
            if (arr.length <= 1) { return arr; }
            let pivotIndex = Math.floor(arr.length / 2);
            let pivot = arr.splice(pivotIndex, 1)[0];
            let left = [];
            let right = [];
            arr.forEach(function(num){
                if (num <= pivot) {
                    left.push(num);
                } else {
                    right.push(num);
                }
            })
            let animate=[...left,pivot,...right]
            let ani=function(){
                return new  Promise(function(resolve){
                    setTimeout(function(){
                        let copy=animate.map(i=>document.querySelector(".item"+i).offsetLeft)
                        let offSetlef=Math.min(...copy)
                        for(let i=0;i<animate.length;i++){
                            document.querySelector(".item"+animate[i]).style.left=(i)*25+offSetlef+"px"
                        }
                        resolve();
                    },1000)
                })
            }

            this.animateArr.push(ani)
            return [...this.quickSort(left),pivot,...this.quickSort(right)]
        }

        /*选择排序*/
        selectSort(){
            for(let i=0;i<this.arry.length;i++){
                let minIndex=i;
                let min=this.arry[minIndex];
                for(let j=i+1;j<this.arry.length;j++){
                    if(this.arry[minIndex]>this.arry[j]){
                        minIndex=j;
                        min=this.arry[minIndex];
                    }
                }

                let temp=this.arry[i];
                let iValue=this.arry[i];
                let mValue=min;
                this.arry[i]=min;
                this.arry[minIndex]=temp;

                let animate=function(){
                    return new Promise(function(resolve){
                        setTimeout(function(){
                            let iLeft=document.querySelector(".item"+iValue).style.left;
                            let mLeft=document.querySelector(".item"+mValue).style.left;
                            document.querySelector(".item"+iValue).style.left=mLeft;
                            document.querySelector(".item"+mValue).style.left=iLeft;
                            resolve();
                        },1000)
                    })
                }
                this.animateArr.push(animate);
            }
            console.log(this.arry)
        }

        /*插入排序*/
        insertSort(){
            for(let i = 1; i < this.arry.length; i++){

                if(this.arry[i] < this.arry[i-1]){

                    let guard = this.arry[i];

                    let j = i - 1;
                    this.arry[i] = this.arry[j];


                    while(j >= 0 && guard < this.arry[j]){
                        this.arry[j+1] = this.arry[j];
                        j--;
                    }

                    this.arry[j+1] = guard;

                    let curArry=this.arry.concat();
                    let animate=function(){
                        return new Promise(function(resolve){
                            setTimeout(function(){
                                for(let i=0;i<curArry.length;i++){
                                    document.querySelector(".item"+curArry[i]).style.left=(i+1)*25+"px"
                                }
                                resolve();
                            },1000)
                        })
                    }

                    this.animateArr.push(animate);

                }

            }
        }

        async animation(){
            for(let fn of this.animateArr){
                await fn()
            }

        }

    }

    let $=selector => document.querySelector(selector);
    let $All=selector => document.querySelectorAll(selector);
    let length=20;
    let type=1
    for(let el of $All(".type")){
        el.onclick=function(){
            type=parseInt(this.value)
        }
    }
    for(let el of $All(".number")){
        el.onclick=function(){
            length=parseInt(this.value)
        }
    }

    $("#start").onclick=function(){
        let sortTest=new Sort(length,type,$("#wrap"));
        sortTest.sort();
        console.log(sortTest.arry)
    }


}