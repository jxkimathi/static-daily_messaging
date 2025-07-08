# Daily Messaging App

A special application that displays daily messages in a beautiful, interactive interface. Perfect for sending scheduled messages or creating a countdown of special messages for birthdays, anniversaries, or other celebrations.

## 🌟 Features

- **Daily Messages**: Displays a new message each day based on a predefined schedule
- **Interactive 3D UI**: Desktop view features floating text elements with 3D hover effects
- **Mobile Responsive**: Adapts to different screen sizes with a mobile-optimized view
- **Message Archive**: View all past messages in chronological order
- **Smooth Animations**: Beautiful transitions and scroll effects

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS3 with animations
- **Backend**: Node.js, Express
- **Data Storage**: JSON file-based storage for easy deployment
- **Deployment**: Compatible with Vercel for simple hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jxkimathi/daily-messaging-app.git
   cd daily-messaging-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

#### Development Mode

Run both the backend and frontend in development mode:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

#### Production Build

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:5000

## 📝 Customizing Messages

Messages are stored in `backend/models/Message.js`. To customize the messages:

1. Open the `Message.js` file
2. Modify the `getDefaultMessages()` function to include your own messages
3. Each message should have:
   - `_id`: Unique identifier
   - `text`: The message content
   - `order`: Sequence number (starting from 0)

Example:
```javascript
getDefaultMessages() {
  return [
    { 
      _id: "1", 
      text: "Your custom message for day 1", 
      order: 0 
    },
    // Add more messages here
  ];
}
```

## 📱 Deployment

### Vercel Deployment

This application is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy your application

## 📐 Project Structure

```
daily-messaging-app/
├── api/               # API routes for serverless deployment
├── backend/           # Backend server code
│   ├── data/          # Data storage
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   └── server.js      # Server entry point
├── frontend/          # React frontend
│   ├── public/        # Static assets
│   └── src/           # React components and logic
│       ├── assets/    # Frontend assets
│       ├── App.css    # Main styles
│       ├── 3d-effect.css # 3D effect styles
│       └── FixedApp.jsx  # Main application component
└── package.json       # Project configuration
```

## 📋 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- This project was inspired by the desire to create a personal and meaningful way to celebrate special occasions.
- Special thanks to all contributors and testers who helped make this application better.
