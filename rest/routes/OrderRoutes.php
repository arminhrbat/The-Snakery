<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

Flight::route('GET /order', function () {
    Flight::json(Flight::orderService()->get_all());
});

Flight::route('GET /order/@id', function($id){
    Flight::json(Flight::orderService()->get_by_id($id));
});


Flight::route('POST /order', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::orderService()->add($data));
});


Flight::route('PUT /order/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::orderService()->update($id, $data);
    Flight::json(Flight::orderService()->get_by_id($id));
});

Flight::route('DELETE /order/@id', function($id){
    Flight::orderService()->delete($id);
    echo "Deleted!";
});


?>