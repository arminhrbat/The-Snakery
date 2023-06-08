<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require '../vendor/autoload.php';
use OpenApi\scan;
/**
 * @OA\Info(title="The Snakery", version="0.1", @OA\Contact(email="arminhrbat@yahoo.com", name="Armin Hrbat"))
 * @OA\OpenApi(
 *    @OA\Server(url="http://localhost:8888/The-Snakery/rest", description="Development Environment" ),
 *    @OA\Server(url="https://todos.biznet.ba/rest", description="Production Environment" )
 * ),
 * @OA\SecurityScheme(securityScheme="ApiKeyAuth", type="apiKey", in="header", name="Authorization" )
 */

Flight::route('/*',function(){
    //perform JWT decode
    $path = Flight::request()->url;
    
    if(
      $path !='/admin/snakes' &&
      $path !='/admin/snakes/best_seller' &&
      $path !='/admin/snakes/@id' && 
      $path !='/admin/contact_us' &&
      $path !='/admin/contact_us/@id'
      ) return TRUE;   //exclude login route from middleware
    $headers = getallheaders();
    if(@!$headers['Authorization']){
      Flight::json(["message" => "Authorization is missing"],403);
      return FALSE;
    }else {
      try {
        $decoded = (array)JWT::decode($headers['Authorization'],new Key('example_key','HS256'));
        Flight::set('user',$decoded);
        return TRUE;
      } catch (\Exception $e) {
        Flight::json(["message" => "Authorization token is not valid"],403);
        return FALSE;
      }
  
    }
    print_r($headers);
  });

require_once __DIR__ ."/dao/AdminLoginDao.class.php";
Flight::register('adminLoginDao','AdminLoginDao');
require_once __DIR__ . '/routes/AdminLoginRoute.php';

require_once __DIR__ . '/services/SnakeService.class.php';
Flight::register('snakeService', 'SnakeService');
require_once __DIR__ . '/routes/SnakeRoutes.php';


require_once __DIR__ . '/services/AdminService.class.php';
Flight::register('adminService', 'AdminService');
require_once __DIR__ . '/routes/AdminRoutes.php';

require_once __DIR__ . '/services/OrderService.class.php';
Flight::register('orderService', 'OrderService');
require_once __DIR__ . '/routes/OrderRoutes.php';

require_once __DIR__ . '/services/ContactUsService.class.php';
Flight::register('contactUsService', 'ContactUsService');
require_once __DIR__ . '/routes/ContactUsRoutes.php';




/*REST API documentation endpoint*/
Flight::route('GET /docs.json',function(){
  $openapi=\OpenApi\Generator::scan(["./services"]);
  header('Content-Type:application/json');
  echo $openapi->toJson();
});



Flight::route('GET /test', function(){
    echo "Hello from Test route";
});

Flight::start();

?>