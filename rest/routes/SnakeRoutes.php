<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

Flight::route('GET /snakes', function () {
    Flight::json(Flight::snakeService()->get_all());
});

Flight::route('GET /snakes/@id', function($id){
    Flight::json(Flight::snakeService()->get_by_id($id));
});

Flight::route('GET /snakes/@common_name/@price', function($common_name, $price){
    Flight::json(Flight::snakeService()->getSnakeByNameAndPrice($common_name, $price));
});

Flight::route('POST /snakes', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::snakeService()->add($data));
});

Flight::route('PUT /snakes/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::snakeService()->update($id, $data);
    Flight::json(Flight::snakeService()->get_by_id($id));
});

Flight::route('DELETE /snakes/@id', function($id){
    Flight::snakeService()->delete($id);
    echo "Deleted!";
});


?>