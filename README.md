<svg width="1200" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    
  
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="300" fill="url(#bgGradient)"/>
  
  <!-- Code pattern overlay -->
  <rect width="1200" height="300" fill="url(#codePattern)"/>
  
  <!-- Decorative code brackets on left -->
  <text x="80" y="100" font-family="'Courier New', monospace" font-size="120" font-weight="bold" fill="#ffffff" opacity="0.15">&lt;</text>
  <text x="80" y="240" font-family="'Courier New', monospace" font-size="120" font-weight="bold" fill="#ffffff" opacity="0.15">/</text>
  
  <!-- Decorative code brackets on right -->
  <text x="1050" y="100" font-family="'Courier New', monospace" font-size="120" font-weight="bold" fill="#ffffff" opacity="0.15">/</text>
  <text x="1050" y="240" font-family="'Courier New', monospace" font-size="120" font-weight="bold" fill="#ffffff" opacity="0.15">&gt;</text>
  
  <!-- Main title - KS CODE -->
  <text x="600" y="140" font-family="'Arial', 'Helvetica', sans-serif" font-size="90" font-weight="bold" fill="url(#textGradient)" text-anchor="middle" letter-spacing="8">
    KS CODE
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="190" font-family="'Arial', 'Helvetica', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle" opacity="0.95" letter-spacing="3">
    ONLINE CODE COLLABORATION PLATFORM
  </text>
  
  <!-- Decorative line under subtitle -->
  <line x1="400" y1="210" x2="800" y2="210" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
  
  <!-- Feature highlights -->
  <text x="350" y="250" font-family="'Arial', 'Helvetica', sans-serif" font-size="16" fill="#e0e7ff" text-anchor="middle" opacity="0.9">
    Real-time Collaboration
  </text>
  <text x="600" y="250" font-family="'Arial', 'Helvetica', sans-serif" font-size="16" fill="#e0e7ff" text-anchor="middle" opacity="0.9">
    Multi-User Editing
  </text>
  <text x="850" y="250" font-family="'Arial', 'Helvetica', sans-serif" font-size="16" fill="#e0e7ff" text-anchor="middle" opacity="0.9">
    Instant Sync
  </text>
  
  <!-- Small decorative dots -->
  <circle cx="520" y="245" r="3" fill="#ffffff" opacity="0.7"/>
  <circle cx="730" y="245" r="3" fill="#ffffff" opacity="0.7"/>
</svg>



# KS Code - Online Code Collaboration Platform

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://ks-code.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-93.9%25-yellow)](https://github.com/Krishna41357/ks_code-online-code-collaboration-platform)

A real-time collaborative code editor that enables developers to write, share, and edit code together seamlessly. Built for pair programming, technical interviews, code reviews, and remote team collaboration.

## 🌟 Features

### Real-Time Collaboration
- **Live Code Synchronization** - See changes as teammates type in real-time
- **Multi-User Support** - Multiple developers can work on the same codebase simultaneously
- **Cursor Tracking** - View collaborators' cursor positions and selections
- **Instant Updates** - All changes are synced instantly across all connected clients

### Code Editor
- **Syntax Highlighting** - Support for multiple programming languages
- **Monaco Editor Integration** - Powered by the same editor as VS Code
- **Auto-completion** - Intelligent code suggestions
- **Theme Support** - Choose from light and dark themes

### Collaboration Tools
- **Room-Based System** - Create or join coding rooms with unique IDs
- **User Identification** - Set custom usernames to identify collaborators
- **Session Management** - Persistent sessions for ongoing projects
- **Share Links** - Easy sharing with just a room ID

### Developer-Friendly
- **No Sign-Up Required** - Start coding immediately
- **Clean Interface** - Intuitive and distraction-free design
- **Responsive Design** - Works seamlessly on desktop and tablet devices
- **Fast Performance** - Optimized for smooth real-time collaboration

## 🚀 Live Demo

