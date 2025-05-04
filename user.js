// innerhtml

window.onload = function () {
    const welcomeuser = document.getElementById("welcomeuser");

    let loggedAccount = localStorage.getItem("loggedAccount");

    if (loggedAccount) {
        let registerLog = JSON.parse(localStorage.getItem(loggedAccount));

        if (registerLog && registerLog.username) {
            welcomeuser.innerHTML = `<i class="fa-solid fa-user fa-fade me-2"></i>Welcome ${registerLog.username}`;
        } else {
            welcomeuser.innerHTML = `<i class="fa-solid fa-user fa-fade me-2"></i>Welcome User`;
        }
    } else {
        welcomeuser.innerHTML = `<i class="fa-solid fa-user fa-fade me-2"></i>Welcome User`;
    }
};

// logout

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("loggedAccount");
        window.location = './index.html';
    }
}

let totalIncome = 0;
let totalExpense = 0;
const expenseEntries = [];

let incomeChart;
let expenseChart;

// Add Income
function AddIncome() {
    const incomeType = document.getElementById("incometype").value.trim();
    const incomeAmount = parseFloat(document.getElementById("incomeAmount").value);

    if (!incomeType || isNaN(incomeAmount) || incomeAmount <= 0) {
        alert("Please enter a valid income type and amount.");
        return;
    }

    totalIncome += incomeAmount;
    updateDisplay();

    const balance = totalIncome - totalExpense;
    const now = new Date().toLocaleString();

    const row = `
        <tr>
            <td>${incomeType}</td>
            <td>${incomeAmount} Rs</td>
            <td>${balance} Rs</td>
            <td>${now}</td>
        </tr>
    `;

    document.getElementById("incomeDetailes").innerHTML += row;

    document.getElementById("incometype").value = "";
    document.getElementById("incomeAmount").value = "";

    alert(`Income of ${incomeAmount} Rs added successfully as ${incomeType}.`);
}

// Add Expense
function AddExpense() {
    const expenseType = document.getElementById("expensetype").value.trim();
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

    if (!expenseType || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense type and amount.");
        return;
    }

    totalExpense += expenseAmount;
    updateDisplay();

    const balance = totalIncome - totalExpense;
    const now = new Date().toLocaleString();

    expenseEntries.push({ type: expenseType, amount: expenseAmount });

    const row = `
        <tr>
            <td>${expenseType}</td>
            <td>${expenseAmount} Rs</td>
            <td>${balance} Rs</td>
            <td>${now}</td>
        </tr>
    `;

    document.getElementById("expenseDetailes").innerHTML += row;

    document.getElementById("expensetype").value = "";
    document.getElementById("expenseAmount").value = "";

    alert(`Expense of ${expenseAmount} Rs added successfully as ${expenseType}.`);
}

// Update Display 
function updateDisplay() {
    const balance = totalIncome - totalExpense;
    document.getElementById("balanceDisplay").innerHTML = `${balance} Rs`;
    document.getElementById("expDisplay").innerHTML = `${totalExpense} Rs`;
}

// Clear All Data
function clearAll() {
    const confirmation = confirm("Are you sure you want to clear all data?");

    if (confirmation) {
        totalIncome = 0;
        totalExpense = 0;
        expenseEntries.length = 0;

        document.getElementById("incometype").value = "";
        document.getElementById("incomeAmount").value = "";
        document.getElementById("expensetype").value = "";
        document.getElementById("expenseAmount").value = "";

        document.getElementById("balanceDisplay").innerHTML = "0 Rs";
        document.getElementById("expDisplay").innerHTML = "0 Rs";
        document.getElementById("incomeDetailes").innerHTML = "";
        document.getElementById("expenseDetailes").innerHTML = "";

        if (expenseChart) expenseChart.destroy();

        alert("All data cleared successfully.");
    } else {
        alert("Clear operation was canceled.");
    }
}

// Expense Pie Chart 
function displaypie() {
    const remainingBalance = totalIncome - totalExpense;

    const ctx = document.getElementById("piechart").getContext("2d");

    //  labels and data 
    const labels = expenseEntries.map(entry => entry.type);
    const data = expenseEntries.map(entry => entry.amount);

    labels.push("Remaining Balance");
    data.push(remainingBalance);

    if (expenseChart) {
        expenseChart.destroy();
    }

    //  Pie Chart
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expense Breakdown',
                data: data,
                backgroundColor: generateColors(data.length - 1).concat('rgba(0, 123, 255, 0.7)'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Colors for Expense 
function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
    }
    return colors;
}
