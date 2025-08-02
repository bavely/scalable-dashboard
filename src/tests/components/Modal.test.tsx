import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/Shared/Modal';
import type { User } from '../../types';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

const user: User = {
  id: 1,
  name: 'Alice Smith',
  username: 'alice',
  email: 'alice@example.com',
  phone: '+1 555-123-4567',
  website: 'alice.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 1',
    city: 'Anytown',
    zipcode: '12345',
    geo: { lat: '37.7749', lng: '-122.4194' },
  },
  company: {
    name: 'Alice Inc',
    catchPhrase: 'We do things',
    bs: 'business stuff',
  },
};

describe('Modal', () => {
  it('renders user details when open', () => {
    render(<Modal open={true} handleClose={() => {}} user={user} />);

    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('calls handleClose when clicking close button', () => {
    const handleClose = vi.fn();
    render(<Modal open={true} handleClose={handleClose} user={user} />);

    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalled();
  });
});
