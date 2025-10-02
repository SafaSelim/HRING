export const selectAllEmployees = state => state.employees.employees;
export const selectEmployeeById = (state, id) => state.employees.employees.find(e => e.id === id);
