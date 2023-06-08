<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);



Flight::route('GET /admin/snakes', function () {
    Flight::json(Flight::adminService()->get_all());
});

Flight::route('GET /admin/snakes/best_seller', function () {
    Flight::json(Flight::adminService()->getBestSellerSnake());
});

Flight::route('GET /admin/snakes/@id', function($id){
    Flight::json(Flight::adminService()->get_by_id($id));
});


Flight::route('POST /admin/snakes', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::adminService()->add($data));
});


Flight::route('PUT /admin/snakes/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::adminService()->update($id, $data);
    Flight::json(Flight::adminService()->get_by_id($id));
});

Flight::route('DELETE /admin/snakes/@id', function($id){
    Flight::adminService()->delete($id);
    echo "Deleted!";
});


?>