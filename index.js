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

// async function viewAllDepartments() {
//   db.query('SELECT * FROM department;', function (err, results) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(results);
//   })
//   init();
// }

let viewAllDepartments = async () => {
  const myQuery = "SELECT * FROM department;";

  // getting the result of the query
  let results = await new Promise((resolve, reject) => db.query(myQuery, (err, results) => {
    if (err) {
      reject(err)
    } else {
      console.log(results);
      resolve(results);
    }
  }));
  console.log("query ready");
  // call bar and waiting the result
  init()
}

// async function viewAllRoles() {
//   db.query('SELECT title AS job_title, role.id AS role_id, department.name AS department, salary FROM department JOIN role ON role.department_id = department.id;', function (err, results) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(results);
//   }).then(init());
// }
let viewAllRoles = async () => {
  const myQuery = "SELECT title AS job_title, role.id AS role_id, department.name AS department, salary FROM department JOIN role ON role.department_id = department.id;";

  // getting the result of the query
  let results = await new Promise((resolve, reject) => db.query(myQuery, (err, results) => {
    if (err) {
      reject(err)
    } else {
      console.log(results);
      resolve(results);
    }
  }));
  console.log("query ready");
  // call bar and waiting the result
  init()
}

// async function viewAllEmployees() {
//   db.query('SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON role.department_id = department.id JOIN employee ON employee.role_id = role.id;', async function (err, results) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(results);
//   }).then(init());
// }
let viewAllEmployees = async () => {
  const myQuery = "SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON role.department_id = department.id JOIN employee ON employee.role_id = role.id;";

  // getting the result of the query
  let results = await new Promise((resolve, reject) => db.query(myQuery, (err, results) => {
    if (err) {
      reject(err)
    } else {
      console.log(results);
      resolve(results);
    }
  }));
  console.log("query ready");
  // call bar and waiting the result
  init()
}


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
          case 'quit':
            db.end();
            break;
        }

    })
  }

  // async function addNewDepartment(){
  //   inquirer.prompt(addDepartment).then((answers) => {
  //       db.query('INSERT INTO department (name) VALUES ("?")', answers.newDepartment, function (err, results) {
  //           console.log('Added new department');
  //       });
  //   })
    
  // }

  let addNewDepartment = async () => {
    const myQuery = 'INSERT INTO department (name) VALUES ("?")';
  
    // getting the result of the query
    inquirer.prompt(addDepartment).then(async (answers) => {
    let results = await new Promise((resolve, reject) => db.query(myQuery,answers.newDepartment, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    }));
    console.log("query ready");
    // call bar and waiting the result
    init()
  })
  }

  init();