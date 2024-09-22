# PaperMote

## Overview

PaperMote is a web app that allows users to keep track of their paperbook notes and annotations.
![Vercel](https://vercelbadge.vercel.app/api/luoyaqifei/PaperMote)

### Demo

[Presentation](https://luoyaqifei.github.io/PaperMote/) is depoloyed on Github Pages, using the `gh-pages` branch of this repo.

[Demo](https://paper-mote.vercel.app/) is deployed on Vercel, using the `main` branch of this repo.

### Installation

#### Prerequisites
-   Node.js
-   npm, pnpm, or yarn
-   Git

#### Installation and Running
```bash
git clone https://github.com/luoyaqifei/PaperMote.git
cd PaperMote
```
Copy `.env.example` to `.env` and set the correct environment variables.
- For Google Books API, no key is needed.
- For Postgres, you can use Vercel Postgres and pull the secrets from Vercel dashboard, or run one locally using Docker, Dockerfile is not included in this repo, however there is an official [reference](https://vercel.com/docs/storage/vercel-postgres/local-development). 
- For cloudinary, create an account and pull the secrets from [Cloudinary Dashboard](https://cloudinary.com/console).
- For Auth.js, you don't need anything in local, but if you deploy it to Vercel or other production environment, you need to create an SSH secret using
`$ openssl rand -base64 32` and copy this into `AUTH_SECRET` in `.env` as instructed in [NextAuth Dashboard](hhttps://authjs.dev/reference/nextjs).

```bash
npm install
npm run dev
```
After the server is running, you need to use Postman or curl to `GET` the route `/seed` to populate the tables with data.

### Problem Space

Paperbooks are a great way to read, but they can be difficult to annotate and take notes on. PaperMote solves this problem by providing a platform for users to easily annotate and take notes on their paperbooks.


### User Profile

PaperMote is designed for avid readers who want to keep track of their paperbook notes and annotations. Whether you're a student, a professional, or just someone who loves to read, PaperMote can help you keep track of your notes and annotations in one place. You can use it on your computer, tablet, or phone.

### Features

-   User registration and authentication
-   Create notes and annotations by book
-   Upload a photo of your paperbook
-   Add notes and annotations to your paperbook, with their location in the book
-   Search your notes and annotations

## Implementation

### Tech Stack

-   Next.js and Tailwind CSS

### APIs

Optional:

-   Google Books API, or another API to search for books
-   Image upload API to upload images
-   Short url API to create shortened URLs

### Sitemap

-   Homepage
-   Login
-   Signup
-   Book List
-   Book Notes
-   Profile
-   Search
-   Upload
-   Settings

### Mockups

Here are the mockups for the main pages of PaperMote:

1. Homepage
   ```
   +----------------------------------+
   |  PaperMote Logo                  |
   |                                  |
   |  Welcome to PaperMote            |
   |                                  |
   |  [Login] [Sign Up]               |
   |                                  |
   |  Featured Books                  |
   |  +------+ +------+ +------+      |
   |  | Book | | Book | | Book |      |
   |  +------+ +------+ +------+      |
   |                                  |
   |  How It Works                    |
   |  1. Sign Up                      |
   |  2. Add Books                    |
   |  3. Take Notes                   |
   |                                  |
   +----------------------------------+
   ```

2. Login/Signup
   ```
   +----------------------------------+
   |  PaperMote Logo                  |
   |                                  |
   |  [Login] | [Sign Up]             |
   |                                  |
   |  Username: [____________]        |
   |  Password: [____________]        |
   |                                  |
   |  [Submit]                        |
   |                                  |
   |  Forgot Password?                |
   |                                  |
   +----------------------------------+
   ```

3. Book List
   ```
   +----------------------------------+
   |  PaperMote Logo    [User Menu]   |
   |                                  |
   |  My Books                        |
   |                                  |
   |  [Add New Book]                  |
   |                                  |
   |  +------+ +------+ +------+      |
   |  | Book | | Book | | Book |      |
   |  | Title| | Title| | Title|      |
   |  +------+ +------+ +------+      |
   |                                  |
   |  +------+ +------+ +------+      |
   |  | Book | | Book | | Book |      |
   |  | Title| | Title| | Title|      |
   |  +------+ +------+ +------+      |
   |                                  |
   +----------------------------------+
   ```

4. Book Notes
   ```
   +----------------------------------+
   |  PaperMote Logo    [User Menu]   |
   |                                  |
   |  Book Title                      |
   |  Author                          |
   |                                  |
   |  [Add Note]                      |
   |                                  |
   |  Notes:                          |
   |  +----------------------------+  |
   |  | Note Title                 |  |
   |  | Content preview...         |  |
   |  | Page: 42                   |  |
   |  +----------------------------+  |
   |                                  |
   |  +----------------------------+  |
   |  | Another Note Title         |  |
   |  | Content preview...         |  |
   |  | Page: 78                   |  |
   |  +----------------------------+  |
   |                                  |
   +----------------------------------+
   ```

5. Profile
   ```
   +----------------------------------+
   |  PaperMote Logo    [User Menu]   |
   |                                  |
   |  User Profile                    |
   |                                  |
   |  [Avatar]                        |
   |  Username: ___________           |
   |  Email: ________________         |
   |                                  |
   |  [Change Password]               |
   |                                  |
   |  Statistics:                     |
   |  Books: 12                       |
   |  Notes: 156                      |
   |  Pages Annotated: 789            |
   |                                  |
   |  [Save Changes]                  |
   |                                  |
   +----------------------------------+
   ```

These mockups provide a basic visual representation of the main pages in the PaperMote app. They can be further refined and styled according to the design preferences and additional features as the project progresses.

### Data

User

-   id
-   username
-   password
-   email
-   avatar

Book

-   id
-   title
-   author
-   description
-   publishedDate
-   pageCount
-   image
-   createdAt
-   updatedAt

Note

-   id
-   title
-   content
-   image
-   book id
-   user id
-   book location
-   createdAt
-   updatedAt

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
Users

-   GET /users
-   POST /users
-   PUT /users/:id
-   DELETE /users/:id
-   POST /users/login
-   POST /users/logout

Books

-   GET /books
-   GET /books/:id
-   POST /books
-   PUT /books/:id
-   DELETE /books/:id

Notes

-   GET /notes
-   POST /notes
-   PUT /notes/:id
-   DELETE /notes/:id

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.

### Sprint 1: Project Setup and Core Features (Week 1, from Sep 9 to Sep 15)
-   Day 1-2: Initialize project repository, set up project structure and prepare for background knowledge
    -   [x] Set up frontend and backend directories
    -   [x] Initialize Git repository and create initial commit
    -   [x] Prepare knowledge of tech stack

-   Day 3-5: Implement basic frontend and backend
    -   [x] Create server
    -   [x] Set up database connection
    -   [x] Set up CI/CD pipeline
    -   [ ] Implement basic CRUD operations for Books and Notes
    -   [x] Implement basic frontend pages along with backend API integration
    -   [x] Implement user authentication (registration and login)

-   Day 6-7: Set up frontend structure and routing, develop basic functionality
    -   [ ] Develop layout for main pages (Home, Books, Notes)
    -   [x] Develop user profile management page

### Sprint 2: Frontend Development and Advanced Features (Week 2, from Sep 16 to Sep 22)
-   Day 1-3: Add advanced features
    -   [ ] Implement functionality to record and update notes at specific locations within books
    -   [ ] Implement basic search functionality
    -   [ ] Implement functionality to upload images of paperbooks
    -   [ ] Implement functionality to sort notes by book location, last updated time, etc.
    -   [ ] Add responsive design across all devices
-   Day 4-5: Testing and Deployment Preparation
    -   [ ] Conduct initial testing of all features
    -   [ ] Fix any critical bugs
    -   [ ] Refine UI/UX based on initial usage
    -   [ ] Configure frontend build for production
    -   [ ] Prepare for the deployment
-  Day 6-7: Polish and Documentation
    -   [ ] Implement additional features
    -   [ ] Add more detailed documentation

---

## Future Implementations
-   Add cat image to the app
-   Add skeleton UI to the app for loading status
-   Create dashboard for user statistics
-   Add animations to the app
-   Add book summary feature based on current notes
-   Use OCR to extract text and annotationsfrom images of paperbooks
-   Allow users to export their notes in a formatted style, such as markdown
-   Allow users to share excerpts with others with beautiful formatting
-   Allow users to share notes with others with a shortened url
-   Automatically resume taking notes for a book from where you left off
-   Tag everything in the system: books, notes, users, etc.
-   Add a variety of visualizations for books display in user's dashboard
-   Turn the app into a PWA
-   Use Electron to create a desktop version of the app
