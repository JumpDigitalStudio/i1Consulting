"use strict"


// ADAPTIVE IMAGES
const mediaQuery = window.matchMedia('(max-width: 840px)');
const mobImages = document.querySelectorAll('img[data-src]');
function handleTabletChange(e) {
	if (e.matches) {
		mobImages.forEach(img => {
			if (img.dataset.src) {
				img.src = img.dataset.src;
			}
		})
	}
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);


// BURGER MENU
const menuBtn = document.querySelector('.header__btn');
const menuMobile = document.querySelector('.header__nav');
const page = document.querySelector('body');
// Mobile menu open
menuBtn.addEventListener('click', function () {
	menuMobile.classList.toggle('open');
	page.classList.toggle('lock');
});
// Mobile menu on links click close
menuMobile.addEventListener('click', function (event) {
	let target = event.target;
	if (target.classList.contains('nav__link')) {
		if (menuMobile.classList.contains('open')) {
			menuMobile.classList.remove('open');
			page.classList.remove('lock');
		}
	}
});



// SWITCH LANGUAGES SCRIPTS
const selectHeader = document.querySelector('.select-lang__header');
const selectBody = document.querySelector('.select-lang__body');
const selectItem = document.querySelectorAll('.select-lang__item');
const allLangs = ['ru', 'en'];
// Onload language detect
document.addEventListener('DOMContentLoaded', changeURL);
// Change location hash
function changeURL() {

	let choiceLang = selectHeader.querySelector('.active').getAttribute('data-value');

	location.href = window.location.pathname + '#' + choiceLang;
	changeLang();
}
// Change text content
function changeLang() {

	let hash = window.location.hash;
	hash = hash.substr(1);

	for (let key in langs) {
		let elem = document.querySelectorAll('.l-' + key);

		for (let i = 0; i < elem.length; i++) {
			if (elem[i]) {
				elem[i].innerHTML = langs[key][hash];

				if (elem[i].classList.contains('placeholder')) {
					elem[i].placeholder = langs[key][hash];
				}
			}
		}
	}

}
// Open selector
selectHeader.addEventListener('click', function () {
	selectBody.classList.toggle('active');
});
// Change language icon
selectBody.addEventListener('click', function (event) {

	let target = event.target;
	let chooseId = target.getAttribute('data-value');

	let openLangs = selectHeader.querySelectorAll('.select-lang__item');
	let selectLang = selectHeader.querySelector('.active');

	if (target.classList.contains('select-lang__item')) {
		for (let i = 0; i < selectItem.length; i++) {
			selectItem[i].classList.remove('remove');
		}
		target.classList.add('remove');
	}

	selectLang.classList.remove('active');

	for (let i = 0; i < openLangs.length; i++) {
		if (openLangs[i].getAttribute('data-value') === chooseId) {
			openLangs[i].classList.add('active');
		}
	}
	selectBody.classList.remove('active');

	changeURL();
});



// MODAL WINDOWS SCRIPTS
// Modal window "Form Request"
const myModal = new HystModal({
	linkAttributeName: "data-hystmodal",
});



// IT VECTURA LANGS SWITCH
// Get hash on click
const btnVectura = document.querySelector('.goto-vectura');
btnVectura.addEventListener('click', function () {
	let hash = window.location.hash;
	window.open('https://itvectura.com/' + hash, '_blank');
});



// PRESENTATION DOWNLOAD
const btnPres = document.querySelector('.btn_doc');
btnPres.addEventListener('click', function () {
	let hash = window.location.hash;
	hash = hash.substr(1);

	btnPres.setAttribute('href', './presentations/' + hash + '_i1Consulting.pdf');
});



// BUTTON SCRIPTS
// Buttons "Click effect"
const btns = document.querySelectorAll('button');
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', function () {
		btns[i].classList.add('click');
		setTimeout(() => btns[i].classList.remove('click'), 100);
	});
}



// NAVIGATION LINKS SCRIPTS
// Navigation links pattern
const getSectionId = (link) => link.getAttribute('href').replace('#', '');
// Navigation links "Click effect"
const navLinks = document.querySelectorAll('.nav__link');
for (let i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click', function () {
		navLinks[i].classList.add('click');
		setTimeout(() => navLinks[i].classList.remove('click'), 100);
	});
}
// Navigation links "On scroll active effect"
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			document.querySelectorAll('.scroll-link').forEach((link) => {
				link.classList.toggle(
					'focus',
					getSectionId(link) === entry.target.id
				);
			});
		}
	});
}, { threshold: 0.7, });
document.querySelectorAll('.scroll-section').forEach(
	(sections) => observer.observe(sections),
);
// Navigation links "Smooth scroll"
document.querySelectorAll('.nav__list').forEach(
	(lists) => lists.addEventListener('click', (event) => {
		if (event.target.classList.contains('nav__link')) {
			event.preventDefault();
			window.scrollTo({
				top: document.getElementById(getSectionId(event.target)).offsetTop,
				behavior: 'smooth',
			});
		}
	}),
);



// FORMS SCRIPTS
// Forms "Check validate and Send"
const forms = document.querySelectorAll('form');
for (let i = 0; i < forms.length; i++) {

	forms[i].addEventListener('input', checkValidate);
	forms[i].addEventListener('submit', formSend);

	const actionURL = forms[i].getAttribute('action');

	const btnSend = forms[i].querySelector('.form__btn');

	function checkValidate() {

		let error = formValidate(forms[i]);

		if (error != 0) {
			btnAddError;
		}
	}
	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(forms[i]);

		if (error === 0) {
			btnSend.classList.add('wait');

			let th = $(this);

			let hash = window.location.hash;
			hash = hash.substr(1);

			$.ajax({
				url: actionURL,
				type: 'POST',
				data: th.serialize(),
				success: function (data) {
					if (data == 'uncorrect') {
						btnSend.classList.remove('wait');

						if (hash === 'ru') {
							btnSend.innerHTML = 'Некорректная почта';
						} else if (hash === 'en') {
							btnSend.innerHTML = 'Incorrect E-mail';
						} else if (hash === 'tr') {
							btnSend.innerHTML = 'Yanlış e-posta';
						}
						return false;
					} else {
						btnSend.classList.remove('wait');

						if (hash === 'ru') {
							btnSend.innerHTML = 'Отправлено';
						} else if (hash === 'en') {
							btnSend.innerHTML = 'Sent';
						} else if (hash === 'tr') {
							btnSend.innerHTML = 'Gönderildi';
						}

						th.trigger('reset');
					}
				},
				error: function () {
					btnSend.classList.remove('wait');

					if (hash === 'ru') {
						btnSend.innerHTML = 'Ошибка отправки';
					} else if (hash === 'en') {
						btnSend.innerHTML = 'Send error';
					} else if (hash === 'tr') {
						btnSend.innerHTML = 'Gönderme hatası';
					}
				}
			})
		} else {
			btnAddError;
		}
	}
	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			removeError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					addError(input);
					btnAddError(btnSend);
					error++;
				}
			} else {
				for (let i = 0; i < formReq.length; i++) {
					if (formReq[i].value === '') {
						addError(input);
						btnAddError(btnSend);
						error++;
					}
				}
			}
		}
		return error;
	}
	function btnAddError() {
		btnSend.classList.add('error');
	}
	function addError(input) {
		input.classList.add('error');
	}
	function removeError(input) {
		input.classList.remove('error');
		btnSend.classList.remove('error');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
}

