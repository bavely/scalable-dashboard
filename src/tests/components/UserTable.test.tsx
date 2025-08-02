import { render, screen } from '@testing-library/react';
import UserTable from '../../components/UserTable/UserTable';
import type { User } from '../../types';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', phone: '+1 555-123-4567', website: 'https://alice.com', address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345', geo: { lat: '37.7749', lng: '-122.4194' } } , company: { name: 'Alice Inc', catchPhrase: 'Alice is a good company', bs: 'Alice is a good company' } },
  { id: 2, name: 'Bob', email: 'bob@example.com', phone: '+1 555-123-4567', website: 'https://bob.com', address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345', geo: { lat: '37.7749', lng: '-122.4194' } } , company: { name: 'Bob Inc', catchPhrase: 'Bob is a good company', bs: 'Bob is a good company' } },
];

it('renders user rows', () => {
  render(<UserTable users={users} />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('bob@example.com')).toBeInTheDocument();
});
