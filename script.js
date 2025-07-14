import { features } from './data/featuresData.js';
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
const year = document.getElementById('year');
const cardsContainer = document.querySelector('.cards');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const faqQuestions = document.querySelectorAll('.faq-question');
const btnMonthly = document.getElementById('btn1');
const btnYearly = document.getElementById('btn2');

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

if (faqQuestions) {
	faqQuestions.forEach((q) => {
		q.addEventListener('click', function () {
			const item = this.parentElement;
			const isOpen = item.classList.contains('open');
			document
				.querySelectorAll('.faq-item.open')
				.forEach((i) => i.classList.remove('open'));
			if (!isOpen) item.classList.add('open');
		});
	});
}

const priceData = [
	{
		monthly: '<span>دائما مجاناً</span>',
		yearly: '<span>دائما مجاناً</span>',
	},
	{
		monthly: '<span>39 ريال</span> في الشهر لكل عضو',
		yearly: '<span>29 ريال</span> في السنة لكل عضو',
	},
	// {
	// 	monthly: '<span>39 ريال</span>  في الشهر لكل عضو',
	// 	yearly: '<span>390 ريال</span> في السنة لكل عضو',
	// },
];

function updatePrices(isYearly) {
	document.querySelectorAll('.pricing-card .plan-price').forEach((el, i) => {
		el.innerHTML = isYearly ? priceData[i].yearly : priceData[i].monthly;
	});
}

if (btnMonthly) {
	btnMonthly.addEventListener('click', () => {
		btnMonthly.classList.add('active');
		btnYearly.classList.remove('active');
		updatePrices(false);
	});
}

if (btnYearly) {
	btnYearly.addEventListener('click', () => {
		btnYearly.classList.add('active');
		btnMonthly.classList.remove('active');
		updatePrices(true);
	});
}

setYear();
if (rightArrow && cardsContainer) setCards();
menu.addEventListener('click', toggleMenu);
if (leftArrow) leftArrow.addEventListener('click', moveLeft);
if (rightArrow) rightArrow.addEventListener('click', moveRight);
window.addEventListener('resize', setMoveEnd);
