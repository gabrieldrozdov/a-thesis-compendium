let settings = {
	"dimensions": [8.5,11],
	"orientation": "portait",
	"format": "book",
	"pages": 1,
	"width": 1,
	"height": 1
}

let stepDimensions = document.querySelector("#dimensions");
let stepOrientation = document.querySelector("#orientation");
let stepFormat = document.querySelector("#format");
let stepPages = document.querySelector("#pages");
let stepWidth = document.querySelector("#width");
let stepHeight = document.querySelector("#height");
let conclusionText = document.querySelector("#conclusion-text");
let conclusionPrint = document.querySelector("#conclusion-print");

function selectOption(e, val) {
	let group = e.dataset.group;
	let btns = document.querySelectorAll(`[data-group="${group}"]`);
	for (let btn of btns) {
		btn.dataset.state = "inactive";
	}
	e.dataset.state = "active";
	settings[group] = val;
	if (group == "dimensions") {
		stepOrientation.dataset.state = "active";
		stepOrientation.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	} else if (group == "orientation") {
		stepFormat.dataset.state = "active";
		stepFormat.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	} else if (group == "format") {
		conclusionText.dataset.state = "active";
		conclusionPrint.dataset.state = "active";
		if (val == "book") {
			stepPages.dataset.state = "active";
			stepWidth.dataset.state = "inactive";
			stepHeight.dataset.state = "inactive";
			stepPages.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		} else {
			stepPages.dataset.state = "inactive";
			stepWidth.dataset.state = "active";
			stepHeight.dataset.state = "active";
			stepHeight.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		}
	}
}

function selectIncrement(e, val) {
	let group = e.dataset.group;
	let value = document.querySelector(`.option-value[data-group='${group}'`);
	settings[group] += val;
	if (settings[group] == 0) {
		settings[group] = 1;
	}
	value.innerText = settings[group];
}

function generatePrint() {
	const isOverflown = ({ clientHeight, scrollHeight }) => scrollHeight > clientHeight

const resizeText = ({ element, elements, minSize = 10, maxSize = 512, step = 1, unit = 'px' }) => {
  (elements || [element]).forEach(el => {
    let i = minSize
    let overflow = false

        const parent = el.parentNode

    while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`
        overflow = isOverflown(parent)

      if (!overflow) i += step
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - step}${unit}`
  })
}
resizeText({
	elements: document.querySelectorAll('.content'),
	step: 0.5
  })
	  
	window.print();
}