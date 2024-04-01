/* This file contains any Javascript code needed to make a call to
   the emotion classification API and to return the result of said call. */
function getClassifiedEmotion() {
    /* Convert the button on the page to a "loading button" by changing its text. */
    let classifyButton = document.getElementById("classify-btn");
    classifyButton.innerHTML = 'Classifying Text...';
    classifyButton.setAttribute("disabled", true);

    /* Retrieve the text from the large text box, to be analysed. */
    let relevantText = document.getElementById("text-input").value;

    /* In the event that some text was entered in the large text box, carry on, otherwise display a warning message. */
    if (relevantText) {
        /*
            Make a "fetch" request to the emotion classification API to retrieve the emotion for the provided text.
            N.B. We are making a "GET" request here as we are retrieving some data.
                 We are also utilising string interpolation to make a request to <SERVICE_URL>/<TEXT_TO_BE_ANALYSED>.
        */
        fetch(`${URI_EmotionClassificationAPI}${relevantText}`, {
            method: 'get',
        }).then(response => response.text())
            .then(data => {
                /*
                    Once the request has been completed, this block of code will be run, so we should:
                        - Store the result of the emotion classification.
                        - Set the contents of the result container on the main page to the result of said classification.
                        - Revert the content on the "Classify Text" button.
                */
                /* Store the result of the emotion classification. */
                let classification = data;

                /* Set the contents of the result container on the main page to the result of said classification. */
                document.getElementById("classification-result").innerHTML = classification;

                /* Revert the content on the "Analyze Text" button. */
                classifyButton.innerHTML = 'Classify Text';
                classifyButton.removeAttribute("disabled");
            })
            .catch((error) => {
                /* Log the error that was thrown. */
                console.error(error);

                /* Revert the content on the "Analyze Text" button. */
                classifyButton.innerHTML = 'Classify Text';
                classifyButton.removeAttribute("disabled");
            });
    } else {
        document.getElementById("classification-result").innerHTML = "No text was provided!";
    }
}