const form=document.getElementById("form");//ターゲットの作成
const input1=document.getElementById("input1");
const input2=document.getElementById("input2");
const input3=document.getElementById("input3");
const ul=document.getElementById("ul");
const ca=document.getElementById("ca");
const sentence=document.getElementById("sentence");

const todos = JSON.parse(localStorage.getItem("todos"));//保存先のターゲット

if(todos){//保存があるなら生成
    todos.forEach(todo=>{
        add(todo);
    })
}

form.addEventListener("submit",function(event){//入力
    event.preventDefault();//入力時のリロードをさせない
    if(input1.value&&input2.value){
        add(null);//生成
    }
    // add(null,2);//生成
    // add(null,3);//生成
});

function add(todo){//生成の仕方
    let todoText1;
    let todoText2;
   // let todoText3;

    todoText1=input1.value;//todoTextはinput1.valueが初期値  
    input1.value="";//入力後フォームを空白にする

    todoText2=input2.value; 
    input2.value="";//入力後フォームを空白にする

    // todoText3=input3.value;
    // input3.value="";//入力後フォームを空白にする
    
    
    
    if(todo){//保存がある場合の初期値
         todoText1 = todo.text1;//後で3つに分ける
         todoText2 = todo.text2;
         //todoText3 = todo.text3;
     }

    if(todoText1&&todoText2){//todotextが存在するときのみ動作。空白時にリストを生成しない。
        const div =document.createElement("div");//listを作成
        const h3 = document.createElement("h1");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        //div.innerText=todoText1;  //listにtodoTextを入力
        h3.innerText=todoText1;
        p1.innerText=todoText2;
        //p2.innerText=todoText3;
        div.classList.add("card");//listを見やすくする
        h3.classList.add("memo");
       // h3.id='word';
        p1.classList.add("p1");
        //p1.id='mean';
       // p2.classList.add("p2");


        if(todo&&todo.completed){//保存に線が表示されていたら、更新しても線を表示
            div.classList.add("text-decoration-line-through");
        }

        div.addEventListener("contextmenu",function(event){//listを右クリックしたら削除
            event.preventDefault();//defaultを消す
            div.remove();//listを削除
            saveData();//削除した内容を保存
        });

        div.addEventListener("click",function(event){//左クリックしたら掛け線を表示
            div.classList.toggle("text-decoration-line-through");//掛け線
            saveData();//掛け線の内容を保存
        });

        ca.appendChild(div);//listをulの子分にする
        div.appendChild(h3);
        div.appendChild(p1);
        //div.appendChild(p2);
        saveData();//入力時の内容を保存
    }
}

function saveData(){//保存の仕方
    const divs =document.querySelectorAll(".card");//listの配列
    const h3s =document.querySelectorAll(".memo");//listの配列
    const p1s =document.querySelectorAll(".p1");//listの配列
    //const p2s =document.querySelectorAll(".p2");//listの配列

    let todos=[];//保存する配列の作成
    for(let i=0;i<divs.length;i++){
        let todo={
            text1: h3s[i].innerText,
            text2: p1s[i].innerText,
            //text3: p2s[i].innerText,
            completed: divs[i].classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    }
    localStorage.setItem("todos",JSON.stringify(todos));//todosをlocalStorageに保存
}



function jenerate(){
    // const memo=document.getElementsByClassName(".memo");
    // const p1=document.getElementsByClassName(".p1");
    let checkbox = document.querySelectorAll('input[type="checkbox"]:checked');

    const divN =document.createElement("div");

    // let texts=[];
    // for(let i=0;i<card.length;i++){
    //     let text={
    //         text1:memo[i].inneerText,
    //         text2:p1[i].innerText,
    //     };
    //     texts.push(text);
    //     divN.innerText=text.text1;

    // }


    let ran=[];
    ran[0]=0;
    ran[1]=1;
    ran[2]=2;
    ran[3]=3;
    let quiz=[];

    if(todos.length>3){
        ran[0]=todos[Math.floor(Math.random()*todos.length)].text2;
        ran[1]=todos[Math.floor(Math.random()*todos.length)].text2;
        ran[2]=todos[Math.floor(Math.random()*todos.length)].text2;
        for(let i=0;i<todos.length;i++){
            while(true){
              ran[3]=todos[i].text2
              ran[0]=todos[Math.floor(Math.random()*todos.length)].text2;
              ran[1]=todos[Math.floor(Math.random()*todos.length)].text2;
              ran[2]=todos[Math.floor(Math.random()*todos.length)].text2;  
              if(ran[3]!=ran[0]&&ran[3]!=ran[1]&&ran[3]!=ran[2]&&ran[0]!=ran[1]&&ran[0]!=ran[2]&&ran[1]!=ran[2]){

                shuffleArray(ran);
                
                let qui={
                    question:todos[i].text1,
                    answer:[ran[0],ran[1],ran[2],ran[3]],
                    correct:todos[i].text2

                };

                quiz.push(qui);

                break;
              }
            }
            
           

            
        }

        localStorage.setItem("quiz",JSON.stringify(quiz));
        alert("成功");

    }
    else{
        alert("単語カードを4つ以上作成してください");
    }

    //divN.innerText=quiz;
    //cardのinnerTextにアクセスして、文字列を表示する,続きのヒントは写真見て
    sentence.appendChild(divN);

    if(checkbox.length){
        writeCsv(quiz);
    }

    location.reload();
    
    
}




function shuffleArray(inputArray){
    inputArray.sort(()=>Math.random()-0.5);
}

function writeCsv(quiz){//テキストファイルに書き込み
    const blob=new Blob([quiz],{type:"text/plain"});

    const link=document.createElement('a');

    link.href=URL.createObjectURL(blob);

    link.download='quiz.txt';

    link.click();
}