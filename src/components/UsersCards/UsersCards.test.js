import { render } from "@testing-library/react";
import UsersCards from "./index";

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

test("UsersCards Render", () => {
  const mockUsers = [
    { id: 1, email: "test1", nickname: "test2" },
    { id: 2, email: "test2", nickname: "test3" },
  ];
  render(<UsersCards data={mockUsers} />, { wrapper });
});
