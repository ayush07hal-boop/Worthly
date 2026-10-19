import Icon from './Icon'

export default function SortDropdown({ label = 'Sort by', value, onChange, options, id = 'sort' }) {
  return (
    <div className="select-field">
      <label htmlFor={id}>{label}</label>
      <div className="select-wrap">
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <Icon name="chevronDown" size={16} />
      </div>
    </div>
  )
}
