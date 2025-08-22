import React from 'react'
import { clsx } from 'clsx'

export type InputVariant = 'filled' | 'outlined' | 'ghost'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: InputVariant
  size?: InputSize
  type?: React.HTMLInputTypeAttribute
  clearable?: boolean
  passwordToggle?: boolean
  loading?: boolean
  id?: string
  name?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable,
  passwordToggle,
  loading,
  id,
  name,
}) => {
  const [internal, setInternal] = React.useState(value ?? '')
  const [show, setShow] = React.useState(false)
  const isControlled = value !== undefined
  const inputId = id || React.useId()
  const describedById = `${inputId}-desc`

  React.useEffect(() => {
    if (isControlled) setInternal(value!)
  }, [value, isControlled])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternal(e.target.value)
    onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) setInternal('')
    onChange?.({ target: { value: '' } } as any)
  }

  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-2.5',
    lg: 'text-lg px-5 py-3',
  }[size]

  const variantClasses = {
    outlined: 'bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-[--ring]',
    filled: 'bg-gray-100 dark:bg-zinc-800 border-transparent focus:ring-2 focus:ring-[--ring]',
    ghost: 'bg-transparent border-transparent focus:ring-2 focus:ring-[--ring]',
  }[variant]

  const invalidClasses = invalid ? 'border-red-500 focus:ring-red-500' : ''
  const loadingSpinner = (
    <svg className="animate-spin h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  )

  const currentType = passwordToggle ? (show ? 'text' : 'password') : type

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="label-base">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          aria-invalid={invalid || undefined}
          aria-describedby={helperText || errorMessage ? describedById : undefined}
          className={clsx('input-base', sizeClasses, variantClasses, invalidClasses, 'pr-10')}
          placeholder={placeholder}
          value={internal}
          onChange={handleChange}
          disabled={disabled || loading}
          type={currentType}
        />
        {passwordToggle && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label={show ? 'Hide password' : 'Show password'}
            onClick={() => setShow(s => !s)}
            tabIndex={-1}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        )}
        {clearable && (internal?.length ?? 0) > 0 && !passwordToggle && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xl leading-none px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label="Clear input"
            onClick={handleClear}
            tabIndex={-1}
          >
            ×
          </button>
        )}
        {loading && loadingSpinner}
      </div>
      {helperText && !invalid && (
        <p id={describedById} className="helper-text">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p id={describedById} className="error-text">{errorMessage}</p>
      )}
    </div>
  )
}