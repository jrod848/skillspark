import { createPrompt } from 'backend/openAI.jsw'

let objectArr = [{}];

$w.onReady(async function () {
    initBtn();
});

async function grabAnswer(jobTitle) {
    let answer = await createPrompt(jobTitle)
    let arr2 = answer.split('.').filter(item => !item.includes("\n") || !item.includes(""))
    objectArr = [
        { _id: '0', sentence: `${arr2[0]}` },
        { _id: '1', sentence: `${arr2[1]}` },
        { _id: '2', sentence: `${arr2[2]}` }
    ]
    return objectArr
}

function expandPreloader() {
    $w("#submitPrompt").disable()
    $w("#preoloader").expand()
}

function collapsePreloader() {
    $w("#submitPrompt").enable()
    $w("#preoloader").collapse()
}

async function initBtn() {
    $w("#submitPrompt").onClick(async () => {
        $w("#JobTitleInput").resetValidityIndication();
        if ($w("#JobTitleInput").valid) {
            $w("#errMsg").hide();
            $w("#JobTitleInput").resetValidityIndication();
            expandPreloader()
            const answer = await grabAnswer($w("#JobTitleInput").value)
            collapsePreloader()
            $w('#answerRepeater').onItemReady(($item, itemData, index) => {
                $item("#textAnswer").text = itemData.sentence;
            });
            $w('#answerRepeater').data = answer;
            $w("#answerRepeater").expand()
        } else {
            if($w("#JobTitleInput").value != "") {
                $w("#errMsg").show()
                }
            $w("#JobTitleInput").updateValidityIndication();
        }
    })
}
