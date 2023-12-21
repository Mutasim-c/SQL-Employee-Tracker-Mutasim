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
    choices: ['view all departments', 'view all roles', 'view all employees','add a department', 'quit'],
    }
];
const addDepartment = [
    {
    type: 'input',
    name: 'newDepartment',
    message: 'What department do you want to add?',
    }
]

async function viewAllDepartments() {
  db.query('SELECT * FROM department;', function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
  });
  return;
}

async function viewAllRoles() {
  db.query('SELECT title AS job_title, role.id AS role_id, department.name AS department, salary FROM department JOIN role ON role.department_id = department.id;', function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
  });
  return;
}

async function viewAllEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON role.department_id = department.id JOIN employee ON employee.role_id = role.id;', async function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
  });
  return;
}

async function init() {
    inquirer.prompt(questions).then(async (answers) => {
        switch(answers.options){
          case 'view all departments':
            await viewAllDepartments();
            return true
            break;
          case 'view all roles':
            await viewAllRoles();
            return true
            break;
          case 'view all employees':
            await viewAllEmployees();
            return true
            break;
          case 'add a department':
            await addNewDepartment();
            return true
            break;
          case 'quit':
            break;
        }

    }).then((res) => {
      if(res){
        init()
      }else{
        console.log("goodbye");
        db.end();
      }
    })
  }

  async function addNewDepartment(){
    inquirer.prompt(addDepartment).then((answers) => {
        db.query('INSERT INTO department (name) VALUES ("?")', answers.newDepartment, function (err, results) {
            console.log('Added new department');
        });
    })
  }

  init();