<?php

require_once 'BaseService.class.php';
require_once __DIR__ . '/../dao/SnakeDao.class.php';

class SnakeService extends BaseService
{

    public function __construct()
    {
        parent::__construct(new SnakeDao);
    }

    public function getSnakeByNameAndPrice($common_name, $price)
    {
        return $this->dao->getSnakeByNameAndPrice($common_name, $price);
    }
}

?>