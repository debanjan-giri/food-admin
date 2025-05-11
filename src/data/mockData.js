// Mock data for the Posto Admin Dashboard

// Restaurant data
export const restaurants = [
  {
    id: 1,
    name: 'Spice Garden',
    address: '123 Main St, Mumbai',
    mobile: '+91 9876543210',
    email: 'contact@spicegarden.com',
    description: 'Authentic Indian cuisine with a modern twist. We specialize in North Indian and Mughlai dishes.',
    openingHours: '10:00 AM - 11:00 PM',
    cuisine: ['North Indian', 'Mughlai', 'Chinese'],
    ordersToday: 45,
    totalOrders: 1245,
    connectedUsers: 320,
    todaySales: 12500,
    subscriptionStatus: 'Pro',
    subscriptionDetails: {
      plan: 'Pro',
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      price: '₹2999/year',
      features: ['No commission on orders', 'Priority customer support', 'Advanced analytics', 'Custom branding']
    },
    tableBookingsToday: 12,
    isBlocked: false,
    rating: 4.5,
    totalReviews: 230,
    joinedDate: '2022-12-10'
  },
  {
    id: 2,
    name: 'Tandoori Nights',
    address: '456 Park Ave, Delhi',
    mobile: '+91 9876543211',
    email: 'info@tandoorinights.com',
    description: 'Experience the rich flavors of North Indian cuisine with our authentic tandoori dishes.',
    openingHours: '11:00 AM - 10:00 PM',
    cuisine: ['North Indian', 'Tandoori', 'Punjabi'],
    ordersToday: 32,
    totalOrders: 987,
    connectedUsers: 210,
    todaySales: 8900,
    subscriptionStatus: 'Freemium',
    subscriptionDetails: {
      plan: 'Freemium',
      startDate: '2023-03-20',
      endDate: 'N/A',
      price: 'Free',
      features: ['Basic analytics', 'Standard support', 'Limited menu items']
    },
    tableBookingsToday: 8,
    isBlocked: false,
    rating: 4.2,
    totalReviews: 180,
    joinedDate: '2023-03-15'
  },
  {
    id: 3,
    name: 'Curry House',
    address: '789 Oak St, Bangalore',
    mobile: '+91 9876543212',
    email: 'support@curryhouse.com',
    description: 'A cozy restaurant offering a variety of Indian curries and international fusion dishes.',
    openingHours: '12:00 PM - 11:00 PM',
    cuisine: ['South Indian', 'Kerala', 'Fusion'],
    ordersToday: 28,
    totalOrders: 765,
    connectedUsers: 180,
    todaySales: 7600,
    subscriptionStatus: 'Pro',
    subscriptionDetails: {
      plan: 'Pro',
      startDate: '2023-02-10',
      endDate: '2024-02-10',
      price: '₹2999/year',
      features: ['No commission on orders', 'Priority customer support', 'Advanced analytics', 'Custom branding']
    },
    tableBookingsToday: 5,
    isBlocked: true,
    rating: 4.0,
    totalReviews: 150,
    joinedDate: '2023-01-25'
  },
  {
    id: 4,
    name: 'Biryani Palace',
    address: '101 Pine St, Hyderabad',
    mobile: '+91 9876543213',
    email: 'hello@biryanipalace.com',
    description: 'Specializing in authentic Hyderabadi biryani and other Andhra delicacies.',
    openingHours: '11:30 AM - 11:30 PM',
    cuisine: ['Hyderabadi', 'Andhra', 'Biryani'],
    ordersToday: 56,
    totalOrders: 1567,
    connectedUsers: 420,
    todaySales: 15800,
    subscriptionStatus: 'Pro',
    subscriptionDetails: {
      plan: 'Pro',
      startDate: '2022-11-05',
      endDate: '2023-11-05',
      price: '₹2999/year',
      features: ['No commission on orders', 'Priority customer support', 'Advanced analytics', 'Custom branding']
    },
    tableBookingsToday: 15,
    isBlocked: false,
    rating: 4.7,
    totalReviews: 320,
    joinedDate: '2022-10-20'
  },
  {
    id: 5,
    name: 'Dosa Corner',
    address: '202 Maple St, Chennai',
    mobile: '+91 9876543214',
    email: 'orders@dosacorner.com',
    description: 'Authentic South Indian restaurant specializing in various types of dosas and idlis.',
    openingHours: '7:00 AM - 10:00 PM',
    cuisine: ['South Indian', 'Tamil', 'Kerala'],
    ordersToday: 38,
    totalOrders: 1123,
    connectedUsers: 290,
    todaySales: 9200,
    subscriptionStatus: 'Freemium',
    subscriptionDetails: {
      plan: 'Freemium',
      startDate: '2023-04-10',
      endDate: 'N/A',
      price: 'Free',
      features: ['Basic analytics', 'Standard support', 'Limited menu items']
    },
    tableBookingsToday: 10,
    isBlocked: false,
    rating: 4.3,
    totalReviews: 210,
    joinedDate: '2023-04-01'
  }
];

