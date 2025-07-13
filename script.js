import { features } from './data/featuresData.js';
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
const year = document.getElementById('year');
const cardsContainer = document.querySelector('.cards');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

let translateValue = 0;
let moveby = 20;
let end = 60;

let date;
function setMoveEnd() {
	if (window.innerWidth <= 768) {
		moveby = 12;
		end = 84;
	} else {
		let moveby = 20;
		let end = 60;
	}
}

setMoveEnd();

function setYear() {
	if (!date) date = new Date();
	year.innerText = date.getFullYear();
}

function toggleMenu() {
	console.log('hi');
	links.classList.toggle('active');
}

function setCards() {
	let html = ``;
	features.forEach((feature) => {
		html += `<div class="card">
						<div class="content">
							<span
								>${feature.icon}
							</span>
							<h5>${feature.title}</h5>
							<p>
							${feature.content}
							</p>
						</div>
					</div>`;
	});

	if (translateValue == 0) {
		rightArrow.classList.add('disabled');
	}
	cardsContainer.innerHTML = html;
}

function moveLeft() {
	if (translateValue < end) {
		translateValue += moveby;
	}
	if (translateValue === end) {
		leftArrow.classList.add('disabled');
	}
	if (translateValue != 0) {
		rightArrow.classList.remove('disabled');
	}
	console.log(translateValue);
	cardsContainer.style.transform = `translateX(${translateValue}%)`;
}

function moveRight() {
	if (translateValue > 0) {
		translateValue -= moveby;
	}
	if (translateValue == 0) {
		rightArrow.classList.add('disabled');
	}
	if (translateValue != end) {
		leftArrow.classList.remove('disabled');
	}
	console.log(translateValue);
	cardsContainer.style.transform = `translateX(${translateValue}%)`;
}
setYear();
setCards();
menu.addEventListener('click', toggleMenu);
leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);
window.addEventListener('resize', setMoveEnd);
