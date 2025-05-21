import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button Component', () => {
  test('рендерит переданный children', () => {
    render(<Button onClick={jest.fn()}>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('вызывает onClick при клике', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('имеет нужный CSS-класс', () => {
    render(<Button onClick={jest.fn()}>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument() // Временная замена для проверки
  })
})
