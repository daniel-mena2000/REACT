export type MortgageType = "Repayment" | "Interest Only";

interface MortgageResult {
  monthlyPayment: number;
  totalRepay: number;
}

//Lo que nos va a devolver la funcion es el "pago mensual" y el "pago total"

export function calculateMortgage(
  amount: number,          // Monto del préstamo
  years: number,           // Plazo en años
  interestRate: number,    // Tasa de interés anual (%)
  type: MortgageType
): MortgageResult {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = years * 12;

  if (type === "Repayment") {
    // Fórmula de amortización
    const monthlyPayment =
      (amount *
        monthlyRate *
        Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalRepay = monthlyPayment * totalPayments;

    return {
      monthlyPayment,
      totalRepay,
    };
  }

  if (type === "Interest Only") {
    const monthlyPayment = amount * monthlyRate;
    const totalRepay = monthlyPayment * totalPayments + amount;

    return {
      monthlyPayment,
      totalRepay,
    };
  }

  throw new Error("Tipo de hipoteca no válido");
}
