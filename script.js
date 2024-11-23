document.addEventListener("DOMContentLoaded", function () {
	const params = new URLSearchParams(window.location.search);
	const count = +(params.get("c") ?? 2);
	const start = +(params.get("i") ?? content.length - count);
	let featured = "";
	for (let i = start; i < start + count; ++i) {
		featured += `<h2><span class="fl">${content[i][0]}</span></h2><p>${content[i][1]}`;
		for (let j = 2; j < content[i].length; ++j) {
			featured += `<br><a href="https://${content[i][j]}">${content[i][j]}</a>`;
		}
		featured += "</p>";
	}
	document.getElementById("featured").innerHTML = featured;
	let other = `<span class="fl">Other Rides</span>`;
	for (let i = content.length - 1; i >= 0; --i) {
		if (i >= start && i < start + count) continue;
		other += `<br><a href="https://bike.6t.lt/?c=1&i=${i}">${content[i][0]}</a>`;
	}
	document.getElementById("other").innerHTML = other;
	document.getElementById("highlights").innerHTML = links.reduce(function (acc, x) {
		return acc + `<br><a href="https://${content[x[1]][x[2]]}">${x[0]}</a>`;
	}, `<span class="fl">Resources</span><span id="links">`) + "</span>";
});

const button = document.getElementById("copy");
button.addEventListener("mousedown", function () {
	let all = `<h1><a href="https://bike.6t.lt">bike.6t.lt</a></h1><p>Resources`;
	all += document.getElementById("links").innerHTML + "</p><dl>";
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
