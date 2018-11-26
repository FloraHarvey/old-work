# Price Comparison calculator

## Running the programme
`npm install`
`./bin/comparison /path/to/plans.json`

## Commands

`price ANNUAL_USAGE`
For a given annual kWh consumption produces an annual inclusive of VAT price for all plans available on the market sorted by cheapest first and prints to stdout. Each plan will be printed on its own line in the format SUPPLIER,PLAN,TOTAL_COST. Total cost should be rounded to 2 decimal places, i.e. pounds and pence.

`usage SUPPLIER_NAME PLAN_NAME SPEND`
For the specified plan from a supplier calculates how much energy (in kWh) would be used annually from a monthly spend in pounds (inclusive of VAT) rounded to the nearest kWh and prints this value to stdout

`exit` Leaves the program.

## Running tests
`npm test`
