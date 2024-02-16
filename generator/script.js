let root = document.querySelector(':root');

// Set active selection for group of options
function toggleOption(setting, e) {
	for (let option of document.querySelectorAll(`[data-group="${setting}"] .settings-question-option`)) {
		option.dataset.active = 0;
	}
	e.dataset.active = 1;
}

// Hide and show questions and other elements
function hideElement(id) {
	let target = document.querySelector(id);
	target.dataset.active = 0;
}
function showElement(id) {
	let target = document.querySelector(id);
	target.dataset.active = 1;
}
function showAllElements() {
	for (let target of document.querySelectorAll('.settings-question')) {
		target.dataset.active = 1;
	}
	for (let target of document.querySelectorAll('.settings-question-break')) {
		target.dataset.active = 1;
	}
	document.querySelector('.generate').dataset.active = 1;
	setTimeout(() => {
		document.querySelector('.generate').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	}, 50);
}
function scrollToElement(id) {
	let target = document.querySelector(id);
	target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

// Settings
let settings = {
	"format": "book",
	"units": "imperial",
	"size": "sm",
	"width": '8.5in',
	"height": '11in',
	"sizeName": 'letter',
	"orientation": "portrait",
	"margins": "8%",
	"styleStart": 0,
	"styleStartName": 'sans serif',
	"styleEnd": 100,
	"styleEndName": 'serif',
	"weightStart": 100,
	"weightStartName": 'thin',
	"weightEnd": 900,
	"weightEndName": 'black',
	"capitalization": "none",
	"leading": '1.2em',
	"tracking": '0em',
	"fontSize": '12pt',
}
function setValue(property, value) {
	settings[property] = value;

	// Populate correct real values based on user input
	if (settings['units'] == 'imperial') {
		// Page size
		if (settings['size'] == 'xxs') {
			settings['width'] = '3.5in';
			settings['height'] = '5in';
			settings['sizeName'] = 'Postcard';
		} else if (settings['size']  == 'xs') {
			settings['width'] = '7in';
			settings['height'] = '10.5in';
			settings['sizeName'] = 'Executive';
		} else if (settings['size']  == 'sm') {
			settings['width'] = '8.5in';
			settings['height'] = '11in';
			settings['sizeName'] = 'Letter';
		} else if (settings['size']  == 'md') {
			settings['width'] = '11in';
			settings['height'] = '17in';
			settings['sizeName'] = 'Tabloid';
		} else if (settings['size']  == 'lg') {
			settings['width'] = '18in';
			settings['height'] = '24in';
			settings['sizeName'] = 'Small Poster';
		} else if (settings['size']  == 'xl') {
			settings['width'] = '24in';
			settings['height'] = '36in';
			settings['sizeName'] = 'Medium Poster';
		} else if (settings['size']  == 'xxl') {
			settings['width'] = '36in';
			settings['height'] = '48in';
			settings['sizeName'] = 'Large Poster';
		}
	} else if (settings['units'] == 'metric') {
		if (settings['size'] == 'xxs') {
			settings['width'] = '10.5cm';
			settings['height'] = '14.8cm';
			settings['sizeName'] = 'A6';
		} else if (settings['size']  == 'xs') {
			settings['width'] = '14.8cm';
			settings['height'] = '21cm';
			settings['sizeName'] = 'A5';
		} else if (settings['size']  == 'sm') {
			settings['width'] = '21cm';
			settings['height'] = '29.7cm';
			settings['sizeName'] = 'A4';
		} else if (settings['size']  == 'md') {
			settings['width'] = '29.7cm';
			settings['height'] = '42cm';
			settings['sizeName'] = 'A3';
		} else if (settings['size']  == 'lg') {
			settings['width'] = '42cm';
			settings['height'] = '59.4cm';
			settings['sizeName'] = 'A2';
		} else if (settings['size']  == 'xl') {
			settings['width'] = '59.4cm';
			settings['height'] = '84.1cm';
			settings['sizeName'] = 'A1';
		} else if (settings['size']  == 'xxl') {
			settings['width'] = '84.1cm';
			settings['height'] = '118.9cm';
			settings['sizeName'] = 'A0';
		}
	}

	// Show calculated page dimensions
	let pageMessage = document.querySelector("#page-message");
	if (settings['orientation'] == 'portrait') {
		pageMessage.innerText = `Your compendium’s pages are ${settings['sizeName']} size (${settings['width']} by ${settings['height']}) with a margin of ${settings['margins']} the page’s width.`
	} else if (settings['orientation'] == 'landscape') {
		pageMessage.innerText = `Your compendium’s pages are ${settings['sizeName']} Wide size (${settings['height']} by ${settings['width']}) with a margin of ${settings['margins']} the page’s width.`
	}

	// Display correct font setting description
	if (settings['styleStart'] == 0) {
		settings['styleStartName'] = 'sans serif';
	} else if (settings['styleStart'] == 50) {
		settings['styleStartName'] = 'flare';
	} else if (settings['styleStart'] == 100) {
		settings['styleStartName'] = 'serif';
	}
	if (settings['styleEnd'] == 0) {
		settings['styleEndName'] = 'sans serif';
	} else if (settings['styleEnd'] == 50) {
		settings['styleEndName'] = 'flare';
	} else if (settings['styleEnd'] == 100) {
		settings['styleEndName'] = 'serif';
	}
	if (settings['weightStart'] == 100) {
		settings['weightStartName'] = 'thin';
	} else if (settings['weightStart'] == 200) {
		settings['weightStartName'] = 'extra light';
	} else if (settings['weightStart'] == 300) {
		settings['weightStartName'] = 'light';
	} else if (settings['weightStart'] == 400) {
		settings['weightStartName'] = 'book';
	} else if (settings['weightStart'] == 500) {
		settings['weightStartName'] = 'medium';
	} else if (settings['weightStart'] == 600) {
		settings['weightStartName'] = 'semi bold';
	} else if (settings['weightStart'] == 700) {
		settings['weightStartName'] = 'bold';
	} else if (settings['weightStart'] == 800) {
		settings['weightStartName'] = 'extra bold';
	} else if (settings['weightStart'] == 900) {
		settings['weightStartName'] = 'heavy';
	}
	if (settings['weightEnd'] == 100) {
		settings['weightEndName'] = 'thin';
	} else if (settings['weightEnd'] == 200) {
		settings['weightEndName'] = 'extra light';
	} else if (settings['weightEnd'] == 300) {
		settings['weightEndName'] = 'light';
	} else if (settings['weightEnd'] == 400) {
		settings['weightEndName'] = 'book';
	} else if (settings['weightEnd'] == 500) {
		settings['weightEndName'] = 'medium';
	} else if (settings['weightEnd'] == 600) {
		settings['weightEndName'] = 'semi bold';
	} else if (settings['weightEnd'] == 700) {
		settings['weightEndName'] = 'bold';
	} else if (settings['weightEnd'] == 800) {
		settings['weightEndName'] = 'extra bold';
	} else if (settings['weightEnd'] == 900) {
		settings['weightEndName'] = 'heavy';
	}

	// Show variable settings
	let variableMessage = document.querySelector("#variable-message");
	variableMessage.innerText = `Your compendium’s font will start as a ${settings['weightStartName']} ${settings['styleStartName']} and end as a ${settings['weightEndName']} ${settings['styleEndName']}.`

	// Show spacing settings
	let spacingMessage = document.querySelector("#spacing-message");
	if (settings['format'] == 'poster') {
		if (settings['capitalization'] == 'none') {
			spacingMessage.innerText = `Your compendium’s font will have ${settings['tracking']} tracking (letter spacing), with 2.2em leading (line height) to fit the poster format.`
		} else if (settings['capitalization'] != 'none') {
			spacingMessage.innerText = `Your compendium’s font will be in ${settings['capitalization']} with ${settings['tracking']} tracking (letter spacing), with 2.2em leading (line height) to fit the poster format.`
		}
	} else if (settings['format'] == 'book') {
		if (settings['capitalization'] == 'none') {
			spacingMessage.innerText = `Your compendium’s font will have ${settings['tracking']} tracking (letter spacing) and ${settings['leading']} leading (line height).`
		} else if (settings['capitalization'] != 'none') {
			spacingMessage.innerText = `Your compendium’s font will be in ${settings['capitalization']} with ${settings['tracking']} tracking (letter spacing) and ${settings['leading']} leading (line height).`
		}
	}

	// Show font size
	let fontMessage = document.querySelector("#font-message");
	if (settings['format'] == 'poster') {
		fontMessage.innerText = `Your compendium’s font will be whatever size it needs to be to fill up the poster.`
	} else if (settings['format'] == 'book') {
		fontMessage.innerText = `Your compendium’s font will be ${settings['fontSize']}.`
	}

	// Calculate iteration number
	let iteration = 1;
	for (let activeOption of document.querySelectorAll('.settings-question-option[data-active="1"]')) {
		iteration *= parseInt(activeOption.dataset.iteration);
	}
	let iterationDOM = document.querySelector("#iteration");
	iterationDOM.innerText = iteration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // formatted with commas
	let iterationPrintout = document.querySelector("#printout-iteration");
	iterationPrintout.innerText = iteration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // formatted with commas
}

// Create compendium
function generateCompendium() {
	// Set font variation settings
	let printables = document.querySelectorAll(".printable");
	for (let i=0; i<printables.length; i++) {
		printables[i].style.fontVariationSettings = `"wght" ${(i/printables.length)*(settings["weightEnd"]-settings["weightStart"])+settings["weightStart"]}, "SRFF" ${(i/printables.length)*(settings["styleEnd"]-settings["styleStart"])+settings["styleStart"]}`;
	}

	// Set page settings
	root.style.setProperty("--font-size", settings["fontSize"]);
	root.style.setProperty("--capitalization", settings["capitalization"]);
	root.style.setProperty("--margin-top", settings["leading"]);

	let page = document.querySelector("#page");
	let printout = document.querySelector(".printout");
	let margins = parseFloat(settings["width"]) * parseInt(settings["margins"])/100;
	let insideWidth, insideHeight;
	if (settings['units'] == 'imperial') {
		insideWidth = parseFloat(settings['width']) - margins*2 + "in";
		insideHeight = parseFloat(settings['height']) - margins*2 + "in";
		margins += "in";
	} else {
		insideWidth = parseFloat(settings['width']) - margins*2 + "cm";
		insideHeight = parseFloat(settings['height']) - margins*2 + "cm";
		margins += "cm";
	}

	if (settings['orientation'] == 'portrait') {
		page.innerHTML = `
			@page {
				size: ${settings["width"]} ${settings["height"]};
				margin: ${margins};
			}
		`;
		printout.style.width = `${settings["width"]}`;
		printout.style.height = `${settings["height"]}`;
	} else {
		page.innerHTML = `
			@page {
				size: ${settings["height"]} ${settings["width"]};
				margin: ${margins};
			}
		`;
		printout.style.width = `${settings["height"]}`;
		printout.style.height = `${settings["width"]}`;
	}

	printout.style.textAlign = `left`;
	printout.style.letterSpacing = `${settings["tracking"]}`;
	printout.style.display = "block";

	if (settings['format'] == 'book') {
		printout.style.lineHeight = `${settings["leading"]}`;
		for (let section of document.querySelectorAll(".printout section")) {
			section.dataset.book = 1;
		}
		for (let i=0; i<printables.length; i++) {
			printables[i].dataset.book = 1;
		}
		window.print();
		printout.style.display = "none";

	} else if (settings['format'] == 'poster') {
		// Prevent interaction temporarily
		let body = document.querySelector("body");
		let loading = document.querySelector(".loading");
		body.style.pointerEvents = "none";
		loading.style.opacity = 1;

		// Set div height to not include margins
		if (settings['orientation'] == 'portrait') {
			printout.style.width = `${insideWidth}`;
			printout.style.height = `${insideHeight}`;
		} else {
			printout.style.width = `${insideHeight}`;
			printout.style.height = `${insideWidth}`;
		}

		// Turn off book sections
		for (let section of document.querySelectorAll(".printout section")) {
			section.dataset.book = 0;
		}
		for (let i=0; i<printables.length; i++) {
			printables[i].dataset.book = 0;
		}

		printout.style.textAlign = `justify`;
		printout.style.lineHeight = `2.2em`;

		// Fit text to page size
		let currentSize = 18;
		root.style.setProperty("--font-size", currentSize+"pt");
		let printoutEnd = document.querySelector("#printout-end");
		printoutEnd.style.display = "block";
		let printoutPosition = printout.getBoundingClientRect();
		console.log(printoutPosition.bottom, settings['height']);
		let printoutEndPosition = printoutEnd.getBoundingClientRect();
		if (printoutEndPosition.bottom > printoutPosition.bottom) {
			let setSizing = setInterval(() => {
				currentSize -= .5;
				root.style.setProperty("--font-size", currentSize+"pt");
				printoutPosition = printout.getBoundingClientRect();
				printoutEndPosition = printoutEnd.getBoundingClientRect();
				if (printoutEndPosition.bottom <= printoutPosition.bottom) {
					clearInterval(setSizing);
					loading.style.opacity = 0;
					printoutEnd.style.display = "none";
					window.print();
					printout.style.display = "none";
					body.style.pointerEvents = "all";
				}
			}, 50)
		} else {
			let setSizing = setInterval(() => {
				currentSize += .5;
				root.style.setProperty("--font-size", currentSize+"pt");
				printoutPosition = printout.getBoundingClientRect();
				printoutEndPosition = printoutEnd.getBoundingClientRect();
				if (printoutEndPosition.bottom >= printoutPosition.bottom) {
					clearInterval(setSizing);
					root.style.setProperty("--font-size", currentSize-.5+"pt");
					loading.style.opacity = 0;
					printoutEnd.style.display = "none";
					window.print();
					printout.style.display = "none";
					body.style.pointerEvents = "all";
				}
			}, 100)
		}
	}
}

// Update activated selections manually
function updateSelection(question, selection) {
	let questionDOM = document.querySelector("#"+question);
	for (let selectionOption of questionDOM.querySelectorAll(`[data-iteration]`)) {
		selectionOption.dataset.active = 0;
	}
	let selectionDOM = questionDOM.querySelector(`[data-iteration="${selection+1}"]`);
	toggleOption(question, selectionDOM);
}

// Shuffle responses randomly
function generateRandom() {
	let randomFormat = Math.floor(Math.random()*2);
	updateSelection("format", randomFormat);
	setValue('format', ['poster', 'book'][randomFormat]);
	if (['poster', 'book'][randomFormat] == "poster") {
		showElement('#format-poster');
		hideElement('#format-book');
	} else {
		showElement('#format-book');
		hideElement('#format-poster');
	}

	let randomUnits = Math.floor(Math.random()*2);
	updateSelection("units", randomUnits);
	setValue('units', ['imperial', 'metric'][randomUnits]);
	if (['imperial', 'metric'][randomUnits] == "imperial") {
		showElement('#units-imperial');
		hideElement('#units-metric');
	} else {
		showElement('#units-metric');
		hideElement('#units-imperial');
	}

	let randomSize = Math.floor(Math.random()*7);
	updateSelection("size", randomSize);
	setValue('size', ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'][randomSize]);

	let randomOrientation = Math.floor(Math.random()*2);
	updateSelection("orientation", randomOrientation);
	setValue('orientation', ['portrait', 'landscape'][randomOrientation]);

	let randomMargins = Math.floor(Math.random()*7);
	updateSelection("margins", randomMargins);
	setValue('margins', ['0%', '2%', '4%', '8%', '16%', '24%', '32%'][randomMargins]);

	let randomStyleStart = Math.floor(Math.random()*3);
	updateSelection("style-start", randomStyleStart);
	setValue('styleStart', [0, 50, 100][randomStyleStart]);

	let randomStyleEnd = Math.floor(Math.random()*3);
	updateSelection("style-end", randomStyleEnd);
	setValue('styleEnd', [0, 50, 100][randomStyleEnd]);

	let randomWeightStart = Math.floor(Math.random()*9);
	updateSelection("weight-start", randomWeightStart);
	setValue('weightStart', [100, 200, 300, 400, 500, 600, 700, 800, 900][randomWeightStart]);

	let randomWeightEnd = Math.floor(Math.random()*9);
	updateSelection("weight-end", randomWeightEnd);
	setValue('weightEnd', [100, 200, 300, 400, 500, 600, 700, 800, 900][randomWeightEnd]);

	let randomCapitalization = Math.floor(Math.random()*3);
	updateSelection("capitalization", randomCapitalization);
	setValue('capitalization', ['none', 'lowercase', 'uppercase'][randomCapitalization]);

	let randomTracking = Math.floor(Math.random()*5);
	updateSelection("tracking", randomTracking);
	setValue('tracking', ['1em', '0.5em', '0em', '-0.03em', '-0.1em'][randomTracking]);

	let randomLeading = Math.floor(Math.random()*6);
	updateSelection("leading", randomLeading);
	setValue('leading', ['0.6em', '1em', '1.4em', '1.8em', '2.2em', '4.4em'][randomLeading]);

	let randomFontSize = Math.floor(Math.random()*6);
	updateSelection("font-size", randomFontSize);
	setValue('fontSize', ['48pt', '18pt', '12pt', '10pt', '8pt', '6pt'][randomFontSize]);

	generateCompendium();
}

// Shuffle responses randomly
function skipToEnd() {
	let randomFormat = Math.floor(Math.random()*2);
	updateSelection("format", randomFormat);
	setValue('format', ['poster', 'book'][randomFormat]);
	if (['poster', 'book'][randomFormat] == "poster") {
		showElement('#format-poster');
		hideElement('#format-book');
	} else {
		showElement('#format-book');
		hideElement('#format-poster');
	}

	let randomUnits = Math.floor(Math.random()*2);
	updateSelection("units", randomUnits);
	setValue('units', ['imperial', 'metric'][randomUnits]);
	if (['imperial', 'metric'][randomUnits] == "imperial") {
		showElement('#units-imperial');
		hideElement('#units-metric');
	} else {
		showElement('#units-metric');
		hideElement('#units-imperial');
	}

	let randomSize = Math.floor(Math.random()*7);
	updateSelection("size", randomSize);
	setValue('size', ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'][randomSize]);

	let randomOrientation = Math.floor(Math.random()*2);
	updateSelection("orientation", randomOrientation);
	setValue('orientation', ['portrait', 'landscape'][randomOrientation]);

	let randomMargins = Math.floor(Math.random()*7);
	updateSelection("margins", randomMargins);
	setValue('margins', ['0%', '2%', '4%', '8%', '16%', '24%', '32%'][randomMargins]);

	let randomStyleStart = Math.floor(Math.random()*3);
	updateSelection("style-start", randomStyleStart);
	setValue('styleStart', [0, 50, 100][randomStyleStart]);

	let randomStyleEnd = Math.floor(Math.random()*3);
	updateSelection("style-end", randomStyleEnd);
	setValue('styleEnd', [0, 50, 100][randomStyleEnd]);

	let randomWeightStart = Math.floor(Math.random()*9);
	updateSelection("weight-start", randomWeightStart);
	setValue('weightStart', [100, 200, 300, 400, 500, 600, 700, 800, 900][randomWeightStart]);

	let randomWeightEnd = Math.floor(Math.random()*9);
	updateSelection("weight-end", randomWeightEnd);
	setValue('weightEnd', [100, 200, 300, 400, 500, 600, 700, 800, 900][randomWeightEnd]);

	let randomCapitalization = Math.floor(Math.random()*3);
	updateSelection("capitalization", randomCapitalization);
	setValue('capitalization', ['none', 'lowercase', 'uppercase'][randomCapitalization]);

	let randomTracking = Math.floor(Math.random()*5);
	updateSelection("tracking", randomTracking);
	setValue('tracking', ['1em', '0.5em', '0em', '-0.03em', '-0.1em'][randomTracking]);

	let randomLeading = Math.floor(Math.random()*6);
	updateSelection("leading", randomLeading);
	setValue('leading', ['0.6em', '1em', '1.4em', '1.8em', '2.2em', '4.4em'][randomLeading]);

	let randomFontSize = Math.floor(Math.random()*6);
	updateSelection("font-size", randomFontSize);
	setValue('fontSize', ['48pt', '18pt', '12pt', '10pt', '8pt', '6pt'][randomFontSize]);

	showAllElements();
}

// Generate Letter-sized legible book
function generateLegible() {
	updateSelection("format", 1);
	setValue('format', 'book');

	updateSelection("units", 0);
	setValue('units', 'imperial');

	updateSelection("size", 2);
	setValue('size', 'sm');

	updateSelection("orientation", 0);
	setValue('orientation', 'portrait');

	updateSelection("margins", 3);
	setValue('margins', '8%');

	updateSelection("style-start", 1);
	setValue('styleStart', 50);

	updateSelection("style-end", 1);
	setValue('styleEnd', 50);

	updateSelection("weight-start", 4);
	setValue('weightStart', 500);

	updateSelection("weight-end", 4);
	setValue('weightEnd', 500);

	updateSelection("capitalization", 0);
	setValue('capitalization', 'none');

	updateSelection("tracking", 2);
	setValue('tracking', '0em');

	updateSelection("leading", 2);
	setValue('leading', '1.4em');

	updateSelection("font-size", 3);
	setValue('fontSize', '10pt');

	generateCompendium();
}