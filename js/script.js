console.clear();

var doc = document;
var flower = doc.querySelector('.flower');
var range = doc.querySelector('.range');

var petalPartMarkup = '<div class="box"> \
                    <div class="shape"></div> \
                </div>';

var maxParts = 20;
var maxPetalsDef = 6;
var maxPetals = maxPetalsDef;

var partsFontStepDef = 25 / maxParts;
var partsFontStep = partsFontStepDef;
var huetStep = 150 / maxParts;

createFlower ();

function createFlower () {
    
        var angle = 360 / maxPetals;
    
    for (var i = 0; i < maxPetals; i++) {
        var petal = createPetal(); 
        var currAngle = angle * i + 'deg';
        var transform = 'transform: rotateY(' + currAngle + ') rotateX(-30deg) translateZ(9vmin)';
        
        petal.setAttribute( 'style',transform);
        
        flower.appendChild( petal );
    }
}

function createPetal () {
    
    var box = createBox ( null, 0);
    
    var petal = doc.createElement('div');
    petal.classList.add('petal');
    
    for (var i = 1; i <= maxParts; i++) {
        newBox = createBox ( box, i );        
        box = newBox;
    } 
    
    petal.appendChild( box );

    return petal;
}

function createBox(box, pos) {
    var fontSize = partsFontStep * (maxParts - pos) + 'vmin';
    var half = maxParts / 2;

    var brightnessForSize = 50;

    if (pos < half + 1) {
        fontSize = partsFontStep * pos + 'vmin';
    } else {
        brightnessForSize = 10 + 40 / half * (maxParts - pos);
    }

    // 🌻 Colores estilo girasol
    var baseHue = 47; // Amarillo girasol
    var hueVariation = 10; // Variación sutil para tonos cálidos
    var saturation = 90 - (20 * pos / maxParts); // De vibrante a más suave
    var brightnessForColor = 55 + (20 * pos / maxParts); // De más oscuro a más claro
    var color = 'hsl(' + (baseHue + (hueVariation * pos / maxParts)) + ', ' + saturation + '%, ' + brightnessForColor + '%)';

    var newShape = doc.createElement('div');
    newShape.classList.add('shape');

    var newBox = doc.createElement('div');
    newBox.classList.add('box');

    var boxStyle = [
        'background-color: ' + color, // 👈 CAMBIO CLAVE
        'font-size: ' + fontSize
    ].join(';');
    newBox.setAttribute('style', boxStyle);

    if (box) {
        newBox.appendChild(box);
    }

    newBox.appendChild(newShape);

    return newBox;
}


// Galaxia de puntitos pequeños rosados
function drawGalaxy() {
    var canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    var stars = [];
    var numStars = 120;
    for (var i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.7, // velocidad aumentada
            dy: (Math.random() - 0.5) * 0.7, // velocidad aumentada
            alpha: Math.random() * 0.5 + 0.5
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,182,193,0.9)';
            ctx.shadowColor = '#ffb6d5';
            ctx.shadowBlur = 2; // Menos blur para mejor rendimiento
            ctx.fill();
            ctx.restore();
            s.x += s.dx;
            s.y += s.dy;
            if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
            if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
        }
        requestAnimationFrame(animate);
    }
    animate();
}
document.addEventListener('DOMContentLoaded', drawGalaxy);

function out ( content ) {
    console.log( content );
}