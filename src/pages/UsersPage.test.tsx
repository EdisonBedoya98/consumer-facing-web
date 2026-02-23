import { render, screen, fireEvent } from "@testing-library/react";
import { UsersPage } from "./UsersPage";

import { fetchUsersApi } from "../services/usersService";
import { mockUsers } from "../mocks/users.mock";

vi.mock("../services/usersService", () => ({
  fetchUsersApi: vi.fn(),
}));

describe("UsersPage", () => {
  it("reduces the number of rendered users when typing in the filter input", async () => {
    vi.mocked(fetchUsersApi).mockResolvedValue(mockUsers);

    render(<UsersPage />);

    const userCards = await screen.findAllByRole("button", { name: /User /i });
    expect(userCards).toHaveLength(2);

    const searchInput = screen.getByRole("textbox", {
      name: /filter users by name/i,
    });
    fireEvent.change(searchInput, { target: { value: "Leanne" } });

    const filteredUserCards = screen.getAllByRole("button", { name: /User /i });
    expect(filteredUserCards).toHaveLength(1);
    expect(screen.getByText("Leanne Graham")).toBeTruthy();
    expect(screen.queryByText("Ervin Howell")).toBeNull();
  });
});
