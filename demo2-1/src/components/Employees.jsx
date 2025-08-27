// DEMO 2-1
// Array functions on some employees.

const EmployeeCard = ({ name, salary}) => {
  return (
    <li>
      {`The employee ${name} has a salary of ${salary}.`}
    </li>
  );
};

const Employees = ({ employees }) => {
  console.log(`# EMPLOYEES.`);
  
  // Some usage of higher level functions on arrays.

  console.log("Employees:", employees);

  const isPoor = (salary) => salary <= 1200;

  let onlyPoor = employees.filter((employee) => isPoor(employee.salary));
  console.log("Only poors:", onlyPoor);

  let onlyRich = employees.filter((employee) => !isPoor(employee.salary));
  console.log("Only rich:", onlyRich);

  let descriptions = employees.map((employee) => `The employee ${employee.name} has a salary of ${employee.salary}.`);
  console.log("Description:", descriptions);
  
  // Explode into two different arrays
  let { names, salaries } = employees.reduce(
    (stats, employee) => {
      console.log(`Explode reduce:`, stats, employee);
      stats.names.push(employee.name);
      stats.salaries.push(employee.salary);
      return stats;
    }, 
    {names: [], salaries: []}
  );
  console.log("Exploded stats:", names, salaries);

  // Return the average salary
  let averageSalary = salaries.reduce((sum, salary) => sum + salary / salaries.length, 0);
  console.log(`Average salary: ${averageSalary}`);

  // Sort
  salaries.sort((a, b) => a - b);
  console.log(`Salaries sorted:`, salaries);

  // Median
  let medianSalary = salaries.length % 2 == 0 
    ? (salaries[salaries.length / 2 - 1] + salaries[salaries.length / 2]) / 2
    : salaries[Math.floor(salaries.length / 2)];
  console.log(`Median ${medianSalary}`);
  
  return (
    <div>
      <h2>The employees</h2>
      <ul>
        {employees.map((employee) => 
          <EmployeeCard key={employee.name} name={employee.name} salary={employee.salary}/>
        )}
      </ul>
    </div>
  );
};

export default Employees;