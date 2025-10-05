import { LitElement, html, css } from 'lit';
import { iconCalendar } from '../assets/icons';
import { getLocale } from '../assets/i18n/index.js';

export class CustomDatePicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    
    .date-picker-container {
      position: relative;
      width: 100%;
    }
    
    .date-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 14px;
      font-family: inherit;
      color: var(--color-text);
      background-color: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    
    .date-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
    }
    
    .calendar-icon {
      position: absolute;
      right: 12px;
      top: 45%;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--color-primary);
      width: 20px;
      height: 20px;
    }
    
    .calendar-popup {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      margin-top: 4px;
      display: none;
    }
    
    .calendar-popup.open {
      display: block;
    }
    
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--color-border);
      gap: 0.5rem;
    }

    .month-select, .year-select {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 1rem;
      padding: 6px 12px;
      margin: 0 0.25rem;
      outline: none;
      transition: border-color 0.2s;
      box-shadow: none;
      appearance: none;
      min-width: 80px;
      font-family: inherit;
    }
    .month-select:focus, .year-select:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(255,98,0,0.08);
    }
    .month-select option, .year-select option {
      background: var(--color-bg);
      color: var(--color-text);
    }
    
    .month-year {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text);
      text-transform: uppercase;
    }
    
    .nav-button {
      background: none;
      border: none;
      color: var(--color-text);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
    }
    
    .nav-button:hover {
      background-color: rgba(255, 98, 0, 0.1);
    }
    
    .calendar-grid {
      padding: 16px;
    }
    
    .day-labels {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }
    
    .day-label {
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text);
      padding: 8px 4px;
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    
    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text);
      transition: all 0.2s ease;
    }
    
    .calendar-day:hover {
      background-color: rgba(255, 98, 0, 0.1);
    }
    
    .calendar-day.other-month {
      color: #999;
    }
    
    .calendar-day.selected {
      background-color: var(--color-primary);
      color: white;
      font-weight: 600;
    }
    
    .calendar-day.today {
      font-weight: 600;
    }
    
    .calendar-day.today:not(.selected) {
      background-color: rgba(255, 98, 0, 0.1);
    }
  `;

  static properties = {
    value: { type: String },
    name: { type: String },
    required: { type: Boolean },
    open: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.value = '';
    this.name = '';
    this.required = false;
    this.open = false;
    this.currentDate = new Date();
    this.selectedDate = null;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      const parts = this.value.split('-');
      if (parts.length === 3) {
        const [year, month, day] = parts;
        this.selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        this.currentDate = new Date(this.selectedDate);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick);
    document.addEventListener('click', this._handleDocumentClick);
    this._onLang = () => this.requestUpdate();
    window.addEventListener('lang-changed', this._onLang);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick);
    window.removeEventListener('lang-changed', this._onLang);
  }

  _handleClick(e) {
    e.stopPropagation();
  }

  _handleDocumentClick() {
    this.open = false;
  }

  _toggleCalendar() {
    this.open = !this.open;
  }

  _selectDate(date) {
    this.selectedDate = new Date(date);
    this.value = this._formatDate(this.selectedDate);
    this.open = false;
    this._dispatchChange();
  }

  _formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  _dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true
    }));
  }

  _navigateMonth(direction) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.requestUpdate();
  }

  _getCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.getTime() === today.getTime();
      const isSelected = this.selectedDate && date.getTime() === this.selectedDate.getTime();
      
      days.push({
        date: new Date(date),
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected
      });
    }
    
    return days;
  }


  _getMonthOptions() {
    const t = getLocale();
    return [
      t.months.january, t.months.february, t.months.march, t.months.april,
      t.months.may, t.months.june, t.months.july, t.months.august,
      t.months.september, t.months.october, t.months.november, t.months.december
    ];
  }

  _getYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear - 50; y <= currentYear + 10; y++) {
      years.push(y);
    }
    return years;
  }

  _onMonthSelect(e) {
    const month = parseInt(e.target.value, 10);
    this.currentDate.setMonth(month);
    this.requestUpdate();
  }

  _onYearSelect(e) {
    const year = parseInt(e.target.value, 10);
    this.currentDate.setFullYear(year);
    this.requestUpdate();
  }

  render() {
    const t = getLocale();
    const days = this._getCalendarDays();
    const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthOptions = this._getMonthOptions();
    const yearOptions = this._getYearOptions();
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();
    return html`
      <div class="date-picker-container">
        <input 
          class="date-input"
          type="text"
          .value=${this.value}
          .name=${this.name}
          .required=${this.required}
          readonly
          @click=${this._toggleCalendar}
          placeholder="${t.form.selectDatePlacebolder}"
        />
        <div class="calendar-icon">
          ${iconCalendar}
        </div>
        <div class="calendar-popup ${this.open ? 'open' : ''}">
          <div class="calendar-header">
            <button class="nav-button" @click=${() => this._navigateMonth(-1)}>‹</button>
            <select class="month-select" @change=${this._onMonthSelect} .value=${String(currentMonth)}>
              ${monthOptions.map((m, i) => html`<option value="${i}" ?selected=${i === currentMonth}>${m}</option>`)}
            </select>
            <select class="year-select" @change=${this._onYearSelect} .value=${String(currentYear)}>
              ${yearOptions.map(y => html`<option value="${y}" ?selected=${y === currentYear}>${y}</option>`)}
            </select>
            <button class="nav-button" @click=${() => this._navigateMonth(1)}>›</button>
          </div>
          <div class="calendar-grid">
            <div class="day-labels">
              ${dayLabels.map(label => html`<div class="day-label">${label}</div>`)}
            </div>
            <div class="calendar-days">
              ${days.map(day => html`
                <div 
                  class="calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''}"
                  @click=${() => day.isCurrentMonth && this._selectDate(day.date)}
                >
                  ${day.day}
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('custom-date-picker', CustomDatePicker);
