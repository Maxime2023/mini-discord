import { render } from "@testing-library/react";
import ThreadContainer from "./index";

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

test("ThreadContainer Render", () => {
  const mockThread = [
    { id: 1, title: "test1", description: "test2" },
    { id: 2, title: "test2", description: "test3" },
  ];
  render(<ThreadContainer data={mockThread} />, { wrapper });
});
