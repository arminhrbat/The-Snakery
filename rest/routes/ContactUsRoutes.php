<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

Flight::route('GET /admin/contact_us', function () {
    Flight::json(Flight::contactUsService()->get_all());
});

Flight::route('GET /admin/contact_us/@id', function($id){
    Flight::json(Flight::contactUsService()->get_by_id($id));
});

Flight::route('POST /contact_us', function(){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::contactUsService()->add($data));
});

Flight::route('DELETE /admin/contact_us/@id', function($id){
    Flight::contactUsService()->delete($id);
    echo "Deleted!";
});


?>