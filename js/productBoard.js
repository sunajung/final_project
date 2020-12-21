
var asideElement = document.getElementsByTagName('aside')[0];
var section = document.getElementsByClassName('product-contanier')[0];
setInterval(() => {
	var asideLeft = (section.clientWidth + window.innerWidth) / 2;
	asideLeft += 15;
	if (asideLeft < 1415) asideLeft = 1415;
	asideElement.style.left = asideLeft +'px';
}, 16)