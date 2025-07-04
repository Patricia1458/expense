let expenses = [];

function addExpense() {
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and a positive amount.');
        return;
    }

    const expense = {
        name: name,
        amount: amount
    };

    expenses.push(expense);

    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    updateDisplay();
}

document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

function updateDisplay() {
    const expenseItemsUl = document.getElementById('expenseItems');
    expenseItemsUl.innerHTML = '';

    let total = 0;

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'expense-item';

        const formattedAmount = expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        listItem.innerHTML = `
            <span>${expense.name}</span>
            <span>${formattedAmount}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        expenseItemsUl.appendChild(listItem);
        total += expense.amount;
    });

    const totalAmountDiv = document.getElementById('totalAmount');
    totalAmountDiv.textContent = `Total Spent: ${total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteExpense);
    });
}

function deleteExpense(event) {
    const indexToDelete = parseInt(event.target.dataset.index);
    expenses.splice(indexToDelete, 1);
    updateDisplay();
}

updateDisplay();
