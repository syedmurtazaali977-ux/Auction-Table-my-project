document.addEventListener('DOMContentLoaded', () => {
    
    // New: Handle auction card expansion
    const auctionCards = document.querySelectorAll('.auction-card');

    auctionCards.forEach(card => {
        const cardSummary = card.querySelector('.card-summary');
        const expandBtn = card.querySelector('.expand-btn');
        const expandedDetails = card.querySelector('.card-expanded-details');


        
        expandBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Stop click from affecting the cardSummary handler
            card.classList.toggle('expanded');
        });
    });
});