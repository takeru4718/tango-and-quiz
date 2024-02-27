// const gi=localStorage.getItem("quiz");
const quiz = JSON.parse(localStorage.getItem("quiz"));
  
  const $window = window;
  const $doc = document;
  const $question = $doc.getElementById('js-question');
  const $buttons = $doc.querySelectorAll('.btn');
  
  const quizLen = quiz.length;
  let quizCount = 0;
  let score = 0;
  
  const init = () => {
    $question.textContent = quiz[quizCount].question;
  
    const buttonLen = $buttons.length;
    let btnIndex = 0;
  
    while(btnIndex < buttonLen){
      $buttons[btnIndex].textContent = quiz[quizCount].answer[btnIndex];
      btnIndex++;
    }
  };
  
  const goToNext = () => {
    quizCount++;
    if(quizCount < quizLen){
      init(quizCount);
    } else {
      // $window.alert('クイズ終了！');
      showEnd();
    }
  };
  
  const judge = (elm) => {
    if(elm.textContent === quiz[quizCount].correct){
      correctSound();
      score++;
      goToNext();
    } else {//解説ページの表示
        falseSound();
        goToNext();
    }
  };
  
  const showEnd = () => {
    $question.textContent = '終了！あなたのスコアは' + score + '/' + quizLen + 'です';
  
    const $items = $doc.getElementById('js-items');
    $items.style.visibility = 'hidden';
  };
  
  init();
  
  let answersIndex = 0;
  let answersLen = quiz[quizCount].answer.length;
  
//   const setumei=document.getElementById("setumei");

  while(answersIndex < answersLen){
    $buttons[answersIndex].addEventListener('click', (e) => {
      judge(e.target);
    });
    answersIndex++;
  }

  function add(){

    goToNext();

    // const div =document.createElement("div");
    // div.innerText=quiz[quizCount].setumei;
    // setumei.appendChild(div);

    // const button=document.createElement("button");
    // button.innerText="次へ";
    // setumei.appendChild(button);

    // //画像を張る場合,imgを作成
    // //const img=document.createElement("img");
    // //img.src="URL";
    // //あとは調整
    // button.addEventListener('click',function (event){
    //     goToNext();
    //     div.remove();
    //     button.remove();
    // });
  }

function correctSound(){
    document.getElementById('correct').play();
}

function falseSound(){
    document.getElementById('false').play();
}


  