<?php
require_once 'init.php';
require_once '../errorLogger.php';
// Look into init.php  for files with caps as variablenames starting with INIT
$VFDapp->get('/', function(){
	global $VFDtwig;
	echo $VFDtwig->render('home.html', array('none' => "none"));
});

$VFDapp->get('/model', function(){
	global $VFDtwig;
	echo $VFDtwig->render('model.html');
});

$VFDapp->get('/quiz', function(){
	global $VFDtwig;
	echo $VFDtwig->render('Quiz.html');
});

$VFDapp->get('/meatJudge', function(){
	global $VFDtwig;
	echo $VFDtwig->render('meatJudge.html');
});

$VFDapp->get('/credits', function(){
	global $VFDtwig;
	echo $VFDtwig->render('credits.html');
});

$VFDapp->run();
?>
