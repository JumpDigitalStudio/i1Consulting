<!-- Request modal -->
<div class="hystmodal" id="form" aria-hidden="true">
	<div class="hystmodal__wrap">
		<div class="hystmodal__window" role="dialog" aria-modal="true">
			<button data-hystclose class="hystmodal__close">Закрыть</button>
			<div class="modal">
				<!-- Title -->
				<div class="modal__title">
					<p class="text text_size--l text_weight--sb l-connectTitle">Свяжитесь с нами</p>
					<img src="/resources/icons/icon_send.svg" alt="Письмо">
				</div>
				<!-- Form -->
				<form action="vendor/sendmail.php" method="POST" enctype="multipart/form-data" class="form modal__form">
					<input type="text" name="clientName" class="form__input _req l-name placeholder" placeholder="Ваше имя">
					<input type="mail" name="clientMail" class="form__input _req _email" placeholder="E-mail">
					<input type="text" name="clientRequest" class="form__input l-request placeholder" placeholder="Ваш вопрос">
					<button type="submit" class="form__btn btn l-send">Отправить</button>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- News modal -->
<div class="hystmodal" id="new" aria-hidden="true">
	<div class="hystmodal__wrap">
		<div class="hystmodal__window new" role="dialog" aria-modal="true">
			<button data-hystclose class="hystmodal__close">Закрыть</button>
			<div class="modal">
				<!-- Title -->
				<div class="modal__title">
					<p class="text text_size--l text_weight--sb l-newsST1">Выставка «Logitrans»</p>
				</div>
				<!-- Description -->
				<p class="text text_size--xs text_weight--r l-new1TX1">
					Выставка «Logitrans» проходила в «Avrasya Show and Art Center» (Стамбул) с 16 по 18 ноября 2022 года.
					Выставка «Logitrans» – это самая мощная платформа для укрепления деловых связей в межконтинентальной
					цепочке поставок между Европой и Азией и для объединения ключевых игроков в логистическом секторе.
				</p>
				<!-- Picture -->
				<div class="modal__pic">
					<img src="resources/images/news/new_stambul.jpg" alt="Выставка «Logitrans»">
				</div>
				<!-- Text -->
				<div class="modal__new">
					<p class="text text_size--xs text_weight--r l-new1TX2">
						В павильонах выставки было представлено более 160 компаний из 23 стран, а по итогам выставки было
						подсчитано рекордное количество участников - 16.724 человек. Участие принимали такие компании, как Turkish
						Cargo, ShipsGo, Siber, Oregon и многие другие.
					</p>
					<p class="text text_size--xs text_weight--r l-new1TX3">
						Компания «i1 Consulting» презентовала свой экспертный подход в оптимизации и цифровизации логистических
						процессов, и поделилась опытом в развитии своего уникального проекта «IT VECTURA». В рамках форума
						специалисты компании рассказали о своем многолетнем опыте внедрения системы управления логистикой на базе
						SAP и сервисах компании. Сегодня «i1 Consulting» – это команда IT-специалистов, которая успешно развивает
						десятки компаний стран России, Казахстана и стран Европы.
					</p>
					<p class="text text_size--xs text_weight--r l-new1TX4">
						Благодаря участию в выставке компания «i1 Consulting» нашла новых партнеров и клиентов, получила отличную
						возможность презентовать свой бренд на международной площадке, а также поделилась собственным опытом и
						переняла лучшие практики у коллег.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>