<?php

require_once 'BaseService.class.php';
require_once __DIR__ . '/../dao/ContactUsDao.class.php';

class ContactUsService extends BaseService
{

    public function __construct()
    {
        parent::__construct(new ContactUsDao);
    }
}

?>