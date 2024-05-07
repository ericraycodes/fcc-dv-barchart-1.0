

// domcontentloaded
document.addEventListener('DOMContentLoaded', () => {
	// alert('dom content loaded, DEFER');
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
	};
});