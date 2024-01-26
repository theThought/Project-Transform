(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var questionsContainer = document.getElementById('form-container');
        var currentQuestionIndex = 0;
        var lastScrollPosition = window.scrollY;

        function handleScroll() {
            console.log('Scroll event triggered');
            var scrollPosition = window.scrollY;

            if (scrollPosition > lastScrollPosition) {
                console.log('Scrolling down');
            } else if (scrollPosition < lastScrollPosition) {
                console.log('Scrolling up');
            }

            lastScrollPosition = scrollPosition;

            var questions = document.querySelectorAll('.question');
            var questionOffsetTop = questions[currentQuestionIndex].offsetTop;

            if (scrollPosition > questionOffsetTop) {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestionHTML(currentQuestionIndex);
                }
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'ArrowDown') {
                currentQuestionIndex++;
                var questions = document.querySelectorAll('.question');
                if (currentQuestionIndex < questions.length) {
                    loadQuestionHTML(currentQuestionIndex);
                    console.log('Current question ID:', currentQuestionIndex + 1);
                }
            }
        }

        function loadQuestionHTML(questionIndex) {
            var questionUrl = 'http://localhost:3000/questions/' + (questionIndex + 1);
            // Use Fetch API for modern syntax
            fetch(questionUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(question => {
                    var questions = document.querySelectorAll('.question');
                    questions.forEach(function (question) {
                        question.classList.remove('active');
                    });

                    var div = document.createElement('div');
                    div.classList.add('question', 'active');
                    div.innerHTML = '<p>' + question.text + '</p>' +
                        '<label for="' + question.id + '">' + question.label + ':</label>' +
                        '<input type="text" id="' + question.id + '" class="input-field">';

                    var nextButton = document.createElement('button');
                    nextButton.textContent = 'Next';
                    nextButton.addEventListener('click', function () {
                        currentQuestionIndex++;
                        loadQuestionHTML(currentQuestionIndex);
                    });
                    div.appendChild(nextButton);

                    questionsContainer.appendChild(div);

                    console.log(questionIndex);
                })
                .catch(error => {
                    console.error('Error fetching question ' + (questionIndex + 1) + ':', error.message);
                });
        }

        // Load the first question on page load
        loadQuestionHTML(currentQuestionIndex);

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('keydown', handleKeyDown);

        // Submit button
        var submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', function () {
            var messageElement = document.createElement('p');
            messageElement.textContent = 'Form submitted successfully!';
            questionsContainer.appendChild(messageElement);

            // Remove event listeners if needed
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('keydown', handleKeyDown);
        });
        questionsContainer.appendChild(submitButton);
    });
})();
