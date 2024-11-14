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
    })
    function searchParts() {
        console.log("Funcția searchParts a fost apelată"); // Linie de testare pentru a verifica dacă funcția este apelată

        // Preia valoarea din câmpul de căutare și convertește la litere mici pentru a face căutarea insensibilă la majuscule
        const query = document.getElementById('search-input').value.toLowerCase();
        // Selectează toate elementele de anunțuri
        const parts = document.querySelectorAll('.part-item');

        // Parcurge toate anunțurile și afișează doar cele care se potrivesc cu termenul de căutare
        parts.forEach(part => {
            // Extrage textul din titlu și categorie pentru fiecare anunț
            const title = part.querySelector('h3').textContent.toLowerCase();
            const category = part.querySelector('p').textContent.toLowerCase();

            // Verifică dacă titlul sau categoria conține textul căutat
            if (title.includes(query) || category.includes(query)) {
                part.style.display = 'block';  // Afișează anunțul dacă se potrivește
            } else {
                part.style.display = 'none';   // Ascunde anunțul dacă nu se potrivește
            }
        });
    }
    
});
