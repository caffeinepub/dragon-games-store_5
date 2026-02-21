export function generateWhatsAppUrl(price: number): string {
  const phoneNumber = '918757242955';
  const message = `Hey! I want to order 🛍️ a game from Dragon games store 🎮 price: ₹${price}/-`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
