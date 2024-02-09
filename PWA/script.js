document.addEventListener("DOMContentLoaded", function () {
  // Example dynamic parameters
  const i_project = 'S20223226';
  const i_timeout = 60000; // 1 minute
  const i_test = 0; // Not a test respondent

  // Construct the URL with dynamic parameters
  const queryParams = new URLSearchParams({
      'I.Project': i_project,
      'I.Timeout': i_timeout,
      'I.Test': i_test
  });
  // const url = `/?${queryParams.toString()}`; 
   const url = `https://ipsosbackend.onrender.com/`; 


  // Fetch content from the Express server
  fetch(url)
      .then(response => response.text())
      .then(html => {
          const surveyContainer = document.getElementById("survey-container");
          surveyContainer.innerHTML = html;
      })
      .catch(error => {
          console.error('Error fetching external content:', error);
      });
      console.log(`Full url is: ${url}`);
});
