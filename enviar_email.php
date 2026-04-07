<?php
// Configura o cabeçalho para retornar JSON
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta e sanitiza os dados do formulário
    $nome = strip_tags(trim($_POST["Nome"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $telefone = strip_tags(trim($_POST["Telefone"] ?? ''));
    $assunto = strip_tags(trim($_POST["_subject"] ?? 'Novo Pedido de Serviço/Contato - Site'));
    $mensagem = trim($_POST["Mensagem"] ?? '');

    // Validação básica
    if (empty($nome) || empty($email) || empty($mensagem) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Dados inválidos."]);
        exit;
    }

    $para = "joaokeweni51@gmail.com";

    // Boundary para o email com formato MIME (necessário para anexos)
    $boundary = md5(time());

    $headers = "From: $nome <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

    // Corpo da mensagem em texto
    $corpo_email = "--" . $boundary . "\r\n";
    $corpo_email .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $corpo_email .= "Content-Transfer-Encoding: 8bit\r\n\r\n";

    $corpo_email .= "Você recebeu uma nova mensagem pelo site da Michel Emplacamentos.\n\n";
    $corpo_email .= "Nome: $nome\n";
    $corpo_email .= "E-mail: $email\n";
    $corpo_email .= "Telefone: $telefone\n";
    $corpo_email .= "Serviço / Assunto: $assunto\n\n";
    $corpo_email .= "Mensagem:\n$mensagem\n\n";

    // Processar anexo, se houver
    if (isset($_FILES['documento']) && $_FILES['documento']['error'] == UPLOAD_ERR_OK) {
        $arquivo_tmp = $_FILES['documento']['tmp_name'];
        $arquivo_nome = $_FILES['documento']['name'];
        $arquivo_tipo = $_FILES['documento']['type'];

        // Ler o conteúdo do arquivo
        $fp = fopen($arquivo_tmp, "rb");
        $conteudo_arquivo = fread($fp, filesize($arquivo_tmp));
        fclose($fp);

        // Codificar em base64 e quebrar as linhas (requisito MIME)
        $conteudo_arquivo = chunk_split(base64_encode($conteudo_arquivo));

        $corpo_email .= "--" . $boundary . "\r\n";
        $corpo_email .= "Content-Type: $arquivo_tipo; name=\"" . basename($arquivo_nome) . "\"\r\n";
        $corpo_email .= "Content-Disposition: attachment; filename=\"" . basename($arquivo_nome) . "\"\r\n";
        $corpo_email .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $corpo_email .= $conteudo_arquivo . "\r\n\r\n";
    }

    $corpo_email .= "--" . $boundary . "--";

    // Envio do e-mail usando a função nativa do PHP
    if (mail($para, $assunto, $corpo_email, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "E-mail enviado com sucesso."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Erro de servidor ao tentar enviar o e-mail."]);
    }

} else {
    // Se não for POST
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
}
?>