import { Provider } from "react-redux";
import { sortUsersByNickName } from "../components/SortUsersByNickName";
import { render, screen } from "@testing-library/react";
import UsersCard from "../components/UsersCards";
import store from "../Redux/ConfirgureStore";
import { MemoryRouter } from "react-router-dom";

test("Sort users by nickname", () => {
  const users = [
    { nickname: "b" },
    { nickname: "a" },
    { nickname: "d" },
    { nickname: "c" },
  ];
  const expected = [
    { nickname: "a" },
    { nickname: "b" },
    { nickname: "c" },
    { nickname: "d" },
  ];
  let res = sortUsersByNickName(users);
  expect(res).toEqual(expected);
});

const wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

test("Display component", () => {
  render(<UsersCard />, { wrapper });
  const linkElement = screen.getByText("Liste des utilisateurs");
  expect(linkElement).toBeInTheDocument();
});
