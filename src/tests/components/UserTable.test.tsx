import { render, screen } from '@testing-library/react';
import UserTable from '../../components/UserTable/UserTable';
import type { User } from '../../types';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', phone: '123' },
  { id: 2, name: 'Bob', email: 'bob@example.com', phone: '456' },
];

it('renders user rows', () => {
  render(<UserTable users={users} />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('bob@example.com')).toBeInTheDocument();
});
