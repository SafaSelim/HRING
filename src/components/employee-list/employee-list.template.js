import { html } from 'lit';
import { iconEdit, iconTrash } from '../../assets/icons.js';

export function employeeListTableTemplate(ctx, t) {
  return html`
    <div class="list">
      <div class="list-header">
        <div class="cell">${t.employee.firstName}</div>
        <div class="cell">${t.employee.lastName}</div>
        <div class="cell hide-md">${t.employee.dateOfEmployment}</div>
        <div class="cell hide-md">${t.employee.dateOfBirth}</div>
        <div class="cell">${t.employee.phoneNumber}</div>
        <div class="cell">${t.employee.email}</div>
        <div class="cell hide-md">${t.employee.department}</div>
        <div class="cell hide-md">${t.employee.position}</div>
        <div class="cell" style="text-align:right;">${t.employee.actions}</div>
      </div>
      ${ctx._paginatedEmployees.map(emp => html`
        <div class="list-row">
          <div class="cell">${emp.firstName}</div>
          <div class="cell">${emp.lastName}</div>
          <div class="cell hide-md">${emp.dateOfEmployment}</div>
          <div class="cell hide-md">${emp.dateOfBirth}</div>
          <div class="cell">${emp.phoneNumber}</div>
          <div class="cell">${emp.email}</div>
          <div class="cell hide-md">${t.departments[emp.department] || emp.department}</div>
          <div class="cell hide-md">${t.positions[emp.position] || emp.position}</div>
          <div class="cell" style="text-align:right;">
            <span class="actions">
              <button class="edit-btn" @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit}</button>
              <button class="delete-btn" @click=${() => ctx._onDelete(emp.id)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash}</button>
            </span>
          </div>
        </div>
      `)}
    </div>
  `;
}

export function employeeListGridTemplate(ctx, t) {
  return html`
    <div class="grid">
      ${ctx._paginatedEmployees.map(emp => html`
        <div class="grid-card">
          <div class="inner">
            <div class="col">
              <div style="opacity:.7;">${t.employee.firstName}:</div>
              <div>${emp.firstName}</div>
              <div style="opacity:.7; margin-top:.5rem;">${t.employee.dateOfEmployment}</div>
              <div>${emp.dateOfEmployment}</div>
              <div style="opacity:.7; margin-top:.5rem;">${t.employee.phoneNumber}</div>
              <div>${emp.phoneNumber}</div>
              <div style="opacity:.7; margin-top:.5rem;">${t.employee.department}</div>
              <div>${t.departments[emp.department] || emp.department}</div>
            </div>
            <div class="col">
              <div style="opacity:.7;">${t.employee.lastName}</div>
              <div>${emp.lastName}</div>
              <div style="opacity:.7; margin-top:.5rem;">${t.employee.dateOfBirth}</div>
              <div>${emp.dateOfBirth}</div>
              <div style="opacity:.7; margin-top:.5rem;">${t.employee.email}</div>
              <div>${emp.email}</div>
              <div style="opacity:.7; margin-top:.5rem;">${t.employee.position}</div>
              <div>${t.positions[emp.position] || emp.position}</div>
            </div>
          </div>
          <div class="grid-actions">
            <button class="edit-btn" @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit}</button>
            <button class="delete-btn" @click=${() => ctx._onDelete(emp.id)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash}</button>
          </div>
        </div>
      `)}
    </div>
  `;
}
