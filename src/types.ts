export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: 'Food' | 'Shopping' | 'Transport' | 'Entertainment' | 'Health' | 'Other';
  status: 'Completed' | 'Pending';
}

export interface CreditCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  limit: number;
  type: 'Visa' | 'Mastercard';
  color: string;
  isFrozen: boolean;
}

export const MOCK_CARDS: CreditCard[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 4242',
    cardHolder: 'YOGESH MARVEL',
    expiryDate: '12/26',
    cvv: '123',
    balance: 2450.50,
    limit: 5000,
    type: 'Visa',
    color: 'bg-zinc-900',
    isFrozen: false,
  },
  {
    id: '2',
    cardNumber: '**** **** **** 8888',
    cardHolder: 'YOGESH MARVEL',
    expiryDate: '08/25',
    cvv: '456',
    balance: 120.00,
    limit: 2000,
    type: 'Mastercard',
    color: 'bg-indigo-600',
    isFrozen: false,
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-03-01', merchant: 'Apple Store', amount: -999.00, category: 'Shopping', status: 'Completed' },
  { id: '2', date: '2024-03-02', merchant: 'Starbucks', amount: -5.50, category: 'Food', status: 'Completed' },
  { id: '3', date: '2024-03-03', merchant: 'Uber', amount: -15.20, category: 'Transport', status: 'Completed' },
  { id: '4', date: '2024-03-04', merchant: 'Netflix', amount: -12.99, category: 'Entertainment', status: 'Pending' },
  { id: '5', date: '2024-03-05', merchant: 'Whole Foods', amount: -85.40, category: 'Food', status: 'Completed' },
  { id: '6', date: '2024-03-05', merchant: 'Gym Membership', amount: -45.00, category: 'Health', status: 'Completed' },
];
