import { html } from 'lit';
import { iconEdit, iconTrash } from '../../assets/icons.js';

export function employeeListTableTemplate(ctx, t) {
  return html`
    <div class="list">
      <div class="list-header">
        <div class="cell bold">${t.employee.firstName}</div>
        <div class="cell bold">${t.employee.lastName}</div>
        <div class="cell bold hide-md">${t.employee.dateOfEmployment}</div>
        <div class="cell bold hide-md">${t.employee.dateOfBirth}</div>
        <div class="cell bold">${t.employee.phoneNumber}</div>
        <div class="cell bold">${t.employee.email}</div>
        <div class="cell bold hide-md">${t.employee.department}</div>
        <div class="cell bold hide-md">${t.employee.position}</div>
        <div class="cell bold" style="text-align:right;">${t.employee.actions}</div>
      </div>
      ${ctx._paginatedEmployees.map(emp => html`
        <div class="list-row">
          <div class="cell bold">${emp.firstName}</div>
          <div class="cell bold">${emp.lastName}</div>
          <div class="cell hide-md">${emp.dateOfEmployment}</div>
          <div class="cell hide-md">${emp.dateOfBirth}</div>
          <div class="cell">${emp.phoneNumber}</div>
          <div class="cell">${emp.email}</div>
          <div class="cell hide-md">${t.departments[emp.department] || emp.department}</div>
          <div class="cell hide-md">${t.positions[emp.position] || emp.position}</div>
          <div class="cell" style="text-align:right;">
            <span class="actions">
              <button class="edit-btn" @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit}</button>
              <button class="delete-btn" @click=${() => ctx._onDelete(emp)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash}</button>
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
              <div class="field">
                <div class="field-label">${t.employee.firstName}:</div>
                <div class="field-value">${emp.firstName}</div>
              </div>
              <div class="field">
                <div class="field-label">${t.employee.dateOfEmployment}:</div>
                <div class="field-value">${emp.dateOfEmployment}</div>
              </div>
              <div class="field">
                <div class="field-label">${t.employee.phoneNumber}:</div>
                <div class="field-value">${emp.phoneNumber}</div>
              </div>
              <div class="field">
                <div class="field-label">${t.employee.department}:</div>
                <div class="field-value">${t.departments[emp.department] || emp.department}</div>
              </div>
            </div>
            <div class="col">
              <div class="field">
                <div class="field-label">${t.employee.lastName}:</div>
                <div class="field-value">${emp.lastName}</div>
              </div>
              <div class="field">
                <div class="field-label">${t.employee.dateOfBirth}:</div>
                <div class="field-value">${emp.dateOfBirth}</div>
              </div>
              <div class="field">
                <div class="field-label">${t.employee.email}:</div>
                <div class="field-value">${emp.email}</div>
              </div>
              <div class="field">
                <div class="field-label">${t.employee.position}:</div>
                <div class="field-value">${t.positions[emp.position] || emp.position}</div>
              </div>
            </div>
          </div>
          <div class="grid-actions">
            <button class="edit-btn" @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit} ${t.employee.edit}</button>
            <button class="delete-btn" @click=${() => ctx._onDelete(emp)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash} ${t.employee.delete}</button>
          </div>
        </div>
      `)}
    </div>
  `;
}
