<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
require '../vendor/autoload.php';

require_once __DIR__ . '/services/SnakeService.class.php';
Flight::register('snakeService', 'SnakeService');
require_once __DIR__ . '/routes/SnakeRoutes.php';

Flight::route('GET /test', function(){
    echo "Hello from Test route";
});

Flight::start();







































/*
require_once("rest/dao/UsersDao.class.php");

$dao = new UsersDao();

Flight::register('usersDao', 'UsersDao');

Flight::route('GET /users', function(){
    Flight::json(Flight::usersDao()->getAll());
});

Flight::route('POST /addUser', function(){
    
    $data = Flight::request()->data->getData();
    Flight::json(Flight::usersDao()->add($data));
    
});

Flight::route('POST /updateUser', function(){
    $dao = new UsersDao();
    $id = $_REQUEST['id'];
    $firstName = $_REQUEST['firstName'];
    $lastName = $_REQUEST['lastName'];
    $age = $_REQUEST['age'];

    $dao->update($id, $firstName, $lastName, $age);
    
});

Flight::route('POST /deleteUser', function(){
    $dao = new UsersDao();
    $id = $_REQUEST['id'];
    $dao->delete($id);
    
});

Flight::route('/', function(){
    echo 'Hello World!';
});

Flight::start();
*/
?>