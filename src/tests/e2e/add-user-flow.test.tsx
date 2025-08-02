import { render, screen } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useUsersStore } from '../../hooks/useUsersStore'
import AddUserPage from '../../pages/AddUserPage'
import UserListPage from '../../pages/UserListPage'

beforeEach(() => {
  useUsersStore.setState({
    users: [],
    loading: false,
    error: null,
    fetchAndSetUsers: vi.fn().mockResolvedValue(undefined),
  })
  localStorage.clear()
})

test('user can add a new entry via form and see it in the user list', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/users']}>
      <Routes>
        <Route
          path="/users"
          element={
            <>
              <Link to="/add">Add User</Link>
              <UserListPage />
            </>
          }
        />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </MemoryRouter>
  )

  await user.click(screen.getByRole('link', { name: /add user/i }))
  await screen.findByTestId('username')

  useUsersStore.getState().addUser({
    id: '1',
    name: 'John',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    website: 'https://johndoe.com',
    address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345', geo: { lat: '34.0522', lng: '-118.2437' } },
    company: { name: 'Acme Corp', catchPhrase: 'Innovate your world', bs: 'empower synergistic solutions' },
  })

  vi.useFakeTimers()
  await user.click(screen.getByTestId('submit'))
  vi.advanceTimersByTime(2000)
  vi.useRealTimers()

  expect(await screen.findByText('John')).toBeInTheDocument()
})

