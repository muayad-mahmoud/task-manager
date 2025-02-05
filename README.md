# Task Manager

## Description
A simple task manager with CRUD operations built using React and TypeScript. It supports adding, deleting, editing, and loading tasks from Firestore. Tasks can be marked as completed, and overdue tasks are indicated accordingly.

## Features
- Create, Read, Update, and Delete (CRUD) tasks
- Mark tasks as completed
- Overdue task indication
- Firebase Firestore integration
- Global state management using Zustand
- Component-level state management using useState
- Styled with TailwindCSS

## Installation
### Prerequisites
- Node.js installed
- Vite installed
- Firebase credentials

### Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <project_directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Copy the `.env.example` file to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Update the `.env` file with your Firebase credentials:
     ```sh
     VITE_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     VITE_AUTH_DOMAIN="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     VITE_PROJECT_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     VITE_STORAGE_BUCKET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     VITE_MESSAGE_SENDER_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     VITE_APP_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     VITE_MEASUREMENT_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     ```

## Firestore Indexes
This project requires the following indexes in Firestore:
- `dueDate` Descending, `priority` Ascending, `__name__` Ascending
- `dueDate` Ascending, `priority` Ascending, `__name__` Ascending
- `dueDate` Descending, `priority` Descending, `__name__` Descending
- `dueDate` Ascending, `priority` Descending, `__name__` Descending

## Running the Project
Start the development server using Vite:
```sh
npm run dev
```

## License
This project is licensed under the MIT License.
