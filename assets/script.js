

// REFERENCES
// body node
const body = document.querySelector("body");
// external data fetched
let DATA = null;


// CALLBACK: visualize data with d3 
function visualizeData(data) {
	// console
	console.log('visualizing data...');

	// dimension
	const padding = 50;
	const h = 500;
	const w = 900;
	// scales
	const xScale = d3.scaleLinear()
		.domain(['1947', '2016'])
		.range([padding, w - padding]);
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d[1])])
		.range([h - padding, padding]);

	// append an svg
	const svgNode = d3.select("main").append("svg").attr("height", h).attr("width", w);
	// axes
	const xAxis = d3.axisBottom(xScale).tickFormat(year => year.toString());
	svgNode.append("g").attr("transform", "translate(0, " + (h-padding) + ")").call(xAxis);
	const yAxis = d3.axisLeft(yScale);
	svgNode.append("g").attr("transform", "translate( " + padding + ", 0)").call(yAxis);
	// rectangular bar
	svgNode.selectAll("rect").data(data).enter().append("rect");

}






// MAIN: run data request after source files are loaded
document.addEventListener('DOMContentLoaded', () => {
	// console
	console.log('DOMContentLoaded! deferred script');

	// request for external data
	const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onload = () => {
		console.log('request successful');
		const json = JSON.parse(request.responseText);
		// console.log(json);
		console.log(json.data);
		DATA = json.data;
		visualizeData(DATA);
	};
});