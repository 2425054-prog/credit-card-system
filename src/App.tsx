import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CreditCard as CardIcon, 
  History, 
  Settings, 
  Plus, 
  Bell, 
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
  ShieldCheck,
  Lock,
  Unlock,
  LogOut,
  User
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_CARDS, MOCK_TRANSACTIONS, type CreditCard, type Transaction } from './types';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
    )}
  >
    <Icon size={20} className={cn("transition-transform duration-200 group-hover:scale-110", active ? "text-white" : "text-zinc-400 group-hover:text-zinc-900")} />
    <span className="font-medium">{label}</span>
  </button>
);

const CardWidget = ({ card }: { card: CreditCard, key?: React.Key }) => (
  <div className={cn("relative w-full h-52 rounded-2xl p-6 text-white overflow-hidden shadow-xl", card.color)}>
    <div className="absolute top-0 right-0 p-6 opacity-20">
      <CardIcon size={120} />
    </div>
    <div className="relative h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium opacity-70 uppercase tracking-wider">Balance</p>
          <p className="text-2xl font-bold mt-1">${card.balance.toLocaleString()}</p>
        </div>
        <div className="text-xl font-bold italic">{card.type}</div>
      </div>
      <div>
        <p className="text-lg tracking-[0.2em] font-mono">{card.cardNumber}</p>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-[10px] opacity-70 uppercase">Card Holder</p>
            <p className="text-sm font-medium">{card.cardHolder}</p>
          </div>
          <div>
            <p className="text-[10px] opacity-70 uppercase">Expires</p>
            <p className="text-sm font-medium">{card.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TransactionItem = ({ transaction }: { transaction: Transaction, key?: React.Key }) => (
  <div className="flex items-center justify-between p-4 hover:bg-zinc-50 rounded-xl transition-colors group">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        transaction.amount < 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
      )}>
        {transaction.amount < 0 ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
      </div>
      <div>
        <p className="font-semibold text-zinc-900">{transaction.merchant}</p>
        <p className="text-xs text-zinc-500">{transaction.date} • {transaction.category}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={cn("font-bold", transaction.amount < 0 ? "text-zinc-900" : "text-emerald-600")}>
        {transaction.amount < 0 ? "" : "+"}${Math.abs(transaction.amount).toFixed(2)}
      </p>
      <p className={cn("text-[10px] font-medium uppercase", transaction.status === 'Pending' ? "text-amber-500" : "text-zinc-400")}>
        {transaction.status}
      </p>
    </div>
  </div>
);

// --- Pages ---

const Dashboard = () => {
  const chartData = [
    { name: 'Jan', amount: 2400 },
    { name: 'Feb', amount: 1398 },
    { name: 'Mar', amount: 9800 },
    { name: 'Apr', amount: 3908 },
    { name: 'May', amount: 4800 },
    { name: 'Jun', amount: 3800 },
    { name: 'Jul', amount: 4300 },
  ];

  const pieData = [
    { name: 'Food', value: 400 },
    { name: 'Shopping', value: 300 },
    { name: 'Transport', value: 300 },
    { name: 'Entertainment', value: 200 },
  ];

  const COLORS = ['#18181b', '#4f46e5', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-900">My Cards</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <Plus size={16} /> Add Card
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_CARDS.map(card => <CardWidget key={card.id} card={card} />)}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Spending Overview</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Recent Transactions</h2>
            <div className="space-y-2">
              {MOCK_TRANSACTIONS.slice(0, 5).map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors border-t border-zinc-50">
              View All Transactions
            </button>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Category Breakdown</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-zinc-500">{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const CardsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">My Cards</h1>
          <p className="text-zinc-500 mt-1">Manage your credit and debit cards</p>
        </div>
        <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200">
          <Plus size={20} /> Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CARDS.map(card => (
          <div key={card.id} className="space-y-4">
            <CardWidget card={card} />
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Card Status</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                  card.isFrozen ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  {card.isFrozen ? 'Frozen' : 'Active'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Credit Limit</span>
                <span className="text-sm font-bold text-zinc-900">${card.limit.toLocaleString()}</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${(card.balance / card.limit) * 100}%` }} 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-2 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                  {card.isFrozen ? <Unlock size={16} /> : <Lock size={16} />}
                  {card.isFrozen ? 'Unfreeze' : 'Freeze'}
                </button>
                <button className="flex-1 py-2 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                  <Settings size={16} /> Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TransactionsPage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Food', 'Shopping', 'Transport', 'Entertainment', 'Health'];

  const filteredTransactions = useMemo(() => {
    if (filter === 'All') return MOCK_TRANSACTIONS;
    return MOCK_TRANSACTIONS.filter(t => t.category === filter);
  }, [filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Transactions</h1>
          <p className="text-zinc-500 mt-1">Track your spending history</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
          <Search size={18} className="text-zinc-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search merchants..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              filter === cat 
                ? "bg-zinc-900 text-white shadow-md" 
                : "bg-white text-zinc-500 border border-zinc-100 hover:border-zinc-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
          <h3 className="font-bold text-zinc-900">Transaction History</h3>
          <button className="text-sm text-indigo-600 font-medium">Download CSV</button>
        </div>
        <div className="divide-y divide-zinc-50">
          {filteredTransactions.map(tx => (
            <div key={tx.id} className="p-2">
              <TransactionItem transaction={tx} />
            </div>
          ))}
        </div>
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-400">No transactions found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
        <p className="text-zinc-500 mt-1">Manage your account and security preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-zinc-100 rounded-full mx-auto flex items-center justify-center text-zinc-400 mb-4 border-4 border-white shadow-inner">
              <User size={48} />
            </div>
            <h3 className="font-bold text-zinc-900">Yogesh Marvel</h3>
            <p className="text-sm text-zinc-500">yogesh@example.com</p>
            <button className="mt-4 w-full py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm space-y-4">
            <h4 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Account Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Member Since</span>
                <span className="font-medium">Jan 2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Account Type</span>
                <span className="font-medium text-indigo-600">Premium</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm space-y-6">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" /> Security Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-zinc-900">Two-Factor Authentication</p>
                  <p className="text-xs text-zinc-500">Add an extra layer of security to your account</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-50">
                <div>
                  <p className="font-medium text-zinc-900">Biometric Login</p>
                  <p className="text-xs text-zinc-500">Use FaceID or Fingerprint to unlock the app</p>
                </div>
                <div className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-50">
                <div>
                  <p className="font-medium text-zinc-900">Transaction Alerts</p>
                  <p className="text-xs text-zinc-500">Get notified for every purchase over $50</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm space-y-6">
            <h3 className="font-bold text-zinc-900">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <p className="font-medium text-zinc-900">Default Currency</p>
                <select className="bg-zinc-50 border-none rounded-lg text-sm font-medium focus:ring-0">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-50">
                <p className="font-medium text-zinc-900">Language</p>
                <select className="bg-zinc-50 border-none rounded-lg text-sm font-medium focus:ring-0">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </section>

          <button className="w-full py-4 rounded-2xl border-2 border-dashed border-red-100 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <Dashboard />;
      case 'Cards': return <CardsPage />;
      case 'Transactions': return <TransactionsPage />;
      case 'Settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-100 p-6 hidden lg:flex flex-col justify-between sticky top-0 h-screen">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-zinc-200">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">CrediFlow</span>
          </div>

          <nav className="space-y-2">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activeTab === 'Dashboard'} 
              onClick={() => setActiveTab('Dashboard')} 
            />
            <SidebarItem 
              icon={CardIcon} 
              label="Cards" 
              active={activeTab === 'Cards'} 
              onClick={() => setActiveTab('Cards')} 
            />
            <SidebarItem 
              icon={History} 
              label="Transactions" 
              active={activeTab === 'Transactions'} 
              onClick={() => setActiveTab('Transactions')} 
            />
            <SidebarItem 
              icon={Settings} 
              label="Settings" 
              active={activeTab === 'Settings'} 
              onClick={() => setActiveTab('Settings')} 
            />
          </nav>
        </div>

        <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Yogesh Marvel</p>
              <p className="text-xs text-zinc-500 truncate">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight">CrediFlow</span>
          </div>
          
          <div className="hidden lg:block">
            <h2 className="font-bold text-zinc-900">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-zinc-100 mx-2" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold group-hover:text-indigo-600 transition-colors">Yogesh Marvel</p>
                <p className="text-[10px] text-zinc-500">Admin Account</p>
              </div>
              <div className="w-9 h-9 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 border border-zinc-200 group-hover:border-indigo-200 transition-colors">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-3 flex justify-between items-center z-50 shadow-2xl">
        <button onClick={() => setActiveTab('Dashboard')} className={cn("p-2 rounded-xl transition-colors", activeTab === 'Dashboard' ? "bg-zinc-900 text-white" : "text-zinc-400")}>
          <LayoutDashboard size={24} />
        </button>
        <button onClick={() => setActiveTab('Cards')} className={cn("p-2 rounded-xl transition-colors", activeTab === 'Cards' ? "bg-zinc-900 text-white" : "text-zinc-400")}>
          <CardIcon size={24} />
        </button>
        <button onClick={() => setActiveTab('Transactions')} className={cn("p-2 rounded-xl transition-colors", activeTab === 'Transactions' ? "bg-zinc-900 text-white" : "text-zinc-400")}>
          <History size={24} />
        </button>
        <button onClick={() => setActiveTab('Settings')} className={cn("p-2 rounded-xl transition-colors", activeTab === 'Settings' ? "bg-zinc-900 text-white" : "text-zinc-400")}>
          <Settings size={24} />
        </button>
      </nav>
    </div>
  );
}
