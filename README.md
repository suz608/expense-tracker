# Expense Tracker

This is simple **Expense Tracker** application built with **Angular V20**, **D3.js** for charting, **AG-Grid** for displaying expenses in a table format, and **Angular Material** to provide modern, responsive UI components.

---

## Table of Content
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
- [Data Storage Options](#data-storage-options)
- [Docker Setup](#docker-setup)
- [License](#license)

---

## Tech Stack

- **Angular V20**: The core framework used to build the application, handling routing, state management, and the overall architecture.
- **D3.js**: A powerful charting library used to create dynamic, interactive visualizations. In this project, it's used for rendering a pie chart based on categorized expenses.
- **AG-Grid**: A highly customizable grid used to display expenses in a tabular format. AG-Grid helps users interact with their data efficiently, supporting features like pagination, sorting, and filtering.
- **Angular Material**: A set of UI components based on Material Design principles, used to enhance the application's look and feel with modern, responsive components such as buttons, icons, and grids.
- **Cloud Services**:
  - **AWS Lambda**: Serverless compute service for running backend code.
  - **AWS API Gateway**: Managed API service to expose RESTful APIs to frontend clients.
  - **AWS DynamoDB**: Managed NoSQL database service for storing and retrieving data at scale.

---

## Features

- **Expense Grid**: Displays a table of expenses with columns for date, amount, and category.
- **Pie Chart**: A dynamic D3.js pie chart visualizing the total expenses per category (e.g., Food, Housing, Health, etc.).
- **Pluggable Data Storage**: Supports two storage options:
  - **Local Storage**: Expenses are saved locally in the browser, with real-time updates via the storage event.
  - **AWS DynamoDB**: Expenses are stored in a remote DynamoDB database via a REST API.
- **Responsive Design**: The app is fully responsive, leveraging Angular Material and SASS to ensure it looks good on both desktop and mobile devices.

---

## Setup
### Prerequisites
To get started, make sure you have the following installed:
- npm
- node.js

### 1. Clone the Repository

```bash
git clone https://github.com/suz608/expense-tracker.git
cd expense-tracker
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Serve the Application

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Data Storage Options
Two data storage options are available: **Local Storage** or **AWS DynamoDB**.
- For Local Storage: Replace the import statement `import { ExpenseService } from '../shared/expenses';` with `import { ExpenseLocalService } from '../shared/expenses-local';` in all relevant files.
- For AWS DynamoDB: Create a new file at `./src/environments/environment.ts` and add the following configuration:

```bash
export const environment = {
  production: true,
  apiUrl: '<DynamoDB-API-URL>',
};
```

### 4. Build the Application

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Docker Setup
Follow these steps to build and run the app in a Docker container.
### 1. Build the Docker Image
From the root of the project, where your Dockerfile is located, run the following command:
```bash
docker build -t expense-tracker .
```
### 2. Run the Docker Container
After the image is successfully built, you can run the container with:
```bash
docker run -p 8080:80 expense-tracker
```
This will run the application in the container and map the container’s port 80 to your local port 8080.

Now, you should be able to access the app in your browser at http://localhost:8080.
### 3. Clean Up Docker Containers and Images (Optional)
If you need to remove the container or image, you can use the following commands:
Stop the container:
```bash
docker stop <container-id>
```
Remove the container:
```bash
docker rm <container-id>
```
Remove the image:
```bash
docker rmi expense-tracker
```

## License
This project is licensed under the MIT License.
