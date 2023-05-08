import { render } from "@testing-library/react";
import GroupsTable from "./index";

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

test("Group Table Render", () => {
  const mockUsers = [
    { id: 1, targetUser: "12" },
    { id: 2, targetUser: "32" },
  ];
  render(<GroupsTable users={mockUsers} />, { wrapper });
});
