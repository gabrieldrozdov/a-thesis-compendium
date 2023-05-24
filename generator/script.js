let settings = {
	"dimensions": [8.5,11],
	"format": "poster",
	"pages": 1,
	"width": 1,
	"height": 1
}
let root = document.querySelector(':root');
let units = "in";
function setUnits(value) {
	units = value;
	for (let elmnt of document.querySelectorAll(`[data-units='${units}']`)) {
		elmnt.dataset.active = 1;
	}
}
function setValue(variable, value) {
	root.style.setProperty("--"+variable, value);
}

function generatePoster() {
	// Set font variation settings
	let printables = document.querySelectorAll(".printable");
	for (let i=0; i<printables.length; i++) {
		// printables[i].style.fontVariationSettings = `"wght" ${(i/printables.length)*800+100}, "SRFF" ${(i/printables.length)*100}`;
		printables[i].style.fontVariationSettings = `"wght" ${500}, "SRFF" ${(i/printables.length)*100}`;
	}

	// Fit text to page size
	let printout = document.querySelector(".printout");
	let printoutEnd = document.querySelector("#printout-end");
	let printoutPosition = printout.getBoundingClientRect();
	let printoutEndPosition = printoutEnd.getBoundingClientRect();
	if (printoutEndPosition.bottom > printoutPosition.bottom) {
		let setSizing = setInterval(() => {
			let currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'));
			root.style.setProperty("--font-size", currentSize-.01+"rem");
	
			printoutPosition = printout.getBoundingClientRect();
			printoutEndPosition = printoutEnd.getBoundingClientRect();
			if (printoutEndPosition.bottom < printoutPosition.bottom) {
				clearInterval(setSizing);
				window.print();
			}
		}, 50)
	} else {
		let setSizing = setInterval(() => {
			let currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'));
			root.style.setProperty("--font-size", currentSize+.01+"rem");
	
			printoutPosition = printout.getBoundingClientRect();
			printoutEndPosition = printoutEnd.getBoundingClientRect();
			if (printoutEndPosition.bottom > printoutPosition.bottom) {
				clearInterval(setSizing);
				let currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'));
				root.style.setProperty("--font-size", currentSize-.01+"rem");
				window.print();
			}
		}, 50)
	}
}
generatePoster();