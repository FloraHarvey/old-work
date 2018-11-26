export const outputPlans = (plans) => {
  plans.forEach(({ supplier, plan, totalCost }) => {
    console.log(`${supplier},${plan},${totalCost}`);
  });
}

export const outputMessage = (message) => {
  console.log(message);
}
