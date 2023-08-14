document.getElementById("mailForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const mail = document.getElementById("mail").value;
    const to = document.getElementById("to").value;
    const sub = document.getElementById("sub").value;
    const mes = document.getElementById("mes").value;

    // Échapper les caractères spéciaux dans le message (si nécessaire)
    const escapedMes = mes.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    // Construire l'objet de données à envoyer
    const data = new URLSearchParams();
    data.append("name", fname);
    data.append("sender", mail);
    data.append("email", to);
    data.append("subject", sub);
    data.append("message", escapedMes);

    // Effectuer la requête POST avec les données saisies
    fetch("https://mon.smtp/mail.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString(),
    })
    .then((response) => response.text())
    .then((result) => {
        document.getElementById("result").textContent = "Requête envoyée avec succès!";
    })
    .catch((error) => {
        document.getElementById("result").textContent = "Erreur lors de l'envoi de la requête.";
    });
});
