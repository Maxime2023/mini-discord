import { render } from "@testing-library/react";
import MediaControlCard from "./index";

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

test("Media control Render Render", () => {
  const mockThreads = { "@id": "12", "owner": "13" };
  render(<MediaControlCard thread={mockThreads}/>, { wrapper });
});
