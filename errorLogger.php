<?php

define("PHP_ERROR", 0);
define("DB_ERROR", 1);
define("INFO", 2);

function log_error($error_type, $error_msg)
{

$php_error_file = 'php_error_logs.txt';

$db_error_file = 'db_error_logs.txt';

$app_info_file = 'app_info_log.txt';

  switch($error_type)
  {

  case PHP_ERROR:
  file_put_contents($php_error_file, "[" . date(DATE_RSS) . "]" . "\n" . $error_msg . "\n", FILE_APPEND | LOCK_EX);
  break;

  case DB_ERROR:
  file_put_contents($db_error_file, "[" . date(DATE_RSS) . "]" . "\n" . $error_msg . "\n", FILE_APPEND | LOCK_EX);
  break;
  
  case INFO:
  file_put_contents($app_info_file, "[" . date(DATE_RSS) . "]" . "\n" . $error_msg . "\n", FILE_APPEND | LOCK_EX);
  break;

  default:
  file_put_contents($php_error_file, "[" . date(DATE_RSS) . "]" . "\n" . "Application encountered an unknown error" . "\n",   FILE_APPEND | LOCK_EX);
  break;

  }
}

?>
