import { render } from "@testing-library/react";
import DisplayThreads from "./index";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/ConfirgureStore";

const wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

test('DisplayThreads Render', () => {
    const mockThreads = [{ id: 1, title: 'Thread 1', owner: '/api/users/143'}, { id: 2, title: 'Thread 2', owner: '/api/users/144'}];
    render(<DisplayThreads threads={mockThreads} />, {wrapper});
  });

