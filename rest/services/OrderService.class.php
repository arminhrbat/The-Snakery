<?php

require_once 'BaseService.class.php';
require_once __DIR__ . '/../dao/OrderDao.class.php';

class OrderService extends BaseService
{

    public function __construct()
    {
        parent::__construct(new OrderDao);
    }
}

?>