<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
require '../vendor/autoload.php';

require_once __DIR__ . '/services/SnakeService.class.php';
Flight::register('snakeService', 'SnakeService');
require_once __DIR__ . '/routes/SnakeRoutes.php';


require_once __DIR__ . '/services/AdminService.class.php';
Flight::register('adminService', 'AdminService');
require_once __DIR__ . '/routes/AdminRoutes.php';

Flight::route('GET /test', function(){
    echo "Hello from Test route";
});

Flight::start();

?>