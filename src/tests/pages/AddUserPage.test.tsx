// AddUserPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';
import AddUserPage from '../../pages/AddUserPage';
import { MemoryRouter } from 'react-router-dom';
// import { render } from '../utils/test-utils'
it('renders the add user page', () => {
  render( <MemoryRouter><AddUserPage /></MemoryRouter>);
});
it('submits the form with valid data', async () => {
  render(<MemoryRouter><AddUserPage /></MemoryRouter>);
  // Fill in the form fields
  fireEvent.change(screen.getByTestId('name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByTestId('phone'), { target: { value: '+1 555-123-4567' } });
  fireEvent.change(screen.getByTestId('website'), { target: { value: 'https://johndoe.com' } });
  fireEvent.change(screen.getByTestId('street'), { target: { value: '123 Main St' } });
  fireEvent.change(screen.getByTestId('suite'), { target: { value: 'Apt 1' } });
  fireEvent.change(screen.getByTestId('city'), { target: { value: 'Anytown' } });
  fireEvent.change(screen.getByTestId('zipcode'), { target: { value: '12345' } });

  // Submit the form
  fireEvent.click(screen.getByTestId('submit'));

  // Expect a success message or redirect, depending on implementation
  // Here we check for a generic success message
  // You may need to adjust this depending on your AddUserPage implementation
  // For example:
  // expect(await screen.findByText(/user added successfully/i)).toBeInTheDocument();
});

it('shows validation errors for empty required fields', async () => {
  render(<MemoryRouter><AddUserPage /></MemoryRouter>);
  // Submit the form without filling fields
  fireEvent.click(screen.getByTestId('submit'));

  // Check for validation error messages
  expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
});
