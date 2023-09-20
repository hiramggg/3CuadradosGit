<?php
// Ruta al archivo JSON de usuarios
$jsonFilePath = 'users.json';

// Verificar si se recibió una solicitud POST con datos JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = file_get_contents('php://input');
    
    if ($requestData !== false) {
        // Decodificar los datos JSON recibidos
        $newUserData = json_decode($requestData, true);

        if ($newUserData !== null) {
            // Codificar la lista de nuevos usuarios como JSON
            $updatedJsonData = json_encode($newUserData, JSON_PRETTY_PRINT);

            // Escribir los datos actualizados de vuelta al archivo JSON
            if (file_put_contents($jsonFilePath, $updatedJsonData) !== false) {
                // La actualización fue exitosa
                http_response_code(200);
            } else {
                // Error al escribir en el archivo JSON
                http_response_code(500);
                echo 'Error interno del servidor al guardar los datos.';
            }
        } else {
            // Error al decodificar los datos JSON recibidos
            http_response_code(400);
            echo 'Datos JSON incorrectos o malformados.';
        }
    } else {
        // Error al recibir los datos POST
        http_response_code(400);
        echo 'Error al recibir los datos POST.';
    }
} else {
    // No se recibió una solicitud POST válida
    http_response_code(400);
    echo 'Solicitud no válida.';
}
?>
