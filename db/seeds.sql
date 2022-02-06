INSERT INTO Departments (name)
VALUES
  ('HR'),
  ('Finance'),
  ('IT'),
  ('Marketing'),
  ('Customer Support');

INSERT INTO Roles (title, salary, department_id)  
VALUES
  ('Recruiter', 50000, 1),
  ('Budget Analyst', 65000, 2),
  ('Network Admin', 75000, 3),
  ('Social Media Creator', 85000, 4);

  INSERT INTO Employees (first_name, last_name, role_id, manager_id)
  VALUES
  ('Mike', 'Jones', 1, NULL),
  ('John', 'Smith', 2, NULL),
  ('Kelly','Kapowski', 3, 1);  


  