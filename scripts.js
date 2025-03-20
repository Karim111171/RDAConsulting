// Function to navigate through galleries (Blogs, Formations, Accompagnement)
function updateGallery(sectionId, direction) {
    const galleryContainer = document.querySelector(`#${sectionId} .gallery-items`);
    const galleryItems = document.querySelectorAll(`#${sectionId} .gallery-item`);
    
    if (!galleryItems.length || !galleryContainer) return; // Exit if no items are found

    const totalItems = galleryItems.length;
    const visibleItems = 4; // Number of visible items per row

    // Get the current index from the data attribute or default to 0
    let currentIndex = parseInt(galleryContainer.dataset.currentIndex || "0", 10);

    // Update the index based on the direction
    if (direction === 'next') {
        currentIndex = Math.min(currentIndex + visibleItems, totalItems - visibleItems);
    } else if (direction === 'prev') {
        currentIndex = Math.max(currentIndex - visibleItems, 0);
    }

    // Calculate the offset for sliding
    const offset = -currentIndex * (100 / visibleItems);
    galleryContainer.style.transform = `translateX(${offset}%)`;

    // Save the updated index in the data attribute
    galleryContainer.dataset.currentIndex = currentIndex;
}

// Attach event listeners for navigation buttons
document.addEventListener('DOMContentLoaded', () => {
    ['blogs', 'formations', 'accompagnement'].forEach(section => {
        document.querySelector(`#${section} .gallery-control.prev`)?.addEventListener('click', () => {
            updateGallery(section, 'prev');
        });
        document.querySelector(`#${section} .gallery-control.next`)?.addEventListener('click', () => {
            updateGallery(section, 'next');
        });

        // Adding click listener for each gallery item to redirect to URL
        const galleryItems = document.querySelectorAll(`#${section} .gallery-item`);
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const url = item.getAttribute('data-url');
                if (url) {
                    window.location.href = url; // Redirect to the page specified in data-url
                }
            });
        });
    });
});

// Fonction pour ouvrir une modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block'; // Affiche la modal
    }
}

// Fonction pour fermer une modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none'; // Cache la modal
    }
}

// Gérer les événements de clic pour ouvrir les modales
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const modalId = 'modal-' + item.getAttribute('data-url').split('/')[1]; // Id de la modal
        openModal(modalId); // Ouvre la modal
    });
});

// Fermeture des modales quand on clique sur la croix
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        const modalId = closeButton.closest('.modal').id;
        closeModal(modalId); // Ferme la modal
    });
});

// Fermer les modales si l'utilisateur clique à l'extérieur de la fenêtre modale
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id); // Ferme la modal si on clique en dehors de celle-ci
    }
});
/*

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}; */
