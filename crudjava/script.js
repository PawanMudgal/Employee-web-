document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const employeeList = document.getElementById('employeeList');
    const searchInput = document.getElementById('search');
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    const saveEmployees = () => {
        localStorage.setItem('employees', JSON.stringify(employees));
        renderEmployees();
    };

    const renderEmployees = (filter = '') => {
        employeeList.innerHTML = '';
        employees.filter(emp => emp.name.toLowerCase().includes(filter.toLowerCase())).forEach((emp, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${emp.name} (Age: ${emp.age})
                <button onclick="editEmployee(${index})">Edit</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            `;
            employeeList.appendChild(li);
        });
    };

    window.editEmployee = (index) => {
        const emp = employees[index];
        document.getElementById('empId').value = index;
        document.getElementById('name').value = emp.name;
        document.getElementById('age').value = emp.age;
    };

    window.deleteEmployee = (index) => {
        employees.splice(index, 1);
        saveEmployees();
    };

    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('empId').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        if (id) {
            employees[id] = { name, age };
        } else {
            employees.push({ name, age });
        }
        document.getElementById('empId').value = '';
        employeeForm.reset();
        saveEmployees();
    });

    searchInput.addEventListener('input', (e) => {
        renderEmployees(e.target.value);
    });

    renderEmployees();
});