Try it out: [https://ks-code.vercel.app](https://ks-code.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive interfaces
- **HTML5 & CSS3** - Modern web standards
- **Monaco Editor** - Advanced code editing capabilities
- **Socket.IO Client** - Real-time bidirectional communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.IO** - WebSocket library for real-time features
- **CORS** - Cross-origin resource sharing support

### Deployment
- **Vercel** - Frontend and backend hosting
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/Krishna41357/ks_code-online-code-collaboration-platform.git
cd ks_code-online-code-collaboration-platform
```

### Install Dependencies

#### For the Client
```bash
cd client
npm install
```

#### For the Server
```bash
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
```

Create a `.env` file in the client directory:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 🎯 Usage

### Start the Development Server

#### Terminal 1 - Start Backend
```bash
cd server
npm start
```

#### Terminal 2 - Start Frontend
```bash
cd client
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### Using the Platform

1. **Create a Room**
   - Enter a unique room ID
   - Set your username
   - Click "Join Room"

2. **Invite Collaborators**
   - Share the room ID with teammates
   - They can join using the same room ID

3. **Start Coding**
   - Write code in the editor
   - See real-time updates from collaborators
   - Track cursor positions and edits

4. **Collaborate**
   - Multiple users can edit simultaneously
   - All changes sync automatically
   - No conflicts or overwriting

## 🏗️ Project Structure

```
ks_code-online-code-collaboration-platform/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── socket/        # Socket.IO client setup
│   │   └── App.js         # Main application component
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js backend application
│   ├── index.js           # Express server entry point
│   ├── socket.js          # Socket.IO event handlers
│   └── package.json       # Backend dependencies
│
├── frontend/              # Additional frontend assets
└── .gitignore            # Git ignore rules
```

## 🔧 Configuration

### Socket.IO Configuration

The server uses Socket.IO for real-time communication. Key events include:

- `join-room` - User joins a coding room
- `code-change` - Code editor content changes
- `cursor-position` - Cursor position updates
- `user-joined` - New user notification
- `user-left` - User disconnection notification

### CORS Setup

The server is configured to accept connections from the frontend origin. Update CORS settings in `server/index.js` if needed:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
```

## 🤝 Use Cases

- **Pair Programming** - Collaborate with teammates on the same code
- **Technical Interviews** - Conduct live coding interviews
- **Code Reviews** - Review code together in real-time
- **Teaching & Learning** - Teach programming concepts interactively
- **Hackathons** - Quick collaboration without setup
- **Debugging Sessions** - Troubleshoot issues together
- **Remote Teams** - Seamless distributed development

## 🔐 Security Considerations

- Room IDs provide basic access control
- No persistent data storage (privacy-focused)
- Sessions are temporary and in-memory
- No authentication required for quick access
- HTTPS in production (via Vercel)

## 🚧 Roadmap

- [ ] Language-specific syntax highlighting improvements
- [ ] File upload and download functionality
- [ ] Integrated terminal for code execution
- [ ] Voice and video chat integration
- [ ] Code execution and output preview
- [ ] Multiple file support
- [ ] User authentication (optional)
- [ ] Room password protection
- [ ] Code history and version control
- [ ] Whiteboard for visual collaboration
- [ ] Mobile app support

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure backward compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Krishna**
- GitHub: [@Krishna41357](https://github.com/Krishna41357)
- Website: [ks-code.vercel.app](https://ks-code.vercel.app)

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor component
- [Socket.IO](https://socket.io/) - Real-time communication library
- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📧 Support

If you encounter any issues or have questions:

1. Check existing [Issues](https://github.com/Krishna41357/ks_code-online-code-collaboration-platform/issues)
2. Create a new issue with detailed information
3. Reach out via GitHub Discussions

## ⭐ Show Your Support

If you find this project helpful, please consider giving it a star on GitHub!

---

<div align="center">
  <strong>Built with ❤️ for developers, by developers</strong>
  <br>
  <sub>Making remote collaboration seamless</sub>
</div>
