



// REFERENCES
// body node
const body = document.querySelector("body");
// external data fetched
let DATA = null;





// UTILITIES
const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	let month = date.getMonth() + 1;
	let day = date.getDate();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	return `${date.getFullYear()}-${month}-${day}`;
}



// CALLBACK: visualize data with d3 
function visualizeData(data) {
	// console
	console.log('visualizing data...', data);

	// chart dimension
	const h = 500;
	const w = 1000;
	const padding = 50;

	// svg
	const svg = d3.select('main').append('svg')
		.attr("height", h)
		.attr("width", w)
		.style("background-color", "whitesmoke")

	// scales
	const timeParser = d3.timeParse("%Y-%m-%d");
	const xDomain = [d3.min(data, d => timeParser(d[0])), timeParser("2015-10-01")];
	const xScale = d3.scaleTime()
		.domain(xDomain)
		.range([0, w - padding*2])
	const yMaxRange = h - padding*2;
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d[1])])
		.range([yMaxRange, 0])

	// bars
	svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
			.attr("class", "bar")
			.attr("data-date", d => d[0])
			.attr("data-gdp", d => d[1])
			.attr("x", d => padding + xScale(timeParser(d[0])))
			.attr("y", d => padding + yScale(d[1]))
			.attr("height", d => h - padding*2 - yScale(d[1]))
			.attr("width", d => {
				const ci = data.indexOf(d);
				const start = xScale(timeParser(d[0]));
				const final = ci<data.length-1 ? xScale(timeParser(data[ci+1][0])) : xScale(timeParser("2015-10-01"));
				return final - start;
			})
			.attr("fill", "skyblue");

	// axes
	const xAxis = d3.axisBottom(xScale)
	svg.append("g")
		.attr("id", "x-axis")
		.attr("transform", `translate(${padding}, ${h - padding})`)
		.call(xAxis);
	const yAxis = d3.axisLeft(yScale);
	svg.append("g")
		.attr("id", "y-axis")
		.attr("transform", `translate(${padding}, ${padding})`)
		.call(yAxis);
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
		console.log(json);
		console.log(json.data);
		DATA = json.data;
		// DATA = DATA.map(arr => [Date.parse(arr[0]), arr[1]]);
		visualizeData(DATA);
	};
});