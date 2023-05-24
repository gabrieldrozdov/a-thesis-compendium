let root = document.querySelector(':root');

// Set active selection for group of options
function toggleOption(setting, e) {
	for (let option of document.querySelectorAll(`[data-group="${setting}"] .settings-question-option`)) {
		option.dataset.active = 0;
	}
	e.dataset.active = 1;
}

// Set print format and show relevant questions
let format = "book";
function setFormat(val) {
	format = val;
	for (let question of document.querySelectorAll("[data-format]")) {
		question.dataset.active = 0;
	}
	for (let question of document.querySelectorAll(`[data-format="${val}"]`)) {
		question.dataset.active = 1;
	}
}

// Show units question
function showUnits() {
	document.querySelector("#units").dataset.active = 1;
}

// Set units and show relevant units
let units = "in";
function setUnits(val) {
	units = val;
	for (let e of document.querySelectorAll(`[data-units]`)) {
		e.dataset.active = 0;
	}
	for (let e of document.querySelectorAll(`[data-units='${val}']`)) {
		e.dataset.active = 1;
	}
}

settings = {
	"bookWidth": [8.5, .5, 100],
	"bookHeight": [11, .5, 100],
	"bookMargin": [.5, 0, 3],
	"bookFont": [12, 1, 100],
	"bookLeading": [15, 0, 200],
	"bookTracking": [0, -5, 20],
	"bookFont": [12, 1, 100],
	"bookWeight": 400,
	"bookStyle": 50,
	"posterWidth": [20, .5, 100],
	"posterHeight": [30, .5, 100],
	"posterMargin": [.5, 0, 3],
	"posterStyleStart": 100,
	"posterStyleEnd": 0,
	"posterWeightStart": 100,
	"posterWeightEnd": 900
}
function setValue(property, value) {
	settings[property] = value;
}
function changeValue(property, increment) {
	settings[property][0] = settings[property][0] + increment;
	// min
	if (settings[property][0] < settings[property][1]) {
		settings[property][0] = settings[property][1];
	// max
	} else if (settings[property][0] > settings[property][2]) {
		settings[property][0] = settings[property][2];
	}

	// Update display text
	document.querySelector(`[data-display="${property}"`).innerText = settings[property][0];
}

// Create book
function generateBook() {
	let container = document.querySelector(".container");
	container.style.overflow = "unset";

	// Set font variation settings
	let printables = document.querySelectorAll(".printable");
	for (let i=0; i<printables.length; i++) {
		printables[i].style.fontVariationSettings = `"wght" ${settings["bookWeight"]}, "SRFF" ${settings["bookStyle"]}`;
		printables[i].dataset.book = 1;
	}
	root.style.setProperty("--font-size", settings["bookFont"][0]+"pt");

	// Set page settings
	let page = document.querySelector("#page");
	page.innerHTML = `
		@page {
			size: ${settings["bookWidth"][0]}${units} ${settings["bookHeight"][0]}${units};
			margin: ${settings["bookMargin"][0]}${units};
		}
	`;
	let printout = document.querySelector(".printout");
	printout.style.width = `${settings["bookWidth"][0]}${units}`;
	printout.style.height = `${settings["bookHeight"][0]}${units}`;
	printout.style.textAlign = `left`;
	printout.style.lineHeight = `${settings["bookLeading"][0]}pt`;
	printout.style.letterSpacing = `${settings["bookTracking"][0]}pt`;
	window.print();
	container.style.overflow = "hidden";
}

// Create poster
function generatePoster() {
	// Prevent interaction temporarily
	let container = document.querySelector(".container");
	let generateBtn = document.querySelector("#generate-poster");
	container.style.pointerEvents = "none";
	generateBtn.style.opacity = .5;
	generateBtn.innerText = "Generating poster, please wait. . .";

	// Set font variation settings
	let printables = document.querySelectorAll(".printable");
	for (let i=0; i<printables.length; i++) {
		printables[i].style.fontVariationSettings = `"wght" ${(i/printables.length)*(settings["posterWeightEnd"]-settings["posterWeightStart"])+settings["posterWeightStart"]}, "SRFF" ${(i/printables.length)*(settings["posterStyleEnd"]-settings["posterStyleStart"])+settings["posterStyleStart"]}`;
		printables[i].dataset.book = 0;
	}

	// Set page settings
	let page = document.querySelector("#page");
	page.innerHTML = `
		@page {
			size: ${settings["posterWidth"][0]}${units} ${settings["posterHeight"][0]}${units};
			margin: ${settings["posterMargin"][0]}${units};
		}
	`;
	let printout = document.querySelector(".printout");
	printout.style.width = `${settings["posterWidth"][0]}${units}`;
	printout.style.height = `${settings["posterHeight"][0]}${units}`;
	printout.style.textAlign = `justify`;
	printout.style.lineHeight = `2.2em`;
	printout.style.letterSpacing = `unset`;

	// Fit text to page size
	let currentSize = 1;
	root.style.setProperty("--font-size", currentSize+"rem");
	setTimeout(() => {
		let printoutEnd = document.querySelector("#printout-end");
		let printoutPosition = printout.getBoundingClientRect();
		let printoutEndPosition = printoutEnd.getBoundingClientRect();
		if (printoutEndPosition.bottom > printoutPosition.bottom) {
			let setSizing = setInterval(() => {
				currentSize -= .005;
				root.style.setProperty("--font-size", currentSize+"rem");
		
				printoutPosition = printout.getBoundingClientRect();
				printoutEndPosition = printoutEnd.getBoundingClientRect();
				if (printoutEndPosition.bottom < printoutPosition.bottom) {
					clearInterval(setSizing);
					container.style.overflow = "unset";
					window.print();
					container.style.pointerEvents = "all";
					container.style.overflow = "hidden";
					generateBtn.style.opacity = 1;
					generateBtn.innerText = "Generate your poster";
				}
			}, 5)
		} else {
			let setSizing = setInterval(() => {
				currentSize += .005;
				root.style.setProperty("--font-size", currentSize+"rem");
		
				printoutPosition = printout.getBoundingClientRect();
				printoutEndPosition = printoutEnd.getBoundingClientRect();
				if (printoutEndPosition.bottom > printoutPosition.bottom) {
					clearInterval(setSizing);
					root.style.setProperty("--font-size", currentSize-.005+"rem");
					container.style.overflow = "unset";
					window.print();
					container.style.pointerEvents = "all";
					container.style.overflow = "hidden";
					generateBtn.style.opacity = 1;
					generateBtn.innerText = "Generate your poster";
				}
			}, 5)
		}
	}, 500)
}
// generatePoster();