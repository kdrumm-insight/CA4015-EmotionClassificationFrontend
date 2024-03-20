/* This file contains any Javascript code needed to make a call to
   the sentiment analysis API and to return the result of said call. */
function getSentimentAnalysis() {
    /* Convert the button on the page to a "loading button" by changing its text. */
    let analyzeButton = document.getElementById("analyze-btn");
    analyzeButton.innerHTML = '<i id="loading-icon" class="fa fa-circle-o-notch fa-spin"></i>Analyzing Text...';
    analyzeButton.setAttribute("disabled", true);

    /* Retrieve the text from the large text box, to be analysed. */
    let relevantText = document.getElementById("text-input").value;

    /* In the event that some text was entered in the large text box, carry on, otherwise display a warning message. */
    if (relevantText) {
        /*
            Make a "fetch" request to the sentiment analysis API to retrieve the sentiment for the provided text.
            N.B. We are making a "GET" request here as we are retrieving some data.
                We are also utilising string interpolation make a request to <SERVICE_URL>/<TEXT_TO_BE_ANALYSED>.
        */
        fetch(`${URI_SentimentAnalysisAPI}${relevantText}`, {
            method: 'get',
        }).then(response => response.text())
            .then(data => {
                /*
                    Once the request has been completed, this block of code will be run, so we should:
                        - Store the result of the sentiment analysis.
                        - Set the contents of the result container on the main page to the result of said analysis.
                        - Revert the content on the "Analyze Text" button.
                */
                /* Store the result of the sentiment analysis. */
                let analysisResult = data;

                /* Set the contents of the result container on the main page to the result of said analysis. */
                document.getElementById("analysis-result").innerHTML = analysisResult;

                /* Revert the content on the "Analyze Text" button. */
                analyzeButton.innerHTML = 'Analyze Text';
                analyzeButton.removeAttribute("disabled");
            })
            .catch((error) => {
                /* Log the error that was thrown. */
                console.error(error);

                /* Revert the content on the "Analyze Text" button. */
                analyzeButton.innerHTML = 'Analyze Text';
                analyzeButton.removeAttribute("disabled");
            });
    } else {
        document.getElementById("analysis-result").innerHTML = "No text was provided!";
    }
}