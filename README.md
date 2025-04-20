# BizConnect - Business Networking Platform

## What is the project about?
BizConnect is a comprehensive business networking platform that bridges the gap between various stakeholders in the business ecosystem - entrepreneurs, investors, bankers, and business advisors. It serves as a centralized platform where business ideas can be shared, loans can be offered, investment proposals can be made, and professional advice can be sought.

## What does it do?
The platform offers different functionalities based on user roles:

1. **For Business People**:
   - Post and manage business ideas
   - View available loans
   - Submit investment proposals
   - Ask business-related queries
   - View expert solutions

2. **For Investors**:
   - Browse business ideas
   - Post investment proposals
   - View loan opportunities
   - Contact potential business partners

3. **For Bankers**:
   - Post loan offerings
   - Manage loan proposals
   - Track interested applicants
   - View business proposals

4. **For Business Advisors**:
   - View business queries
   - Provide expert solutions
   - Offer professional guidance

## How does it help in real-life?
BizConnect addresses several real-world challenges:

1. **Funding Access**: Makes it easier for entrepreneurs to find suitable funding options through loans or investments
2. **Expert Guidance**: Provides direct access to business advisors for professional consultation
3. **Networking**: Creates a dedicated space for business networking and collaboration
4. **Resource Matching**: Efficiently matches business ideas with potential investors
5. **Market Visibility**: Gives visibility to both business ideas and investment opportunities
6. **Time Efficiency**: Streamlines the process of finding business partners, loans, or investors

## Tech Stack

### Frontend:
- React.js with Vite as build tool
- Ant Design (antd) for UI components
- React Router for navigation
- Context API for state management

### Backend:
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- bcrypt for password hashing

## APIs
The platform includes several RESTful APIs:

1. **User Management**:
   - Registration (/user/register)
   - Login (/user/login)
   - Profile management (/user/profile)

2. **Business Ideas**:
   - Create/Read/Update/Delete ideas
   - Filter and search functionality

3. **Loan Management**:
   - Post loan offers
   - Track loan applications
   - Interest management

4. **Proposal System**:
   - Investment proposals
   - Proposal tracking
   - Proposal updates

5. **Query System**:
   - Post business queries
   - Solution management
   - Expert responses

## Frameworks and Libraries

### Frontend Dependencies:
- React (UI library)
- React Router DOM (routing)
- Ant Design (UI components)
- Lottie-react (animations)

### Backend Dependencies:
- Express.js (web framework)
- Mongoose (MongoDB ODM)
- JWT (authentication)
- bcrypt (password hashing)
- cors (Cross-Origin Resource Sharing)
- dotenv (environment variables)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```
3. Set up environment variables:
   - Create .env file in server directory
   - Add MONGO_URL, SECRET, and HOST_ADDRESS

4. Run the application:
   ```bash
   # Start backend server
   cd server
   npm start

   # Start frontend development server
   cd client
   npm run dev
   ```

## Security Features
- JWT-based authentication
- Password hashing
- Protected routes
- Role-based access control
- Secure API endpoints