    const track = document.getElementById('sliderTrack');
    const slideWidth = 300;
    let index = 0;
    const maxIndex = 4; // cantidad de slides originales

    function moveSlider() {
      index++;
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${slideWidth * index}px)`;

      if (index === maxIndex) {
        // Al llegar al último slide (index=4), reiniciar al inicio sin transición
        setTimeout(() => {
          track.style.transition = 'none';
          index = 0;
          track.style.transform = 'translateX(0)';
        }, 500); // debe coincidir con la duración de la transición
      }
    }

    setInterval(moveSlider, 5000);