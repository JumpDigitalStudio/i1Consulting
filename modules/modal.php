<div class="hystmodal" id="form" aria-hidden="true">
	<div class="hystmodal__wrap">
		<div class="hystmodal__window" role="dialog" aria-modal="true">
			<button data-hystclose class="hystmodal__close">Закрыть</button>
			<div class="modal">
				<!-- Title -->
				<div class="modal__title">
					<p class="text text_size--s4 text_weight--sb l-connectTitle">Свяжитесь с нами</p>
					<img src="./resources/icons/icon_send.svg" alt="Письмо">
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