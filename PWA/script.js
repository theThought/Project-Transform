document.addEventListener("DOMContentLoaded", function () {
  
  const url = `https://ipsosbackend.onrender.com/`; 
   
  fetch(url)
      .then(response => response.text())
      .then(html => {
          const surveyContainer = document.getElementById("survey-container");
          surveyContainer.innerHTML = html;
      })
      .catch(error => {
          console.error('Error fetching external content:', error);
      });
      console.log(`Test Full url is: ${url}`);
});
