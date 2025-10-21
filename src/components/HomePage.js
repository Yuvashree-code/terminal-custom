import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [lines, setLines] = useState(['']);
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [fontColor, setFontColor] = useState('#00ff00');
  const [backgroundColor, setBackgroundColor] = useState('#0a0a0a');
  const [typingSpeed, setTypingSpeed] = useState(50);
  const navigate = useNavigate();

  const themes = [
    { id: 'classic', name: 'Classic Green', color: '#00ff00', bg: '#0a0a0a' },
    { id: 'matrix', name: 'Matrix', color: '#00ff41', bg: '#000000' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#ff0080', bg: '#0a0a0f' },
    { id: 'amber', name: 'Amber', color: '#ffb000', bg: '#1a1a00' },
    { id: 'blue', name: 'Blue', color: '#0080ff', bg: '#000a1a' },
    { id: 'purple', name: 'Purple', color: '#8000ff', bg: '#0a001a' }
  ];

  const handleNumberOfLinesChange = (e) => {
    const num = parseInt(e.target.value) || 1;
    setNumberOfLines(num);
    
    // Update lines array based on new number
    const newLines = [];
    for (let i = 0; i < num; i++) {
      newLines.push(lines[i] || '');
    }
    setLines(newLines);
  };

  const handleLineChange = (index, value) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const handleNext = () => {
    // Store the data in localStorage for the terminal page
    const cleanLines = lines
      .filter(line => line !== null && line !== undefined && line.trim() !== '')
      .map(line => String(line).trim());
    
    localStorage.setItem('terminalData', JSON.stringify({
      numberOfLines,
      lines: cleanLines,
      theme: selectedTheme,
      fontColor,
      backgroundColor,
      typingSpeed
    }));
    navigate('/terminal');
  };

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setFontColor(theme.color);
      setBackgroundColor(theme.bg);
    }
  };

  const handleCustomColorChange = (color) => {
    setFontColor(color);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="home-page">
      <div className="main-container">
        <div className="page-header">
          <h1>Terminal Configuration</h1>
          <p>Configure your terminal display settings and enter text to display</p>
        </div>
        
        <div className="form-container">
          <div className="input-section">
            {/* Theme Selection */}
            <div className="theme-section">
              <label className="section-label">Terminal Theme:</label>
              <div className="theme-grid">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`theme-option ${selectedTheme === theme.id ? 'selected' : ''}`}
                    onClick={() => handleThemeChange(theme.id)}
                    style={{ '--theme-color': theme.color, '--theme-bg': theme.bg }}
                  >
                    <div className="theme-preview"></div>
                    <span className="theme-name">{theme.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="color-section">
              <label className="section-label">Custom Font Color:</label>
              <div className="color-picker-group">
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={fontColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="color-input"
                  placeholder="#00ff00"
                />
              </div>
            </div>

            <div className="color-section">
              <label className="section-label">Custom Background Color:</label>
              <div className="color-picker-group">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                  className="color-input"
                  placeholder="#0a0a0a"
                />
              </div>
            </div>

            {/* Typing Speed Control */}
            <div className="speed-section">
              <label className="section-label">
                Typing Speed: {typingSpeed}ms per character
              </label>
              <div className="speed-control">
                <span className="speed-label">Slow</span>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={typingSpeed}
                  onChange={(e) => setTypingSpeed(parseInt(e.target.value))}
                  className="speed-slider"
                />
                <span className="speed-label">Fast</span>
              </div>
            </div>

            {/* Number of Lines */}
            <div className="input-group">
              <label htmlFor="lines">Number of lines:</label>
              <input
                type="number"
                id="lines"
                min="1"
                max="20"
                value={numberOfLines}
                onChange={handleNumberOfLinesChange}
                className="terminal-input"
              />
            </div>
            
            {/* Text Input Lines */}
            <div className="lines-input">
              <label>Enter text for each line:</label>
              {lines.map((line, index) => (
                <div key={index} className="line-input-group">
                  <span className="line-number">{index + 1}:</span>
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => handleLineChange(index, e.target.value)}
                    className="terminal-input line-input"
                    placeholder={`Line ${index + 1} text...`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="button-section">
            <button 
              onClick={handleNext}
              className="submit-button"
              disabled={lines.every(line => line.trim() === '')}
            >
              {lines.every(line => line.trim() === '') ? 'Enter text above to continue' : 'Next →'}
            </button>
            {lines.every(line => line.trim() === '') && (
              <p className="button-hint">Add some text to at least one line to proceed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
