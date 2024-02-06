// document.addEventListener("DOMContentLoaded", function () {
//     const questionContainer = document.getElementById("question-container");
//     const submitButton = document.getElementById("submit-btn");
//     let currentQuestionIndex = 1;
//     const responses = [];
  
//     renderQuestion(currentQuestionIndex);
  
//     function renderQuestion(questionId) {
//       fetchQuestion(questionId)
//         .then(data => {
//           const question = data.question;
//           if (question) {
//             const questionDiv = createQuestionDiv(question);
//             questionContainer.innerHTML = "";
//             questionContainer.appendChild(questionDiv);
//           } else {
//             if (currentQuestionIndex === questions.length) {
//               submitButton.style.display = "block";
//               submitButton.addEventListener("click", handleSubmitButtonClick);
//             }
//           }
//         })
//         .catch(error => {
//           console.error("Error fetching question:", error);
//         });
//     }
  
//     function fetchQuestion(questionId) {
//       return fetch(`http://localhost:5001/api/questions/${questionId}`)
//         .then(response => response.json())
//         .catch(error => {
//           throw error;
//         });
//     }
  
//     function createQuestionDiv(questionObj) {
//       const questionDiv = document.createElement("div");
//       questionDiv.className = "question";
  
//       const label = document.createElement("label");
//       label.textContent = questionObj.label;
//       questionDiv.appendChild(label);
  
//       const input = document.createElement("input");
//       input.type = "text";
//       input.id = "answer-input";
//       questionDiv.appendChild(input);
  
//       const submit = document.createElement("div");
//       submit.classList.add("submit");
  
//       if (questionObj.isFinal) {
//         const submitButton = document.createElement("button");
//         submitButton.className = "submit";
//         submitButton.textContent = "Submit";
//         submitButton.addEventListener("click", handleSubmitButtonClick);
//         submit.appendChild(submitButton);
//       } else {
//         const nextButton = document.createElement("button");
//         nextButton.className = "next ";
//         nextButton.className = "a-button-next";
//         nextButton.textContent = "Next";
//         nextButton.addEventListener("click", () => handleNextButtonClick(questionObj.id));
//         submit.appendChild(nextButton);
//       }
  
//       questionDiv.appendChild(submit);
  
//       return questionDiv;
//     }
  
//     function handleNextButtonClick(currentQuestionId) {
//       const answerInput = document.getElementById("answer-input");
//       const answer = answerInput.value.trim();
  
//       if (answer) {
//         responses.push({ questionId: currentQuestionId, answer });
//         console.log(`Question ${currentQuestionId}: ${answer}`);
//         currentQuestionIndex++;
//         renderQuestion(currentQuestionIndex);
//       } else {
//         displayWarning("Please answer the question before proceeding.");
//       }
//     }
  
//     function displayWarning(message) {
//       const warningDiv = document.createElement("div");
//       warningDiv.className = "warning";
//       warningDiv.textContent = message;
  
//       questionContainer.appendChild(warningDiv);
  
//       setTimeout(() => {
//         questionContainer.removeChild(warningDiv);
//       }, 3000);
//     }
  
//     function handleSubmitButtonClick() {
//       console.log("Submit clicked");
//       console.log("Final responses:", responses);
//       // What ajax should run now?
//     }
//   });
document.addEventListener("DOMContentLoaded", function () {
  console.log('DOMContentLoaded event fired!');


  // fetch('https://phpstack-737274-4290065.cloudwaysapps.com/project/ipsos/')
  fetch('https://online-stg.ipsosinteractive.com/mrIWeb/mrIWeb.dll?I.Project=S20223226')
    .then(response => response.text())
    .then(html => {
      const questionContainer = document.getElementById("question-container");
      questionContainer.innerHTML = html; 
    })
    .catch(error => {
      console.error('Error fetching external content:', error);
    });
});






