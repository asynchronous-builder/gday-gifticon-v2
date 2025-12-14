export const categories = [
  { id: 'coffee', name: 'Coffee', emoji: '☕', variant: 'tertiary' as const },
  { id: 'food', name: 'Food', emoji: '🍽️', variant: 'secondary' as const },
  { id: 'flowers', name: 'Flowers', emoji: '🌸', variant: 'quaternary' as const },
  { id: 'beauty', name: 'Beauty', emoji: '💄', variant: 'default' as const },
  { id: 'experiences', name: 'Experiences', emoji: '🎯', variant: 'secondary' as const },
];

export const businesses = [
  {
    id: 1,
    name: "Blue Mountain Coffee",
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU3MzcyMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    distance: "0.2 km",
    availableAmounts: [15, 25, 40, 60],
    description: "Premium coffee beans and artisanal pastries",
    accentColor: 'tertiary' as const
  },
  {
    id: 2,
    name: "Harvest Bistro",
    category: "Food",
    image: "https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzU3MzU2NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    distance: "0.5 km",
    availableAmounts: [35, 50, 75, 100],
    description: "Fresh, seasonal Australian cuisine",
    accentColor: 'secondary' as const
  },
  {
    id: 3,
    name: "Petals & Blooms",
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1652346064068-1ae0d97502c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBib3VxdWV0JTIwZ2lmdHxlbnwxfHx8fDE3NTczMTY2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    distance: "0.8 km",
    availableAmounts: [30, 45, 65, 120],
    description: "Beautiful flower arrangements and bouquets",
    accentColor: 'quaternary' as const
  },
  {
    id: 4,
    name: "Zen Beauty Spa",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1750271336429-8b0a507785c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzcGElMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTczNzIxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    distance: "1.2 km",
    availableAmounts: [50, 80, 120, 200],
    description: "Relaxing spa treatments and wellness",
    accentColor: 'default' as const
  }
];

export const mockGifticons = {
  received: [
    {
      id: 1,
      businessName: "Blue Mountain Coffee",
      amount: 40,
      product: "Coffee Experience",
      expiryDate: "2025-06-15",
      status: "active",
      qrCode: "QR123456",
      message: "Happy Birthday! Enjoy your favorite coffee ☕",
      from: "Sarah Johnson",
      emoji: "☕"
    },
    {
      id: 2,
      businessName: "Harvest Bistro",
      amount: 75,
      product: "Chef's Tasting Menu",
      expiryDate: "2025-04-20",
      status: "active",
      qrCode: "QR789012",
      message: "Congratulations on your promotion!",
      from: "Mike Chen",
      emoji: "🍽️"
    },
    {
      id: 3,
      businessName: "Zen Beauty Spa",
      amount: 50,
      product: "Relaxation Package",
      expiryDate: "2025-01-15",
      status: "expiring_soon",
      qrCode: "QR345678",
      message: "Treat yourself! You deserve it 💆‍♀️",
      from: "Emma Wilson",
      emoji: "💆‍♀️"
    }
  ],
  purchased: [
    {
      id: 4,
      businessName: "Petals & Blooms",
      amount: 120,
      product: "Event Florals",
      purchaseDate: "2024-12-25",
      status: "sent",
      recipient: "Mom",
      message: "Merry Christmas, Mom! Love you ❤️",
      emoji: "🌸"
    },
    {
      id: 5,
      businessName: "Blue Mountain Coffee",
      amount: 25,
      product: "Premium Blend Package",
      purchaseDate: "2024-12-20",
      status: "pending",
      recipient: "Alex Thompson",
      message: "Thanks for helping me move!",
      emoji: "☕"
    }
  ]
};
