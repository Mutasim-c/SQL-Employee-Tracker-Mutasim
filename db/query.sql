SELECT *
FROM department;


SELECT title AS job_title, role.id AS role_id, department.name AS department, salary
FROM department
JOIN role ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name , role.title, department.name, role.salary, employee.manager_id
FROM department
JOIN role ON role.department_id = department.id
JOIN employee ON employee.role_id = role.id;