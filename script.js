// Run through question
let transition = false;
let questionLine = 0;
let questionLines = [];
let activeQuestion;
function runQuestion() {
	activeQuestion = document.querySelector(".question[data-active='1']");
	transition = true;
	questionLine = 0;
	questionLines = activeQuestion.querySelectorAll(".question-line");
	runLines();
	let wait = setInterval(() => {
		if (transition == false) {
			clearInterval(wait);
			if (activeQuestion.dataset.next != "null") {
				gotoQuestion(activeQuestion.dataset.next);
			}
		}
	}, 50)
}

// Fade in individual lines
function runLines() {
	let activeLine = questionLines[questionLine];
	activeLine.dataset.active = 1;
	setTimeout(() => {
		questionLine += 1;
		if (questionLine >= questionLines.length) {
			transition = false;
		} else {
			runLines();
		}
	}, activeLine.dataset.delay)
}

// Transition between questions
function gotoQuestion(question) {
	let targetQuestion = document.querySelector(`.question[data-question='${question}']`);

	// Transition out current question
	activeQuestion.dataset.active = 0;

	setTimeout(() => {
		for (let line of targetQuestion.querySelectorAll(".question-line")) {
			line.dataset.active = 0;
		}
		targetQuestion.dataset.active = 1;
		setTimeout(() => {
			runQuestion();
		}, 50);
	}, 1000)
}

// Start the show
let firstQuestion = document.querySelector(".question[data-question='0']");
firstQuestion.dataset.active = 1;
setTimeout(() => {
	runQuestion();
}, 50)

// Store user responses for later reference
let responses = {}
function setResponse(key, value) {
	responses[key] = value;
}

// Populate response from previous question
function populateResponse(target, key) {
	let element = document.querySelector("#"+target);
	element.innerText = responses[key];
}

// Site timer
let time = 0;
let timestamp = document.querySelector("#timestamp");
setInterval(() => {
	time++;
	timestamp.innerText = time;
}, 1000)

// Create options for question (NOT IN USE)
function populateOptions(question) {
	let options = question.querySelector(".question-options");
	let temp = "";
	for (let i=0; i<parseInt(options.dataset.quantity); i++) {
		temp += `<button class="question-line question-option" onclick="gotoQuestion('${options.dataset.next}'); setResponse('${options.dataset.record}', '${optionSource[question.dataset.source][i]}')" data-delay="300" data-active="0">${optionSource[question.dataset.source][i]}</button>`
	}
	options.innerHTML += temp;
}