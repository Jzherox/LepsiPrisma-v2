var fade_up = {
    duration: '500',
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    viewOffset: {bottom: 100},
    delay: 200,
    reset: false,
};

var fade_down = {
    duration: '500',
    distance: '30px',
    origin: 'top',
    opacity: 0,
    easing: 'ease-in-out',
    viewOffset: {bottom: 100},
    delay: 200,
    reset: false,
};

var fade_in = {
    duration: '500',
    opacity: 0,
    easing: 'ease-in-out',
    delay: 200,
    reset: false,
}

ScrollReveal().reveal('.animate-up', fade_up);
ScrollReveal().reveal('.animate-down', fade_down);
ScrollReveal().reveal('.animate-img', fade_in);