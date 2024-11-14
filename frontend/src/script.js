document.addEventListener("DOMContentLoaded", function () {
    // Cod pentru încărcarea pieselor
    const partsContainer = document.querySelector(".parts-listing");

    const nameInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    const priceInput = document.getElementById("price");

    // Funcția de aplicare a filtrelor
    function applyFilters() {
        const nameQuery = nameInput.value.toLowerCase();
        const categoryQuery = categoryInput.value.toLowerCase();
        const priceQuery = priceInput.value ? parseFloat(priceInput.value) : Infinity;

        // Selectăm toate piesele
        const partItems = document.querySelectorAll(".part-item");

        partItems.forEach(part => {
            const title = part.querySelector("h3").textContent.toLowerCase();
            const category = part.querySelector("p").textContent.toLowerCase();
            const priceText = part.querySelector("p:nth-of-type(2)").textContent;
            const price = parseFloat(priceText.replace("Preț: ", "").replace("EUR", "").trim());

            // Verificăm dacă piesa se potrivește cu filtrele
            const matchesName = title.includes(nameQuery);
            const matchesCategory = category.includes(categoryQuery);
            const matchesPrice = price <= priceQuery;

            // Afișăm piesa dacă se potrivește cu filtrele
            part.style.display = (matchesName && matchesCategory && matchesPrice) ? "block" : "none";
        });
    }

    // Adăugăm evenimente pentru a aplica filtrele la fiecare schimbare a inputurilor
    nameInput.addEventListener("input", applyFilters);
    categoryInput.addEventListener("input", applyFilters);
    priceInput.addEventListener("input", applyFilters);
});
