import { html } from 'lit';

export function employeeFormTemplate(ctx, t) {
  const title = ctx.mode === 'edit' ? t.form.editTitle : t.form.addTitle;
  const subtitle = ctx.mode === 'edit' ? `You are editing ${ctx.form.firstName} ${ctx.form.lastName}` : '';
  return html`
    <div class="form-header">
      <h1 class="form-title">${title}</h1>
    </div>
    <div class="form-card">
      ${subtitle ? html`<p class="form-subtitle">${subtitle}</p>` : ''}
      <form class="form" @submit=${ctx._onSubmit} novalidate>
      <div class="form-field">
        <label class="form-label">${t.employee.firstName}</label>
        <input class="input-base input-text" name="firstName" .value=${ctx.form.firstName} @input=${ctx._onInput} required />
        ${ctx.errors.firstName ? html`<div class="error-message">${ctx.errors.firstName}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.lastName}</label>
        <input class="input-base input-text" name="lastName" .value=${ctx.form.lastName} @input=${ctx._onInput} required />
        ${ctx.errors.lastName ? html`<div class="error-message">${ctx.errors.lastName}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.dateOfBirth}</label>
        <custom-date-picker 
          name="dateOfBirth" 
          .value=${ctx.form.dateOfBirth} 
          @change=${ctx._onDateChange}
          required
        ></custom-date-picker>
        ${ctx.errors.dateOfBirth ? html`<div class="error-message">${ctx.errors.dateOfBirth}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.department}</label>
        <input class="input-base input-text" name="department" .value=${ctx.form.department} @input=${ctx._onInput} required />
        ${ctx.errors.department ? html`<div class="error-message">${ctx.errors.department}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.dateOfEmployment}</label>
        <custom-date-picker 
          name="dateOfEmployment" 
          .value=${ctx.form.dateOfEmployment} 
          @change=${ctx._onDateChange}
          required
        ></custom-date-picker>
        ${ctx.errors.dateOfEmployment ? html`<div class="error-message">${ctx.errors.dateOfEmployment}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.phoneNumber}</label>
        <input class="input-base input-text" name="phoneNumber" .value=${ctx.form.phoneNumber} @input=${ctx._onInput} required />
        ${ctx.errors.phoneNumber ? html`<div class="error-message">${ctx.errors.phoneNumber}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.email}</label>
        <input class="input-base input-text" type="email" name="email" .value=${ctx.form.email} @input=${ctx._onInput} required />
        ${ctx.errors.email ? html`<div class="error-message">${ctx.errors.email}</div>` : ''}
      </div>
      <div class="form-field">
        <label class="form-label">${t.employee.position}</label>
        <div class="select-wrapper">
          <select class="input-base input-select" name="position" .value=${ctx.form.position} @change=${ctx._onInput} required>
            <option value="">Please Select</option>
            <option value="junior">${t.positions.junior}</option>
            <option value="medior">${t.positions.medior}</option>
            <option value="senior">${t.positions.senior}</option>
          </select>
        </div>
        ${ctx.errors.position ? html`<div class="error-message">${ctx.errors.position}</div>` : ''}
      </div>
        <div class="btn-group">
          <button type="submit" class="btn btn-primary">${t.employee.save}</button>
          <button type="button" class="btn btn-secondary" @click=${ctx._onCancel}>${t.employee.cancel}</button>
        </div>
      </form>
    </div>
  `;
}
