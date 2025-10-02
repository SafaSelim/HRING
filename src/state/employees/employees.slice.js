import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: JSON.parse(localStorage.getItem('hring_employees') || '[]').length ?
    JSON.parse(localStorage.getItem('hring_employees')) : [
      {
        id: '1',
        firstName: 'Alice',
        lastName: 'Smith',
        dateOfEmployment: '2022-01-15',
        dateOfBirth: '1990-05-10',
        phoneNumber: '+12345678901',
        email: 'alice.smith@example.com',
        department: 'analytics',
        position: 'senior'
      },
      {
        id: '2',
        firstName: 'Bob',
        lastName: 'Johnson',
        dateOfEmployment: '2023-03-20',
        dateOfBirth: '1985-11-22',
        phoneNumber: '+12345678902',
        email: 'bob.johnson@example.com',
        department: 'tech',
        position: 'medior'
      },
      {
        id: '3',
        firstName: 'Carol',
        lastName: 'Williams',
        dateOfEmployment: '2021-07-01',
        dateOfBirth: '1992-08-30',
        phoneNumber: '+12345678903',
        email: 'carol.williams@example.com',
        department: 'analytics',
        position: 'junior'
      }
    ],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action) {
      const { id, updated } = action.payload;
      const idx = state.employees.findIndex(e => e.id === id);
      if (idx !== -1) {
        state.employees[idx] = { ...state.employees[idx], ...updated };
      }
    },
    deleteEmployee(state, action) {
      state.employees = state.employees.filter(e => e.id !== action.payload);
    },
    setEmployees(state, action) {
      state.employees = action.payload;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
