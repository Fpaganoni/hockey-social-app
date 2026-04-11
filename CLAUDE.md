# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 social network for hockey players and clubs with job opportunities, player profiles, feed/posts, and messaging. Uses TypeScript, TailwindCSS, Radix UI, GraphQL, and is internationalized (EN/ES/FR).

**Architecture:** Next.js 16 app router + graphql-request client + React Query + Zustand + next-intl

## Commands

### Development
- `pnpm dev` — Start dev server (localhost:3000)
- `pnpm build` — Production build
- `pnpm start` — Run production server

### Testing
- `pnpm test` or `pnpm test:unit` — Run Vitest tests once
- `pnpm test:watch` — Vitest watch mode
- `pnpm test:coverage` — Generate coverage report (target: 70% lines/functions)
- `pnpm test:e2e` — Run Playwright E2E tests
- `pnpm test -- --reporter=verbose` — Run tests with verbose output
- `pnpm test hooks/usePostMutations.test.ts` — Run single test file

### Linting
- `pnpm lint` — Run ESLint on the entire project

## High-Level Architecture

### Data Flow
1. **Server Layer:** GraphQL backend at `NEXT_PUBLIC_GRAPHQL_URL` (default: localhost:4000/graphql)
2. **GraphQL Client:** `graphql-request` via `lib/graphql-client.ts`
3. **Query Management:** React Query (TanStack) with default stale time of 60s, cache time 5m
4. **State Management:** 
   - Global auth state: `stores/useAuthStore.ts` (persists JWT token)
   - UI state: `stores/useStoryStore.ts`, `useFiltersStore.ts`, `useNotificationsStore.ts`
   - Feature hooks: `hooks/usePostMutations.ts`, `useUsers.ts`, etc.
5. **Components:** Feature-organized in `components/` (feed, profile, opportunities, etc.)

### Directory Structure
- **`app/[locale]/`** — Next.js app router with locale segmentation
  - Each route has a `page.tsx` (optionally SSR/SSG)
  - Layouts handle auth middleware via `useAuthStore`
- **`components/`** — React UI components organized by feature
  - `feed/` — Post feed, post-card, post-modal
  - `profile/` — User profile pages
  - `opportunities/` — Job listings
  - `layout/` — Shared navigation, headers
  - Components use `"use client"` for interactivity
- **`graphql/`** — GraphQL operations (queries/mutations) organized by domain
  - `user/`, `post/`, `club/`, `opportunity/`, `story/`
  - Centralized exports in `graphql/index.ts`
- **`hooks/`** — Custom React hooks
  - `usePostMutations.ts` — POST CRUD, like/unlike, comments (optimistic updates)
  - `useUsers.ts` — User queries and mutations
  - `useJobOpportunities.ts` — Opportunities queries
  - UI utilities in `hooks/ui/` (mobile detection, toast)
- **`stores/`** — Zustand global state (auth, UI state)
- **`lib/`** — Utilities and configuration
  - `graphql-client.ts` — GraphQL client setup with auth token handling
  - `query-client.tsx` — React Query provider config
  - `date-utils.ts` — Date formatting utilities
- **`i18n/`** — Internationalization setup with next-intl
- **`messages/`** — Translation files (en.json, es.json, fr.json)
- **`tests/`** — Vitest unit tests and Playwright E2E tests

### Key Libraries & Patterns
- **Next.js 16:** App router with locale-based segmentation (`app/[locale]/`)
- **GraphQL:** graphql-request for queries/mutations, `@graphql-codegen` for types
- **React Query:** Server state caching with optimistic updates (post interactions)
- **Zustand:** Lightweight global state (auth, filters, notifications, stories)
- **next-intl:** Built-in i18n for EN/ES/FR
- **Radix UI + Tailwind:** Component library + styling
- **Framer Motion:** Animations (especially in story-viewer, post-modal)
- **React Hook Form:** Form validation with Zod resolvers

## Important Patterns & Conventions

