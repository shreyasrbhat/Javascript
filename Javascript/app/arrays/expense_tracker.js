const account = 
    {
        name: "Andrew",
        expenses: [],
        income: [],
        addExpense: function(text, amount){
            this.expenses.push({description: text, 
                      amount: amount}
                )
        },

        addIncome: function(text, amount){
             this.income.push({
                 description: text,
                 amount: amount
             })
        },
        getAccountSummary: function(){
            let total_expense = 0;
            let total_income = 0;
            this.expenses.forEach(function (item){
                total_expense = total_expense + item.amount
            })
            this.income.forEach(function (item){
                total_income = total_income + item.amount
            })
            console.log(`${this.name} has a balence of $${total_income - total_expense}. ${total_income} in income. $${total_expense} in expense`)
        }
    }

account.addExpense('rent', 500)
account.addExpense('project', 300)
account.addExpense('Coffee', 400)
account.addIncome('Job', 10000)
account.getAccountSummary()