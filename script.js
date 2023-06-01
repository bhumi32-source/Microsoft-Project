const transactionForm = document.getElementById('transactionForm');
const transactionList = document.getElementById('transactionList');
const balanceAmount = document.getElementById('balanceAmount');

let transactions = [];


// Function to calculate and update the current balance
function updateBalance() {
    const income = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = income - expenses;
    balanceAmount.textContent = `$${balance.toFixed(2)}`;
}

// Function to render the transaction list
function renderTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add('transaction-item');

        const description = document.createElement('div');
        description.classList.add('transaction-description');
        description.textContent = transaction.description;

        const amount = document.createElement('div');
        amount.classList.add('transaction-amount');
        amount.textContent = `$${transaction.amount.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTransaction(transaction.id));

        listItem.appendChild(description);
        listItem.appendChild(amount);
        listItem.appendChild(deleteButton);

        transactionList.appendChild(listItem);
    });
}

// Function to add a new transaction
function addTransaction(event) {
    event.preventDefault();

    const type = transactionForm.transactionType.value;
    const description = transactionForm.transactionDescription.value;
    const amount = parseFloat(transactionForm.transactionAmount.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        type,
        description,
        amount
    };

    transactions.push(newTransaction);
    renderTransactions();
    updateBalance();

    transactionForm.reset();
}

// Function to delete a transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderTransactions();
    updateBalance();
}

// Event listener for transaction form submission
transactionForm.addEventListener('submit', addTransaction);

// Initialize the application
updateBalance();
renderTransactions();
