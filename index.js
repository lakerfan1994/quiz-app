let numRight = 0;
let questNum = 0;

//this function on click of the start button, hides the starting screen and 
//unhides the question page, then renders a question
function openQuiz(){
  $('.buttonStart').click(function() {
    $('.start-page').addClass('hidden');
    $('.question-page').removeClass('hidden');
    renderQuestion();
  })
}

//This function checks to see whether the user has answered all questions, if yes, it goes to the final screen, changes the question number to complete, and hides the question page, if not, it renders a new question in the question page
function renderQuestion(){
  if(questNum > 9) {
    goToFinalScreen();
    $('.questions-done').text('Complete!!');
    $('.question-page').addClass('hidden');
  }
  else {
  $('.questions-done').text(`Question ${questNum + 1}/10`);
  $('.question-page').empty();
  $('.question-page').append(
  `<div class= "row">
    <div class= "col-4 question block">
      <h2>${bagOfQuestions[questNum].question}</h2>
      <form>
        <fieldset>
          <legend>Select an option</legend>
          <div class= "answerOption"> 
            <label>
              <input type= "radio" role= "radio" value= '${bagOfQuestions[questNum].answers[0]}' name= "question" required/>
              <span>${bagOfQuestions[questNum].answers[0]}</span>
            </label>
          </div>
          <div class= "answerOption">
            <label>
              <input type= "radio" role= "radio" value= '${bagOfQuestions[questNum].answers[1]}' name= "question" required/>
              <span>${bagOfQuestions[questNum].answers[1]}</span>
            </label>  
          </div>
          <div class= "answerOption">
            <label>
              <input type= "radio" role= "radio" value= '${bagOfQuestions[questNum].answers[2]}' name= "question" required/>
              <span>${bagOfQuestions[questNum].answers[2]}</span>
            </label>  
          </div>   
          <div class= "answerOption">
            <label>
              <input type= "radio" role= "radio" value= '${bagOfQuestions[questNum].answers[3]}' name= "question" required/>
              <span>${bagOfQuestions[questNum].answers[3]}</span>
            </label>
          </div> 
          <button type= "submit" role= "button" class= "answerButton">Submit</button> 
        </fieldset>
      </form> 
    </div>
  </div>`)
  }
}
//This function on click of the submit button checks to see what answer the // user submitted. If the user didnt submit an answer, a pop up prompting the user to submit an answer is shown. If the user does submit an answer, the function determines whether thee answer was correct and gives a point and sends the user to the appropiate feedback screen.
function userAnswer() {
  $('.question-page').on('click', '.answerButton', function(event){
   
    const userAnswer = $('input:checked').val();
    if(userAnswer === undefined) {
     return;
    }
    else {
    event.preventDefault();
    const correctAnswer = bagOfQuestions[questNum].correctAnswer;
    if(userAnswer === correctAnswer) {
      giveAPoint(); 
      displayCorrectAnswerScreen();
    }
    else{
      displayIncorrectAnswerScreen();
    }
     
  }});
}
//This function simply adds a point to the users score and updates it in the DOM
function giveAPoint() {
  numRight++;
  $('.current-score').empty();
  $('.current-score').text(`Score: ${numRight}`);
}
//This function moves the user onto the next question from whichever feedback screen they were in
function nextQuestion() {
  $('.feedback-page-correct').on('click', '.continueButton', function(event){
       questNum++;
       $('.feedback-page-correct').addClass("hidden");
       $('.question-page').removeClass("hidden");
       renderQuestion();
       }
    ) 
        $('.feedback-page-incorrect').on('click', '.continueButton', function(event){
       questNum++;
       $('.feedback-page-incorrect').addClass("hidden");
       $('.question-page').removeClass("hidden");
       renderQuestion();
  })
 }


//This function unhides the correct answer screen and shows it to the user
function displayCorrectAnswerScreen() {
  $('.question-page').addClass('hidden');
  $('.feedback-page-correct').removeClass("hidden")
}

//This function unhides the correct answer screen, and updates it with the 
//correct answer appropiate to the current question the user is on.
function displayIncorrectAnswerScreen() {
  $('.question-page').addClass('hidden');
  $('.custom-response').empty();
  $('.custom-response').text(`Sorry! The correct answer was  ${bagOfQuestions[questNum].correctAnswer}`);
  $(".feedback-page-incorrect").removeClass("hidden")

}
//This function uses the calculateScoreMessage function and generates a final screen for the user
function goToFinalScreen() {
  $('.final-message').empty();
  $('.final-message').text(calculateScoreMessage()); 
  $('.final-page').removeClass('hidden');
}

//This function determines how many points you scored correctly, and gives a unique message based on the score
function calculateScoreMessage() {
  if(numRight < 4) {
    return `You got ${numRight} points out of 10 correct...... maybe you should stick with soccer`;
  }
  if(3 < numRight && numRight < 8) {
    return `You got ${numRight} points out of 10 correct. Keep going and one day your NBA knowledge will be complete!`;
  }
  if(numRight > 7) {
    return `You got ${numRight} points out of 10 correct!!! You really do know 
    your basketball!!!!!`
  }
}
//This function on click of the restart button unhides the start screen, resets all variables, and hides all other screens
function restartQuiz() {
  $('.restart-button').click(function(event){
    $('.final-page').addClass("hidden");
    $('.start-page').removeClass('hidden');
    questNum = 0;
    numRight = 0;
    $('.questions-done').text("Question 0/10");
    $('.current-score').text("Score: 0")
  })
}
//This function runs the neccessary functions needed to run the quiz.
function runQuiz() {
  $(openQuiz());
  $(userAnswer());
  $(nextQuestion());
  $(restartQuiz());
}

runQuiz();