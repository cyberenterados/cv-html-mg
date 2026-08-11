const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Ajustar canvas al tamaño de la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Caracteres orientados al desarrollo web frontend / matriz
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]/\\=>();:+-*#@'.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Inicializar las "gotas" en el eje Y
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Colores sutiles estilo RGB / Cyberpunk de la presentación
const colors = ['#8b5cf6', '#3b82f6', '#0ea5e9', '#6366f1'];

function drawMatrix() {
    // Fondo semitransparente oscuro para crear la "estela" al caer
    ctx.fillStyle = 'rgba(5, 5, 16, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar los caracteres
    for (let i = 0; i < drops.length; i++) {
        // Seleccionar carácter aleatorio
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Asignar un color RGB sutil aleatorio de la paleta
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        
        // Bajar la opacidad (alpha) global para que no moleste a la lectura
        ctx.globalAlpha = 0.25; 
        
        ctx.font = fontSize + 'px monospace';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Restaurar opacidad
        ctx.globalAlpha = 1.0;

        // Reiniciar la gota si llega abajo (con un factor aleatorio para dispersión)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Mover la gota hacia abajo
        drops[i]++;
    }
}

// Velocidad de caída del código
setInterval(drawMatrix, 35);