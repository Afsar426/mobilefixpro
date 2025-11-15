import L from 'leaflet'

// This component handles the CSS for the pulsing marker
// The actual marker is created in useMap.js
export const pulsingMarkerCSS = `
  .pulse-marker {
    width: 40px !important;
    height: 40px !important;
    margin-left: -20px !important;
    margin-top: -40px !important;
    background: #0d9488;
    border: 3px solid white;
    border-radius: 50%;
    position: relative;
    animation: pulse-marker 2s infinite;
  }

  .pulse-marker::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
  }

  @keyframes pulse-marker {
    0% {
      box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(13, 148, 136, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(13, 148, 136, 0);
    }
  }
`

// Inject CSS into document
const style = document.createElement('style')
style.textContent = pulsingMarkerCSS
document.head.appendChild(style)