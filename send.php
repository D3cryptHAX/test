<?php
header("Location: https://xcczzxxsdscxvxdx.000webhostapp.com/sent.html");
$servername = "localhost";

$database = "id21486380_form";

$username = "id21486380_students";

$password = "Zhbrlt,bk666";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {

      die("Помилка з'єднання: " . mysqli_connect_error());

}

 

echo "_";

 

$sql = "INSERT INTO customers (names, phone, instagram) VALUES ('$_POST[names]', '$_POST[phone]', '$_POST[instagram]')";

if (mysqli_query($conn, $sql)) {

      echo "Дякуємо";

} else {

      echo "Помилка: " . $sql . "<br>" . mysqli_error($conn);

}

mysqli_close($conn);
?>
