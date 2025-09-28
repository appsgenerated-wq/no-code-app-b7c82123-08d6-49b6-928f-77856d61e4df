# FoodApp - Restaurant Management

This is a full-stack React application built with a Manifest backend. It allows chefs to sign up, create their restaurants, and manage their menu items in a secure, authenticated environment.

## Features

- **Chef Authentication**: Secure sign-up and login for chefs.
- **Restaurant Management**: Create and view your own restaurants.
- **Menu Management**: Add and view menu items for each of your restaurants.
- **Secure by Design**: Each chef can only access and modify their own data.
- **Admin Panel**: A built-in admin interface to manage all users, restaurants, and data.

## Backend (Manifest)

The backend is defined in `manifest.yml` and includes three main entities:

- **User**: An authenticable entity representing chefs and admins.
- **Restaurant**: Belongs to a User (owner) and contains details like name, cuisine, and an image.
- **MenuItem**: Belongs to a Restaurant and a User (for ownership policies), containing details like name, price, and category.

Policies are configured to ensure that users can only manage their own resources.

## Frontend (React)

The frontend is a single-page application built with React and Vite. It uses Tailwind CSS for styling and communicates with the backend exclusively through the `@mnfst/sdk`.

- `App.jsx`: The main component that handles state management, authentication, and data fetching.
- `screens/LandingPage.jsx`: A public-facing marketing page with a demo login.
- `screens/DashboardPage.jsx`: The private, authenticated area where chefs manage their restaurants and menus.

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Manifest backend deployment.

### Installation & Setup

1.  **Clone the repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the project and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=your-manifest-backend-url
    VITE_APP_ID=your-manifest-app-id
    ```
4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Accessing the Admin Panel

You can access the auto-generated admin panel at `your-manifest-backend-url/admin`.

-   **Default Admin Email**: `admin@manifest.build`
-   **Default Admin Password**: `admin`
