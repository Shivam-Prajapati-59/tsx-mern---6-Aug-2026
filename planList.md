# MERN+TypeScript Assignment: Star Wars Character App - Task List

## 1. Project Setup
- [ ] Initialize frontend repository (Next.js or Vite with React + TypeScript).
- [ ] Initialize backend (Express + Node.js + TypeScript) - *Required primarily for JWT mock API*.
- [ ] Set up styling strategy (CSS / Tailwind CSS).
- [ ] Ensure Git repository is named `tsx-mern-<date_of_submission>`.

## 2. Core Requirements (Frontend)
- [ ] **API Integration:** Fetch character list from public Star Wars API (`/people` endpoint).
- [ ] **State Management:** Implement loading spinner/state for data fetching and refetching.
- [ ] **Error Handling:** Implement error UI state (e.g., if API server is down).
- [ ] **Pagination:** Implement UI and logic to handle paginated API responses.

## 3. Character Cards UI
- [ ] Display a card for each character.
- [ ] Show character's name on the card.
- [ ] Fetch and display a random image from Picsum for each character (`https://picsum.photos/200/300?random=seed`).
- [ ] Implement conditional card styling (coloring) based on the character's `species`.
- [ ] Add a hover animation to the character cards.

## 4. Character Details Modal
- [ ] Implement a modal that opens when a character card is clicked.
- [ ] Display character details in the modal:
  - [ ] Name (as modal header)
  - [ ] Height (converted and displayed in meters)
  - [ ] Mass (in kg)
  - [ ] Date added to API (formatted as `dd-MM-yyyy`)
  - [ ] Number of films they appear in
  - [ ] Birth year
- [ ] **Homeworld Details:** Make secondary API call to fetch homeworld data and display:
  - [ ] Homeworld Name
  - [ ] Terrain
  - [ ] Climate
  - [ ] Amount of residents

## 5. Brownie Points (Optional Features)
- [ ] **Search:** Implement searching characters by name (partial/complete).
- [ ] **Filter:** Implement filtering characters by homeworld, film, or species.
- [ ] Ensure Search and Filter can work together simultaneously.
- [ ] **JWT Authentication:** 
  - [ ] Implement mock Login / Logout UI.
  - [ ] Setup mocked API endpoint for auth returning JWT.
  - [ ] Implement silent token refresh when token expires.
- [ ] **Integration Tests:** Write a test asserting that clicking a card opens the modal with the correct person's information.

## 6. Final Polish & Submission
- [ ] Ensure the application is responsive.
- [ ] Refactor for clean, maintainable code following industry standards.
- [ ] Add screenshots of the app to the `README.md`.
- [ ] Host the frontend (Netlify / Vercel / Cloudflare Pages).
- [ ] Host the backend if applicable (for mock JWT).
- [ ] Record a video demonstrating the App & code flow.
- [ ] Upload video to Google Drive or YouTube.
- [ ] Fill out the Assignment Submission Link form with Repo, App Link, and Video Link.
