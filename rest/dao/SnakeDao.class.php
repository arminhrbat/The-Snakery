<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/BaseDao.class.php';

class SnakeDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("snakes");
    }

    function getSnakeByNameAndPrice($common_name, $price)
    {
        return $this->query_unique("SELECT * FROM snakes WHERE common_name = :common_name AND price = :price", ["common_name" => $common_name, "price" => $price]);
    
    }
}

?>