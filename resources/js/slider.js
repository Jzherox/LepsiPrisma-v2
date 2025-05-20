const track = document.getElementById('sliderTrack');
const slideWidth = 300;
let index = 0;
const maxIndex = 4;

function moveSlider() {
  index++;
  track.style.transition = 'transform 1s ease-in-out';
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  if (index === maxIndex) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = 'translateX(0)';
    }, 500);
  }
}

setInterval(moveSlider, 7000);