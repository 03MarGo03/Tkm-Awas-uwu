window.addEventListener('DOMContentLoaded', function () {
  var doc = document,
    flower = doc.querySelector('.flower'),
    petalPartMarkup = '<div class="box"><div class="shape"></div></div>',
    maxParts = 20,
    maxPetals = 6,
    partsFontStep = 25 / maxParts;

  createFlower();

  function createFlower() {
    var angle = 360 / maxPetals;
    for (var i = 0; i < maxPetals; i++) {
      var petal = createPetal(),
        currAngle = angle * i + 'deg',
        transform = 'transform: rotateY(' + currAngle + ') rotateX(-30deg) translateZ(9vmin)';
      petal.setAttribute('style', transform);
      flower.appendChild(petal);
    }
  }

  function createPetal() {
    var box = createBox(null, 0),
      petal = doc.createElement('div');
    petal.classList.add('petal');
    for (var i = 1; i <= maxParts; i++) {
      box = createBox(box, i);
    }
    petal.appendChild(box);
    return petal;
  }

  function createBox(box, pos) {
    var fontSize = partsFontStep * (maxParts - pos) + 'vmin',
      half = maxParts / 2,
      bright = 50;

    if (pos < half + 1) {
      fontSize = partsFontStep * pos + 'vmin';
    } else {
      bright = 10 + 40 / half * (maxParts - pos);
    }

    // 🌻 Colores estilo girasol
    var baseHue = 47;
    var hueVariation = 10;
    var saturation = 90 - (20 * pos / maxParts);
    var lightness = 55 + (20 * pos / maxParts);
    var color = 'hsl(' + (baseHue + (hueVariation * pos / maxParts)) + ', ' + saturation + '%, ' + lightness + '%)';

    var newShape = doc.createElement('div');
    newShape.classList.add('shape');

    var newBox = doc.createElement('div');
    newBox.classList.add('box');
    newBox.setAttribute('style', 'color: ' + color + '; font-size: ' + fontSize);

    if (box) newBox.appendChild(box);
    newBox.appendChild(newShape);
    return newBox;
  }

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

    var stars = [],
      numStars = 120;
    for (var i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
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
        ctx.fillStyle = 'rgba(251,209,61,0.9)'; // 🌟 amarillo girasol
        ctx.shadowColor = '#fbd13d';
        ctx.shadowBlur = 2;
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

  var mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.style.display = '';

  var startBtn = document.getElementById('start-btn');
  var btnText = 'Presiona uwu';
  startBtn.textContent = '';
  startBtn.disabled = true;
  let iBtn = 0;

  function typeBtn() {
    if (iBtn < btnText.length) {
      startBtn.textContent += btnText.charAt(iBtn);
      iBtn++;
      setTimeout(typeBtn, 90);
    } else {
      startBtn.disabled = false;
    }
  }
  typeBtn();

  const messages = [
    'Ira que bonita flor uwu',
    'Te quiero mucho, Awas preciosa',
    'Gracias por todo, de veritas',
    'Sos muito especial para mi uwu',
    '¡Feliz inicio de primavera 💛!',
    '¡Te deseo todo lo mejor',
    'y espero que seas muito feliz!',
    'Te mando muchos abracitos 🫂',
    'Sos una personita incrible', 
    'Estaré para vos siempre, bonita uwu',
    '¡Y nunca olvides lo hermosa que sos!',
    'O te wa morder, eh',
    'Tenés un lugar reservado en mi corazón 🥺',
    'Siempre que necesites algo, no lo dudes uwu',
    'Y gracias por todos estos años 🥺',
    'Para mí, siempre serás hermosa uwu',
    'Así que bajele a tratarse mal, nonono',
    '¡Te adoro y tkm, Awas! uwu'
  ];

  var wrapper = document.querySelector('.wrapper');
  var msg = document.querySelector('.flower-message');
  var container = document.getElementById('start-btn-container');
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%,-50%)';
  container.style.zIndex = '100';

  startBtn.addEventListener('click', function () {
    var isMobile = window.innerWidth <= 600;
    container.style.display = 'none';
    wrapper.style.display = '';

    var music = document.getElementById('bg-music');
    if (music) {
      music.currentTime = 0;
      var playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise.catch(function (error) {
          alert('No se pudo reproducir la música. Verifica el archivo o permisos del navegador.');
        });
      }
    }

    setTimeout(function () {
      var galaxyCanvas = document.getElementById('galaxy-canvas');
      galaxyCanvas.style.display = '';
      galaxyCanvas.width = window.innerWidth;
      galaxyCanvas.height = window.innerHeight;
      var ctx = galaxyCanvas.getContext('2d');
      var numDots = isMobile ? 3 : 60;
      var dots = [];
      var dotsToAdd = 0;
      var minDotSize = isMobile ? 0.5 : 0.7;
      var maxDotSize = isMobile ? 1.1 : 1.7;

      var audio = document.getElementById('bg-music');
      var audioCtx, analyser, dataArray;
      if (window.AudioContext && audio) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }

      function addDot() {
        if (dotsToAdd < numDots) {
          let angle = Math.random() * 2 * Math.PI;
          let radius = Math.random() * (galaxyCanvas.width / 2.2);
          let x = galaxyCanvas.width / 2 + Math.cos(angle) * radius;
          let y = galaxyCanvas.height / 2 + Math.sin(angle) * radius;
          let speed = 0.2 + Math.random() * 0.7;
          let dir = Math.random() * 2 * Math.PI;
          let dotSize = minDotSize + Math.random() * (maxDotSize - minDotSize);
          dots.push({ x, y, r: dotSize, dx: Math.cos(dir) * speed, dy: Math.sin(dir) * speed, alpha: 0.5 + Math.random() * 0.5 });
          dotsToAdd++;
          setTimeout(addDot, 10);
        }
      }

      addDot();

      function animateGalaxy() {
        ctx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
        let hue = 47; // amarillo girasol
        let speedFactor = 1;
        if (analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);
          let avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          speedFactor = 0.7 + (avg / 255) * 2.5;
        }
        for (let dot of dots) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
                    ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${dot.alpha})`;
          ctx.shadowColor = `hsla(${hue}, 80%, 70%, 0.5)`;
          ctx.shadowBlur = 1;
          ctx.fill();
          dot.x += dot.dx * speedFactor;
          dot.y += dot.dy * speedFactor;
          if (dot.x < 0) dot.x = galaxyCanvas.width;
          if (dot.x > galaxyCanvas.width) dot.x = 0;
          if (dot.y < 0) dot.y = galaxyCanvas.height;
          if (dot.y > galaxyCanvas.height) dot.y = 0;
        }
        requestAnimationFrame(animateGalaxy);
      }

      setTimeout(function () {
        galaxyCanvas.style.opacity = '1';
      }, 50);

      animateGalaxy();
    }, 2000);

    if (isMobile) {
      msg.style.display = '';
      msg.style.opacity = 1;
      msg.style.transform = 'scale(1)';

      setTimeout(function () {
        msg.style.opacity = 1;
        let current = 0;

        function typeText(text, cb) {
          msg.textContent = '';
          let i = 0;
          function type() {
            if (i < text.length) {
              msg.textContent += text.charAt(i);
              i++;
              setTimeout(type, 90);
            } else if (cb) {
              setTimeout(cb, 1000);
            }
          }
          type();
        }

        function showNext() {
          if (current < messages.length) {
            typeText(messages[current], function () {
              current++;
              showNext();
            });
          } else {
            if (typeof animateHeart === 'function') animateHeart();
          }
        }

        showNext();

        function animateHeart() {
          var heartCenterX = galaxyCanvas.width / 2;
          var heartCenterY = msg.getBoundingClientRect().bottom - galaxyCanvas.getBoundingClientRect().top + 80;
          var heartSize = Math.min(galaxyCanvas.width, galaxyCanvas.height) / 7;
          var heartPositions = [];

          for (let i = 0; i < dots.length; i++) {
            let t = Math.PI * 2 * (i / dots.length);
            let x = heartCenterX + heartSize * 16 * Math.pow(Math.sin(t), 3);
            let y = heartCenterY - heartSize * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            heartPositions.push({ x, y });
          }

          let steps = 14;
          let step = 0;

          function moveDotsToHeart() {
            for (let i = 0; i < dots.length; i++) {
              let dot = dots[i];
              let target = heartPositions[i];
              dot.x += (target.x - dot.x) / (steps - step + 1);
              dot.y += (target.y - dot.y) / (steps - step + 1);
            }
            step++;
            if (step < steps) {
              requestAnimationFrame(moveDotsToHeart);
            }
          }

          moveDotsToHeart();
        }

        if (mobileLoader) mobileLoader.style.display = 'none';
      }, 1200);
    } else {
      msg.style.display = '';
      msg.style.opacity = 1;
      let current = 0;

      function typeText(text, cb) {
        msg.textContent = '';
        let i = 0;
        function type() {
          if (i < text.length) {
            msg.textContent += text.charAt(i);
            i++;
            setTimeout(type, 90);
          } else if (cb) {
            setTimeout(cb, 1000);
          }
        }
        type();
      }

      function showNext() {
        if (current < messages.length) {
          typeText(messages[current], function () {
            current++;
            showNext();
          });
        } else {
          if (typeof animateHeart === 'function') animateHeart();
        }
      }

      showNext();

      function animateHeart() {
        var heartCenterX = galaxyCanvas.width / 2;
        var heartCenterY = msg.getBoundingClientRect().bottom - galaxyCanvas.getBoundingClientRect().top + 80;
        var heartSize = Math.min(galaxyCanvas.width, galaxyCanvas.height) / 7;
        var heartPositions = [];

        for (let i = 0; i < dots.length; i++) {
          let t = Math.PI * 2 * (i / dots.length);
          let x = heartCenterX + heartSize * 16 * Math.pow(Math.sin(t), 3);
          let y = heartCenterY - heartSize * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          heartPositions.push({ x, y });
        }

        let steps = 14;
        let step = 0;

        function moveDotsToHeart() {
          for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            let target = heartPositions[i];
            dot.x += (target.x - dot.x) / (steps - step + 1);
            dot.y += (target.y - dot.y) / (steps - step + 1);
          }
          step++;
          if (step < steps) {
            requestAnimationFrame(moveDotsToHeart);
          }
        }

        moveDotsToHeart();
      }
    }
  });
});
msg.classList.add('show');
