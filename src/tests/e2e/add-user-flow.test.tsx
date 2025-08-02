import { render, screen } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useUsersStore } from '../../hooks/useUsersStore'
import AddUserPage from '../../pages/AddUserPage'
import UserListPage from '../../pages/UserListPage'

let mockFetchAndSetUsers: ReturnType<typeof vi.fn>

beforeEach(() => {
  mockFetchAndSetUsers = vi.fn().mockResolvedValue(undefined)
  useUsersStore.persist.setOptions({
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
  })
  useUsersStore.setState({
    users: [],
    loading: false,
    error: null,
    fetchAndSetUsers: mockFetchAndSetUsers,
  })
  localStorage.clear()
})

test('user can add a new entry via form and see it in the user list', async () => {
  vi.useFakeTimers()
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

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

  // ensure store hydration is complete before interactions
  if (!useUsersStore.persist.hasHydrated()) {
    await new Promise((resolve) => useUsersStore.persist.onFinishHydration(resolve))
  }

  await user.click(screen.getByRole('link', { name: /add user/i }))
  screen.getByTestId('username')

  await user.type(screen.getByTestId('username'), 'johndoe')
  await user.type(screen.getByTestId('name'), 'John')
  await user.type(screen.getByTestId('email'), 'john@example.com')
  await user.type(screen.getByTestId('phone'), '+1 555-123-4567')
  await user.type(screen.getByTestId('website'), 'https://johndoe.com')
  await user.type(screen.getByTestId('street'), '123 Main St')
  await user.type(screen.getByTestId('suite'), 'Apt 1')
  await user.type(screen.getByTestId('city'), 'Anytown')
  await user.type(screen.getByTestId('zipcode'), '12345')
  await user.type(screen.getByTestId('latitude'), '34.0522')
  await user.type(screen.getByTestId('longitude'), '-118.2437')
  await user.type(screen.getByTestId('company-name'), 'Acme Corp')
  await user.type(screen.getByTestId('catch-phrase'), 'Innovate your world')
  await user.type(screen.getByTestId('bs'), 'empower synergistic solutions')

  await user.click(screen.getByTestId('submit'))
  vi.advanceTimersByTime(2000) // run navigation timeout

  expect(await screen.findByText('John', undefined, { timeout: 3000 })).toBeInTheDocument()
})
