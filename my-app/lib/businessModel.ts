export const businessModel = {
  marketplace: {
    commissionPercent: 10, // platform commission percent
    donationPercent: 5, // percent donated from each marketplace sale
  },
  auction: {
    artisanPercent: 70,
    donationPercent: 15,
    platformPercent: 15,
  },
  features: {
    advertising: true,
  },
}

export function fmtPercent(n: number) {
  return `${n}%`
}
