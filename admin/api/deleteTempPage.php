<?php

$file = "../../sdbdbs8979s7db97_sdv89.html";

if(file_exists($file)) {
    unlink($file);
} else {
    header("HTTP/1.0 400 Bad Request");
}
