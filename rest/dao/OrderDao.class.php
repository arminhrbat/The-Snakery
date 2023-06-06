<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/BaseDao.class.php';

class OrderDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("orders");
    }
}

?>