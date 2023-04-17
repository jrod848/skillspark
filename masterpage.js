import { session } from 'wix-storage';
import wixWindow from 'wix-window';
import wixData from 'wix-data';
import { timeline } from 'wix-animations';

//Create animation for the feedback pop-up box
const popBoxAnimation = timeline()
    .add($w('#popBox'), { duration: 500, opacity: 0 })

$w.onReady(function () {
    askFeedback();
    initBtn();
});

//Initialize all the buttons
function initBtn() {
    $w("#ratingInput").onChange(event => {
        console.log("fired")
        $w("#ratingInput2").value = $w("#ratingInput").value;
        $w("#popBox").changeState("form");
    })
    $w("#submitBtn").onClick(event => {
        if (!$w('#emailInput').valid) {
            let validationMessage = '';
            if (!$w('#emailInput').valid) {
                if (!$w('#emailInput').value) {
                    validationMessage += 'Please enter an email address\n';
                }
            }
            $w('#validationMessages').text = validationMessage;
            $w('#validationMessages').expand();
        } else {
            let toInsert = {
                "email": $w("#emailInput").value,
                "feedback": $w("#feedbackInput").value,
                "rating": $w("#ratingInput2").value
            }
            wixData.insert("feedback", toInsert)
                .then((item) => {
                    session.setItem("submitted", "yes");
                    $w("#popBox").changeState("bye");
                    setTimeout(() => {
                        popBoxAnimation.play();
                    }, 3000)
                })
                .catch((err) => {
                    $w('#validationMessages').text = "An error has occured. Please try again later";
                    $w('#validationMessages').expand();
                });

        }
    })

    $w("#closeFormBtn").onClick(event => {
        $w("#popBox").collapse()
    })
    $w("#closeIntroBtn").onClick(event => {
        $w("#popBox").collapse()
    })
}

//Checks if user has already submitted feedback before opening the feedback form.
function askFeedback() {
    if (!session.getItem("submitted")) {
        setTimeout(() => {
            if (wixWindow.formFactor == "Mobile" || wixWindow.formFactor == "Tablet") {
                wixWindow.openLightbox("feedbackLightbox");
            } else {
                $w("#popBox").expand();
            }
        }, 15000);
    }
}
