import { render } from "@testing-library/react";
import DisplayUsersInGroup from "./index";

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

test('DisplayThreads Render', () => {
    const users = [{ email: 'user1@example.com' }, { email: 'user2@example.com' }];
    const totalPage = 1;
    const handlePageUsers = jest.fn();
    render( <DisplayUsersInGroup users={users} totalPage={totalPage} handlePageUsers={handlePageUsers} />, {wrapper});
  });

