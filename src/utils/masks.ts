export const moneyMask = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');

  const formattedValue = parseFloat(numericValue) / 100;

  return formattedValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
