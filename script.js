document.addEventListener("DOMContentLoaded", function () {
	const params = new URLSearchParams(window.location.search);
	const count = +(params.get("c") ?? 2);
	const start = +(params.get("i") ?? content.length - count);
	let selected = "";
	for (let i = start; i < start + count; ++i) {
		selected += `<h2><span class="fl">${content[i][0]}</span></h2><p>${content[i][1]}`;
		for (let j = 2; j < content[i].length; ++j) {
			selected += `<br><a href="https://${content[i][j]}">${content[i][j]}</a>`;
		}
		selected += "</p>";
	}
	document.getElementById("selected").innerHTML = selected;
	let other = "";
	for (let k = content.length - 1; k >= 0; --k) {
		if (k >= start && k < start + count) continue;
		other += `<br><a href="https://bike.6t.lt/?c=1&i=${k}">${content[k][0]}</a>`;
	}
	document.getElementById("other").innerHTML = other.slice(4);
});

const button = document.getElementById("copy");
button.style.width = `${button.offsetWidth + 20}px`;
button.addEventListener("mousedown", function () {
	let all = `<h1><a href="https://bike.6t.lt">bike.6t.lt</a></h1><dl>`;
	for (let i = content.length - 1; i >= 0; --i) {
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
	}, 1200);
});
