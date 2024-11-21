# **Weight Loss Accountability App**

An engaging and user-friendly application to track and encourage weekly weight loss for a small group. Built with **SvelteKit 2**, **Svelte 5**, **Skeleton UI**, **Tailwind CSS**, and **Firebase**, the app ensures an inviting atmosphere with vibrant design, motivational features, and seamless functionality.

---

## **Features**
- **Data Tracking**: Allows users to input weekly weight data and calculates individual and group progress.
- **Visualizations**: Trend graphs for individual and group progress, weekly weight changes, and rankings.
- **Community Motivation**: Weekly summaries, motivational messages, and top achievers showcased dynamically.
- **Joyful Design**: Vibrant, responsive layout to create a welcoming user experience.

---

## **Setup and Installation**

Follow these steps to set up and run the project on your local machine:

### **Prerequisites**
- **Node.js** (v16 or later) installed on your system.
- **Yarn/Npm** package manager installed.
- A **Firebase account** with access to the Firebase Console.

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone [repository-url](https://github.com/mikenath223/weightloss-app)
   cd weightloss-app

2. ## Install Dependencies
------------------------

Install the required Node.js dependencies using Yarn:

```bash
yarn install
```

3. ## Configure Firebase
----------------------

3.1. ### Create a New Project

Create a new project in [Firebase Console](https://console.firebase.google.com/).

3.2. ### Enable Firestore Database

Enable **Firestore Database** (in **test mode** for development).

3.3. ### Generate Firebase Configuration

1. Navigate to **Project Settings** > **General** > **Your apps** > **SDK setup and configuration**.
2. Copy the Firebase config object (e.g., `apiKey`, `authDomain`, etc.).

3.4. ### Add Firebase Configuration to Environment Variables

- Create a `.env` file in the root directory:

```bash
touch .env
```

- Add the following to `.env`:

```bash
VITE_API_KEY=<your-api-key>
VITE_AUTH_DOMAIN=<your-auth-domain>
VITE_PROJECT_ID=<your-project-id>
VITE_STORAGE_BUCKET=<your-storage-bucket>
VITE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
VITE_APP_ID=<your-app-id>
```

4. ## Run the Development Server
-----------------------------

4.1. Start the app locally:

```bash
yarn dev --open
```

4.2.Open your browser at [http://localhost:5173](http://localhost:5173).

5. ## Build for Production
-------------------------

Create a production-ready build:

```bash
yarn build
```

Preview the build:

```bash
yarn preview
```

6. # Firebase and Mock Data
==========================

## Mock Data Source

The mock data used in this application can be found [here](https://example.com/mock-data). This data is automatically uploaded to Firebase on the first load after a successful Firebase configuration.

### Automatic Upload

You do not need to manually upload the data. On first load, the app detects if the `weeklyData` collection is empty and populates it with mock data.

### Mock Data Example

```json
{
  "2-Oct-2024": {
    "Michael": 90.1,
    "Paul": null,
    "Katie": null,
    "Steve": 97,
    "Rob": null,
    "Suzette": null
  },
  ...
}
```

7. # Scripts
==========

| **Script**                | **Description**                                                      |
|----------------------------|----------------------------------------------------------------------|
| `yarn dev`                | Starts the development server.                                      |
| `yarn build`              | Builds the app for production.                                      |
| `yarn preview`            | Previews the production build locally.                              |
| `yarn format`             | Formats code using Prettier.                                        |
| `yarn lint`               | Lints the codebase using ESLint and Prettier.                       |
| `yarn check`              | Runs `svelte-check` to verify TypeScript and Svelte correctness.    |

# Author
=======

**Michgolden Ukeje**  [LinkedIn Profile](https://www.linkedin.com/in/michgoldenukeje/)  

# Relevant Notes
================

* **First-Time Data Setup**: Mock data is auto-populated on Firebase during the first app load. Ensure Firebase is configured before starting the app.
* **Tailwind CSS**: Tailwind utilities are used extensively for styling. Modify `tailwind.config.js` to adjust the design.
* **Chart.js**: The app leverages `Chart.js` for all visualizations. Refer to the [Chart.js documentation](https://www.chartjs.org/docs/latest/) for further customization.

# Enjoy Tracking and Progressing!
==================================

The app is designed to motivate and create a delightful experience. Let’s achieve those goals together! 🎉
