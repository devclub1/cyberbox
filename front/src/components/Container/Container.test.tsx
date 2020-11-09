import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';

test('renders welcome text', () => {
    const { getByText } = render(<Container />);
    const linkElement = getByText(/Welcome/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders login button', () => {
    const { getByText } = render(<Container />);
    const linkElement = getByText(/Click to fake login/i);
    expect(linkElement).toBeInTheDocument();
});
