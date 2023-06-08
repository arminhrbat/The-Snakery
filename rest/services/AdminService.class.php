<?php

require_once 'BaseService.class.php';
require_once __DIR__ . '/../dao/AdminDao.class.php';

class AdminService extends BaseService
{

            /**
* @OA\Get(path="/test2",tags={"username"},security={{"ApiKeyAuth":{}}},
*         summary ="Check is usernaem available",
*         @OA\Parameter(in="path",name="username",example=1,description="username"),
*         @OA\Response(response=200,description="Get specified username")
* )
*/

    public function __construct()
    {
        parent::__construct(new AdminDao);
    }

}

?>