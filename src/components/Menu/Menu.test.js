import { render } from "@testing-library/react";
import Menu from "./index";

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

test("Menu Render", () => {
  const mockThreads = { "@id": "12", "owner": "13" };
  render(<Menu/>, { wrapper });
});
