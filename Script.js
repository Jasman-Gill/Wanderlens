const locations = [
    "Bali, Indonesia",
    "Santorini, Greece",
    "Kyoto, Japan",
    "Patagonia, Chile",
    "Sahara Desert",
    "Banff, Canada",
    "Great Barrier Reef"
];

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('autocompleteResults');

searchInput.addEventListener('input', function (e) {
    const input = e.target.value.toLowerCase();
    resultsContainer.innerHTML = '';

    if (input.length > 0) {
        const matches = locations.filter(location =>
            location.toLowerCase().includes(input)
        );

        if (matches.length > 0) {
            matches.forEach(match => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                div.textContent = match;
                div.onclick = () => {
                    searchInput.value = match;
                    resultsContainer.style.display = 'none';
                }
                resultsContainer.appendChild(div);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    } else {
        resultsContainer.style.display = 'none';
    }
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-bar')) {
        resultsContainer.style.display = 'none';
    }
});


let lastScroll = 0;
const videoBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (Math.abs(currentScroll - lastScroll) > 2) {
        videoBg.style.transform = `translateY(${currentScroll * 0.5}px)`;
        lastScroll = currentScroll;
    }
});

// video play on mobile
document.querySelector('video').play().catch(error => {
    console.log('Video autoplay failed:', error);
});


// Counter Animations
function animateCounters() {
    const countriesCounter = document.getElementById('countriesCounter');
    const countriesProgress = document.getElementById('countriesProgress');
    const milesCounter = document.getElementById('mapMilesCounter');

    let countriesCount = 0;
    let milesCount = 0;
    const targetCountries = 18;
    const targetMiles = 24500;

    const countriesInterval = setInterval(() => {
        countriesCount++;
        countriesCounter.textContent = countriesCount;

        const progressPercent = (countriesCount / 30) * 100;
        countriesProgress.style.width = `${progressPercent}%`;

        if (countriesCount >= targetCountries) {
            clearInterval(countriesInterval);
        }
    }, 50);

    // Animated miles counter
    const milesInterval = setInterval(() => {
        milesCount += 97; 
        if (milesCount >= targetMiles) {
            milesCount = targetMiles;
            clearInterval(milesInterval);
        }
        milesCounter.textContent = milesCount.toLocaleString();
    }, 10);
}

//  when section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.map-stats-section'));

document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', function () {
        this.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        }, 150);
    });
});


// Scroll Animation Handler
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

document.addEventListener('DOMContentLoaded', () => {
    const imageModal = new bootstrap.Modal('#imageModal');

    document.querySelectorAll('.timeline-card img, .masonry-item img').forEach(img => {
        img.addEventListener('click', () => {
            document.getElementById('modalImage').src = img.src;
            imageModal.show();
        });
    });
});

