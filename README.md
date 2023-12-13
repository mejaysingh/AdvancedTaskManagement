# Advanced Task Management App

This is an advanced Task Management app built with React, TypeScript, Redux Toolkit, Sass, React Hook Form, React Router, and powered by Appwrite.

## 🌟 Features

- ***Currently Live***
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed/uncompleted
- Filter tasks by All, Completed, or Active
- User authentication and authorization
- ***Coming Soon***
... _(in development)_
- Drag & Reorder tasks
- Offline Support & sync
- Real-time Collaboration

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Appwrite Account](https://appwrite.io/)

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mejaysingh/AdvancedTaskManagement.git
cd AdvancedTaskManagement
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Appwrite

- Sign in to your Appwrite account.
- Create a new project.
- Create a new database collection with the following attributes:
  - userId (String)
  - text (String)
  - completed (Boolean)

### 4. Configure Appwrite Endpoint and Keys

- Copy the `.env.example` file to a new file named `.env` and update the following variables with your Appwrite project details:

```bash
VITE_APPWRITE_URL=https://api.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
```

### 5. Start the Development Server

```bash
npm run dev
```
Visit http://localhost:5173 in your browser to view the app.

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- Sass
- React Hook Form
- React Router
- Vite
- Appwrite

## Folder Structure

- `src`: Contains the source code of the application.
  - `appwrite`: Appwrite service configuration.
  - `components`: Reusable React components.
  - `conf`: Utility functions.
  - `pages`: React components for each page.
  - `store`: Redux store setup with slices.

## License

- This project is licensed under the MIT License - see the LICENSE file for details.

```javascript
Please note that you need to replace `your-project-id`, `your-database-id`, and `your-collection-id` with the actual values from your Appwrite project configuration. Adjust the file structure and other details based on your specific project needs.
```

---

**Happy Learning!** ✨

---

_Made with ☕️ by MeJaysingh_