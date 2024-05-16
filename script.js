



// REFERENCES
// external data fetched
let DATA = null;




const getYearQuarter = (date) => {
	const year = date.match(/[0-9]{4}/)[0];
	let quarter = date.match(/-[0-9]{2}-/)[0];
	quarter =parseInt(quarter.match(/[0-9]{2}/)[0]);
	// console.log(date, 'quarter', quarter);
	if (quarter < 4) quarter = 1;
	else if (quarter < 7) quarter = 2;
	else if (quarter < 10) quarter = 3;
	else if (quarter == 10) quarter = 4;
	return year + ' Q' + quarter;
};




// CALLBACK: visualize data with d3 
function visualizeData(data, height = 500, width = 950) {
	// console
	console.log('visualizing data...', data);

	// chart dimension
	const h = height;
	const w = width;
	const padTop = 20;
	const padBottom = 100;
	const padLeft = 80;
	const padRight = 50;

	// svg
	const svg = d3.select('#svg-container')
		.append('svg')
			.attr("height", h)
			.attr("width", w);
	
	// tooltip
	const tooltip = d3.select("body")
		.append("div")
			.attr("id", "tooltip")
			.style("opacity", 0);

	// scales
	const timeParser = d3.timeParse("%Y-%m-%d");
	const xDomain = [d3.min(data, d => timeParser(d[0])), timeParser("2015-10-01")];
	const xScale = d3.scaleTime()
		.domain(xDomain)
		.range([0, w - padLeft - padRight])
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d[1])])
		.range([h - padTop - padBottom, 0])

	// bars
	const bars = svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect");
	bars.attr("class", "bar")
		.attr("data-date", d => d[0])
		.attr("data-gdp", d => d[1])
		.attr("x", d => padLeft + xScale(timeParser(d[0])))
		.attr("y", d => padTop + yScale(d[1]))
		.attr("height", d => h - padTop - padBottom - yScale(d[1]))
		.attr("width", d => {
			const ci = data.indexOf(d);
			const initialPoint = xScale(timeParser(d[0]));
			const endPoint = ci < data.length-1 ? 
				xScale(timeParser(data[ci+1][0])) : 
				xScale(timeParser("2015-10-01"));
			return endPoint - initialPoint;
		})
		.attr("fill", "skyblue");
	bars.on("mouseover", (d) => {
			const date = getYearQuarter(d[0]);
			const gdp = d[1].toLocaleString();
			tooltip
				.html(`${date}<br>$ ${gdp} Billion`)
				.attr("data-date", d[0])
				.style("visibility", "visible")
				.style("opacity", 0.9)
				.style("border-radius", "3px")
		})
		.on("mousemove", () => {
			const x = d3.event.pageX;
			const y = d3.event.pageY;
			tooltip
				.style("left", x + 10 + "px")
				.style("top", y - 20 + "px");
		})
		.on("mouseout", () => {
			tooltip
				.style("visibility", "hidden")
				// .style("top", 0)
				// .style("left", 0)
		})

	// axes
	const xAxis = d3.axisBottom(xScale)
	svg.append("g")
		.attr("id", "x-axis")
		.attr("transform", `translate(${padLeft}, ${h - padBottom})`)
		.call(xAxis);
	const yAxis = d3.axisLeft(yScale);
	svg.append("g")
		.attr("id", "y-axis")
		.attr("transform", `translate(${padLeft}, ${padTop})`)
		.call(yAxis);

	// label
	const labelGDP = svg.append("text")
		.text("Gross Domestic Product")
		.attr("class", "label")
		.attr("text-anchor", "start")
		.attr("x", -200)
		.attr("y", 105)
		.style("transform", "rotate(-90deg)");
	// More Information: http://www.bea.gov/national/pdf/nipaguid.pdf
	const info = svg.append("text")
		.text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
		.attr("class", "label")
		.attr("text-anchor", "start")
		.attr("x", 520)
		.attr("y", 450);
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
		// console.log(json.data);
		DATA = json.data;
		visualizeData(DATA);
	};
});