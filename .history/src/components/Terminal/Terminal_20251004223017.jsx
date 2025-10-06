import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = ({ isOpen, onClose, onMinimize, onMaximize, isMaximized, isMinimized, minimizedPosition, onMinimizedDrag, previousWindowState, onWindowStateUpdate }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [windowPosition, setWindowPosition] = useState(previousWindowState?.position || { x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState(previousWindowState?.size || { width: 800, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const headerRef = useRef(null);
  const windowRef = useRef(null);
  const minimizedRef = useRef(null);
  const showHelpDetail = (command) => {
    const helpDetails = {
      'about': {
        description: 'Display detailed information about Praneeth',
        usage: 'about',
        example: 'about'
      },
      'age': {
        description: 'Calculate and display current age',
        usage: 'age',
        example: 'age'
      },
      'clear': {
        description: 'Clear all terminal output and reset screen',
        usage: 'clear',
        example: 'clear'
      },
      'contact': {
        description: 'Display contact information and social links',
        usage: 'contact',
        example: 'contact'
      },
      'date': {
        description: 'Show current date and time',
        usage: 'date [format]',
        example: 'date'
      },
      'weather': {
        description: 'Display current weather information',
        usage: 'weather [location]',
        example: 'weather varanasi'
      },
      'github': {
        description: 'Open GitHub profile in new tab',
        usage: 'github',
        example: 'github'
      },
      'help': {
        description: 'Show help information for commands',
        usage: 'help [command]',
        example: 'help about'
      },
      'history': {
        description: 'Display command history',
        usage: 'history',
        example: 'history'
      },
      'matrix': {
        description: 'Activate Matrix-style digital rain effect',
        usage: 'matrix',
        example: 'matrix'
      },
      'projects': {
        description: 'List featured projects and work',
        usage: 'projects',
        example: 'projects'
      },
      'quote': {
        description: 'Display a random inspirational quote',
        usage: 'quote',
        example: 'quote'
      },
      'whoami': {
        description: 'Display current user information',
        usage: 'whoami',
        example: 'whoami'
      }
    };

    if (helpDetails[command]) {
      const detail = helpDetails[command];
      return [
        { type: 'help-header', content: `📖 Help: ${command}` },
        { type: 'output', content: '' },
        { type: 'output', content: `Description: ${detail.description}` },
        { type: 'output', content: `Usage: ${detail.usage}` },
        { type: 'output', content: `Example: ${detail.example}` }
      ];
    } else if (commandDescriptions[command]) {
      return [
        { type: 'help-header', content: `📖 Help: ${command}` },
        { type: 'output', content: '' },
        { type: 'output', content: `Description: ${commandDescriptions[command]}` },
        { type: 'output', content: `Usage: ${command}` },
        { type: 'output', content: `Example: ${command}` }
      ];
    } else {
      return [
        { type: 'error', content: `Command '${command}' not found. Type 'help' to see all available commands.` }
      ];
    }
  };

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [location, setLocation] = useState('Varanasi 26°C');
  const [currentTime, setCurrentTime] = useState('');

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
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore body scrolling when terminal is closed
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup function to restore scrolling on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Mouse event handlers for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setWindowPosition({ x: newX, y: newY });
      }
      
      if (isResizing && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(400, resizeStart.width + deltaX);
        const newHeight = Math.max(300, resizeStart.height + deltaY);
        setWindowSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, isMaximized]);

  // Minimized bubble drag handlers
  useEffect(() => {
    const handleMinimizedMouseMove = (e) => {
      if (isMinimized && dragOffset.x !== 0) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onMinimizedDrag({ x: newX, y: newY });
      }
    };

    const handleMinimizedMouseUp = () => {
      setDragOffset({ x: 0, y: 0 });
    };

    if (isMinimized && dragOffset.x !== 0) {
      document.addEventListener('mousemove', handleMinimizedMouseMove);
      document.addEventListener('mouseup', handleMinimizedMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMinimizedMouseMove);
      document.removeEventListener('mouseup', handleMinimizedMouseUp);
    };
  }, [isMinimized, dragOffset, onMinimizedDrag]);

  // Update parent component when window state changes
  useEffect(() => {
    if (onWindowStateUpdate) {
      onWindowStateUpdate({
        isMaximized,
        position: windowPosition,
        size: windowSize
      });
    }
  }, [isMaximized, windowPosition, windowSize, onWindowStateUpdate]);

  // Restore previous window state when opening from minimized
  useEffect(() => {
    if (isOpen && previousWindowState && !isMinimized) {
      setWindowPosition(previousWindowState.position);
      setWindowSize(previousWindowState.size);
    }
  }, [isOpen, isMinimized, previousWindowState]);

  const handleHeaderMouseDown = (e) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - windowPosition.x, y: e.clientY - windowPosition.y });
    }
  };

  const handleResizeMouseDown = (e) => {
    if (!isMaximized) {
      e.preventDefault();
      setIsResizing(true);
      setResizeStart({ 
        x: e.clientX, 
        y: e.clientY, 
        width: windowSize.width, 
        height: windowSize.height 
      });
    }
  };

  const handleMinimizedMouseDown = (e) => {
    if (isMinimized) {
      const rect = minimizedRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleClose = () => {
    setHistory([]); // Clear history when closing
    onClose();
  };

  // Command descriptions for help system
  const commandDescriptions = {
    'abhinav': 'Display information about Abhinav (alias for about)',
    'about': 'Display detailed information about Praneeth',
    'age': 'Show current age',
    'antonym': 'Find antonyms for a given word',
    'ascii': 'Display ASCII art',
    'asciiqr': 'Generate ASCII QR code',
    'base64': 'Encode/decode base64 text',
    'calendar': 'Display calendar',
    'capitalize': 'Capitalize text',
    'clear': 'Clear the terminal screen',
    'coin': 'Flip a coin',
    'commands': 'List all available commands',
    'contact': 'Get contact information',
    'countdays': 'Count days between dates',
    'country': 'Get country information',
    'curl': 'Make HTTP requests',
    'date': 'Show current date and time',
    'define': 'Define a word',
    'dice': 'Roll a dice',
    'dnslookup': 'Perform DNS lookup',
    'emoji': 'Search and display emojis',
    'geo': 'Get geographical information',
    'github': 'Open GitHub profile',
    'hash': 'Generate hash of text',
    'help': 'Show command help',
    'history': 'Show command history',
    'ip': 'Show IP address information',
    'json': 'Format and validate JSON',
    'lowercase': 'Convert text to lowercase',
    'matrix': 'Enter the Matrix',
    'ping': 'Ping a host',
    'projects': 'List featured projects and work',
    'qr': 'Generate QR code',
    'quote': 'Display random inspirational quote',
    'remind': 'Set a reminder',
    'reset': 'Reset terminal state',
    'reverse': 'Reverse text',
    'rps': 'Play rock paper scissors',
    'set': 'Set environment variables',
    'shorten': 'Shorten URLs',
    'shutdown': 'Shutdown the terminal',
    'social': 'Show social media links',
    'stock': 'Get stock information',
    'stopwatch': 'Terminal stopwatch',
    'synonym': 'Find synonyms for a word',
    'sysinfo': 'Display system information',
    'theme': 'Change terminal theme',
    'time': 'Show current time',
    'timer': 'Set a timer',
    'translate': 'Translate text',
    'ttt': 'Play tic-tac-toe',
    'uppercase': 'Convert text to uppercase',
    'uptime': 'Show system uptime',
    'username': 'Display current username',
    'uuid': 'Generate UUID',
    'weather': 'Show weather information',
    'whoami': 'Display current user'
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
      '   └ Tech: Python, Graph Algorithms, IoT'
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
      '• Gained expertise in system architecture and scalable design'
    ],
    'education': () => [
      '🎓 Education:',
      '',
      'Indian Institute of Technology (BHU), Varanasi',
      'Bachelor of Technology - Computer Science and Engineering',
      '2022 - 2026 | CGPA: 8.06/10',
      '',
      '🏆 Achievements:',
      '• JEE Advanced 2022: AIR 7375 (Top 1%)',
      '• JEE MAINS 2022: AIR 2962 (Top 1%)',
      '• Codeforces Max Rating: 1663',
      '• CodeChef: Worldwide Rank 87 in Starters 200 (2025)'
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
    'github': () => ['� Opening GitHub profile...', 'github.com/praneethchandra'],
    'linkedin': () => ['� Opening LinkedIn profile...', 'linkedin.com/in/praneethchandra'],
    'resume': () => ['📄 Opening resume...'],
    'clear': () => {
      setHistory([
        ...nameAscii.map(line => ({ type: 'ascii', content: line })),
        { type: 'output', content: '' },
        { type: 'prompt', content: 'visitor@praneeth.me:~$' }
      ]);
      return [];
    },
    'history': () => commandHistory.length > 0 ? commandHistory.map((cmd, i) => `${i + 1}: ${cmd}`) : ['No commands in history'],
    'whoami': () => ['praneeth'],
    'date': () => [new Date().toString()],
    'weather': () => ['🌤️ Varanasi: 26°C, Clear sky'],
    'quote': () => [getRandomQuote()],
    'joke': () => [getRandomJoke()],
    'matrix': () => {
      startMatrixEffect();
      return ['Wake up, Neo... 🔴💊', 'The Matrix has you...', 'Follow the white rabbit 🐰'];
    },
    // Additional commands from the image
    'abhinav': () => commands.about(), // Alias for about
    'age': () => ['Current age: 21 years old (Born in 2003)'],
    'antonym': (word) => word ? [`Antonym lookup for "${word}": Feature coming soon!`] : ['Usage: antonym <word>'],
    'ascii': () => [...nameAscii.map(line => ({ type: 'ascii', content: line }))],
    'asciiqr': () => ['ASCII QR Code generator - Feature coming soon!'],
    'base64': (text) => text ? [`Base64: ${btoa(text)}`] : ['Usage: base64 <text>'],
    'calendar': () => [new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
    'capitalize': (text) => text ? [text.toUpperCase()] : ['Usage: capitalize <text>'],
    'coin': () => [Math.random() > 0.5 ? '🪙 Heads!' : '🪙 Tails!'],
    'commands': () => Object.keys(commands).filter(cmd => cmd !== '?' && cmd !== 'help'),
    'countdays': () => ['Day counter - Feature coming soon!'],
    'country': () => ['🇮🇳 India - Current location'],
    'curl': (url) => url ? [`Simulated curl request to ${url} - Feature coming soon!`] : ['Usage: curl <url>'],
    'define': (word) => word ? [`Definition of "${word}": Feature coming soon!`] : ['Usage: define <word>'],
    'dice': () => [`🎲 Rolled: ${Math.floor(Math.random() * 6) + 1}`],
    'dnslookup': (domain) => domain ? [`DNS lookup for ${domain} - Feature coming soon!`] : ['Usage: dnslookup <domain>'],
    'emoji': (search) => search ? [`Emoji search for "${search}" - 😀 🎉 ✨`] : ['Usage: emoji <search>'],
    'geo': () => ['📍 Location: Varanasi, Uttar Pradesh, India'],
    'hash': (text) => text ? [`Hash: ${text.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) & 0xffffffff, 0)}`] : ['Usage: hash <text>'],
    'ip': () => ['IP Information: Feature coming soon!'],
    'json': (data) => data ? [`JSON: ${JSON.stringify(data, null, 2)}`] : ['Usage: json <data>'],
    'lowercase': (text) => text ? [text.toLowerCase()] : ['Usage: lowercase <text>'],
    'ping': (host) => host ? [`PING ${host}: Feature coming soon!`] : ['Usage: ping <host>'],
    'qr': (text) => text ? [`QR Code for "${text}" - Feature coming soon!`] : ['Usage: qr <text>'],
    'remind': (reminder) => reminder ? [`Reminder set: ${reminder}`] : ['Usage: remind <message>'],
    'reset': () => {
      setHistory([]);
      setCommandHistory([]);
      return ['Terminal reset complete!'];
    },
    'reverse': (text) => text ? [text.split('').reverse().join('')] : ['Usage: reverse <text>'],
    'rps': () => {
      const choices = ['🪨 Rock', '📄 Paper', '✂️ Scissors'];
      return [`Computer chose: ${choices[Math.floor(Math.random() * choices.length)]}`];
    },
    'set': (variable) => variable ? [`Environment variable "${variable}" set`] : ['Usage: set <variable=value>'],
    'shorten': (url) => url ? [`Shortened URL for ${url} - Feature coming soon!`] : ['Usage: shorten <url>'],
    'shutdown': () => {
      setTimeout(() => onClose(), 2000);
      return ['Shutting down terminal... 👋'];
    },
    'social': () => [
      '🌐 Social Media Links:',
      '├ GitHub: github.com/praneethchandra',
      '├ LinkedIn: linkedin.com/in/praneethchandra',
      '├ Twitter: @praneethchandra',
      '└ Instagram: @praneeth.chandra'
    ],
    'stock': (symbol) => symbol ? [`Stock info for ${symbol.toUpperCase()} - Feature coming soon!`] : ['Usage: stock <symbol>'],
    'stopwatch': () => ['⏱️ Stopwatch started! (Feature coming soon)'],
    'synonym': (word) => word ? [`Synonym lookup for "${word}": Feature coming soon!`] : ['Usage: synonym <word>'],
    'sysinfo': () => [
      '💻 System Information:',
      '├ OS: Terminal Portfolio v1.0',
      '├ Browser: ' + navigator.userAgent.split(' ')[0],
      '├ Screen: ' + screen.width + 'x' + screen.height,
      '└ Memory: Available'
    ],
    'theme': () => ['🎨 Current theme: Matrix Green - Additional themes coming soon!'],
    'time': () => [new Date().toLocaleTimeString()],
    'timer': (minutes) => minutes ? [`Timer set for ${minutes} minutes`] : ['Usage: timer <minutes>'],
    'translate': (text) => text ? [`Translation of "${text}" - Feature coming soon!`] : ['Usage: translate <text>'],
    'ttt': () => ['🎮 Tic-tac-toe game - Feature coming soon!'],
    'uppercase': (text) => text ? [text.toUpperCase()] : ['Usage: uppercase <text>'],
    'uptime': () => ['System uptime: Building amazing things since 2022'],
    'username': () => ['praneeth'],
    'uuid': () => ['UUID: ' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })],
    'exit': () => {
      onClose();
      return ['Goodbye! Thanks for visiting! 👋'];
    }
  };

  const showHelp = () => {
    const commandList = Object.keys(commandDescriptions);
    const gridItems = [];
    
    // Create grid layout like in the image
    for (let i = 0; i < commandList.length; i += 8) {
      const row = commandList.slice(i, i + 8);
      gridItems.push({ type: 'grid-row', content: row });
    }

    return [
      { type: 'help-header', content: '💡 Terminal Help Menu:' },
      { type: 'output', content: '' },
      ...gridItems,
      { type: 'output', content: '' },
      { type: 'tip', content: '💡 Tip:' },
      { type: 'tip', content: '• Use help <command> (e.g. help about) to see command details.' },
      { type: 'tip', content: '• Use Tab for auto-completion and arrow keys (↑ ↓) to navigate command history.' }
    ];
  };

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
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
    
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);
    
    if (trimmedCmd === '') {
      setHistory(prev => [...prev, { type: 'prompt', content: 'visitor@praneeth.me:~$' }]);
      return;
    }

    if (commands[command]) {
      const output = commands[command](args.join(' '));
      if (output && output.length > 0) {
        const outputItems = Array.isArray(output) ? 
          output.map(line => typeof line === 'object' ? line : { type: 'output', content: line }) :
          [{ type: 'output', content: output }];
        
        setHistory(prev => [
          ...prev,
          ...outputItems,
          { type: 'prompt', content: 'visitor@praneeth.me:~$' }
        ]);
      } else {
        setHistory(prev => [...prev, { type: 'prompt', content: 'visitor@praneeth.me:~$' }]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${command}. Type 'help' to see available commands.` },
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

  if (!isOpen && !isMinimized) return null;

  // Minimized bubble
  if (isMinimized) {
    return (
      <div 
        ref={minimizedRef}
        className="terminal-minimized-bubble"
        style={{
          position: 'fixed',
          left: minimizedPosition?.x || 20,
          top: minimizedPosition?.y || 20,
          zIndex: 10000
        }}
        onMouseDown={handleMinimizedMouseDown}
        onClick={onMaximize}
      >
        &lt;/&gt;
      </div>
    );
  }

  return (
    <div className={`terminal-overlay ${isMaximized ? 'maximized' : ''}`}>
      <div 
        ref={windowRef}
        className={`terminal-window ${isMaximized ? 'maximized' : ''}`}
        style={{
          transform: isMaximized ? 'none' : `translate(${windowPosition.x}px, ${windowPosition.y}px)`,
          width: isMaximized ? '100%' : `${windowSize.width}px`,
          height: isMaximized ? '100%' : `${windowSize.height}px`,
        }}
      >
        <div 
          ref={headerRef}
          className="terminal-header"
          onMouseDown={handleHeaderMouseDown}
          style={{ cursor: isMaximized ? 'default' : 'move' }}
        >
          <div className="terminal-left-section">
            <div className="terminal-controls">
              <button className="control-btn close" onClick={handleClose}>
                <span className="control-symbol">×</span>
              </button>
              <button className="control-btn minimize" onClick={onMinimize}>
                <span className="control-symbol">−</span>
              </button>
              <button className="control-btn maximize" onClick={onMaximize}>
                <span className="control-symbol">{isMaximized ? '◱' : '□'}</span>
              </button>
            </div>
            <div className="terminal-left-info">
              <span className="terminal-location">📍 {location}</span>
            </div>
          </div>
          <div className="terminal-center">
            <span className="terminal-url">https://praneeth.me</span>
          </div>
          <div className="terminal-right-info">
            <span className="terminal-time">{currentTime}</span>
          </div>
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
              ) : item.type === 'grid-row' ? (
                <div className="command-grid">
                  {item.content.map((cmd, cmdIndex) => (
                    <span key={cmdIndex} className="grid-command">{cmd}</span>
                  ))}
                </div>
              ) : item.type === 'ascii' ? (
                <pre className="ascii-art">{item.content}</pre>
              ) : item.type === 'help-header' ? (
                <span className="help-header">{item.content}</span>
              ) : item.type === 'tip' ? (
                <span className="tip-text">{item.content}</span>
              ) : item.type === 'error' ? (
                <span className="error-text">{item.content}</span>
              ) : (
                <span className={item.type === 'matrix' ? 'matrix-text' : ''}>{item.content}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Resize handle */}
        {!isMaximized && (
          <div 
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>
    </div>
  );
};

export default Terminal;