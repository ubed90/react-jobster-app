import React from 'react'

interface IFormSelectProps {
  name: string
  value: string
  handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void
  options: string[]
  label?: string
}

const FormRowSelect: React.FC<IFormSelectProps> = ({
  name,
  options,
  value,
  label,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={value}
        onChange={handleChange}
      >
        {options.map((status, idx) => (
          <option key={idx} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormRowSelect
