//Declaring dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "password",
    database: "emp_tracker"
  });


connection.connect(function(err) {
if (err) throw err;
    empStart();
  });


function empStart(){
    inquirer
    .prompt({
        name:"start",
        type:"list",
        message:"What would you like to do?",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Update Employee Role",
            "End"
        ]
    })
    .then(function(answer){
        switch (answer.start) {
            case "Add Department":
                addDept();
                break;
            
            case "Add Role":
                addRole();
                break;
            
            case "Add Employee":
                addEmp();
                break;
            
            case "View All Departments":
                viewDept();
                break;
            
            case "View All Roles":
                viewRole();
                break;
            
            case "View All Employees":
                viewEmp();
                break;
            
            case "Update Employee Role":
                updateEmp();
                break;

            case "End":
                connection.end();
                break;
        }
    });
}

function addDept(){
    inquirer
    .prompt({
        name:"deptName",
        type:"input",
        message:"What's the department name you'd like to add?",
    })
    .then(function(answer){
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.deptName
            },
            function(err) {
                if (err) throw err;
                console.log("Department has been added!");
                empStart();
            }
        )
    })
}
