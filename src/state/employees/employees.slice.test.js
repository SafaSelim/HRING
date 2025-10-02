import employeesReducer, { addEmployee, updateEmployee, deleteEmployee, setEmployees } from './employees.slice.js';

describe('employees.slice', () => {
  const initialState = { employees: [] };

  it('should return the initial state', () => {
    expect(employeesReducer(undefined, { type: undefined })).toEqual({ employees: [] });
  });

  it('should handle addEmployee', () => {
    const action = addEmployee({ id: '1', firstName: 'A' });
    const state = employeesReducer(initialState, action);
    expect(state.employees.length).toBe(1);
    expect(state.employees[0].firstName).toBe('A');
  });

  it('should handle updateEmployee', () => {
    const startState = { employees: [{ id: '1', firstName: 'A' }] };
    const action = updateEmployee({ id: '1', updated: { firstName: 'B' } });
    const state = employeesReducer(startState, action);
    expect(state.employees[0].firstName).toBe('B');
  });

  it('should handle deleteEmployee', () => {
    const startState = { employees: [{ id: '1', firstName: 'A' }] };
    const action = deleteEmployee('1');
    const state = employeesReducer(startState, action);
    expect(state.employees.length).toBe(0);
  });

  it('should handle setEmployees', () => {
    const action = setEmployees([{ id: '2', firstName: 'C' }]);
    const state = employeesReducer(initialState, action);
    expect(state.employees.length).toBe(1);
    expect(state.employees[0].id).toBe('2');
  });
});
