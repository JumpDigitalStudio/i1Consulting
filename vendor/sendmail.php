<?php

// Form data
$name = $_POST['clientName'];
$mail = $_POST['clientMail'];
$request = $_POST['clientRequest'];

$date = date("d.m.Y");
$time = date("h:i");

// E-mail data
$to = 'info@i1cons.com';
$from = "From: Заявка с сайта i1.consulting\n\r";

$page = 'i1 Consulting';
$theme = 'Заявка с сайта i1.consulting';

// E-mail headers
$headers = "Content-type: text/html; charset=utf-8\r\n";
$headers .= $from;

// Telegram bot token
$token = "5612776289:AAG8VWNl8E8zB1MMOLE6Nxg_LAy91-MaHB4";
$chat_id = "-813127054";

// Data for Telegram
$siteName = 'i1 CONSULTING';
$arr = array(
	'С сайта: ' => $siteName,
	'Дата: ' => $date,
	'Время: ' => $time,
	'Имя: ' => $name,
	'E-mail: ' => $mail,
	'Вопрос: ' => $request
);

foreach ($arr as $key => $value) {
	$txt .= "<b>" . $key . "</b>" . $value . "%0A";
};

$message = '
<html>
<body>
<center>	
<table border=1 cellpadding=6 cellspacing=0 width=350 bordercolor="#01426A">
 <tr><td colspan=2 align=center bgcolor="#E9F0F6"><b>Пользовательская информация</b></td></tr>
 <tr>
  <td><b>С сайта</b></td>
  <td>' . $page . '</td>
 </tr>
 <tr>
  <td><b>E-mail</b></td>
  <td><a href="mailto:' . $mail . '">' . $mail . '</a></td>
 </tr>
 <tr>
  <td><b>Имя</b></td>
  <td>' . $name . '</td>
 </tr>
 <tr>
  <td><b>Вопрос</b></td>
  <td>' . $request . '</td>
 </tr>
 <tr>
 <td><b>Дата</b></td>
 <td>' . $date . '</td>
</tr>	
<tr>
	<td><b>Время</b></td>
	<td>' . $time . '</td>
</tr>
</table>
</center>	
</body>
</html>';

$domain = substr(strrchr($mail, "@"), 1);
$res = getmxrr($domain, $mx_records, $mx_weight);

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
$sendToMail = mail($to, $theme, $message, $headers);

if (!$sendToMail) {
	echo 'ermail';
} else if (!$sendToTelegram) {
	echo 'ertel';
} else {
	echo 'send';
}
