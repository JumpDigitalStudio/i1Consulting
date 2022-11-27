// Адаптивные изображения
// =================================
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

// Анимации
// =================================
let animItems = document.querySelectorAll('._anim');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 2;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				if (animItem.classList.contains('_anim_fade')) {
					animItem.classList.add('_anim-fadeIn');
				} else if (animItem.classList.contains('_anim_scale')) {
					animItem.classList.add('_anim-scaleIn');
				}
			} else {
				if (!animItem.classList.contains('_anim-once')) {
					animItem.classList.remove('_anim-fadeIn');
					animItem.classList.remove('_anim-scaleIn');
				}
			}
		}
	}
};
function offset(el) {
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
};
animOnScroll();
// =================================

// Мобильное меню
// =================================
const menuBtn = document.querySelector('.header__btn');
const menuMobile = document.querySelector('.header__nav');
const page = document.querySelector('body');
// Открытие
menuBtn.addEventListener('click', function () {
	menuMobile.classList.toggle('open');
	page.classList.toggle('lock');
});
// Закрытие (при клике на ссылку)
menuMobile.addEventListener('click', function (event) {
	let target = event.target;
	if (target.classList.contains('nav__link')) {
		if (menuMobile.classList.contains('open')) {
			menuMobile.classList.remove('open');
			page.classList.remove('lock');
		}
	}
});
// =================================

// Смена языков
// =================================
const selectHeader = document.querySelector('.select-lang__header');
const selectBody = document.querySelector('.select-lang__body');
const selectItem = document.querySelectorAll('.select-lang__item');
const allLangs = ['ru', 'en'];
// Определение языка
document.addEventListener('DOMContentLoaded', changeURL);
// Смена хэша
function changeURL() {

	let choiceLang = selectHeader.querySelector('.active').getAttribute('data-value');

	location.href = window.location.pathname + '#' + choiceLang;
	changeLang();
}
// Смена текста
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
// Открытие селектора
selectHeader.addEventListener('click', function () {
	selectBody.classList.toggle('active');
});
// Смена иконки селектора
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
// =================================

// Модальные окна
// =================================
const myModal = new HystModal({
	linkAttributeName: "data-hystmodal",
});

// Смена языка при клике на ITV
// =================================
if (document.querySelector('.goto-vectura')) {
	const btnVectura = document.querySelector('.goto-vectura');
	btnVectura.addEventListener('click', function () {
		let hash = window.location.hash;
		window.open('https://itvectura.com/' + hash, '_blank');
	});
}
// =================================

// Скачивание презентации
// =================================
if (document.querySelector('.btn_doc')) {
	const btnPres = document.querySelector('.btn_doc');
	btnPres.addEventListener('click', function () {
		let hash = window.location.hash;
		hash = hash.substr(1);

		btnPres.setAttribute('href', './presentations/' + hash + '_i1Consulting.pdf');
	});
}
// =================================

// Эффект клика кнопки
// =================================
if (document.querySelectorAll('.button')) {
	const btns = document.querySelectorAll('button');
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', function () {
			btns[i].classList.add('click');
			setTimeout(() => btns[i].classList.remove('click'), 100);
		});
	}
}
// =================================

// Навигационные ссылки
// =================================
const getSectionId = (link) => link.getAttribute('href').replace('#', '');
if (document.querySelectorAll('.nav__link')) {
	const navLinks = document.querySelectorAll('.nav__link');
	for (let i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', function () {
			navLinks[i].classList.add('click');
			setTimeout(() => navLinks[i].classList.remove('click'), 100);
		});
	}
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
}
// =================================

// Отправка форм
// =================================
if (document.querySelectorAll('.form')) {
	const forms = document.querySelectorAll('.form');
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

				if (input.value == '') {
					addError(input);
					btnAddError(btnSend);
					error++;
				}

				if (input.classList.contains('_email')) {
					if (emailTest(input)) {
						addError(input);
						btnAddError(btnSend);
						error++;
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
}
// =================================

// Переключение контактов
// =================================
if (document.querySelector('.contacts__offices')) {
	const officeBody = document.querySelector('.contacts__offices');
	const offices = officeBody.querySelectorAll('.contacts__office');
	const mapMc = document.querySelector('.map_mc');
	const mapKz = document.querySelector('.map_kz');
	officeBody.addEventListener('click', function (event) {
		let target = event.target;

		if (target.classList.contains('contacts__office')) {
			for (let i = 0; i < offices.length; i++) {
				offices[i].classList.remove('active');
			}
		}

		target.classList.add('active');
		if (target.getAttribute('data-value') === 'mc') {
			mapMc.classList.add('active');
			mapKz.classList.remove('active');
		} else if (target.getAttribute('data-value') === 'kz') {
			mapMc.classList.remove('active');
			mapKz.classList.add('active');
		}
	});
}
// =================================

