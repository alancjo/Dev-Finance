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
        id: 1, 
        description: 'Luz', 
        amount: -50000, // o valor real é R$ 500,00
        date: '23/01/2021',
    },
    {
        id: 2, 
        description: 'Website', 
        amount: 500000,
        date: '15/01/2021',
    },
    {
        id: 3, 
        description: 'Internet', 
        amount: -36250,
        date: '12/01/2021',
    },
    {
        id: 4, 
        description: 'App', 
        amount: 600,
        date: '12/01/2021',
    }
]

const Transaction = {
//     incomes() {
//         // somar as entradas
//     }, 
//     expenses() {
//         // somar as saídas 
//     }, 
//     total() {
//         // entradas - saídas
//     }
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
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
    }
}


transactions.forEach(element => DOM.addTransaction(element));


