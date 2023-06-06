<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/BaseDao.class.php';

class ContactUsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("contact_us");
    }
}

?>