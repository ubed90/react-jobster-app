import React from 'react'

interface FormRowProps {
  name: string
  type: string
  value: string
  handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void
  label?: string
}

const FormRow: React.FC<FormRowProps> = ({
  name,
  type,
  value,
  label,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormRow
