# Terminal Theme Website

A React-based website that simulates a terminal experience where users can input text lines and watch them display with a typing animation in a terminal-themed interface.

## Features

- **Home Page**: Input form to specify number of lines and text content for each line
- **Terminal Page**: Interactive terminal display with typing animation
- **Responsive Design**: Works on desktop and mobile devices
- **Terminal Theme**: Authentic terminal styling with green text on black background
- **Smooth Animations**: Typing effect with blinking cursor

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd Terminal_theme
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Home Page**: 
   - Enter the number of lines you want to display (1-20)
   - Fill in the text content for each line
   - Click "Next →" to proceed to the terminal page

2. **Terminal Page**:
   - Click "Start" to begin the typing animation
   - Watch as your text appears line by line with a typing effect
   - Use "Reset" to clear the display and start over
   - Use "← Back" to return to the input page

## Project Structure

```
src/
├── components/
│   ├── HomePage.js          # Input form component
│   ├── HomePage.css         # Styling for home page
│   ├── TerminalPage.js      # Terminal display component
│   └── TerminalPage.css     # Styling for terminal page
├── App.js                   # Main app component with routing
├── App.css                  # Global app styles
├── index.js                 # React entry point
└── index.css                # Global styles
```

## Technologies Used

- React 18
- React Router DOM
- CSS3 with animations
- Local Storage for data persistence

## Customization

You can customize the terminal appearance by modifying the CSS files:
- `src/index.css` - Global styles and animations
- `src/components/HomePage.css` - Home page styling
- `src/components/TerminalPage.css` - Terminal page styling

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.
