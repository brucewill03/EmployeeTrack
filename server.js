const mysql = require('mysql2');
const express = require('express');
var inquirer = require('inquirer');
const cTable = require('console.table');
const { deepCyclicCopy } = require('jest-util');
const { allowedNodeEnvironmentFlags, debugPort } = require('process');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'tightchips3',
    database: 'employeetracker'
  },
  console.log('Connected to the employeetracker database.')
);
ask();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


function ask() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {name: 'greeting',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add department', 'add role', 'add employee', 'update employee role']
    
    }
    ])
    .then((answers) => {
  
      if(JSON.stringify(answers, null, ' ').includes("view all departments")){
        getDepartments();
      }
    else if(JSON.stringify(answers, null, ' ').includes("view all roles")){
      getRoles();

    }
    else if(JSON.stringify(answers, null, ' ').includes("view all employees")){
      getEmployees();
    }
    else if(JSON.stringify(answers, null,' ').includes("add department")){
      addDepartment();
    }
    else if(JSON.stringify(answers, null, ' ').includes("add role")){
      addRole();
    }
    else if(JSON.stringify(answers, null, ' ').includes('add employee')){
      addEmployee();
    }
    else if(JSON.stringify(answers, null, ' ').includes('update employee role')){
      updateEmployeeRole();
    }
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}
  function getDepartments(){
    
    db.query("SELECT * FROM Departments", (err, result) => {
      if (err) {
        console.log(err);
     }
     const table = cTable.getTable(result);
     console.log();
     console.log(table);
    });
    ask();
  }

  function getRoles(){

    db.query("SELECT * FROM Roles", (err, result) => {
      if (err) {
        console.log(err);
      }
      const table = cTable.getTable(result);
     console.log();
     console.log(table);
      
    });
    ask();
  }

  function getEmployees(){

    db.query("SELECT * FROM Employees", (err, result) => {
      if (err) {
        console.log(err);
      }
      const table = cTable.getTable(result);
     console.log();
     console.log(table);
    });
    ask();
  }

  function addDepartment(){
    inquirer
    .prompt([
      /* Pass your questions in here */
      {name: 'CreateDepartmentName',
    message: 'What is the name of department?',
    type: 'input'
    
    
    }
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
      db.query("INSERT INTO Departments (name) VALUES (?)", answers.CreateDepartmentName, (err, result) => {
       if (err) {
          console.log(err);
        }
        console.log();
        console.log("Successfully added department; "+answers.CreateDepartmentName);
      }); 
      ask();
    
    
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

  }

  function addRole(){
    inquirer
    .prompt([
      /* Pass your questions in here */
      {
        name: 'RoleName',
        message: 'What is the name of the role?',
        type: 'input'
      },
      {
        name: 'Salary',
        message: 'What is the salary of the role',
        type: 'input'
        
      },
      {
        name: 'DepartmentID',
        message: 'What is the the department id',
        type: 'input'
      }
      
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
      const params = [answers.RoleName, answers.Salary, answers.DepartmentID];
      db.query("INSERT INTO Roles (title, salary, department_id) VALUES (?, ?, ?)", params, (err, result) => {
       if (err) {
          console.log(err);
        }
        console.log();
        console.log("Successfully added role; "+answers.RoleName);
      }); 
      ask();
    
    
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
    
  }

  function addEmployee(){
    inquirer
    .prompt([
      /* Pass your questions in here */
      {
        name: 'FirstName',
        message: 'What is the first name of the employee',
        type: 'input'
      },
      {
        name: 'LastName',
        message: 'What is the last name of the employee',
        type: 'input'
        
      },
      {
        name: 'RoleID',
        message: 'What is the the employee role id',
        type: 'input'
      },
      { name: 'ManagerID',
        message: 'What is the employee manager id',
        type: 'input'

      }
      
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
      const params = [answers.FirstName, answers.LastName, answers.RoleID,answers.ManagerID];
      db.query("INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", params, (err, result) => {
       if (err) {
          console.log(err);
        }
        console.log();
        console.log("Successfully added employee; "+answers.FirstName+" "+answers.LastName);
      }); 
      ask();
    
    
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
    
  }
 async function getEmployeeNamesForUpdate(){
  const employeeNames = db.promise().query('SELECT * FROM Employees');
 }
 function  updateEmployeeRole(){
  var employeeNames = getEmployeeNamesForUpdate();
  console.log(employeeNames);
  inquirer
  .prompt([
    /* Pass your questions in here */
    {
      name: 'EmployeeUpdate',
      message: 'What employee would you like to update',
      type: 'list',
      choices: employeeNames
    }
   
    
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
    const params = [answers.FirstName, answers.LastName, answers.RoleID,answers.ManagerID];
    db.query("INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", params, (err, result) => {
     if (err) {
        console.log(err);
      }
      console.log();
      console.log("Successfully added employee; "+answers.FirstName+" "+answers.LastName);
    }); 
    ask();
  
  
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

 }


