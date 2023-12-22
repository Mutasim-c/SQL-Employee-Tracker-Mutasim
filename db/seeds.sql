INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO role (title,salary, department_id)
VALUES ("Intro to JavaScript",50000, 1),
       ("Data Science",30000, 2),
       ("Linear Algebra",90000, 3),
       ("History of the Internet",23000, 4),
       ("Machine Learning",18000, 4),
       ("Game Design",62000, 1 ),
       ("Cloud Development",44000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("jack", "joseph", 3, NULL),
        ("Erin", "Salazar",1 , NULL),
        ("Montgomery", "Alexander", 7, 1),
        ("Mildred", "Galvan", 2, NULL),
        ("Daniel", "Raymond",4, NULL);
       