// Protection against screenshots and right-click
export function initProtection() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable keyboard shortcuts for developer tools
  document.addEventListener('keydown', (e) => {
    // Disable F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+I (Chrome DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+J (Chrome Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+C (Chrome Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+P (Print)
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+P (Command Palette)
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      return false;
    }
  });

  // Disable text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable drag and drop
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable copy
  document.addEventListener('copy', (e) => {
    e.clipboardData.setData('text/plain', '');
    e.preventDefault();
    return false;
  });

  // Disable cut
  document.addEventListener('cut', (e) => {
    e.clipboardData.setData('text/plain', '');
    e.preventDefault();
    return false;
  });

  // Detect Print Screen (limited effectiveness)
  let keysPressed = {};
  document.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
    
    // Detect Print Screen key
    if (e.key === 'PrintScreen' || (e.key === 'F13')) {
      e.preventDefault();
      showWarning();
      return false;
    }
  });

  document.addEventListener('keyup', (e) => {
    delete keysPressed[e.key];
  });

  // Removed blur on focus loss - keeping page clear

  // Disable screenshot on mobile (iOS/Android)
  if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
    // Disable touch actions that might trigger screenshots
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

function showWarning() {
  const warning = document.createElement('div');
  warning.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    z-index: 99999;
    font-size: 18px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  `;
  warning.textContent = 'Screenshots are not allowed on this website';
  document.body.appendChild(warning);

  setTimeout(() => {
    warning.remove();
  }, 2000);
}

