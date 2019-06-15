<?php
date_default_timezone_set('America/Chicago');
$DB_SERVER='';
$DB_USER="";
$DB_PASSWD="";
$DB_NAME="";

// bootstrap.php

//require_once 'config.php';

//$dbConfig = getDbConfig();
//$DB_SERVER= $dbConfig["server"];

require_once "vendor/autoload.php";
require_once(dirname(__FILE__)."/entities/TBone.php");

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

$paths = array(dirname(__FILE__)."/entities");
$isDevMode = false;

$dbParams = array(
    'driver'   => 'pdo_mysql',
    'user'     => "$DB_USER",
    'password' => "$DB_PASSWD",
    'dbname'   => "$DB_NAME",
);

$config = Setup::createXMLMetadataConfiguration($paths, $isDevMode);
$em = EntityManager::create($dbParams, $config);
