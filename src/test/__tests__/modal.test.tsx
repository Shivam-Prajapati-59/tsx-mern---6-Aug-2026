import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/app/page";
import { AuthProvider } from "@/src/providers/AuthProvider";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} />
  ),
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </QueryClientProvider>,
  );
}

describe("Star Wars character app integration", () => {
  it("opens a modal with the correct person's information when their card is clicked", async () => {
    const user = userEvent.setup();
    renderApp();

    const lukeCard = await screen.findByRole("button", {
      name: /view details for luke skywalker/i,
    });
    await user.click(lukeCard);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    expect(within(dialog).getByText("Luke Skywalker")).toBeInTheDocument();
    expect(within(dialog).getByText("1.72 m")).toBeInTheDocument();
    expect(within(dialog).getByText("77 kg")).toBeInTheDocument();
    expect(within(dialog).getByText("09-12-2014")).toBeInTheDocument();
    expect(within(dialog).getByText("4")).toBeInTheDocument();
    expect(within(dialog).getByText("19BBY")).toBeInTheDocument();

    expect(within(dialog).getByText("Tatooine")).toBeInTheDocument();
    expect(within(dialog).getByText("Desert")).toBeInTheDocument();
    expect(within(dialog).getByText("Arid")).toBeInTheDocument();
    expect(within(dialog).getByText("2")).toBeInTheDocument();
  });

  it("combines name search with a species filter", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByRole("button", { name: /view details for luke skywalker/i });

    const search = screen.getByRole("textbox", { name: /search characters/i });
    await user.type(search, "c-3po");

    expect(screen.queryByRole("button", { name: /view details for luke skywalker/i })).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view details for c-3po/i }),
    ).toBeInTheDocument();

    const speciesSelect = screen.getByRole("combobox", { name: /filter by species/i });
    await user.click(speciesSelect);
    const droidOption = await screen.findByRole("option", { name: "Droid" });
    await user.click(droidOption);

    expect(
      screen.getByRole("button", { name: /view details for c-3po/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /view details for luke/i })).not.toBeInTheDocument();
  });
});