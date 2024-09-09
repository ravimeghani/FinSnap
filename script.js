const balance = document.getElementById(
    "balance"
  );
  const money_plus = document.getElementById(
    "money-plus"
  );
  const money_minus = document.getElementById(
    "money-minus"
  );
  const list = document.getElementById("list");
  const form = document.getElementById("form");
  const text = document.getElementById("text");
  const amount = document.getElementById("amount");

  
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
  

  //Add Transaction
  function addTransaction(){
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add text and amount')
    }else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }
  
  //Generate Random ID
  function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  //Add Trasactions to DOM list
  function addTransactionDOM(transaction) {
    //GET sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }
  
  
  
  //Update the balance income and expence
  function updateValues() {
    let total = 0;
    let income = 0;
    let expense = 0;
  
    // Loop through transactions and calculate total, income, and expense
    for (let i = 0; i < transactions.length; i++) {
      const amount = transactions[i].amount;
      total += amount;
  
      if (amount > 0) {
        income += amount;
      } else {
        expense += amount; // Expense is negative, so no need to multiply by -1 here
      }
    }
  
    // Set the calculated values in DOM
    balance.innerText = `₹${total.toFixed(2)}`;
    money_plus.innerText = `₹${income.toFixed(2)}`;
    money_minus.innerText = `₹${Math.abs(expense).toFixed(2)}`; // Absolute value for expense
  }
  
  //Remove Transaction by ID
  function removeTransaction(id) {
    // Create a new array to hold remaining transactions
    const updatedTransactions = [];
  
    // Loop through the transactions array
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id !== id) {
        updatedTransactions.push(transactions[i]);
      }
    }
  
    // Update the transactions array with the filtered results
    transactions = updatedTransactions;
  
    updateLocalStorage();
    Init();
  }
  
  
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  //Init App
  function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();
