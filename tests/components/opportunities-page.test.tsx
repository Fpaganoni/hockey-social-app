/**
 * What: Integration tests for OpportunitiesPage component.
 * Why: Tests filter toggle URL-state sync (URL is the source of truth),
 *      filter panel visibility, and active-filter badge rendering.
 *      These are pure UI state transitions that don't require a real API.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OpportunitiesPage } from "@/components/pages/opportunities-page";

// ── next/navigation mock with mutable state ──────────────────────────────────
const mockReplace = vi.fn();
let mockSearchParamsValue = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => "/en/opportunities",
  useSearchParams: () => mockSearchParamsValue,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Shallow-mock the child that requires a real API ──────────────────────────
vi.mock("@/components/opportunities/job-opportunities", () => ({
  JobOpportunities: () => <div data-testid="job-list">Job List</div>,
}));

// ── Framer Motion: skip animations, expose a testid on the filter button ─────
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, onClick, className }: any) => (
      <button data-testid="filter-button" onClick={onClick} className={className}>
        {children}
      </button>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("OpportunitiesPage", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockSearchParamsValue = new URLSearchParams();
  });

  it("renders the page heading and job list", () => {
    render(<OpportunitiesPage />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByTestId("job-list")).toBeInTheDocument();
  });

  it("filter panel is hidden initially", () => {
    render(<OpportunitiesPage />);
    expect(screen.queryByText("filters.experience")).not.toBeInTheDocument();
  });

  it("clicking the filter icon toggles the filter panel open", () => {
    render(<OpportunitiesPage />);
    fireEvent.click(screen.getByTestId("filter-button"));
    expect(screen.getByText("filters.experience")).toBeInTheDocument();
    expect(screen.getByText("filters.location")).toBeInTheDocument();
    expect(screen.getByText("filters.contract")).toBeInTheDocument();
    expect(screen.getByText("filters.salary")).toBeInTheDocument();
  });

  it("clicking a filter chip calls router.replace with the correct URL param", () => {
    render(<OpportunitiesPage />);
    fireEvent.click(screen.getByTestId("filter-button"));
    fireEvent.click(screen.getByText("filters.experience"));

    expect(mockReplace).toHaveBeenCalledOnce();
    const calledUrl: string = mockReplace.mock.calls[0][0];
    expect(calledUrl).toContain("filter=experience");
  });

  it("clicking an already-active filter removes it from the URL", () => {
    mockSearchParamsValue = new URLSearchParams("filter=experience");
    render(<OpportunitiesPage />);
    fireEvent.click(screen.getByTestId("filter-button"));
    fireEvent.click(screen.getByText("filters.experience"));

    const calledUrl: string = mockReplace.mock.calls[0][0];
    expect(calledUrl).not.toContain("filter=experience");
  });

  it("filter button has primary color class when filters are active", () => {
    mockSearchParamsValue = new URLSearchParams("filter=experience");
    render(<OpportunitiesPage />);
    const filterBtn = screen.getByTestId("filter-button");
    expect(filterBtn.className).toContain("text-primary");
  });
});
