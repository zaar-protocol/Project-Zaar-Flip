const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7fff7'];

function createConfettiPiece() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.animationDuration = `${Math.random() * 2 + 3}s`; // 3-5 seconds
  confetti.style.opacity = `${Math.random() * 0.3 + 0.7}`; // 70-100% opacity
  return confetti;
}

export function createConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  for (let i = 0; i < 100; i++) {
    const confetti = createConfettiPiece();
    container.appendChild(confetti);
  }

  setTimeout(() => {
    container.remove();
  }, 5000);
}