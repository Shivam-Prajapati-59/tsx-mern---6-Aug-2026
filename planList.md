# MERN+TypeScript Assignment: Star Wars Character App - Task List

## 1. Project Setup
- [x] Initialize frontend repository (Next.js or Vite with React + TypeScript).
- [ ] Initialize backend (Express + Node.js + TypeScript) - *Required primarily for JWT mock API*. *(Use Next.js route handlers instead — single deployable app.)*
- [x] Set up styling strategy (Tailwind CSS + shadcn/ui).
- [x] Ensure Git repository is named `tsx-mern-<date_of_submission>` (see README).

## 2. Core Requirements (Frontend)
- [x] **API Integration:** Fetch character list from public Star Wars API (`/people` endpoint).
- [x] **State Management:** Implement loading spinner/state for data fetching and refetching.
- [x] **Error Handling:** Implement error UI state (e.g., if API server is down) with Retry.
- [x] **Pagination:** Implement UI and logic to handle paginated API responses (client-side over cached data).

## 3. Character Cards UI
- [x] Display a card for each character.
- [x] Show character's name on the card.
- [x] Fetch and display a random image from Picsum for each character (`https://picsum.photos/seed/...`).
- [x] Implement conditional card styling (coloring) based on the character's `species`.
- [x] Add a hover animation to the character cards.

## 4. Character Details Modal
- [x] Implement a modal that opens when a character card is clicked.
- [x] Display character details in the modal:
  - [x] Name (as modal header)
  - [x] Height (converted and displayed in meters)
  - [x] Mass (in kg)
  - [x] Date added to API (formatted as `dd-MM-yyyy`)
  - [x] Number of films they appear in
  - [x] Birth year
- [x] **Homeworld Details:** Make secondary API call to fetch homeworld data and display:
  - [x] Homeworld Name
  - [x] Terrain
  - [x] Climate
  - [x] Amount of residents

## 5. Brownie Points (Optional Features)
- [x] **Search:** Implement searching characters by name (partial/complete).
- [x] **Filter:** Implement filtering characters by homeworld, film, or species.
- [x] Ensure Search and Filter can work together simultaneously.
- [x] **JWT Authentication:**
  - [x] Implement mock Login / Logout UI.
  - [x] Setup mocked API endpoint for auth returning JWT (Next.js route handlers).
  - [x] Implement silent token refresh when token expires (http-only cookies; timer-based refresh).
- [x] **Integration Tests:** Write a test asserting that clicking a card opens the modal with the correct person's information.

## 6. Final Polish & Submission
- [x] Ensure the application is responsive.
- [x] Refactor for clean, maintainable code following industry standards.
- [ ] Add screenshots of the app to the `README.md` (folder created at `public/screenshots/` — drop in PNGs).
- [ ] Host the frontend (Netlify / Vercel / Cloudflare Pages).
- [ ] (Optional) Host the backend if applicable.
- [ ] Record a video demonstrating the App & code flow.
- [ ] Upload video to Google Drive or YouTube.
- [ ] Fill out the Assignment Submission Link form with Repo, App Link, and Video Link.