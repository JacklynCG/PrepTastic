// script.js
let currentIndex = 0;

function changeSlide(direction) {
    const images = document.querySelectorAll('.carousel-images img');
    images[currentIndex].classList.remove('active');

    // Update current index
    currentIndex += direction;

    // Loop around if out of bounds
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Go to the last image
    } else if (currentIndex >= images.length) {
        currentIndex = 0; // Go to the first image
    }

    images[currentIndex].classList.add('active');
}