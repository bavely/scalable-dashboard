import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
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

afterEach(() => {
  vi.useRealTimers()
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

  // ensure store hydration is complete before interactions
  if (!useUsersStore.persist.hasHydrated()) {
    await new Promise((resolve) => useUsersStore.persist.onFinishHydration(resolve))
  }

  // Navigate to add user page
  await user.click(screen.getByRole('link', { name: /add user/i }))
  
  // Wait for the form to appear
  const usernameInput = await screen.findByTestId('username')

  // Fill out the form
  await user.type(usernameInput, 'johndoe')
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

  // Submit the form
  await user.click(screen.getByTestId('submit'))

  // Wait for navigation to complete and user to appear in the list
  // Since the AddUserPage has a 5 second delay, we need to wait for that
  await waitFor(
    () => {
      expect(screen.getByText('John')).toBeInTheDocument()
    },
    { timeout: 5000 } // Increased timeout to account for the 5 second delay
  )

}, 10000) // Increased overall test timeout