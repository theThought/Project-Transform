// document.addEventListener("DOMContentLoaded", function () {
// //Loading the test frame from kevin
  
//   fetch('https://online-stg.ipsosinteractive.com/mrIWeb/mrIWeb.dll?I.Project=S20223226')
//     .then(response => response.text())
//     .then(html => {
//       const questionContainer = document.getElementById("question-container");
//       questionContainer.innerHTML = html; 
//     })
//     .catch(error => {
//       console.error('Error fetching external content:', error);
//     });
// });


// document.addEventListener("DOMContentLoaded", function () {
//     // Example dynamic parameters
//     const i_project = 'S20223226';
//     const i_timeout = 60000; // 1 minute
//     const i_test = 0; // Not a test respondent

 

//     // Construct the URL with dynamic parameters
//     const queryParams = new URLSearchParams({
//         i_project,
//         i_timeout,
//         i_test
//     });
//     const url = `/proxy?${queryParams.toString()}`; 

//     // Fetch content from the Express server
//     fetch(url)
//         .then(response => response.text())
//         .then(html => {
//             const questionContainer = document.getElementById("question-container");
//             questionContainer.innerHTML = html;
//         })
//         .catch(error => {
//             console.error('Error fetching external content:', error);
//         });
// });




document.addEventListener("DOMContentLoaded", function () {
    fetch('https://online-stg.ipsosinteractive.com/mrIWeb/mrIWeb.dll?I.Project=S20223226')
      .then(response => response.text())
      .then(html => {
        const surveyContainer = document.getElementById("survey-container");
        surveyContainer.innerHTML = html; // Update the UI with the fetched survey content
      })
      .catch(error => {
        console.error('Error fetching survey content:', error);
      });
  });
  