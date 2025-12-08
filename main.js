const slides = document.querySelectorAll('#sliderContainer .img-link');
const container = document.getElementById('sliderContainer');
let currentIndex = Math.floor(slides.length / 2)
let isAnimating = false

function updateSlider() {
    const slide = slides[0];
    const slideStyles = getComputedStyle(slide);
    const margin = parseFloat(slideStyles.marginLeft) + parseFloat(slideStyles.marginRight);
    const slideWidth = slide.offsetWidth + margin;

    const offset = (slideWidth * currentIndex * -1) + (window.innerWidth / 2 - slideWidth / 2);
    container.style.transition = 'transform 0.4s ease';
    container.style.transform = `translateX(${offset}px)`;
}

function updateSlideStyle() {
    slides.forEach((slide, i) => {
        slide.classList.add('transition-all', 'duration-300', 'ease-in-out');
        if (i === currentIndex) {
            slide.style.transform = 'scale(1)';
            slide.style.filter = 'blur(0px)';
            slide.style.opacity = '1';
            slide.style.zIndex = '10';
            slide.style.pointerEvents = 'auto';
        } else if (i === currentIndex - 1 || i === currentIndex + 1) {
            slide.style.transform = 'scale(0.85)';
            slide.style.filter = 'blur(4px)';
            slide.style.opacity = '0.8';
            slide.style.zIndex = '5';
            slide.style.pointerEvents = 'none';
        } else {
            slide.style.transform = 'scale(0.7)';
            slide.style.filter = 'blur(6px)';
            slide.style.opacity = '0.5';
            slide.style.zIndex = '1';
            slide.style.pointerEvents = 'none';
        }
    });

    // update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
        dot.style.backgroundColor = i === currentIndex ? '#000' : '#bbb';
    })
}

function slideTo(direction) {
    if (isAnimating) return;
    isAnimating = true;

    if (direction === 'left') currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    else currentIndex = (currentIndex + 1) % slides.length;

    updateSlider();
    setTimeout(() => {
        updateSlideStyle();
        isAnimating = false;
    }, 200);
}

updateSlider();
updateSlideStyle();

document.querySelector('.prev-btn')?.addEventListener('click', () => slideTo('left'));
document.querySelector('.next-btn')?.addEventListener('click', () => slideTo('right'));
window.addEventListener('resize', () => {
    updateSlider();
    updateSlideStyle();
});

// === DRAG & SWIPE HANDLER ===
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

function setSliderPosition(x) {
    container.style.transition = 'none';
    container.style.transform = `translateX(${x}px)`;
}

function pointerDown(e) {
    e.preventDefault();
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    prevTranslate = parseFloat(container.style.transform.match(/-?\d+\.?\d*/)) || 0;
    container.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
}

function pointerMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    setSliderPosition(currentTranslate);
}

function pointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    document.body.style.userSelect = ''; // aktifkan kembali teks

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) slideTo('right');
    else if (movedBy > 100) slideTo('left');
    else updateSlider();
}

container.addEventListener('mousedown', pointerDown);
container.addEventListener('mousemove', pointerMove);
container.addEventListener('mouseup', pointerUp);
container.addEventListener('mouseleave', pointerUp);

container.addEventListener('touchstart', pointerDown);
container.addEventListener('touchmove', pointerMove);
container.addEventListener('touchend', pointerUp);

// === DOTS ===
const dotsContainer = document.querySelector('#dots');
dotsContainer.className = 'dots flex justify-center gap-2 mt-6';
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot w-3 h-3 rounded-full bg-gray-400 cursor-pointer transition-all duration-300';
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        updateSlideStyle();
    });
    dotsContainer.appendChild(dot);
})

container.parentElement.appendChild(dotsContainer)
updateSlideStyle()



const hamburgerMenu = document.querySelector('.hamburger-menu')
const sidebar = document.querySelector('.sidebar')
const closed = document.querySelector('.sidebar-close')

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        if (sidebar) sidebar.classList.add('active')
        if (closed) closed.classList.add('active')
    });
}

if (closed) {
    closed.addEventListener('click', () => {
        if (sidebar) sidebar.classList.remove('active')
        closed.classList.remove('active')
    });
}