// Obiect pentru a stoca licitațiile curente pentru fiecare mașină
const auctions = {
    "2021 Ferrari SF90": { highestBid: 300000, currentBidder: "No bids yet" },
    "1965 Ford Mustang": { highestBid: 50000, currentBidder: "No bids yet" },
    "2020 Porsche 911": { highestBid: 150000, currentBidder: "No bids yet" },
};

// Funcție pentru a deschide pop-up-ul cu detalii despre licitație
function openPopup(carName, highestBid, highestBidder) {
    document.getElementById('popup-car-name').textContent = carName;
    document.getElementById('current-highest-bid').textContent = `Current Highest Bid: $${highestBid}`;
    document.getElementById('highest-bidder').textContent = highestBidder || "No bids yet";
    document.getElementById('bid-popup').classList.remove('hidden');
}

// Funcție pentru a plasa un bid nou
function placeNewBid() {
    let carName = document.getElementById('popup-car-name').textContent;
    let bidAmount = parseFloat(prompt("Enter your bid amount:"));
    
    if (!isNaN(bidAmount) && bidAmount > auctions[carName].highestBid) {
        auctions[carName].highestBid = bidAmount;
        auctions[carName].currentBidder = "Anonymous"; // Poți înlocui cu numele utilizatorului
        alert(`Your bid of $${bidAmount} has been placed!`);
        updateAuctionDisplay(carName);
        closePopup();
    } else {
        alert("Your bid must be higher than the current highest bid.");
    }
}

// Funcție pentru actualizarea afișării licitației pentru o anumită mașină
function updateAuctionDisplay(carName) {
    const auctionItem = document.querySelector(`[data-car="${carName}"]`);
    if (auctionItem) {
        auctionItem.querySelector(".highest-bid").textContent = `Current Highest Bid: $${auctions[carName].highestBid}`;
    }
}

// Funcție pentru închiderea pop-up-ului
function closePopup() {
    document.getElementById('bid-popup hidden').classList.add('hidden');
}

// Eveniment pentru toate butoanele "Place Bid"
document.addEventListener("DOMContentLoaded", function () {
    const bidButtons = document.querySelectorAll(".place-bid-btn");
    bidButtons.forEach(button => {
        button.addEventListener("click", function () {
            const carName = this.getAttribute("data-car");
            openPopup(carName, auctions[carName].highestBid, auctions[carName].currentBidder);
        });
    });

    // Eveniment pentru butonul "Place a New Bid" din pop-up
    const placeBidButton = document.getElementById("place-new-bid-btn");
    placeBidButton.addEventListener("click", placeNewBid);

    // Închiderea pop-up-ului atunci când se face click în afara acestuia
    const popup = document.getElementById('bid-popup');
    popup.addEventListener('click', function(event) {
        // Verificăm dacă clicul a fost pe fundalul pop-up-ului (nu pe conținutul pop-up-ului)
        if (event.target === popup) {
            closePopup();
        }
    });
});
