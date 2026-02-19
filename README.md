# Snake Game

A classic Snake game implementation available in both web-based and console versions.

## Overview

This project contains two versions of the classic Snake game:
- **Web Version**: A modern browser-based implementation with HTML5 Canvas
- **Console Version**: A traditional C++ console application

## Web Version (HTML/CSS/JavaScript)

### Features
- Smooth canvas-based graphics
- Score tracking system
- Game controls: Start, Pause, and Reset
- Game over screen with restart option
- Responsive design
- Multiple control schemes:
  - Arrow keys (↑↓←→)
  - WASD keys
  - Spacebar for pause/resume

### How to Play (Web Version)
1. Open `index.html` in any modern web browser
2. Click "Start Game" to begin
3. Use arrow keys or WASD to control the snake
4. Eat the food to grow your snake and increase your score
5. Avoid hitting the walls or the snake's own body
6. Press spacebar to pause/resume the game

### Files
- `index.html` - Main game page
- `script.js` - Game logic and controls
- `style.css` - Styling and layout

## Console Version (C++)

### Features
- Text-based graphics using ASCII characters
- Real-time console input
- Score tracking
- Wall collision detection
- Self-collision detection

### How to Play (Console Version)
1. Compile and run `snake.cpp`
2. Use WASD keys to control the snake:
   - W: Move up
   - A: Move left
   - S: Move down
   - D: Move right
   - X: Quit game
3. Eat the fruit (F) to grow your snake and increase your score
4. Avoid hitting the walls (#) or the snake's own body

### Compilation
To compile the C++ version:
```bash
g++ snake.cpp -o snake
./snake
```

**Note**: The C++ version is designed for Windows systems and uses Windows-specific libraries (`conio.h` and `windows.h`).

## Game Rules

Both versions follow the same core gameplay:
- Control a snake that moves continuously in the current direction
- Eat food to grow the snake and increase your score
- The game ends if the snake hits a wall or itself
- The goal is to achieve the highest score possible

## Technical Details

### Web Version
- **Grid Size**: 20x20 pixels per cell
- **Canvas Size**: 400x400 pixels
- **Game Speed**: Adjustable (default: 120ms per frame)
- **Browser Compatibility**: Modern browsers with HTML5 Canvas support

### Console Version
- **Grid Size**: 20x20 characters
- **Platform**: Windows (uses Windows-specific APIs)
- **Dependencies**: Standard C++ libraries + Windows console APIs

## Getting Started

### Web Version
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start playing immediately - no additional setup required

### Console Version
1. Ensure you have a C++ compiler installed (e.g., MinGW, Visual Studio)
2. Compile `snake.cpp` using your preferred compiler
3. Run the executable in a console window
