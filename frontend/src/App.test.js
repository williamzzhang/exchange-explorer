import { render, screen } from '@testing-library/react';
import App from './App';
import { getPins } from './app.js';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});




  test("should get a single user", async () => {
    const response = await getPins();
    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
  });