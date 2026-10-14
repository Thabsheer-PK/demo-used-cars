export const SHOWROOM_INFO = {
  name: "YEM KEY USED CARS",
  tagline: "Kerala's Trusted Premium Pre-Owned Car Showroom",
  phone: "+91 94008 11787",
  phoneRaw: "919400811787",
  whatsappNumber: "919400811787",
  email: "contact@yemkeycars.demo",
  address: "NH-66 Bypass Road, Near Lulu Mall, Edappally, Kochi, Kerala 682024",
  workingHours: "Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 6:00 PM",
  demoCredit: "Demo Website by Dev Canvas Business Solutions",
  demoDisclaimer: "Sample Demo — Vehicle listings are for demonstration only.",
};

export function formatIndianPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLakhPrice(amount: number): string {
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹${cr} Cr`;
  }
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `₹${lakh} Lakh`;
  }
  return formatIndianPrice(amount);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("en-IN").format(km)} km`;
}

export function createWhatsAppUrl(carName?: string, price?: number, regNo?: string): string {
  const base = `https://wa.me/${SHOWROOM_INFO.whatsappNumber}`;
  if (!carName) {
    const text = encodeURIComponent(
      `Hello YEM KEY USED CARS, I am interested in checking your available pre-owned cars in Kerala. Please share current inventory details.`
    );
    return `${base}?text=${text}`;
  }

  const priceText = price ? ` (${formatLakhPrice(price)})` : "";
  const regText = regNo ? ` [Reg: ${regNo}]` : "";
  const message = `Hello YEM KEY USED CARS,\n\nI am interested in your listing:\n🚗 *${carName}*${priceText}${regText}\n\nCould you please share more details, inspection report, and availability for a showroom visit / test drive?`;

  return `${base}?text=${encodeURIComponent(message)}`;
}

export function createGeneralWhatsAppUrl(inquiryTopic?: string): string {
  const base = `https://wa.me/${SHOWROOM_INFO.whatsappNumber}`;
  const text = encodeURIComponent(
    `Hello YEM KEY USED CARS, I have an inquiry regarding ${
      inquiryTopic || "buying/selling a pre-owned car"
    }. Could you please assist me?`
  );
  return `${base}?text=${text}`;
}
