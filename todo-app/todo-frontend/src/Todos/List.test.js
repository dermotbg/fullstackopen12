import { fireEvent, render, screen } from '@testing-library/react'
import List from './List'

const todos = [{ text: 'test todo is not done', done: false }]
const deleteTodo = jest.fn()
const completeTodo = jest.fn()

describe('Todo List', () => {
  it('displays todo & fires functions', () => {
    render(
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )
    expect(screen.getByText('test todo is not done')).toBeVisible()

    const doneButton = screen.getByText('Set as done')
    const deleteButton = screen.getByText('Delete')
    
    fireEvent.click(doneButton)
    expect(completeTodo).toBeCalled()

    fireEvent.click(deleteButton)
    expect(deleteTodo).toBeCalled() 
  })
})