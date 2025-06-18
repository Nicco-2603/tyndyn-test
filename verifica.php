<?php
// Inserisci la tua chiave segreta
$secretKey = "6LdK11wrAAAAADk8bpxgjEjiGyMhWyp3NhcuH4o1";

$response = $_POST["g-recaptcha-response"];
$remoteip = $_SERVER["REMOTE_ADDR"];

// Verifica della risposta
$verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
$data = [
    "secret" => $secretKey,
    "response" => $response,
    "remoteip" => $remoteip
];

$options = [
    "http" => [
        "method" => "POST",
        "header" => "Content-type: application/x-www-form-urlencoded\r\n",
        "content" => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$verify = file_get_contents($verifyUrl, false, $context);
$captchaSuccess = json_decode($verify);

if ($captchaSuccess->success) {
    echo "Captcha verificato con successo. Grazie " . htmlspecialchars($_POST["nome"]) . "!";
    echo "ciaoaicao";
} else {
    echo "Verifica CAPTCHA fallita. Riprova.";
}
?>
