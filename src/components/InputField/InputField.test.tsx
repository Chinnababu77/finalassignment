import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { InputField } from './InputField'

test('renders label and accepts input', () => {
  render(<InputField label="Name" placeholder="Type..." />)
  const input = screen.getByPlaceholderText('Type...') as HTMLInputElement
  fireEvent.change(input, { target: { value: 'Alice' } })
  expect(input.value).toBe('Alice')
})

test('shows error message when invalid', () => {
  render(<InputField invalid errorMessage="Error!" />)
  expect(screen.getByText('Error!')).toBeInTheDocument()
})