<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('/Applications/XAMPP/xamppfiles/htdocs/scoresheet-backend/scoresheet_database.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5174');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
};

function addNewStudent ($file_data, $conn) {

    $insert_sql = "INSERT INTO Students (Student_name, Student_id, Student_math, Student_english, Student_history) VALUES (?,?,?,?,?)";
    $insert_stmt = $conn->prepare($insert_sql);

    if (empty($file_data)) {

        echo "Message is empty!";
    
    } else {
        // Proceed with your query
        if ($insert_stmt) {
        // Bind the variable to the prepared statement ('s' for string)
        $insert_stmt->bind_param("siiii", $file_data['student_name'], $file_data['student_id'], $Math, $English, $History);
        
        if ($file_data['subject'] == 'English') {
            $English = $file_data['score'];
            $History = null;
            $Math = null;
        } else if ($file_data['subject'] == 'History') {
            $History = $file_data['score'];
            $English = null;
            $Math = null;
        } else if ($file_data['subject'] == 'Math') {
            $Math = $file_data['score'];
            $History = null;
            $English = null;
        };
            
        
        
        // Execute the query
            if ($insert_stmt->execute()) {
                echo "Records inserted successfully!";

            } else {
                echo "Error: " . $insert_stmt->error;
            };
        
            
            // Close the statement

            $insert_stmt->close();


        
        } else {
        echo "Error preparing statement: " . $conn->error;
        }
    
    }
    // Close the connection
    $conn->close();
}


function process_file ($file_data, $conn) {
    
    if (isset($file_data)) {
        echo json_encode(['status' => 'success', 'message' => 'Message received: ' . $file_data]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No message received']);
    }

    $insert_sql = "INSERT INTO Students (Student_name, Student_id, Student_math, Student_english, Student_history) VALUES (?,?,?,?,?)";
    $reset_sql = "DELETE FROM Students";
    $insert_stmt = $conn->prepare($insert_sql);



    if ($file_data['student_id'] == 1) { //checks if it's the first student, so that the table is reset before the first student is added
        if (mysqli_query($conn, $reset_sql)) { //execute query
            echo "Reset Table";
            echo $file_data['student_name'];
        } else {
            echo "Error with resetting table";
        };
    } else {
        echo "not number one: ";
        echo $file_data['student_name'] . $file_data['student_math'];

    }


    if (empty($file_data)) {

        echo "Message is empty!";
    
    } else {
        // Proceed with your query
        if ($insert_stmt) {
        // Bind the variable to the prepared statement ('s' for string)
        $insert_stmt->bind_param("siiii", $file_data['student_name'], $file_data['student_id'], $file_data['student_math'], $file_data['student_english'], $file_data['student_history']);
        
            

            // Execute the query
            if ($insert_stmt->execute()) {
                echo "Records inserted successfully!";

            } else {
                echo "Error: " . $insert_stmt->error;
            };
        
            
            // Close the statement

            $insert_stmt->close();


        
        } else {
        echo "Error preparing statement: " . $conn->error;
        }
    
    }
    // Close the connection
    $conn->close();
};

function student_count ($conn) {
    $check_count_sql = "SELECT COUNT(Student_name) FROM Students";
    $check_count_stmt = $conn->prepare($check_count_sql);


    if ($check_count_stmt) {
        // Bind the variable to the prepared statement ('s' for string)
            // Execute the query
            if ($check_count_stmt->execute()) {
                $check_count_stmt->bind_result($student_count);
                $check_count_stmt->fetch();
                echo json_encode(['count' => $student_count]); //returns whether the student exists


            } else {
                echo "Error: " . $check_count_stmt->error;
            };
        
            // Close the statement
            $check_count_stmt->close();

        } else {
        echo "Error preparing statement: " . $conn->error;
        }
        // Close the connection
        $conn->close();
};

function exists ($id, $conn) {
    //SELECT COUNT(*) FROM users WHERE email = ?

    $check_exist_sql = "SELECT COUNT(*) FROM Students WHERE Student_id = ?";
    $check_exist_stmt = $conn->prepare($check_exist_sql);


    if ($check_exist_stmt) {
        // Bind the variable to the prepared statement ('s' for string)
        $check_exist_stmt->bind_param("i", $id);

            // Execute the query
            if ($check_exist_stmt->execute()) {
                $check_exist_stmt->bind_result($student_count);
                $check_exist_stmt->fetch();
                echo json_encode(['checked'=> 'existence checked', 'exist' => $student_count > 0]); //returns whether the student exists


            } else {
                echo "Error: " . $check_exist_stmt->error;
            };
        
            // Close the statement
            $check_exist_stmt->close();

        } else {
        echo "Error preparing statement: " . $conn->error;
        }
        // Close the connection
        $conn->close();
    }





    $data = json_decode(file_get_contents('php://input'), true); 



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // Handle POST request here (as shown above)
    if ($data === null) {
        echo " Invalid JSON data" . $data;
        exit;
    } else {
        if (isset($data['action'])) {
            echo "action accepted";
          } else {
            echo json_encode(['error' => 'No action specified in the request.']);
          };
        
        
        if ($data['action'] === 'process_file') {
            process_file($data, $conn);
        } else if ($data['action'] === 'addNewStudent') {
            addNewStudent($data, $conn);
        }}

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request if needed
    $action = $_GET['action'];
    if ($action === 'student_count') {
        student_count($conn);

    } elseif ($action === 'exists' && isset($_GET['student_id'])) {
        exists($_GET['student_id'], $conn);
    
    };
} else {
    echo json_encode(['error' => 'Unsupported request method.']);
}

    



?>