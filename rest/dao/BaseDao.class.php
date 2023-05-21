<?php 

require_once __DIR__ . '/../config.php';

//cannot be execute

class BaseDao{

    private $table_name;
    private $conn; //private atribute so that we can use it in other functions

    //constructor of this class
    public function __construct($table_name){
        //connecting to the database 
        $this->table_name = $table_name;
        $servername = Config::$servername;
        $username = Config::$username;
        $password = Config::$password;
        $schema = Config::$schema;
        
        $this->conn = new PDO("mysql:host=$servername;dbname=$schema", $username, $password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        
    }

    protected function getConnection() {
        if (!$this->conn) {
          $this->conn = new PDO("mysql:host=$this->dbhost;dbname=$this->dbname", $this->dbuser, $this->dbpass);
          $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return $this->conn;
      }

    //method used to read all objects from database
    public function get_all(){
        $stmt = $this->conn->prepare("SELECT * FROM ".$this->table_name);
        $stmt->execute();
        return $stmt -> fetchAll(PDO::FETCH_ASSOC); //FETCH ASSOC means that output will be associative array -> it is more readable   
    }

    public function get_by_id($id){
        $stmt = $this->conn->prepare("SELECT * FROM ". $this->table_name ." WHERE id = :id");
        $stmt->execute(['id'=>$id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return reset($result);
      }

    //method used to add something to the databse ie. name
    public function add($data){
        $query = "INSERT INTO ".$this->table_name." (";
        foreach ($data as $column => $value){
          $query .=$column.", ";
        }
        $query = substr($query,0,-2);
        $query .=") VALUES (";
        foreach ($data as $column => $value){
          $query .= ":".$column.", ";
        }
        $query = substr($query,0,-2);
        $query .= ")";
    
        $stmt = $this->conn->prepare($query);
      // $data['id'] = $this->conn->lastInsertId();
        $stmt->execute($data);
        return $data;
      }

    //method used to delete record from the database
    public function delete($id){
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id);//sql injection prevention
        $stmt->execute();
    }

    //method used to update record
    public function update($id, $data, $id_column = "id"){
        $query = "UPDATE " .$this->table_name. " SET ";
        foreach($data as $name=>$value){
          $query .= $name ."= :". $name. ", ";
        }
    
        $query = substr($query,0,-2);
        $query .= " WHERE {$id_column} = :id";
    
        $stmt = $this->conn->prepare($query);
        $data['id']= $id;
        $stmt->execute($data);
      }

      protected function query($query, $params = []){
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
      }

      protected function query_unique($query, $params = []){
        $result = $this->query($query, $params);
        return reset($result);
      }

      
}


?>