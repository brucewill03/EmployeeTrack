CREATE TABLE Departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL   
);

CREATE TABLE Roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER,
   FOREIGN KEY(department_id) REFERENCES Departments(id)
);

CREATE TABLE Employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
   FOREIGN KEY(role_id) REFERENCES Roles(id),
  manager_id INTEGER,
   FOREIGN KEY(manager_id) REFERENCES Employees(id)
);