### Authentication
- JWT tokens stored in `useAuthStore` (persists to localStorage)
- Token set via `setAuthToken()` in graphql-client before requests
- Auth middleware checks token on app initialization
- `useUsers.ts` provides login/register mutations

### Optimistic Updates
- `usePostMutations.ts` implements optimistic UI updates for:
  - Like/unlike (instant visual feedback)
  - Comment creation/deletion
  - Post CRUD operations
- Uses React Query's `onMutate`, `onSuccess`, `onError` pattern
- **Critical:** Always invalidate relevant query keys on success to sync server state

### Server vs. Client Components
- Pages in `app/[locale]/` are server by default but use `"use client"` for interactivity
- **Known issue (from PRE-LAUNCH.md):** `/opportunities` and `/profile/[id]` use `"use client"` at root; future: migrate to server components for SEO, stream interactivity to client children

### Internationalization
- Routes are locale-segmented: `/en/feed`, `/es/feed`, etc.
- Labels/copy pulled from `messages/{en,es,fr}.json`
- Use `next-intl`'s `useTranslations()` hook in components
- Add new strings to all three message files when adding features

### GraphQL Operations
- All queries/mutations centralized in `graphql/[domain]/{queries,mutations}.ts`
- Exported from `graphql/index.ts` for tree-shaking
- Operations use generated types from `@graphql-codegen`
- See `usePostMutations.ts` for mutation patterns (variables, cache updates)

### Error Handling & Validation
- Forms use Zod schemas with `@hookform/resolvers`
- GraphQL errors logged; UI shows user-friendly toast notifications via Sonner
- Test coverage target: 70% (lines/functions)

### Image Optimization
- **Next.js Image component** configured in `next.config.mjs`
- Remote image domains: imagekit.io, cloudinary, randomuser.me, and wildcard http/https
- Use `<Image />` instead of `<img />` for LCP optimization

### TypeScript
- `strict: true` in tsconfig.json
- Path alias `@/*` points to project root
- **Known issues:** Some `any` types in user mutations; enum capitalization ("Coach" vs. "coach") inconsistent with backend

## Development Workflow

1. **Feature branch:** Create from `main` (e.g., `git checkout -b feature/profile-updates`)
2. **Write/update GraphQL operations** in `graphql/`
3. **Create/update custom hooks** for data fetching/mutations in `hooks/`
4. **Build components** in `components/` with `"use client"` where needed
5. **Add translations** to all three message files
6. **Write tests** in `tests/` (unit tests for hooks/stores, component tests, E2E)
7. **Test locally:** `pnpm dev`, `pnpm test:watch`, `pnpm lint`
8. **Build check:** `pnpm build` (TypeScript errors ignored via config)

## Environment Variables

- `NEXT_PUBLIC_GRAPHQL_URL` — GraphQL endpoint (default: `http://localhost:4000/graphql`)
- `.env.local` holds environment-specific values (not tracked in git)

## Known Limitations & Future Work

From PRE-LAUNCH.md:
- Server components not used for SEO (opportunities, profile pages should be SSR)
- Dynamic metadata (`generateMetadata`) not implemented (impacts social sharing)
- Image optimization incomplete (use Next.js Image component more consistently)
- Type safety: remove `any` in user mutations, standardize enum values
- Filter state: currently in local state; should use URL query params for shareability

## Testing Tips

- Setup file at `tests/setup.ts` (test utilities)
- Test utils in `tests/test-utils.tsx` (render with providers)
- Use React Testing Library patterns (query by role/label, not implementation details)
- Vitest auto-runs `.test.ts(x)` files; jsdom environment for DOM testing
- Coverage config in `vitest.config.ts` (70% threshold for lines/functions)

## Debugging

- React Query DevTools auto-included (QueryProvider in `lib/query-client.tsx`)
- Check `stores/useAuthStore.ts` if auth state seems wrong
- GraphQL errors typically logged to console; check network tab in DevTools
- Use `next-intl` warnings if translations missing (check all three message files)
