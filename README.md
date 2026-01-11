# API TestGen UI

A premium React-based dashboard for the Automated API Test Generator. Effortlessly transform OpenAPI specifications into high-quality, deterministic test suites with a focus on visual clarity and user control.

![UI Mockup](https://raw.githubusercontent.com/RishabhSinha07/Automated-API-Testing-UI/main/public/mockup_placeholder.png)

## Features

- **Live Spec Validation**: Drag and drop your OpenAPI files and get instant feedback on schema correctness.
- **Smart Repo Integration**: Connect to your local test repository using a native macOS file picker.
- **Interactive Diff Explorer**: Review which tests will be Created, Updated, or Skipped before application.
- **Automatic Negative Testing**: Toggleable generation of industrial-grade negative test cases for schema violations.
- **Advanced Result Filtering**: Quickly find tests by method, path, or mutation status (Positive vs Negative).
- **In-Browser Code Preview**: Instant syntax-highlighted preview of generated Python test files.

## Getting Started

### 1. Prerequisites
Ensure you have the [Backend Service](https://github.com/RishabhSinha07/Automated-API-Testing) running.

```bash
# In the backend repo
export PYTHONPATH=$PYTHONPATH:$(pwd)/src
python3 -m api_test_gen.server
```

### 2. Setup the UI
```bash
# Clone the UI repository
git clone <ui-repo-url>
cd Automated-API-Testing-UI

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The UI will be available at `http://localhost:5173`.

## Configuration

- **API Base URL**: Override the production server URL for your test environment.
- **Security Tokens**: Securely inject Bearer tokens or API Keys into generated test clients.
- **Negative Tests Toggle**: Enable/Disable mutation-based testing for all validation schemas.

## Tech Stack
- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Design**: Glassmorphism & High-Contrast Dark Mode

---
Developed with ❤️ by the API TestGen Team
