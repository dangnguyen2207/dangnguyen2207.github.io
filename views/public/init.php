<?php

session_start();
require_once '../vendor/autoload.php'; 
require_once "../bootstrap.php";
$VFDtwig = new Twig_Environment(new Twig_Loader_Filesystem('../views')); 
\Slim\Slim::registerAutoloader();
$VFDapp = new \Slim\Slim();
// TWIG FUNCTIONS #####################################################################
$functionpath = new Twig_SimpleFunction("path", function ($keystr) {
    echo "/index.php/$keystr";
});

$functionis_granted = new Twig_SimpleFunction("is_granted", function ($userrole) {
			if(!empty($_SESSION["IS_USER"]) && !empty($_SESSION["IS_ID"]))
			{
				return 1;
			}
			else 
			{
    			return 0;
    		}
});
$VFDtwig->addFunction($functionpath);
$VFDtwig->addFunction($functionis_granted);

?>
