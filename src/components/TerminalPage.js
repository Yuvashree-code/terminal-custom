import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TerminalPage.css';

const TerminalPage = () => {
  const [terminalData, setTerminalData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [fontColor, setFontColor] = useState('#00ff00');
  const [backgroundColor, setBackgroundColor] = useState('#0a0a0a');
  const [fontSize, setFontSize] = useState(14);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('terminalData');
    if (data) {
      const parsedData = JSON.parse(data);
      setTerminalData(parsedData);
      setCurrentTheme(parsedData.theme || 'classic');
      setFontColor(parsedData.fontColor || '#00ff00');
      setBackgroundColor(parsedData.backgroundColor || '#0a0a0a');
      setFontSize(parsedData.fontSize || 14);
      setTypingSpeed(parsedData.typingSpeed || 50);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const startTerminal = () => {
    if (!terminalData || !terminalData.lines || terminalData.lines.length === 0) return;
    
    setIsRunning(true);
    setDisplayedText('');
    setIsComplete(false);
    
    // System initialization messages with typing animation
    const systemMessages = [
      'root@Ecoverse:~$ [system.sh]',
      'Initializing Ecoverse...',
      'Connecting innovation with sustainability...',
      ''
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    const typeSystemMessage = () => {
      if (messageIndex >= systemMessages.length) {
        // Start typing user text after system messages
        startUserTextTyping();
        return;
      }
      
      const currentMessage = systemMessages[messageIndex];
      
      if (charIndex < currentMessage.length) {
        const char = currentMessage.charAt(charIndex);
        if (char) {
          setDisplayedText(prev => prev + char);
        }
        charIndex++;
        setTimeout(typeSystemMessage, typingSpeed || 50);
      } else {
        // Move to next message
        setDisplayedText(prev => prev + '\n');
        messageIndex++;
        charIndex = 0;
        setTimeout(typeSystemMessage, 200); // Pause between messages
      }
    };
    
    const startUserTextTyping = () => {
      // Now type the user's lines with > prefix
      const validLines = terminalData.lines.filter(line => line && line.trim() !== '');
      console.log('Valid lines:', validLines);
      let lineIndex = 0;
      let charIndex = 0;
      
      const typeUserText = () => {
        if (lineIndex >= validLines.length) {
          // Add animated final lines
          const finalLines = [
            '\n.............................',
            '\nSystem status: [ONLINE] !! '
          ];
          
          console.log('Final lines:', finalLines);
          console.log('Typing speed:', typingSpeed);
          
          let finalLineIndex = 0;
          let finalCharIndex = 0;
          
          const typeFinalLines = () => {
            if (finalLineIndex >= finalLines.length) {
              setIsComplete(true);
              setIsRunning(false);
              return;
            }
            
            const currentFinalLine = finalLines[finalLineIndex];
            
            if (finalCharIndex < currentFinalLine.length) {
              const char = currentFinalLine.charAt(finalCharIndex);
              if (char) {
                setDisplayedText(prev => prev + char);
              }
              finalCharIndex++;
              setTimeout(typeFinalLines, typingSpeed || 50);
            } else {
              finalLineIndex++;
              finalCharIndex = 0;
              setTimeout(typeFinalLines, 200);
            }
          };
          
          setTimeout(typeFinalLines, 500);
          return;
        }
        
        const currentLine = validLines[lineIndex];
        if (!currentLine) {
          // Skip empty lines
          lineIndex++;
          charIndex = 0;
          setTimeout(typeUserText, 200);
          return;
        }
        
        const prefix = '>   ';
        const fullLine = prefix + currentLine;
        
        if (charIndex < fullLine.length) {
          const char = fullLine.charAt(charIndex);
          if (char) {
            setDisplayedText(prev => prev + char);
          }
          charIndex++;
          setTimeout(typeUserText, typingSpeed);
        } else {
          // Move to next line
          setDisplayedText(prev => prev + '\n');
          lineIndex++;
          charIndex = 0;
          setTimeout(typeUserText, 200); // Pause between lines
        }
      };
      
      setTimeout(typeUserText, 500);
    };
    
    // Start with system messages
    setTimeout(typeSystemMessage, 500); // Initial delay
  };

  const resetTerminal = () => {
    setIsRunning(false);
    setDisplayedText('');
    setIsComplete(false);
  };

  const goBack = () => {
    navigate('/');
  };

  if (!terminalData) {
    return (
      <div className="terminal-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`terminal-page theme-${currentTheme}`}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn close"></span>
            <span className="btn minimize"></span>
            <span className="btn maximize"></span>
          </div>
          <div className="terminal-title">Ecoverse</div>
        </div>
        
        <div className="terminal-body">
          <div className="terminal-content">
            <div className="prompt-line">
              
            </div>
            
            <div 
              className="terminal-output"
              style={{ backgroundColor: backgroundColor }}
            >
              <pre 
                className="output-text"
                style={{ color: fontColor, fontSize: `${fontSize}px` }}
              >
                {displayedText}
                {isRunning && <span className="cursor" style={{ color: fontColor }}>█</span>}
              </pre>
            </div>
            
            {isComplete && (
              <div className="completion-message">
                <div className="prompt-line">
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="terminal-controls">
          <button 
            onClick={startTerminal}
            disabled={isRunning}
            className="terminal-button start-button"
          >
            {isRunning ? 'Running...' : 'Start'}
          </button>
          
          <button 
            onClick={resetTerminal}
            disabled={isRunning}
            className="terminal-button reset-button"
          >
            Reset
          </button>
          
          <button 
            onClick={goBack}
            className="terminal-button back-button"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
