import { html } from 'lit';
import { iconEdit, iconTrash } from '../../assets/icons.js';

export function employeeListTableTemplate(ctx, t) {
  return html`
    <table>
      <thead>
        <tr>
          <th>${t.employee.firstName}</th>
          <th>${t.employee.lastName}</th>
          <th>${t.employee.dateOfEmployment}</th>
          <th>${t.employee.dateOfBirth}</th>
          <th>${t.employee.phoneNumber}</th>
          <th>${t.employee.email}</th>
          <th>${t.employee.department}</th>
          <th>${t.employee.position}</th>
          <th>${t.employee.actions}</th>
        </tr>
      </thead>
      <tbody>
        ${ctx._paginatedEmployees.map(emp => html`
          <tr>
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.dateOfEmployment}</td>
            <td>${emp.dateOfBirth}</td>
            <td>${emp.phoneNumber}</td>
            <td>${emp.email}</td>
            <td>${t.departments[emp.department] || emp.department}</td>
            <td>${t.positions[emp.position] || emp.position}</td>
            <td class="actions">
              <button @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit}</button>
              <button @click=${() => ctx._onDelete(emp.id)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash}</button>
            </td>
          </tr>
        `)}
      </tbody>
    </table>
  `;
}

export function employeeListListTemplate(ctx, t) {
  return html`
    <div>
      ${ctx._paginatedEmployees.map(emp => html`
        <div class="list-item">
          <div>
            <strong>${emp.firstName} ${emp.lastName}</strong><br />
            ${t.employee.department}: ${t.departments[emp.department] || emp.department}<br />
            ${t.employee.position}: ${t.positions[emp.position] || emp.position}
          </div>
          <div class="actions">
            <button @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit}</button>
            <button @click=${() => ctx._onDelete(emp.id)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash}</button>
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
            <button @click=${() => ctx._onEdit(emp.id)} title="${t.employee.edit}" aria-label="${t.employee.edit}">${iconEdit}</button>
            <button @click=${() => ctx._onDelete(emp.id)} title="${t.employee.delete}" aria-label="${t.employee.delete}">${iconTrash}</button>
          </div>
        </div>
      `)}
    </div>
  `;
}
