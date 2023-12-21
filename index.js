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
    choices: ['view all departments', 'view all roles', 'view all employees','quit'],
    }
];

function init() {
    inquirer.prompt(questions).then((answers) => {
        switch(answers.options){
          case 'view all departments':
            db.query('SELECT * FROM department;', function (err, results) {
                console.log(results);
            });
            break;
          case 'view all roles':
            db.query('SELECT title AS job_title, role.id AS role_id, department.name AS department, salary FROM department JOIN role ON role.department_id = department.id;', function (err, results) {
                console.log(results);
            });
            break;
          case 'view all employees':
            db.query('SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON role.department_id = department.id JOIN employee ON employee.role_id = role.id;', function (err, results) {
                console.log(results);
            });
            break;
          default:
            break
        }
        if(answers.options != 'quit'){
            init()
        };
  
    }).then((res) => console.log("goodbye"))
  }

  init();