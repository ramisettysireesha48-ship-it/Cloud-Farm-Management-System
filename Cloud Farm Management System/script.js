// ================================
// PAGE NAVIGATION
// ================================

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.add("hidden");

    });


    document
        .getElementById(pageName)
        .classList.remove("hidden");


    const titles = {

        dashboard: "Farm Dashboard",

        crops: "Crop Management",

        activities: "Farm Activities",

        expenses: "Expense Management",

        weather: "Weather Information"

    };


    document.getElementById("pageTitle")
        .textContent = titles[pageName];
}


// ================================
// CROP MANAGEMENT
// ================================

function openCropForm() {

    document
        .getElementById("cropForm")
        .classList.toggle("hidden");
}


function addCrop() {

    const name =
        document.getElementById("cropName").value;

    const area =
        document.getElementById("cropArea").value;

    const season =
        document.getElementById("cropSeason").value;

    const status =
        document.getElementById("cropStatus").value;


    if (name === "" || area === "") {

        alert("Please enter crop name and area.");

        return;
    }


    const table =
        document.getElementById("cropTable");


    const row =
        table.insertRow();


    row.innerHTML = `

        <td>🌱 ${name}</td>

        <td>${area}</td>

        <td>${season}</td>

        <td>

            <span class="status ${status.toLowerCase()}">

                ${status}

            </span>

        </td>

        <td>

            <button
                class="delete"
                onclick="deleteCrop(this)">

                Delete

            </button>

        </td>

    `;


    document.getElementById("cropName").value = "";

    document.getElementById("cropArea").value = "";


    document
        .getElementById("cropForm")
        .classList.add("hidden");


    updateStatistics();

    alert("Crop added successfully!");
}


function deleteCrop(button) {

    const row =
        button.parentElement.parentElement;

    row.remove();

    updateStatistics();
}


// ================================
// UPDATE DASHBOARD STATISTICS
// ================================

function updateStatistics() {

    const rows =
        document
        .getElementById("cropTable")
        .getElementsByTagName("tr");


    let growing = 0;

    let ready = 0;


    for (let i = 0; i < rows.length; i++) {

        const status =
            rows[i]
            .cells[3]
            .innerText
            .trim();


        if (status === "Growing") {

            growing++;

        }


        if (status === "Ready") {

            ready++;

        }

    }


    document.getElementById("totalCrops")
        .innerText = rows.length;


    document.getElementById("growingCrops")
        .innerText = growing;


    document.getElementById("readyCrops")
        .innerText = ready;
}


// ================================
// ACTIVITY MANAGEMENT
// ================================

function addActivity() {

    const activity =
        document.getElementById("activityName").value;

    const crop =
        document.getElementById("activityCrop").value;

    const date =
        document.getElementById("activityDate").value;


    if (
        activity === "" ||
        crop === "" ||
        date === ""
    ) {

        alert("Please fill all activity details.");

        return;
    }


    const table =
        document.getElementById("activityTable");


    const row =
        table.insertRow();


    row.innerHTML = `

        <td>🚜 ${activity}</td>

        <td>${crop}</td>

        <td>${date}</td>

        <td>

            <span class="status growing">

                Completed

            </span>

        </td>

        <td>

            <button
                class="delete"
                onclick="deleteActivity(this)">

                Delete

            </button>

        </td>

    `;


    document.getElementById("activityName").value = "";

    document.getElementById("activityCrop").value = "";

    document.getElementById("activityDate").value = "";


    alert("Activity added successfully!");
}


function deleteActivity(button) {

    button.parentElement.parentElement.remove();

}


// ================================
// EXPENSE MANAGEMENT
// ================================

let totalExpense = 11000;


function addExpense() {

    const name =
        document.getElementById("expenseName").value;

    const amount =
        Number(
            document.getElementById("expenseValue").value
        );


    if (name === "" || amount <= 0) {

        alert("Please enter valid expense details.");

        return;
    }


    const table =
        document.getElementById("expenseTable");


    const row =
        table.insertRow();


    row.innerHTML = `

        <td>💰 ${name}</td>

        <td>₹${amount.toLocaleString()}</td>

        <td>

            <button
                class="delete"
                onclick="deleteExpense(this)">

                Delete

            </button>

        </td>

    `;


    totalExpense += amount;


    updateExpense();


    document.getElementById("expenseName").value = "";

    document.getElementById("expenseValue").value = "";


    alert("Expense added successfully!");
}


function deleteExpense(button) {

    const row =
        button.parentElement.parentElement;


    const amountText =
        row.cells[1].innerText
        .replace("₹", "")
        .replace(/,/g, "");


    const amount =
        Number(amountText);


    totalExpense -= amount;


    row.remove();


    updateExpense();
}


function updateExpense() {

    document.getElementById("expenseAmount")
        .innerText =
        totalExpense.toLocaleString();


    document.getElementById("totalExpenses")
        .innerText =
        "₹" + totalExpense.toLocaleString();
}


// ================================
// INITIALIZE
// ================================

updateStatistics();

updateExpense();