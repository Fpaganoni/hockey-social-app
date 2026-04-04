import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";

// ── next/navigation ──────────────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn() }),
  usePathname: () => "/en/opportunities",
  useSearchParams: () => new URLSearchParams(),
}));

// ── next-intl ────────────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── localStorage (zustand persist) ───────────────────────────────────────────
beforeEach(() => {
  localStorage.clear();
});
