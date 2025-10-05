import { expect } from '@open-wc/testing';
import employeesReducer, { addEmployee, updateEmployee, deleteEmployee, setEmployees } from './employees.slice.js';

describe('employees.slice', () => {
  const initialState = { employees: [] };

  it('should return the initial state', () => {
    const seeded = [
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
    ];
    expect(employeesReducer(undefined, { type: undefined })).to.deep.equal({ employees: seeded });
  });

  it('should handle addEmployee', () => {
    const action = addEmployee({ id: '1', firstName: 'A' });
    const state = employeesReducer(initialState, action);
  expect(state.employees.length).to.equal(1);
  expect(state.employees[0].firstName).to.equal('A');
  });

  it('should handle updateEmployee', () => {
    const startState = { employees: [{ id: '1', firstName: 'A' }] };
    const action = updateEmployee({ id: '1', updated: { firstName: 'B' } });
    const state = employeesReducer(startState, action);
  expect(state.employees[0].firstName).to.equal('B');
  });

  it('should handle deleteEmployee', () => {
    const startState = { employees: [{ id: '1', firstName: 'A' }] };
    const action = deleteEmployee('1');
    const state = employeesReducer(startState, action);
  expect(state.employees.length).to.equal(0);
  });

  it('should handle setEmployees', () => {
    const action = setEmployees([{ id: '2', firstName: 'C' }]);
    const state = employeesReducer(initialState, action);
  expect(state.employees.length).to.equal(1);
  expect(state.employees[0].id).to.equal('2');
  });
});
