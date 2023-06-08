<?php
//Konekcija na databazu
class Config{

    public static function DB_HOST(){
        return Config::get_env("DB_HOST", "the-snakery-dbocean-do-user-11549992-0.b.db.ondigitalocean.com");
      }
      public static function DB_USERNAME(){
        return Config::get_env("DB_USERNAME", "doadmin");
      }
      public static function DB_PASSWORD(){
        return Config::get_env("DB_PASSWORD", "AVNS_5pjUFQnwxruIlDO_RCo");
      }
      public static function DB_SCHEME(){
        return Config::get_env("DB_SCHEME", "defaultdb");
      }
      public static function DB_PORT(){
        return Config::get_env("DB_PORT", "25060");
      }
      public static function get_env($name, $default){
        return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
       }
}

?>