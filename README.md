# Loan utils

Project with different functions to calculate:

 -The minimun payment of a mortgage

**Example parameters**:

Loan = 150000.00

Interest Rate: 7.5%, //format like 0.075

Loan Length: 30 years, //format in months

```
import { getMonthlyPayment } from 'mortgate';

const monthlyPayment = getMonthlyPayment(150e3, 7.5e-2, 30*12);
```
 
 -The loan lenght of a mortgage

 **Example parameters**:

Loan = 150000.00

Interest Rate: 7.5%, //format like 0.075

Mountly Payment: 2000.00

```
import { getLoanLength } from 'mortgate';

const newLoanLenght = getLoanLength(150e3, 7.5e-2, 2000);
```

 -The amortization table of the payoffs

 **Example parameters**:

Loan = 200000.00

Interest Rate: 7.5% //format like 0.075

Loan Length: 30 years //format in months

Extra Payment = 1000

Initial Date: number = Date.now() //format milliseconds

Times Interest Compounds = 12 //default 12
 
```
import { getMortgagePayoff } from 'mortgate';

const payoffData = getMortgagePayoff(2e5, 7.5e-2, 30 * 12, 1000);

//payoffData
{
    mountlyPayment: 1398.429017105553,
    extraPrincipal: 0,
    interestRate: 0.075,
    defaultTotalInterest: 303434.44615799905,
    totalInterestWithSavings: 303434.4461580063,
    loan: 200000,
    defaultLoanLength: 360,
    loanLength: 360,
    startDate: 2020-09-28T08:44:15.873Z,
    endDate: 2050-08-28T08:44:15.873Z,
    defaultEndDate: 2050-08-28T08:44:15.873Z,
    data: [{
            date: 2050-09-28T08:44:15.873Z,
            interest: 1250,
            principal: 148.42901710555293,
            principalExtra: 148.42901710555293,
            balance: 199851.57098289445,
            type: 'row'
          },
          {
            date: 2050-09-28T08:44:15.873Z,
            interest: 1249.0723186430903,
            principal: 149.35669846246265,
            principalExtra: 149.35669846246265,
            balance: 199702.214284432,
            type: 'row'
          },
          ...
        ]
    }

```
 
 -Calculate simple interest and amortizing interest

 **Total interest for a loan paying only the minimum monthly payment**
 Use this function when you are going to calculate the lifetime interest using the minimun mountly payment.

Loan = 200000.00

Interest Rate: 7.5% //format like 0.075

Loan Length: 30 years //format in months
```
import { getTotalInterest } from 'mortgate';


const lifetimeInterest = getTotalInterest(2e5, 7.5e-2, 30 * 12);
```

 **Total interest for a loan paying a custom monthly payment**
 Note: It could vary in a few decimal places far from the function getTotalInterest, by the method of recalculation of interest. 
 
 **Example of variation**

Using getTotalInterest: 303434.44615799905

Using getTotalAmortizingInterest: 303434.4461580063

Use getTotalAmortizingInterest if there is an Extra Payment Amount for the monthly payment

Example

Loan = 200000.00

Interest Rate: 7.5% //format like 0.075

Mountly Payment: 2000
```
import { getTotalAmortizingInterest } from 'mortgate';


const lifetimeInterest = getTotalAmortizingInterest(2e5, 7.5e-2, 2000);
```

