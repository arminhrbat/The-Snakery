<?php

require_once 'BaseService.class.php';
require_once __DIR__ . '/../dao/SnakeDao.class.php';

class SnakeService extends BaseService
{

    public function __construct()
    {
        parent::__construct(new SnakeDao);
    }

/**
* @OA\Get(path="/The-Snakery/rest/snakes",tags={"snakes"},security={{"ApiKeyAuth":{}}},
*         summary ="List all snakes",
*         @OA\Response(response=200,description="All snakes")
* )
*/
    public function getSnakeByNameAndPrice($common_name, $price)
    {
        return $this->dao->getSnakeByNameAndPrice($common_name, $price);
    }

    public function getBestSellerSnake()
    {
        return $this->dao->getBestSellerSnake();
    }
}

?>