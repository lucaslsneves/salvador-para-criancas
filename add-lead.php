<?php

try {
    include 'db-connection.php';

    if (!isset($_POST['name']) || !isset($_POST['name']) || !isset($_POST['cpf']) || !isset($_POST['telephone'])) {
        $response['success'] = false;
        $response['message'] = 'Nome, E-mail, Telefone e CPF são obrigatórios';
        echo json_encode($response);
        exit;
    }

    $name =  mysqli_real_escape_string($mysqli, $_POST['name']);
    $email =  mysqli_real_escape_string($mysqli, $_POST['email']);
    $cpf =  mysqli_real_escape_string($mysqli, $_POST['cpf']);
    $telephone =  mysqli_real_escape_string($mysqli, $_POST['telephone']);

    $query = "INSERT INTO `leads` (name,email,telephone,cpf) values ('" . $name . "','" . $email . "','" . $telephone . "','" . $cpf . "')";
    $querySuccess = $mysqli->query($query);

    if ($querySuccess) {
        $response['success'] = true;
        $response['message'] = 'Cadastro efetuado com sucesso!';
        echo json_encode($response);
        exit;
    } else {
        $response['success'] = false;
        $response['message'] = 'Erro inesperado';
        echo json_encode($response);
        exit;
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = 'Erro inesperado';
    echo json_encode($response);
    exit;
}
