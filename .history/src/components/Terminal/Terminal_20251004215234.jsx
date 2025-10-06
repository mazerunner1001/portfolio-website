import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = ({ isOpen, onClose, onMinimize, onMaximize, isMaximized }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [location, setLocation] = useState('Varanasi 26°C');
  const [currentTime, setCurrentTime] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // ASCII Art for name
  const nameAscii = [
    ' ██████╗ ██████╗  █████╗ ███╗   ██╗███████╗███████╗████████╗██╗  ██╗',
    ' ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔════╝╚══██╔══╝██║  ██║',
    ' ██████╔╝██████╔╝███████║██╔██╗ ██║█████╗  █████╗     ██║   ███████║',
    ' ██╔═══╝ ██╔══██╗██╔══██║██║╚██╗██║██╔══╝  ██╔══╝     ██║   ██╔══██║',
    ' ██║     ██║  ██║██║  ██║██║ ╚████║███████╗███████╗   ██║   ██║  ██║',
    ' ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝'
  ];

  useEffect(() => {
    // Initialize terminal with welcome message
    setHistory([
      ...nameAscii.map(line => ({ type: 'ascii', content: line })),
      { type: 'output', content: '' },
      { type: 'output', content: "Welcome to Praneeth's Terminal Portfolio" },
      { type: 'output', content: '' },
      { type: 'output', content: "Type '?' or 'help' to view a list of available commands." },
      { type: 'output', content: '' },
      { type: 'prompt', content: 'visitor@praneeth.me:~$' }
    ]);

    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // Prevent body scrolling when terminal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scrolling when terminal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Command descriptions for help system
  const commandDescriptions = {
    'about': 'Display detailed information about Praneeth',
    'skills': 'Show technical skills and expertise',
    'projects': 'List featured projects and work',
    'experience': 'Show professional experience',
    'education': 'Display academic background',
    'contact': 'Get contact information',
    'github': 'Open GitHub profile',
    'linkedin': 'Open LinkedIn profile',
    'resume': 'Download resume',
    'clear': 'Clear the terminal screen',
    'history': 'Show command history',
    'whoami': 'Display current user',
    'date': 'Show current date and time',
    'weather': 'Show weather information',
    'quote': 'Display random inspirational quote',
    'joke': 'Tell a programming joke',
    'matrix': 'Enter the Matrix',
    'exit': 'Close the terminal'
  };

  const commands = {
    '?': (args) => args ? showHelpDetail(args) : showHelp(),
    'help': (args) => args ? showHelpDetail(args) : showHelp(),
    'about': () => [
      'Swarna Praneeth Chandra',
      'Computer Science Student at IIT (BHU) Varanasi',
      'Passionate about AI/ML, Full-stack Development, and Innovation',
      '',
      'CGPA: 8.06/10 | JEE Advanced Rank: 7375',
      'SWE Intern at Trumio Inc | 15+ Key Projects',
      '',
      'Building intelligent solutions that matter.'
    ],
    'skills': () => [
      '🚀 Technical Skills:',
      '',
      'Languages: Python, JavaScript, Java, C++, TypeScript',
      'AI/ML: PyTorch, TensorFlow, BERT, LlamaIndex, RAG',
      'Frontend: React.js, Vue.js, HTML5, CSS3, Tailwind',
      'Backend: Node.js, Spring Boot, FastAPI, Express',
      'Databases: MongoDB, PostgreSQL, Pinecone, Redis',
      'Cloud: AWS, Docker, Kubernetes, Microservices',
      'Tools: Git, VS Code, Figma, Postman, Linux'
    ],
    'projects': () => [
      '💼 Featured Projects:',
      '',
      '1. NOVA - AI-Powered Agentic System',
      '   ├ Multimodal chat with NL-to-MongoDB analytics',
      '   ├ RAG architecture with LlamaIndex & Pinecone',
      '   └ Tech: Python, FastAPI, AI/ML',
      '',
      '2. SHLOKA - Comprehensive Management Platform',
      '   ├ User management with advanced analytics',
      '   ├ Real-time data processing & visualization',
      '   └ Tech: React.js, Node.js, MongoDB',
      '',
      '3. IoT Routing Algorithm',
      '   ├ Smart path optimization for IoT networks',
      '   ├ Reduced latency by 40%',
      '   └ Tech: Python, Graph Algorithms, IoT',
      '',
      'Type \'github\' to see all repositories'
    ],
    'experience': () => [
      '💼 Professional Experience:',
      '',
      'SWE Intern | Trumio Inc (AI & ML Pvt. Ltd.)',
      '📅 May 2025 - July 2025 | Remote',
      '',
      '• Built AI-powered Agentic system with multimodal capabilities',
      '• Implemented NL-to-MongoDB analytics with intelligent memory',
      '• Integrated RAG architecture using LlamaIndex and Pinecone',
      '• Set up MCP (Model Control Protocol) for secure file handling',
      '• Gained expertise in system architecture and scalable design',
      '',
      'Technologies: Python, FastAPI, MongoDB, LlamaIndex, RAG, AI/ML'
    ],
    'education': () => [
      '🎓 Education:',
      '',
      'Indian Institute of Technology (BHU), Varanasi',
      'Bachelor of Technology - Computer Science and Engineering',
      '2022 - 2026 | CGPA: 8.06/10',
      '',
      '🏆 Achievements:',
      '• JEE Advanced 2022: AIR 7375 (Top 1% among 1,50,000)',
      '• JEE MAINS 2022: AIR 2962 (Top 1% among 1,70,000)',
      '• Codeforces Max Rating: 1663',
      '• CodeChef: Worldwide Rank 87 in Starters 200 (2025)',
      '• 2nd Position in ML Forge at Shilp\'25 by CES IIT(BHU)'
    ],
    'contact': () => [
      '📧 Contact Information:',
      '',
      'Email: praneethchandra@iitbhu.ac.in',
      'GitHub: github.com/praneethchandra',
      'LinkedIn: linkedin.com/in/praneethchandra',
      'Portfolio: praneeth.me',
      '',
      '💬 Let\'s connect and build something amazing together!'
    ],
    'github': () => [
      '🐱 GitHub Repositories:',
      '',
      'Opening GitHub profile...',
      '🔗 github.com/praneethchandra'
    ],
    'linkedin': () => [
      '💼 LinkedIn Profile:',
      '',
      'Opening LinkedIn profile...',
      '🔗 linkedin.com/in/praneethchandra'
    ],
    'quote': () => [
      getRandomQuote()
    ],
    'joke': () => [
      getRandomJoke()
    ],
    'matrix': () => {
      setHistory(prev => [...prev, 
        { type: 'input', content: 'matrix' },
        { type: 'output', content: 'Wake up, Neo... 🔴💊' },
        { type: 'output', content: 'The Matrix has you...' },
        { type: 'output', content: 'Follow the white rabbit 🐰' }
      ]);
      startMatrixEffect();
      return [];
    },
    'clear': () => {
      setHistory([{ type: 'prompt', content: 'visitor@praneeth.me:~$' }]);
      return [];
    },
    'whoami': () => ['praneeth'],
    'pwd': () => ['/home/praneeth/portfolio'],
    'ls': () => ['about.txt', 'skills.json', 'projects/', 'experience.pdf', 'contact.vcf', 'dreams.txt'],
    'date': () => [new Date().toString()],
    'uptime': () => ['System uptime: Building amazing things since 2022'],
    'coffee': () => ['☕ Brewing coffee... Essential fuel for coding sessions!'],
    'sudo': () => ['Nice try! 😄 But you don\'t have admin access here.'],
    'exit': () => {
      onClose();
      return ['Goodbye! Thanks for visiting! 👋'];
    }
  };

  const showHelp = () => [
    '📋 Available Commands:',
    '',
    'Personal Info:',
    '  about       - Learn about me',
    '  skills      - Technical skills & expertise',
    '  projects    - Featured projects & work',
    '  experience  - Professional experience',
    '  education   - Academic background',
    '  contact     - Get in touch',
    '',
    'Quick Links:',
    '  github      - View GitHub profile',
    '  linkedin    - View LinkedIn profile',
    '',
    'Fun Commands:',
    '  quote       - Random inspirational quote',
    '  joke        - Programming joke',
    '  matrix      - Enter the Matrix 😎',
    '  coffee      - Brew some coffee ☕',
    '',
    'System Commands:',
    '  clear       - Clear terminal',
    '  whoami      - Current user',
    '  pwd         - Current directory',
    '  ls          - List files',
    '  date        - Current date & time',
    '  uptime      - System uptime',
    '  exit        - Close terminal',
    '',
    'Tip: Use ↑/↓ arrows to navigate command history'
  ];

  const getRandomQuote = () => {
    const quotes = [
      '"The best way to predict the future is to invent it." - Alan Kay',
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
      '"The only way to go fast, is to go well." - Robert C. Martin',
      '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
      '"Innovation distinguishes between a leader and a follower." - Steve Jobs'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const getRandomJoke = () => {
    const jokes = [
      'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
      'How many programmers does it take to change a light bulb? None. That\'s a hardware problem.',
      'Why did the programmer quit his job? He didn\'t get arrays! 😄',
      'There are only 10 types of people: those who understand binary and those who don\'t.',
      'A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?" 🍺',
      '99 little bugs in the code, 99 little bugs... Take one down, patch it around, 117 little bugs in the code!'
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  };

  const startMatrixEffect = () => {
    // Simple matrix effect simulation
    let count = 0;
    const interval = setInterval(() => {
      const chars = '01';
      let line = '';
      for (let i = 0; i < 50; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + ' ';
      }
      setHistory(prev => [...prev, { type: 'matrix', content: line }]);
      count++;
      if (count > 5) {
        clearInterval(interval);
        setTimeout(() => {
          setHistory(prev => [...prev, 
            { type: 'output', content: 'Welcome back to reality.' },
            { type: 'prompt', content: 'visitor@praneeth.me:~$' }
          ]);
        }, 1000);
      }
    }, 200);
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);
    
    if (trimmedCmd === '') {
      setHistory(prev => [...prev, { type: 'prompt', content: 'visitor@praneeth.me:~$' }]);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      if (output && output.length > 0) {
        setHistory(prev => [
          ...prev,
          ...output.map(line => ({ type: 'output', content: line })),
          { type: 'prompt', content: 'visitor@praneeth.me:~$' }
        ]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${cmd}` },
        { type: 'error', content: 'Type \'help\' or \'?\' to see available commands.' },
        { type: 'prompt', content: 'visitor@praneeth.me:~$' }
      ]);
    }

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`terminal-overlay ${isMaximized ? 'maximized' : ''}`}>
      <div className={`terminal-window ${isMaximized ? 'maximized' : ''}`}>
        <div className="terminal-header">
          <div className="terminal-controls">
            <button className="control-btn close" onClick={onClose}>
              <span></span>
            </button>
            <button className="control-btn minimize" onClick={onMinimize}>
              <span></span>
            </button>
            <button className="control-btn maximize" onClick={onMaximize}>
              <span></span>
            </button>
          </div>
          <div className="terminal-title">Praneeth's Terminal</div>
        </div>
        
        <div className="terminal-body" ref={terminalRef}>
          {history.map((item, index) => (
            <div key={index} className={`terminal-line ${item.type}`}>
              {item.type === 'prompt' ? (
                <div className="prompt-line">
                  <span className="prompt">{item.content}</span>
                  {index === history.length - 1 && (
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="terminal-input"
                      autoFocus
                    />
                  )}
                </div>
              ) : (
                <span className={item.type === 'matrix' ? 'matrix-text' : ''}>{item.content}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal;