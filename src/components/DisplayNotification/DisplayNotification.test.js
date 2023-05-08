import { render } from "@testing-library/react";
import DisplayNotification from "./index";

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

test('renders without crashing', () => {
  const onClose = jest.fn();
  const message = 'Mock Message';
  const duration = 5000;
  const open = true;
  render(<DisplayNotification onClose={onClose} message={message} duration={duration} open={open} />, {wrapper});
});