# E-Commerce Web Application (Amazon Clone)

Product listing app with filters, search, and detail pages. Built with React and TypeScript.

## Setup

You’ll need Node.js (v18+) and npm.

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.


---

## Assumptions

- **DummyJSON** is the only data source. I’ve assumed its response shape stays as documented and that the categories endpoint returns objects with `slug` and `name` (or strings that get normalized).
- **Client-side filtering**. All filtering (price, brand, search) is done in the browser. For large datasets, this would be moved to the backend.
- **Products per category**. When a category is selected, I fetch products for that category only. The API doesn’t support combined filters, so price/brand/search are applied after fetching.

---

## Architectural Decisions

**Context for shared state**

Product list, filters, categories, brands, and loading/error state live in `ProductContext`. That keeps the header search and the listing page in sync without prop drilling. A separate `SidebarContext` handles sidebar open/close because it’s UI-only and not tied to product data.

**Client-side filtering**

The API doesn’t support price range, brand, or full-text search. I fetch products by category (or all products) and then apply filters in memory. Pagination is also client-side. It’s simple and fine for this dataset; for real production use, these would be server-side.

**Lazy loading routes**

`ProductListing` and `ProductDetail` are lazy-loaded. Smaller initial bundle and quicker first load, since the detail page isn’t needed until someone clicks a product.

**Centralized text and endpoints**

`productConstants` holds all user-facing strings. `apiEndpoints` centralizes API paths. Easier to change copy or API structure later.

**Layout split by route**

On the listing page, the header shows menu and search. On the detail page, those are hidden and only cart/profile icons show. Routing drives what’s visible, not separate layouts.

---

## Improvements (If I Had More Time)

- **Tests** – Unit tests for helpers (`matchesProductSearch`, `getUniqueBrands`), integration tests for main flows (filter, search, pagination).
- **Error boundary** – A top-level error boundary so a crash in one part doesn’t take down the whole app.
- **URL-backed filters** – Sync filters to the URL (e.g. `?category=groceries&brand=Samsung`) for shareable and bookmarkable states.
- **Server-side filtering** – If the API supports it, move price, brand, and search to the backend to handle large catalogs.
- **Accessibility** – More ARIA labels, skip links, and keyboard navigation where needed.


## Tech Stack

- **React 19** – UI library
- **TypeScript** – Type safety
- **Vite** – Build tool and dev server
- **React Router v7** – Routing
- **Tailwind CSS** – Styling
- **Axios** – HTTP client for API calls
- **DummyJSON** – Product data API (`https://dummyjson.com`)

## Screenshots

### Product Listing Page

1. All Products
<img width="1365" height="673" alt="image" src="https://github.com/user-attachments/assets/f494fd7e-648f-4b0b-836d-37482aef3f1a" />

<img width="1365" height="673" alt="image" src="https://github.com/user-attachments/assets/3a408c72-684f-4625-bd08-162e8bdeb2dd" />

2. Filtered Products based on applied filters
<img width="1365" height="679" alt="image" src="https://github.com/user-attachments/assets/36c3d2fe-a6c8-49c3-a05b-06a3b4ebadf6" />


3. Searched Products and filters
<img width="1365" height="668" alt="image" src="https://github.com/user-attachments/assets/6ca16f8f-362a-4231-ae9d-55a5f9907b54" />

### Product Detail Page

1. Product Details page
<img width="1360" height="673" alt="image" src="https://github.com/user-attachments/assets/596e704d-ff8e-442a-9bee-971be44e54f7" />

2. Display Product image
<img width="1365" height="679" alt="image" src="https://github.com/user-attachments/assets/daa75bcb-0788-4e65-974f-69e2b5c57de3" />
