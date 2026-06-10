// Live Clock
setInterval(() => {
    document.getElementById("time").innerHTML =
        "🕒 Current Time: " + new Date().toLocaleTimeString();
}, 1000);

// Fare Prediction Function
function compareFare() {

    let pickup = document.getElementById("pickup").value;
    let destination = document.getElementById("destination").value;
    let distance = Number(document.getElementById("distance").value);

    let vehicle = document.getElementById("vehicle").value;
    let traffic = document.getElementById("traffic").value;
    let peak = document.getElementById("peak").checked;

    if (pickup === "" || destination === "" || distance <= 0) {
        alert("Please fill all details correctly");
        return;
    }

    // Vehicle Rate
    let rate;

    if (vehicle === "bike") {
        rate = 8;
    } else if (vehicle === "auto") {
        rate = 12;
    } else {
        rate = 18;
    }

    // Base Fare Calculation
    let fare = 40 + (distance * rate);

    // Traffic Charges
    if (traffic === "medium") {
        fare += fare * 0.10;
    }

    if (traffic === "high") {
        fare += fare * 0.25;
    }

    // Peak Hour Charges
    if (peak) {
        fare += fare * 0.15;
    }

    fare = Math.round(fare);

    // Company Fare Comparison
    let ola = fare + 20;
    let uber = fare + 35;
    let rapido = fare - 10;

    document.getElementById("fareCards").innerHTML = `
        <div class="card">🚖 Ola : ₹${ola}</div>
        <div class="card">🚕 Uber : ₹${uber}</div>
        <div class="card">🏍️ Rapido : ₹${rapido}</div>
    `;

    // Cheapest Ride
    let cheapest = "Rapido";

    if (ola < rapido && ola < uber) {
        cheapest = "Ola";
    }

    if (uber < rapido && uber < ola) {
        cheapest = "Uber";
    }

    document.getElementById("result").innerHTML =
        "💰 Cheapest Ride: " + cheapest;

    // Confidence Percentage
    let confidence;

    if (traffic === "low") {
        confidence = 95;
    } else if (traffic === "medium") {
        confidence = 92;
    } else {
        confidence = 88;
    }

    if (peak) {
        confidence -= 3;
    }

    // Ride Summary
    document.getElementById("summary").innerHTML = `
        <h3>📋 Ride Summary</h3>

        📍 <b>Pickup:</b> ${pickup}<br><br>

        🏁 <b>Destination:</b> ${destination}<br><br>

        📏 <b>Distance:</b> ${distance} km<br><br>

        🚗 <b>Vehicle:</b> ${vehicle.toUpperCase()}<br><br>

        🚦 <b>Traffic:</b> ${traffic.toUpperCase()}<br><br>

        ⏰ <b>Peak Hour:</b> ${peak ? "Yes" : "No"}<br><br>

        🤖 <b>Prediction Confidence:</b> ${confidence}%<br><br>

        📊 <b>Estimated Accuracy:</b> ${confidence}%<br><br>

        ⚠ <b>Note:</b> Actual fare may vary depending on traffic,
        route and surge pricing.
    `;
}

// Feedback Function
function submitFeedback() {

    let feedback =
        document.getElementById("feedback").value;

    if (feedback === "") {
        alert("Please enter feedback");
        return;
    }

    document.getElementById("feedbackMsg").innerHTML =
        "✅ Thank you for your feedback!";

    document.getElementById("feedback").value = "";
}