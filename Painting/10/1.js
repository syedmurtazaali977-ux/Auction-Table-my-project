document.addEventListener('DOMContentLoaded', () => {
            const currentBidElement = document.getElementById('current-bid');
            const startingBidElement = document.getElementById('starting-bid');
            const bidAmountInput = document.getElementById('bid-amount');
            const placeBidBtn = document.getElementById('place-bid-btn');
            const bidMessage = document.getElementById('bid-message');
            const timeLeftElement = document.getElementById('time-left');
            // --- Bid functionality ---
            placeBidBtn.addEventListener('click', () => {
                const newBid = parseFloat(bidAmountInput.value);
                const currentBid = parseFloat(currentBidElement.textContent);
                const startingBid = parseFloat(startingBidElement.textContent);
                bidMessage.textContent = ''; // Clear previous messages
                if (isNaN(newBid) || newBid <= 0) {
                    bidMessage.style.color = 'red';
                    bidMessage.textContent = 'Please enter a valid bid amount.';
                    return;
                }
                if (newBid <= currentBid) {
                    bidMessage.style.color = 'red';
                    bidMessage.textContent = `Your bid must be higher than the current bid of $${currentBid}.`;
                    return;
                }
                if (newBid < startingBid) {
                    bidMessage.style.color = 'red';
                    bidMessage.textContent = `Your bid must be at least the starting bid of $${startingBid}.`;
                    return;
                }
                currentBidElement.textContent = newBid.toFixed(0); // Update with the new bid, fixed to 0 decimal places
                bidAmountInput.value = ''; // Clear the input field
                bidMessage.style.color = 'green';
                bidMessage.textContent = 'Bid placed successfully!';
            });
            // --- Timer functionality ---
            const auctionEndDate = new Date();
            auctionEndDate.setDate(auctionEndDate.getDate() + 14);
            auctionEndDate.setHours(auctionEndDate.getHours() + 9);
            auctionEndDate.setMinutes(auctionEndDate.getMinutes() + 23);
            auctionEndDate.setSeconds(auctionEndDate.getSeconds() + 22);
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = auctionEndDate - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance < 0) {
                    clearInterval(countdownInterval);
                    timeLeftElement.textContent = "Auction Ended!";
                    placeBidBtn.disabled = true;
                    bidAmountInput.disabled = true;
                    bidMessage.style.color = 'red';
                    bidMessage.textContent = 'This auction has concluded.';
                    return;
                }
                timeLeftElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
            updateCountdown();
            const countdownInterval = setInterval(updateCountdown, 1000);
        });