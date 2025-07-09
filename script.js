const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
const year = document.getElementById('year');

let date;

function setYear() {
	if (!date) date = new Date();
	year.innerText = date.getFullYear();
}

function toggleMenu() {
	console.log('hi');
	links.classList.toggle('active');
}

setYear();
menu.addEventListener('click', toggleMenu);
