import { LitElement } from 'lit';
import { store } from '../../state/store.js';
import { selectAllEmployees } from '../../state/employees/employees.selectors.js';
import { deleteEmployee as deleteEmployeeAction } from '../../state/employees/employees.slice.js';
import { getLocale } from '../../i18n/index.js';
import { employeeListStyles } from './employee-list.styles.js';
import { employeeListTableTemplate, employeeListListTemplate } from './employee-list.template.js';

export class EmployeeList extends LitElement {
  static properties = {
    view: { type: String },
    search: { type: String },
    page: { type: Number },
    pageSize: { type: Number },
    employees: { type: Array },
  };

  static styles = employeeListStyles;

  constructor() {
    super();
    this.view = 'table';
    this.search = '';
    this.page = 1;
    this.pageSize = 5;
    this.employees = [];
  }


  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this._updateEmployees();
    });
    this._updateEmployees();
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
    super.disconnectedCallback();
  }

  _updateEmployees() {
    this.employees = selectAllEmployees(store.getState());
  }

  _onToggleView(e) {
    this.view = e.target.value;
  }

  _onSearch(e) {
    this.search = e.target.value;
    this.page = 1;
  }

  _onPageChange(delta) {
    this.page += delta;
  }

  _onEdit(id) {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { path: `/edit/${id}` } }));
  }

  _onDelete(id) {
    const t = getLocale();
    if (window.confirm(t.employee.confirmDelete)) {
      store.dispatch(deleteEmployeeAction(id));
    }
  }

  get _filteredEmployees() {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.employees;
    return this.employees.filter(emp =>
      Object.values(emp).some(val => String(val).toLowerCase().includes(q))
    );
  }

  get _paginatedEmployees() {
    const start = (this.page - 1) * this.pageSize;
    return this._filteredEmployees.slice(start, start + this.pageSize);
  }

  get _totalPages() {
    return Math.max(1, Math.ceil(this._filteredEmployees.length / this.pageSize));
  }

  render() {
    const t = getLocale();
    return html`
      <h2>${t.nav.employees}</h2>
      <div class="toggle">
        <label>
          <input type="radio" name="view" value="list" .checked=${this.view === 'list'} @change=${this._onToggleView} />
          List
        </label>
        <label style="margin-left:1rem;">
          <input type="radio" name="view" value="table" .checked=${this.view === 'table'} @change=${this._onToggleView} />
          Table
        </label>
      </div>
      <input type="search" placeholder="${t.employee.search}" .value=${this.search} @input=${this._onSearch} />
      ${this.view === 'table' ? employeeListTableTemplate(this, t) : employeeListListTemplate(this, t)}
      <div class="pagination">
        <button ?disabled=${this.page === 1} @click=${() => this._onPageChange(-1)}>&lt; Prev</button>
        <span>Page ${this.page} / ${this._totalPages}</span>
        <button ?disabled=${this.page === this._totalPages} @click=${() => this._onPageChange(1)}>Next &gt;</button>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
