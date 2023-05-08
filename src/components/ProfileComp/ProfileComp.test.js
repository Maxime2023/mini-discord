import { render } from "@testing-library/react";
import ProfileComp from "./index";

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

test("ProfileComp Render", () => {
  render(<ProfileComp email="test@test.com" nickname="test" id="1" profileImageUrl="test" />, { wrapper });
});
