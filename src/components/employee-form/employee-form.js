import { LitElement } from 'lit';
import { getLocale } from '../../assets/i18n/index.js';
import { store } from '../../state/store.js';
import { selectAllEmployees } from '../../state/employees/employees.selectors.js';
import { addEmployee as addEmployeeAction, updateEmployee as updateEmployeeAction } from '../../state/employees/employees.slice.js';
import { employeeFormStyles } from './employee-form.styles.js';
import { employeeFormTemplate } from './employee-form.template.js';
import { Router } from '@vaadin/router';
import { sharedFormStyles } from '../../styles/form-styles.js';
import '../../components/custom-date-picker.js';

export class EmployeeForm extends LitElement {
  static properties = {
    form: { type: Object },
    errors: { type: Object },
    mode: { type: String }, // 'add' or 'edit'
    employeeId: { type: String },
  };

  static styles = [sharedFormStyles, employeeFormStyles];

  constructor() {
    super();
    this.form = this._emptyForm();
    this.errors = {};
    this.mode = 'add';
    this.employeeId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this._updateEmployees();
    });
    this._updateEmployees();
    this._initMode();
    this._onLang = () => this.requestUpdate();
    window.addEventListener('lang-changed', this._onLang);
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
    window.removeEventListener('lang-changed', this._onLang);
    super.disconnectedCallback();
  }

  _updateEmployees() {
    this._employees = selectAllEmployees(store.getState());
  }

  _initMode() {
    const url = window.location.pathname;
    if (url.startsWith('/edit/')) {
      this.mode = 'edit';
      this.employeeId = url.split('/edit/')[1];
      const emp = (this._employees || []).find(e => String(e.id) === String(this.employeeId));
      if (emp) this.form = { ...emp };
    } else {
      this.mode = 'add';
      this.form = this._emptyForm();
    }
  }

  _emptyForm() {
    return {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: '',
    };
  }

  _onInput(e) {
    const { name, value } = e.target;
    this.form = { ...this.form, [name]: value };

    const newErrors = { ...this.errors };
    delete newErrors[name];
    this.errors = newErrors;
  }

  _onDateChange(e) {
    const { value } = e.detail;
    const name = e.target.name;
    this.form = { ...this.form, [name]: value };

    const newErrors = { ...this.errors };
    delete newErrors[name];
    this.errors = newErrors;
  }

  _validate() {
    const errors = {};

    for (const key of Object.keys(this.form)) {
      const value = this.form[key];
      if (!value || (typeof value === 'string' && !value.trim())) {
        errors[key] = 'required';
      }
    }

    if (this.form.email && this.form.email.trim()) {
      if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
        errors.email = 'email';
      }
    }

    if (this.form.phoneNumber && this.form.phoneNumber.trim()) {
      if (!/^\+?\d{10,15}$/.test(this.form.phoneNumber)) {
        errors.phoneNumber = 'phone';
      }
    }

    if (this.mode === 'add' && this._employees && this._employees.length > 0) {
      const exists = this._employees.some(e =>
        e.firstName === this.form.firstName &&
        e.lastName === this.form.lastName &&
        e.dateOfBirth === this.form.dateOfBirth
      );
      if (exists) {
        errors.firstName = 'unique';
        errors.lastName = 'unique';
        errors.dateOfBirth = 'unique';
      }
    }

    return errors;
  }

  _getErrorMessage(errorType) {
    const t = getLocale();
    return t.validation[errorType] || errorType;
  }

  _onSubmit(e) {
    e.preventDefault();
    this.errors = this._validate();
    if (Object.keys(this.errors).length > 0) return;
    const t = getLocale();
    if (this.mode === 'edit') {
      if (!window.confirm(t.employee.confirmUpdate)) return;
      store.dispatch(updateEmployeeAction({ id: this.employeeId, updated: this.form }));
    } else {
      store.dispatch(addEmployeeAction({ ...this.form, id: Date.now().toString() }));
    }
    Router.go('/employees');
  }

  _onCancel() {
    Router.go('/employees');
  }

  render() {
    const t = getLocale();
    return employeeFormTemplate(this, t);
  }
}

customElements.define('employee-form', EmployeeForm);
