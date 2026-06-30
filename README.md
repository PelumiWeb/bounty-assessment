# Product Catalogue

A small, production-style React Native app that lists products from the
[Fake Store API](https://fakestoreapi.com/products), supports search and category
filtering, and shows a details screen per product. Built with Expo + TypeScript.

> Built as a technical assessment. The goal was a clean, maintainable codebase
> over a feature-heavy one — exactly the brief.

## Features

- Product list with image, title, price, category and description preview
- Product details screen (image, full title/description, price, category, rating)
- Search by title (case-insensitive, debounce-free since filtering is local)
- Category filtering via horizontal tabs derived from the data
- First-class **loading**, **empty**, **error** and **pull-to-refresh / retry** states
- Skeleton placeholder on the initial load
- Typed end to end, accessibility labels on interactive elements
- Unit + component tests, plus a GitHub Actions CI workflow

## Tech Stack

| Concern           | Choice                              | Why                                                        |
| ----------------- | ----------------------------------- | ---------------------------------------------------------- |
| Framework         | Expo (managed) + TypeScript         | Fast to run/review, OTA-able, easy EAS path                |
| Server state      | TanStack Query                      | Caching, retry, refetch, loading/error states out of box   |
| UI / filter state | React `useState` + `useMemo`        | Trivial local state — no global store needed               |
| Navigation        | React Navigation (native-stack)     | Native transitions, typed routes                           |
| Styling           | `StyleSheet` + a small token system | No runtime styling dependency; consistent spacing/colors   |
| Testing           | Jest (`jest-expo`) + RN Testing Lib | Standard, fast, behaviour-focused                          |

## Project Structure

```
src/
├── api/            # fetch client + typed product endpoints (no UI here)
│   ├── client.ts   # apiGet<T>() + normalised ApiError
│   └── products.ts # getProducts(), getProduct(id)
├── components/     # reusable, presentational components
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── RatingStars.tsx
│   └── states/     # LoadingState / ErrorState / EmptyState / ListSkeleton
├── hooks/          # useProducts(), useProduct(id) — data access via TanStack Query
├── navigation/     # stack navigator + typed param list
├── providers/      # QueryProvider (QueryClient lifecycle)
├── screens/        # ProductListScreen, ProductDetailsScreen (composition only)
├── theme/          # colors, spacing, radius, typography tokens
├── types/          # Product / ProductRating domain types
└── utils/          # filterProducts() (pure), formatPrice(), truncate()
__tests__/          # filterProducts (logic) + ProductCard (render/interaction)
```

The guiding rule: **data fetching, business logic, UI and navigation never mix
in the same file.** Screens compose hooks and components; they don't fetch or
contain filtering logic themselves.

## Architecture & Technical Decisions

**TanStack Query for server state.** The app is almost entirely *server state* —
fetch a list, fetch one item, refetch on pull. TanStack Query gives caching,
`isLoading`/`isError`, retries and `refetch` for free, which keeps the screens
declarative. Redux Toolkit would have added a store, slices and middleware to
manage data the cache already handles — over-engineering for this size.

**Local UI state stays local.** Search text and the selected category live in
`ProductListScreen` via `useState`. Filtering runs through a pure
`filterProducts()` inside `useMemo`. Because `fakestoreapi` returns the full
catalogue in one call, filtering is done client-side — no extra requests, instant
feedback, and the logic is pure so it's easy to test.

**Details screen reads from the list cache first.** `useProduct(id)` seeds its
`initialData` from the cached products list, so navigating in paints instantly,
then revalidates in the background. If the screen were opened cold (e.g. a deep
link), it falls back to `GET /products/:id`.

**A tiny design-token system** (`src/theme`) keeps colors, spacing, radii and
type scale in one place instead of scattering magic numbers, so the UI stays
consistent and is easy to theme later (e.g. dark mode).

**Typed navigation.** `RootStackParamList` is registered globally, so
`navigation.navigate` and `route.params` are fully type-checked.

## Installation

Requires Node 20+ and the Expo toolchain.

```bash
git clone <your-repo-url>
cd product-catalogue

# Install dependencies
npm install

# Reconcile native module versions with your installed Expo SDK.
# (Versions in package.json target Expo SDK 56 / RN 0.85; this aligns them.)
npx expo install
```

## Running the App

```bash
npm start          # Expo dev server (press i / a, or scan the QR in Expo Go)
npm run ios        # open in the iOS simulator
npm run android    # open in an Android emulator
```

## Running Tests

```bash
npm test           # run the suite once
npm run test:watch # watch mode
npm test -- --coverage
```

Other checks:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

### What's tested

- **`filterProducts` (logic):** case-insensitive title search, category filter,
  combined filters, whitespace handling, and the empty-result case. This is the
  highest-value test — it covers the core behaviour and never flakes.
- **`ProductCard` (render + interaction):** renders title/price/category and
  fires `onPress` with the correct product when tapped.

## Screenshots

> Add screenshots or a short screen recording here, e.g.
> `docs/list.png`, `docs/details.png`, `docs/search.png`.

| List | Details | Search / Filter |
| ---- | ------- | --------------- |
| _tbd_ | _tbd_ | _tbd_ |

## Assumptions

- The catalogue is small enough to fetch once and filter on-device, so there is
  no server-side search/pagination.
- Search targets the **title** only, as specified.
- Categories are derived from the loaded products rather than the
  `/products/categories` endpoint, to keep a single source of truth and avoid a
  second loading state.
- Every product in this API includes a `rating` object; the UI still guards
  against missing data defensively.

## Known Limitations

- No persistence/offline cache between launches TanStack Query cache is
- Dark mode isn't implemented, but the token system is structured to make it a
  small change.

## Possible Next Steps

Offline persistence, a favourites feature (a small persisted `Set` of ids),
dark mode via a theme context, and image caching with `expo-image`.
# bounty-assessment
