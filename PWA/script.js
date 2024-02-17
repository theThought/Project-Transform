document.addEventListener("DOMContentLoaded", function () {
  
  //Loads no cors issues but not loading components
  //const url = `https://ipsosbackend.onrender.com/`; 

  //Direct link
  const url = `https://online-stg.ipsosinteractive.com/mrIWeb/mrIWeb.dll?I.Project=S20223226`; 
   
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
