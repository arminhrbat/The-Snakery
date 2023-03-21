<?php 

//cannot be execute

class TheSnakeryDao{

    private $conn; //private atribute so that we can use it in other functions

    //constructor of this class
    public function __construct(){
        //connecting to the database   
        $servername = "localhost:8889";
        $username = "root";
        $password = "root";
        $schema = "thesnakerylocal";
        
        $this->conn = new PDO("mysql:host=$servername;dbname=$schema", $username, $password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        
    }

    //method used to read all objects from database
    public function get_all(){
        $stmt = $this->conn->prepare("SELECT * FROM users");
        $stmt->execute();
        return $stmt -> fetchAll(PDO::FETCH_ASSOC); //FETCH ASSOC means that output will be associative array -> it is more readable
        
    }

    //method used to add something to the databse ie. name
    public function add($name, $lastname){
        $stmt = $this->conn->prepare("INSERT INTO users (name, lastname) VALUES (:name, :lastname)");
        $stmt->execute(['name' => $name, 'lastname' => $lastname]);
    }

    //method used to delete record from the database
    public function delete($id){
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id);//sql injection prevention
        $stmt->execute();
    }

    //method used to update record
    public function update($id, $name, $lastname){
        $stmt = $this->conn->prepare("UPDATE users SET name = :name, lastname = :lastname WHERE id = :id");
        $stmt->execute(['id' => $id, 'name' => $name, 'lastname' => $lastname]);
    }
}


?>