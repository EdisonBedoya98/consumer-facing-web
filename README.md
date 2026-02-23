# Consumer Facing Web - Interview Project

## Setup Instructions

1. Ensure you have Node.js installed on your machine.
2. Clone the repository and navigate to the project directory.
3. Install the dependencies by running:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` (or the URL provided in the terminal).

## How to run tests

This project uses Vitest and React Testing Library for unit testing.
To run the test suite, use the following command:

```bash
npm run test
```

## Architectural Decisions

- **Framework & Build Tool:** Built with React, TypeScript, and Vite for a fast development experience and optimized production builds.
- **Separation of Concerns:** The application is structured logically into `components` (UI), `hooks` (state management/business logic), and `services` (API integrations) to maintain modularity and testability.
- **Data Fetching:** Axios is used in a dedicated service layer to handle external API requests, making it easy to mock during tests (e.g., `fetchUsersApi`).
- **Styling:** Tailwind CSS is utilized alongside `tailwind-merge` and `clsx` to provide a utility-first, dynamic styling approach that keeps components visually consistent and responsive without requiring complex custom CSS.
- **Testing:** The tests are set up with Vitest and use Mock Service Worker or direct mock overrides to ensure components like `UsersPage` can be rendered and asserted against independently of the live API.

## AI Usage Disclosure

An AI assistant was used to generate the boilerplate and structure of the `UserCard` component (`src/components/UserCard.tsx`). The assistant helped implement the discriminated variants (compact and detailed), generate the Tailwind CSS classes for styling and responsiveness, and structure the component with semantic HTML and accessibility in mind. AI was also used to extract and configure global `vitest` types and help perform minor refactoring of mock data during test setup.
