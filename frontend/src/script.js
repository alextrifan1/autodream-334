document.addEventListener("DOMContentLoaded", function () {
    // Cod pentru încărcarea anunțului
    fetch("/api/getListing?id=123")
        .then(response => response.json())
        .then(data => {
            document.getElementById("title").textContent = data.title;
            document.getElementById("category").textContent = `Categorie: ${data.category}`;
            document.getElementById("make").textContent = `Marca: ${data.make}`;
            document.getElementById("model").textContent = `Model: ${data.model}`;
            document.getElementById("year").textContent = `An de fabricație: ${data.year}`;
            document.getElementById("price").textContent = `Preț: ${data.price} EUR`;
            document.getElementById("description").textContent = data.description;

            const imagesContainer = document.getElementById("images");
            imagesContainer.innerHTML = '';
            data.images.forEach(imageUrl => {
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = "Imagine produs";
                imgElement.classList.add("product-image");
                imagesContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Eroare la încărcarea anunțului:", error));

    // Deschiderea ferestrei modale
    const sendMessageBtn = document.getElementById("sendMessageBtn");
    const messageModal = document.getElementById("messageModal");
    const closeBtn = document.querySelector(".close");

    sendMessageBtn.addEventListener("click", function() {
        messageModal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        messageModal.style.display = "none";
    });

    // Închiderea ferestrei modale când utilizatorul face click în afară
    window.addEventListener("click", function(event) {
        if (event.target === messageModal) {
            messageModal.style.display = "none";
        }
    });

    // Trimiterea mesajului
    const messageForm = document.getElementById("messageForm");
    messageForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const message = document.getElementById("messageText").value;
        console.log("Mesaj trimis:", message);
        // Aici poți trimite mesajul printr-un API sau să îl salvezi într-o bază de date
        messageModal.style.display = "none"; // Închide modalul după trimiterea mesajului
    });

});
