"use strict"

const page = document.querySelector('.page');
const menuBtn = document.querySelector('.header__burger');
const menuMobile = document.querySelector('.header__mobile');

let isMobile;
let animStart;
const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;
const deviceType = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			deviceType.Android() ||
			deviceType.BlackBerry() ||
			deviceType.iOS() ||
			deviceType.Opera() ||
			deviceType.Windows()
		);
	}
};


// Detect device
if (deviceType.any() || windowWidth <= 767) {
	isMobile = true;
	animStart = 8;
}
else {
	isMobile = false;
	animStart = 4;
};


// Modal windows
const myModal = new HystModal({
	linkAttributeName: "data-hystmodal",
});


// Adaptive pictures
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


// Navigation
if (document.querySelectorAll('.scr-list')) {
	const getSectionId = (link) => link.getAttribute('href').replace('#', '');

	const navLists = document.querySelectorAll('.scr-list');

	navLists.forEach(
		(lists) => lists.addEventListener('click', (event) => {

			if (event.target.classList.contains('scr-link')) {
				event.preventDefault();

				if (isMobile === true) {
					page.classList.remove('lock');
					menuBtn.classList.remove('active');
					menuMobile.classList.remove('active');

					window.scrollTo({
						top: document.getElementById(getSectionId(event.target)).offsetTop,
						behavior: 'smooth',
					});
				} else {
					window.scrollTo({
						top: document.getElementById(getSectionId(event.target)).offsetTop,
						behavior: 'smooth',
					});
				}
			}
		}),
	);
};


// Mobile menu
if (document.querySelector('.header__burger')) {
	menuBtn.addEventListener('click', function () {
		if (isMobile === true) {
			page.classList.toggle('lock');
			menuBtn.classList.toggle('active');
			menuMobile.classList.toggle('active');
		}
	})
};


// Lang switcher
if (document.querySelector('.select-lang')) {
	const selectHeader = document.querySelector('.select-lang__header');
	const selectBody = document.querySelector('.select-lang__body');

	selectHeader.addEventListener('click', function () {
		selectBody.classList.toggle('active');
	});
};


// Top button hide
if (document.querySelector('.go-top')) {
	const goButton = document.querySelector('.go-top');

	window.addEventListener('scroll', () => {
		let scroll = document.documentElement.scrollTop;

		if (scroll >= 550) {
			goButton.classList.add('active');
		} else {
			goButton.classList.remove('active');
		}
	})
};


// Click effect for buttons
if (document.querySelectorAll('.btn')) {

	const btns = document.querySelectorAll('.btn');

	btns.forEach(btn => {
		btn.addEventListener('click', function () {
			btn.classList.add('click');
			setTimeout(() => btn.classList.remove('click'), 100);
		})
	})
};
// Click effect for links
if (document.querySelectorAll('a')) {

	const links = document.querySelectorAll('.text_a');

	links.forEach(link => {
		link.addEventListener('click', function () {
			link.classList.add('click');
			setTimeout(() => link.classList.remove('click'), 100);
		})
	})
};


document.addEventListener('DOMContentLoaded', () => {

	// Form send
	document.querySelectorAll('.form').forEach(item => {
		item.addEventListener('submit', function (event) {
			event.preventDefault();
			const form = this;

			let error = formValidate(form);

			if (error === 0) {
				const btnSend = form.querySelector('.form__btn');
				const actionURL = form.getAttribute('action');

				let th = $(this);

				$.ajax({
					url: actionURL,
					type: 'POST',
					data: th.serialize(),

					success: function (data) {

						btnSend.innerHTML = data;
						th.trigger('reset');
					},

					error: function () {

						btnSend.innerHTML = 'Client error';
						th.trigger('reset');
					}
				})
			}

			function formValidate(form) {
				let error = 0;
				let formReq = form.querySelectorAll('._req');

				for (let i = 0; i < formReq.length; i++) {
					const input = formReq[i];
					formRemoveError(input);

					if (input.classList.contains('_email')) {
						if (emailTest(input)) {
							formAddError(input);
							error++;
						}
					} else {
						if (input.value === '') {
							formAddError(input);
							error++;
						}
					}
				}
				return error;
			}

			function formAddError(input) {
				input.classList.add('error');
			}

			function formRemoveError(input) {
				input.classList.remove('error');
			}

			function emailTest(input) {
				return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
			}
		});
	});

	// Animations
	let animItems = document.querySelectorAll('._anim');
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		animOnScroll();
	};
	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_anim-fadeIn');
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
});