// User data
export const users = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Mumbai, Maharashtra',
    phone: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    joinedDate: '2022-05-15',
    status: 'active',
    connectedRestaurants: 5,
    ordersToday: 2,
    totalOrders: 45,
    favoriteRestaurants: ['Spice Garden', 'Tandoori Nights', 'Curry House'],
    subscriptions: ['Premium User', 'Calorie Tracker', 'Food Suggestions'],
    lastActive: '2023-09-25 14:30:00'
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Delhi, Delhi',
    phone: '+91 9876543211',
    email: 'priya.patel@example.com',
    joinedDate: '2022-06-20',
    status: 'active',
    connectedRestaurants: 3,
    ordersToday: 1,
    totalOrders: 32,
    favoriteRestaurants: ['Tandoori Nights', 'Biryani Palace'],
    subscriptions: ['Premium User'],
    lastActive: '2023-09-24 18:45:00'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    location: 'Bangalore, Karnataka',
    phone: '+91 9876543212',
    email: 'amit.kumar@example.com',
    joinedDate: '2022-07-10',
    status: 'suspended',
    connectedRestaurants: 7,
    ordersToday: 0,
    totalOrders: 67,
    favoriteRestaurants: ['Curry House', 'Dosa Corner', 'Spice Garden'],
    subscriptions: [],
    lastActive: '2023-09-20 12:15:00'
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    location: 'Hyderabad, Telangana',
    phone: '+91 9876543213',
    email: 'sneha.gupta@example.com',
    joinedDate: '2022-08-05',
    status: 'active',
    connectedRestaurants: 4,
    ordersToday: 3,
    totalOrders: 51,
    favoriteRestaurants: ['Biryani Palace', 'Curry House'],
    subscriptions: ['Premium User', 'Food Suggestions'],
    lastActive: '2023-09-25 10:30:00'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    location: 'Chennai, Tamil Nadu',
    phone: '+91 9876543214',
    email: 'vikram.singh@example.com',
    joinedDate: '2022-09-15',
    status: 'banned',
    connectedRestaurants: 2,
    ordersToday: 0,
    totalOrders: 28,
    favoriteRestaurants: ['Dosa Corner'],
    subscriptions: [],
    lastActive: '2023-09-15 16:20:00'
  },
  {
    id: 6,
    name: 'Neha Reddy',
    location: 'Pune, Maharashtra',
    phone: '+91 9876543215',
    email: 'neha.reddy@example.com',
    joinedDate: '2022-10-10',
    status: 'active',
    connectedRestaurants: 6,
    ordersToday: 1,
    totalOrders: 39,
    favoriteRestaurants: ['Spice Garden', 'Tandoori Nights', 'Biryani Palace'],
    subscriptions: ['Premium User', 'Calorie Tracker'],
    lastActive: '2023-09-24 20:10:00'
  },
  {
    id: 7,
    name: 'Rajesh Khanna',
    location: 'Kolkata, West Bengal',
    phone: '+91 9876543216',
    email: 'rajesh.khanna@example.com',
    joinedDate: '2022-11-20',
    status: 'active',
    connectedRestaurants: 3,
    ordersToday: 0,
    totalOrders: 22,
    favoriteRestaurants: ['Curry House', 'Dosa Corner'],
    subscriptions: ['Food Suggestions'],
    lastActive: '2023-09-23 14:45:00'
  }
];

