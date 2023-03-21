<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

require_once("rest/dao/TheSnakeryDao.class.php");

$dao = new TheSnakeryDao();
$results = $dao->get_all();
print_r($results);


?>
