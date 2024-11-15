document.addEventListener("DOMContentLoaded", function () {
	let i = new URLSearchParams(window.location.search).get("i") ?? content.length - 1;
	let selected = `<h2><span class="fl">${content[i][0]}</span></h2><p>${content[i][1]}`;
	for (let j = 2; j < content[i].length; ++j) {
		selected += `<br><a href="https://${content[i][j]}">${content[i][j]}</a>`;
	}
	document.getElementById("selected").innerHTML = selected + "</p>";
	let other = "";
	for (let k = 0; k < content.length; ++k) {
		if (k == i) continue;
		other += `<br><a href="https://bike.6t.lt/?i=${k}">${content[k][0]}</a>`;
	}
	document.getElementById("other").innerHTML = other.slice(4);
});

const button = document.getElementById("copy");
button.style.width = `${button.offsetWidth + 20}px`;
button.addEventListener("mousedown", function () {
	let all = `<h1><a href="https://bike.6t.lt">bike.6t.lt</a></h1><dl>`;
	for (let i = 0; i < content.length; ++i) {
		all += `<dt>${content[i][0]}</dt><dd>${content[i][1]}`;
		for (let j = 2; j < content[i].length; ++j) {
			all += `<br><a href="https://${content[i][j]}">${content[i][j]}</a>`;
		}
		all += "</dd>";
	}
	all = encodeURI(all + "</dl>").replaceAll("#", "%23");
	navigator.clipboard.writeText("data:text/html;charset=UTF-8," + all);
	button.innerText = "Copied!";
	setTimeout(function () {
		button.innerText = "Copy all content";
	}, 2000);
});