// Dashboard stats
export const dashboardStats = {
  totalUsers: 12361,
  activeRestaurants: 243,
  ordersToday: 1243,
  revenueToday: 32435,
  userGrowth: [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 800 },
    { name: 'Apr', users: 1200 },
    { name: 'May', users: 1600 },
    { name: 'Jun', users: 1900 },
    { name: 'Jul', users: 2200 },
  ],
  revenueData: [
    { name: 'Jan', subscription: 4000, ads: 2400, orders: 2400 },
    { name: 'Feb', subscription: 3000, ads: 1398, orders: 2210 },
    { name: 'Mar', subscription: 2000, ads: 9800, orders: 2290 },
    { name: 'Apr', subscription: 2780, ads: 3908, orders: 2000 },
    { name: 'May', subscription: 1890, ads: 4800, orders: 2181 },
    { name: 'Jun', subscription: 2390, ads: 3800, orders: 2500 },
    { name: 'Jul', subscription: 3490, ads: 4300, orders: 2100 },
  ],
  subscriptionDistribution: [
    { name: 'Free', value: 400 },
    { name: 'Basic', value: 300 },
    { name: 'Premium', value: 200 },
    { name: 'Enterprise', value: 100 },
  ]
};

// Order history for users
export const orderHistory = {
  1: [
    {
      id: 1,
      date: '2023-09-25',
      restaurant: 'Spice Garden',
      items: ['Butter Chicken', 'Naan', 'Jeera Rice'],
      amount: 650,
      status: 'Delivered',
      paymentMethod: 'Online Payment'
    },
    {
      id: 2,
      date: '2023-09-20',
      restaurant: 'Tandoori Nights',
      items: ['Paneer Tikka', 'Roti', 'Dal Makhani'],
      amount: 550,
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 3,
      date: '2023-09-15',
      restaurant: 'Curry House',
      items: ['Chicken Biryani', 'Raita'],
      amount: 350,
      status: 'Delivered',
      paymentMethod: 'Online Payment'
    },
    {
      id: 4,
      date: '2023-09-10',
      restaurant: 'Spice Garden',
      items: ['Veg Pulao', 'Paneer Butter Masala', 'Gulab Jamun'],
      amount: 450,
      status: 'Delivered',
      paymentMethod: 'Online Payment'
    },
    {
      id: 5,
      date: '2023-09-05',
      restaurant: 'Biryani Palace',
      items: ['Hyderabadi Biryani', 'Kebab', 'Coke'],
      amount: 400,
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery'
    }
  ]
};

// Billing history for restaurants
export const billingHistory = {
  1: [
    { id: 1, date: '2023-07-01', description: 'Monthly Subscription', amount: 299, status: 'Paid' },
    { id: 2, date: '2023-07-15', description: 'Banner Ad Campaign', amount: 1500, status: 'Paid' },
    { id: 3, date: '2023-08-01', description: 'Monthly Subscription', amount: 299, status: 'Paid' },
    { id: 4, date: '2023-08-10', description: 'Food Ad Promotion', amount: 750, status: 'Paid' },
    { id: 5, date: '2023-09-01', description: 'Monthly Subscription', amount: 299, status: 'Paid' },
    { id: 6, date: '2023-09-20', description: 'SMS Notification Service', amount: 450, status: 'Pending' }
  ]
};

// Feedback messages
export const feedbackMessages = {
  restaurants: {
    1: [
      { id: 1, date: '2023-09-15', message: 'The app is working great, but we need more customization options for our menu items.', status: 'Unread' },
      { id: 2, date: '2023-08-22', message: 'We are having issues with the table booking feature. Sometimes it shows wrong availability.', status: 'Read' },
      { id: 3, date: '2023-07-30', message: 'Thank you for the recent update. The new dashboard is much easier to use.', status: 'Read' }
    ]
  },
  users: {
    1: [
      { id: 1, date: '2023-09-15', message: 'The app is great, but I would like to see more filter options for restaurants.', status: 'Unread' },
      { id: 2, date: '2023-08-22', message: 'I had an issue with a delivery, but customer support resolved it quickly. Great service!', status: 'Read' },
      { id: 3, date: '2023-07-30', message: 'Love the new UI update. Much easier to navigate now.', status: 'Read' }
    ]
  }
};
