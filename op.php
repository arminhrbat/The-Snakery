<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

require_once("rest/dao/TheSnakeryDao.class.php");

$op = $_REQUEST['op'];
$dao = new TheSnakeryDao();

switch ($op) {
    case 'insert':
        $name = $_REQUEST['name'];
        $lastname = $_REQUEST['lastname'];
        $dao->add($name, $lastname);
        echo "added";

        break;
    
    case 'delete':
        $id = $_REQUEST['id'];
        $dao->delete($id);
        echo "DELETED RECORD WITH ID: $id";

        break;

    case 'update':
        $id = $_REQUEST['id'];
        $name = $_REQUEST['name'];
        $lastname = $_REQUEST['lastname'];
        $dao->update($id, $name, $lastname);
        echo "UPDATED RECORD WITH ID: $id";

        break; 

    case 'get':      
    default:

        $results = $dao->get_all();
        print_r($results);
    
        break;
}



?>
