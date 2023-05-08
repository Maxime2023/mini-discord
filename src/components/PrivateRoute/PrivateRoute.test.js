import { render } from "@testing-library/react";
import PrivateRoute from "./index";

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

test("PrivateRoute Render", () => {
  render(<PrivateRoute  />, { wrapper });
});
