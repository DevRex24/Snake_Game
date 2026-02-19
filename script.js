// Snake Game JavaScript Implementation
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants matching the C++ version
const GRID_SIZE = 20;
const GRID_WIDTH = canvas.width / GRID_SIZE;
const GRID_HEIGHT = canvas.height / GRID_SIZE;

// Game state variables
let snake = [];
let food = {};
let direction = 'RIGHT';
let nextDirection = 'RIGHT';
let score = 0;
let gameSpeed = 120;
let gameRunning = false;
let gameLoop;

// DOM elements
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('finalScore');
const gameOverElement = document.getElementById('gameOver');
const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const restartButton = document.getElementById('restartBtn');

// Initialize game
function initGame() {
    // Initialize snake (matching C++ implementation)
    snake = [
        {x: 10, y: 10}, // Head
        {x: 9, y: 10},
        {x: 8, y: 10}  // Tail
    ];
    
    // Generate first food
    generateFood();
    
    // Reset game state
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    score = 0;
    updateScore();
    
    // Hide game over screen
    gameOverElement.classList.add('hidden');
}

// Generate food at random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
    };
    
    // Make sure food doesn't appear on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            return generateFood();
        }
    }
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a1929';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#0d2b45';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Snake head
            ctx.fillStyle = '#4caf50';
        } else {
            // Snake body
            ctx.fillStyle = '#8bc34a';
        }
        
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        
        // Add border to snake segments
        ctx.strokeStyle = '#0a1929';
        ctx.lineWidth = 1;
        ctx.strokeRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
    
    // Draw food (matching C++ fruit)
    ctx.fillStyle = '#ff5252';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    
    // Add shine effect to food
    ctx.fillStyle = '#ff8a80';
    ctx.fillRect(food.x * GRID_SIZE + 4, food.y * GRID_SIZE + 4, GRID_SIZE - 8, GRID_SIZE - 8);
}

// Update game state
function update() {
    // Update direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch (direction) {
        case 'UP':
            head.y -= 1;
            break;
        case 'DOWN':
            head.y += 1;
            break;
        case 'LEFT':
            head.x -= 1;
            break;
        case 'RIGHT':
            head.x += 1;
            break;
    }
    
    // Check collision with walls (matching C++ implementation)
    if (head.x >= GRID_WIDTH || head.x < 0 || head.y >= GRID_HEIGHT || head.y < 0) {
        gameOver();
        return;
    }
    
    // Check collision with self (matching C++ implementation)
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if food is eaten (matching C++ implementation)
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score += 10;
        updateScore();
        
        // Generate new food
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
}

// Game loop
function gameStep() {
    update();
    draw();
    
    if (gameRunning) {
        gameLoop = setTimeout(() => {
            requestAnimationFrame(gameStep);
        }, gameSpeed);
    }
}

// Start game
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        pauseButton.textContent = 'Pause';
        gameStep();
    }
}

// Pause game
function pauseGame() {
    gameRunning = !gameRunning;
    pauseButton.textContent = gameRunning ? 'Pause' : 'Resume';
    
    if (gameRunning) {
        gameStep();
    } else {
        clearTimeout(gameLoop);
    }
}

// Reset game
function resetGame() {
    gameRunning = false;
    clearTimeout(gameLoop);
    initGame();
    draw();
}

// Game over
function gameOver() {
    gameRunning = false;
    clearTimeout(gameLoop);
    
    // Show game over screen
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

// Handle keyboard input
function handleKeydown(e) {
    // Prevent arrow keys from scrolling the page
    if ([37, 38, 39, 40, 65, 87, 68, 83, 32].includes(e.keyCode)) {
        e.preventDefault();
    }
    
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'DOWN') nextDirection = 'UP';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'UP') nextDirection = 'DOWN';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'RIGHT') nextDirection = 'LEFT';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'LEFT') nextDirection = 'RIGHT';
            break;
        case ' ':
            // Space bar to pause/resume
            pauseGame();
            break;
    }
}

// Event listeners
startButton.addEventListener('click', () => {
    initGame();
    startGame();
});

pauseButton.addEventListener('click', pauseGame);

resetButton.addEventListener('click', resetGame);

restartButton.addEventListener('click', () => {
    initGame();
    startGame();
});

document.addEventListener('keydown', handleKeydown);

// Initialize and draw initial state
initGame();
draw();