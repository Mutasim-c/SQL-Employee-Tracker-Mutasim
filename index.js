const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'work_db'
    },
    console.log(`Connected to the work_db database.`)
  );

const questions = [
    {
    type: 'list',
    message: 'What do you want to do?',
    name: 'options',
    choices: ['view all departments', 'view all roles', 'view all employees','add a department','add a new role','add an employee', 'update employee', 'quit'],
    }
];//repeated question
const addDepartment = [
    {
    type: 'input',
    name: 'newDepartment',
    message: 'What department do you want to add?',
    }
]//questions for adding a new department
const newRole = [
  {
  type: 'input',
  name: 'name',
  message: 'What is the nameof the role?',
  },
  {
  type: 'input',
  name: 'salary',
  message: 'What is the salary?',
  },
  {
  type: 'input',
  name: 'department',
  message: 'What is the department?',
  }
]//questions for adding a new role

let viewAllDepartments = async () => {
  const myQuery = "SELECT * FROM department;";

  // getting the result of the query
  let results = await new Promise((resolve, reject) => db.query(myQuery, (err, results) => {
    if (err) {
      reject(err)
    } else {
      console.table(results);
      resolve(results);
    }
  }));
  init()
}//function that return the department table

let viewAllRoles = async () => {
  const myQuery = "SELECT title AS job_title, role.id AS role_id, department.name AS department, salary FROM department JOIN role ON role.department_id = department.id;";

  // getting the result of the query
  let results = await new Promise((resolve, reject) => db.query(myQuery, (err, results) => {
    if (err) {
      reject(err)
    } else {
      console.table(results);
      resolve(results);
    }
  }));//uses promise to finish first before going to next line
  init()//then runs the first question again
}//function that return the roles table

let viewAllEmployees = async () => {
  const myQuery = "SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON role.department_id = department.id JOIN employee ON employee.role_id = role.id;";

  // getting the result of the query
  let results = await new Promise((resolve, reject) => db.query(myQuery, (err, results) => {
    if (err) {
      reject(err)
    } else {
      console.table(results);
      resolve(results);
    }
  }));
  init()
}//function that return the employee table


async function init() {
    inquirer.prompt(questions).then(async (answers) => {
        switch(answers.options){
          case 'view all departments':
            await viewAllDepartments();
            break;
          case 'view all roles':
            await viewAllRoles();
            break;
          case 'view all employees':
            await viewAllEmployees();
            break;
          case 'add a department':
            await addNewDepartment();
            break;
          case 'add a new role':
            await addNewRole();
            break;//runs functions based on users choice
          case 'quit':
            db.end();
            break;//disconnects from db and breaks to end program
        }

    })
  }


  let addNewDepartment = async () => {
    const myQuery = 'INSERT INTO department (name) VALUES (?)';
  
    // getting the result of the query
    inquirer.prompt(addDepartment).then(async (answers) => {
    let results = await new Promise((resolve, reject) => db.query(myQuery,answers.newDepartment, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    }));
    init()
  })
  }//adds department input form user to table
  let addNewRole = async () => {
    const myQuery = 'select id from department where name = ?';
    const myQuery2 = 'INSERT INTO role (title,salary, department_id) VALUES (? , ?, ?)';
  
    // getting the result of the query
    let index;
    inquirer.prompt(newRole).then(async (answers) => {
    let results = await new Promise((resolve, reject) => db.query(myQuery,answers.department, (err, results) => {
      if (err) {
        reject(err)
      } else {
        index = results[0].id;
        resolve(results);
      }
    }));
    const myQuery2 = `INSERT INTO role (title,salary, department_id) VALUES ("${answers.name}" , ${Number(answers.salary)}, ${index})`;
    let results2 = await new Promise((resolve, reject) => db.query(myQuery2, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    }));
    //console.log(index);
    // call bar and waiting the result
    init()
  })
  }//adds roles input from user to table

  init();