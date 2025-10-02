import employeesReducer, { addEmployee, updateEmployee, deleteEmployee, setEmployees } from './employees/index.js';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

// Persist to localStorage
store.subscribe(() => {
  localStorage.setItem('hring_employees', JSON.stringify(store.getState().employees.employees));
});

export { addEmployee, updateEmployee, deleteEmployee, setEmployees };
