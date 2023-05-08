import { render } from "@testing-library/react";
import SideBar from "./index";

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

test("SideBar Render", () => {
  render(<SideBar />, { wrapper });
});
