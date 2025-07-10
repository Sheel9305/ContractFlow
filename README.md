# ContractFlow – Full Stack Contract Lifecycle Manager

A full-stack web application for managing contracts, associated points, and invoice summaries. Built using React, Redux Toolkit, Flask, PostgreSQL, Cypress, and Postman-tested REST APIs.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit, Material UI, Axios  
- **Backend**: Flask, Python, PostgreSQL  
- **Testing**: Cypress (UI), Postman (API)  
- **State Management**: Redux (slices for auth, contracts, points)

---

## 🔧 Features

- 🔐 Admin login/logout (`admin` / `pass@123`)  
- 📋 CRUD operations for Contracts & Points  
- 📊 Invoice summary per contract  
- 🧪 End-to-end UI tests with Cypress  
- 📮 REST API tests via Postman  
- 🔒 Protected routes with `PrivateRoute` and Redux auth

---

## 📁 Project Structure

```bash
/Backend/        # Flask API backend
/src/            # React frontend with Redux slices
/cypress/        # Cypress E2E test cases
/public/         # Static files and favicon
README.md        # Project overview and usage instructions


---

## 🛠️ Getting Started

### ⚙️ 1. Clone the Repository

```bash
git clone https://github.com/Sheel9305/ContractFlow.git
cd ContractFlow

cd Backend
pip install -r requirements.txt
python app.py
Ensure PostgreSQL is installed and your connection is configured in db/connection.py.
Backend runs on: http://127.0.0.1:5000

cd src
npm install
npm start
Frontend runs on: http://localhost:3000

**Cypress Testing** 
npx cypress open

