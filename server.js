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


function addRole(){
    inquirer
    .prompt([
    {
        name:"title",
        type:"input",
        message:"What's the role you would like to add?",
    },
    {
        name: "salary",
        type: "input",
        message:"What is the salary for this role?"
    },
    {
        name: "dept_id",
        type: "input",
        message: "What is the department ID number for this role?"
    }
])
    .then(function(answer){
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.dept_id
            },
            function(err) {
                if (err) throw err;
                console.log("New Role has been added!");
                empStart();
            }
        )
    })
}

function addEmp(){
    inquirer
    .prompt([
    {
        name:"first_name",
        type:"input",
        message:"What's the first name of this employee?",
    },
    {
        name: "last_name",
        type: "input",
        message:"What is the last name of this employee?"
    },
    {
        name: "role_id",
        type: "input",
        message: "What is id number for this employee's role?"
    },
    {
        name:"manager_id",
        type:"input",
        message: "What is the manager ID number of the manager of this employee?"
    }
])
    .then(function(answer){
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function(err) {
                if (err) throw err;
                console.log("New Employee has been added!");
                empStart();
            }
        )
    })
}