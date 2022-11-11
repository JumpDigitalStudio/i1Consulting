<?php

$to = 'info@i1cons.com';
$from = "From: Заявка с сайта i1 Consulting\n\r";

$page = 'Лендинг i1 Consulting';

$CName = $_POST['clientName'];
$CMail = $_POST['clientMail'];
$CRequest = $_POST['clientRequest'];

$date = date("d.m.Y");
$time = date("h:i");

$theme = 'Заявка с сайта i1 Consulting';

$message = '
<html>
<body>
<center>	
<table border=1 cellpadding=6 cellspacing=0 width=90% bordercolor="#01426A">
 <tr><td colspan=2 align=center bgcolor="#E9F0F6"><b>Пользовательская информация</b></td></tr>
 <tr>
  <td><b>Откуда</b></td>
  <td>' . $page . '</td>
 </tr>
 <tr>
  <td><b>Адрес клиента</b></td>
  <td><a href="mailto:' . $CMail . '">' . $CMail . '</a></td>
 </tr>
 <tr>
  <td><b>Имя клиента</b></td>
  <td>' . $CName . '</td>
 </tr>
 <tr>
  <td><b>Сообщение</b></td>
  <td>' . $CRequest . '</td>
 </tr>
 <tr>
 <td><b>Дата отправки</b></td>
 <td>' . $date . '</td>
</tr>	
<tr>
	<td><b>Время отправки</b></td>
	<td>' . $time . '</td>
</tr>
</table>
</center>	
</body>
</html>';

$headers = "Content-type: text/html; charset=utf-8\r\n";
$headers .= $from;

$domain = substr(strrchr($CMail, "@"), 1);
$res = getmxrr($domain, $mx_records, $mx_weight);

if (false == $res || 0 == count($mx_records) || (1 == count($mx_records) && ($mx_records[0] == null || $mx_records[0] == "0.0.0.0"))) {
	echo 'uncorrect';
} else {
	mail($to, $theme, $message, $headers);
}
