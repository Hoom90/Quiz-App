//Getting the Tags to Show in HTML
const questionHolder = document.getElementById("questionHolder");
const answerHolder = document.getElementById("answerHolder");
const questionResult = document.getElementById("questionResult");

async function init() {
  const results = await readData();
  createQuestionPage(0, results);
  createResultPagination(results.length);
}
//This Method Get Data
async function readData() {
  const response = await fetch("./question.json");
  const obj = await response.json(response);
  const results = await obj.results;
  return results
}
//This Method Creates the Result And Pagiantion
function createResultPagination(questionsLength) {
  for (let i = 0; i < questionsLength; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", "question" + i + "result");
    questionResult.appendChild(div);
  }
}
//This Method Creates the Question And Answers
function createQuestionPage(index, results) {
  questionHolder.innerHTML = results[index].question;
  let answersLength = 1 + results[index].incorrect_answers.length;
  let answers = [];

  answers.push(results[index].correct_answer);
  for (let i = 0; i < results[index].incorrect_answers.length; i++) {
    answers.push(results[index].incorrect_answers[i]);
  }
  for (let i = 0; i < answersLength; i++) {
    let answer = document.createElement("div");
    answer.innerHTML = answers[i];
    // createRandomAnswers(answer)
    answer.setAttribute("onclick", "checkAnswer(this," + index + ")");
    answer.setAttribute("class", "answersBox")
    answerHolder.appendChild(answer);
  }
}
//This Method Removes Answers From HTML
function removeItemInPage(className){
  const elements = document.getElementsByClassName(className);
  for(let i =0;i<elements.length;i++)
  {
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[i]);
  }
  }
}
//This Method Creates Answers Randomly
function createRandomAnswers(answer) {
  let x = Math.random() * answers.length;
}
//This Method Checks the Answers
async function checkAnswer(text, index) {
  const results = await readData();
  checkEnd(results,index+1)
  let answer = text.textContent;
  if (answer == results[index].correct_answer) {
    document.getElementById(
      "question" + index + "result"
    ).style.backgroundColor = "green";
  } else {
    document.getElementById(
      "question" + index + "result"
    ).style.backgroundColor = "red";
  }
  removeItemInPage("answersBox");
  createQuestionPage(index + 1, results);
}
//This Method Checks if the End 'results'
function checkEnd(results,index){
  if(index == results.length){
    console.log("Done");
    questionHolder.innerHTML = "Questions Finished";
  }
}

init();