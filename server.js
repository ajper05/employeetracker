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
            "Add departments, roles, employees",
            "View departments, roles, employees",
            "Update Employee Roles",
            "End"
        ]
    })
    .then(function(answer){
        switch (answer.start) {
            case "Add departments, roles, employees":
                adder();
                break;
            
            case "View departments, roles, employees":
                viewer();
                break;
            
            case "Update Employee Roles":
                updater();
                break;
            
            case "End":
                connection.end();
                break;
        }
    });
}

function adder(){
    inquirer
    .prompt({
        name:"addType",
        type:"list",
        message:"What would you like to add?",
        choices:[
            "Add department",
            "Add Role",
            "Add Employee",
            "Return to options"
        ]
    })
    .then(function(answer){
        switch (answer.addType) {
            case "Add department":
        }
    })
}
