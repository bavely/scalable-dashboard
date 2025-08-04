// AddUserPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

import { MemoryRouter } from 'react-router-dom';
import AddUserPage from '../../pages/AddUserPage';
import { useUsersStore } from '../../hooks/useUsersStore';
import { Toaster } from 'sonner';

beforeEach(() => {
  useUsersStore.setState({ users: [], loading: false, error: null });
  localStorage.clear();
  mockedNavigate.mockReset();
});

it('renders the add user page', () => {
  render(
    <MemoryRouter>
      <AddUserPage />
    </MemoryRouter>
  );
});

it('submits the form with valid data', async () => {
  render(
    <MemoryRouter>
      <>
        <AddUserPage />
        <Toaster />
      </>
    </MemoryRouter>
  );

  // Fill in the form fields
  fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByTestId('name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByTestId('phone'), { target: { value: '+1 555-123-4567' } });
  fireEvent.change(screen.getByTestId('website'), { target: { value: 'https://johndoe.com' } });
  fireEvent.change(screen.getByTestId('street'), { target: { value: '123 Main St' } });
  fireEvent.change(screen.getByTestId('suite'), { target: { value: 'Apt 1' } });
  fireEvent.change(screen.getByTestId('city'), { target: { value: 'Anytown' } });
  fireEvent.change(screen.getByTestId('zipcode'), { target: { value: '12345' } });
  fireEvent.change(screen.getByTestId('latitude'), { target: { value: '34.0522' } });
  fireEvent.change(screen.getByTestId('longitude'), { target: { value: '-118.2437' } });
  fireEvent.change(screen.getByTestId('company-name'), { target: { value: 'Acme Corp' } });
  fireEvent.change(screen.getByTestId('catch-phrase'), { target: { value: 'Innovate your world' } });
  fireEvent.change(screen.getByTestId('bs'), { target: { value: 'empower synergistic solutions' } });

  // Submit the form
  fireEvent.click(screen.getByTestId('submit'));

  // Expect success message
  expect(await screen.findByText(/user added successfully/i)).toBeInTheDocument();

  // Verify user added to store
  const users = useUsersStore.getState().users;
  expect(users).toHaveLength(1);
  expect(users[0]).toMatchObject({ name: 'John Doe', email: 'john@example.com' });

  // Wait for navigation to be triggered
  await vi.waitFor(
    () => {
      expect(mockedNavigate).toHaveBeenCalled();
    },
    { timeout: 3000 }
  );
});

it('shows validation errors for empty required fields', async () => {
  render(
    <MemoryRouter>
      <AddUserPage />
    </MemoryRouter>
  );
  // Submit the form without filling fields
  fireEvent.click(screen.getByTestId('submit'));

  // Check for validation error messages
  expect(await screen.findByText(/Website must be a valid URL. \(e\.g\. https:\/\/example\.com\)/i)).toBeInTheDocument();
  expect(await screen.findByText(/Username must be at least 2 characters./i)).toBeInTheDocument();

});
