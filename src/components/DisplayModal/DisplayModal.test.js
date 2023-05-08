import { render } from "@testing-library/react";
import DisplayModal from "./index";

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

test("DisplayModal Render", () => {
  const onClose = jest.fn();
  const title = "Mock Title";
  const body = "Mock Body";
  const open = true;
  render(
    <DisplayModal onClose={onClose} title={title} body={body} open={open} />,
    { wrapper }
  );
});
