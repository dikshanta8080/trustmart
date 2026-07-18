import {
  userProfileData,
  wishlistData,
  purchaseData,
  salesData,
  productsData,
} from './sampleData';

export { userProfileData, wishlistData, purchaseData, salesData, productsData };
export const listings = productsData;
export const users = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 3,
    name: 'David Park',
    email: 'david.park@email.com',
    role: 'User',
    status: 'Pending',
  },
];
