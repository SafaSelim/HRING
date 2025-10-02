import { html } from 'lit';

export function employeeFormTemplate(ctx, t) {
  return html`
    <form @submit=${ctx._onSubmit} novalidate>
      <div>
        <label>${t.employee.firstName}</label>
        <input name="firstName" .value=${ctx.form.firstName} @input=${ctx._onInput} required />
        ${ctx.errors.firstName ? html`<div class="error">${ctx.errors.firstName}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.lastName}</label>
        <input name="lastName" .value=${ctx.form.lastName} @input=${ctx._onInput} required />
        ${ctx.errors.lastName ? html`<div class="error">${ctx.errors.lastName}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.dateOfEmployment}</label>
        <input type="date" name="dateOfEmployment" .value=${ctx.form.dateOfEmployment} @input=${ctx._onInput} required />
        ${ctx.errors.dateOfEmployment ? html`<div class="error">${ctx.errors.dateOfEmployment}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.dateOfBirth}</label>
        <input type="date" name="dateOfBirth" .value=${ctx.form.dateOfBirth} @input=${ctx._onInput} required />
        ${ctx.errors.dateOfBirth ? html`<div class="error">${ctx.errors.dateOfBirth}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.phoneNumber}</label>
        <input name="phoneNumber" .value=${ctx.form.phoneNumber} @input=${ctx._onInput} required />
        ${ctx.errors.phoneNumber ? html`<div class="error">${ctx.errors.phoneNumber}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.email}</label>
        <input type="email" name="email" .value=${ctx.form.email} @input=${ctx._onInput} required />
        ${ctx.errors.email ? html`<div class="error">${ctx.errors.email}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.department}</label>
        <select name="department" .value=${ctx.form.department} @change=${ctx._onInput} required>
          <option value="">--</option>
          <option value="analytics">${t.departments.analytics}</option>
          <option value="tech">${t.departments.tech}</option>
        </select>
        ${ctx.errors.department ? html`<div class="error">${ctx.errors.department}</div>` : ''}
      </div>
      <div>
        <label>${t.employee.position}</label>
        <select name="position" .value=${ctx.form.position} @change=${ctx._onInput} required>
          <option value="">--</option>
          <option value="junior">${t.positions.junior}</option>
          <option value="medior">${t.positions.medior}</option>
          <option value="senior">${t.positions.senior}</option>
        </select>
        ${ctx.errors.position ? html`<div class="error">${ctx.errors.position}</div>` : ''}
      </div>
      <div class="actions">
        <button type="submit">${t.employee.save}</button>
        <button type="button" @click=${ctx._onCancel}>${t.employee.cancel}</button>
      </div>
    </form>
  `;
}
