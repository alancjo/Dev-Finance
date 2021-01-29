const Modal = {
    open() {
        // Abrir modal 
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active');
    },
    close() { 
        // fechar o modal 
        // remover a class active do modal
        document 
            .querySelector('.modal-overlay')
            .classList
            .remove('active') ;   
    }
}

const transactions = [
    {
        description: 'Luz', 
        amount: -50000, // o valor real é R$ 500,00
        date: '23/01/2021',
    },
    {
        description: 'Website', 
        amount: 500000,
        date: '15/01/2021',
    },
    {
        description: 'Internet', 
        amount: -36250,
        date: '12/01/2021',
    },
    {
        description: 'App', 
        amount: 600,
        date: '12/01/2021',
    }
]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);
        console.log(Transaction.all)

        App.reload();
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income;
    }, 
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense; 
    }, 
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction); 

        DOM.transactionsContainer.appendChild(tr)
    },    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
        <td class="description">${transaction.description}</td>
        <td class=${CSSclass}>${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html;
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById('expenseExpense')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransaction() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;
    }
}

const App = {
    init() {

        transactions.forEach(transaction => DOM.addTransaction(transaction));
        
        DOM.updateBalance();
    }, 
    reload() {
        DOM.clearTransaction();
        App.init();
    },
}

App.init(); 
