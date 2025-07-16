import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, User, Phone, Mail, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  totalVisits: number;
  totalSpent: number;
  preferences: string[];
  notes?: string;
  lastVisit?: string;
}

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@email.com',
      phone: '+1-555-0123',
      dateJoined: '2024-01-15',
      totalVisits: 5,
      totalSpent: 650,
      preferences: ['Aromatherapy', 'Deep Tissue Massage', 'Quiet Environment'],
      notes: 'Prefers afternoon appointments, allergic to lavender',
      lastVisit: '2024-07-10'
    }
  ]);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...editingCustomer, ...formData } : c));
      setEditingCustomer(null);
    } else if (isAddingNew) {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        dateJoined: formData.dateJoined || new Date().toISOString().split('T')[0],
        totalVisits: formData.totalVisits || 0,
        totalSpent: formData.totalSpent || 0,
        preferences: formData.preferences || [],
        notes: formData.notes || '',
        lastVisit: formData.lastVisit
      };
      setCustomers([...customers, newCustomer]);
      setIsAddingNew(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const handleCancel = () => {
    setEditingCustomer(null);
    setIsAddingNew(false);
    setFormData({});
  };

  const handlePreferencesChange = (value: string) => {
    const preferences = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, preferences });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Customer Management</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white placeholder-white/50"
          />
          <NeonButton onClick={() => setIsAddingNew(true)} disabled={isAddingNew || !!editingCustomer}>
            <Plus size={18} className="mr-2" />
            Add Customer
          </NeonButton>
        </div>
      </div>

      {/* Add New Customer Form */}
      {isAddingNew && (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add New Customer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="date"
              placeholder="Date Joined"
              value={formData.dateJoined || ''}
              onChange={(e) => setFormData({ ...formData, dateJoined: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Total Visits"
              value={formData.totalVisits || ''}
              onChange={(e) => setFormData({ ...formData, totalVisits: parseInt(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Total Spent ($)"
              value={formData.totalSpent || ''}
              onChange={(e) => setFormData({ ...formData, totalSpent: parseFloat(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Preferences (comma separated)"
              value={formData.preferences?.join(', ') || ''}
              onChange={(e) => handlePreferencesChange(e.target.value)}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
            />
            <textarea
              placeholder="Notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <NeonButton onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Save Customer
            </NeonButton>
            <NeonButton variant="secondary" onClick={handleCancel}>
              <X size={18} className="mr-2" />
              Cancel
            </NeonButton>
          </div>
        </GlassCard>
      )}

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">{customers.length}</p>
            <p className="text-white/70 text-sm">Total Customers</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0)}
            </p>
            <p className="text-white/70 text-sm">Total Revenue</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {customers.reduce((sum, c) => sum + c.totalVisits, 0)}
            </p>
            <p className="text-white/70 text-sm">Total Visits</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              ${customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length) : 0}
            </p>
            <p className="text-white/70 text-sm">Avg. Spent</p>
          </div>
        </GlassCard>
      </div>

      {/* Customers List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.map((customer) => (
          <GlassCard key={customer.id} className="p-6">
            {editingCustomer?.id === customer.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name !== undefined ? formData.name : customer.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="email"
                    value={formData.email !== undefined ? formData.email : customer.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="tel"
                    value={formData.phone !== undefined ? formData.phone : customer.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    value={formData.totalVisits !== undefined ? formData.totalVisits : customer.totalVisits}
                    onChange={(e) => setFormData({ ...formData, totalVisits: parseInt(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={formData.preferences !== undefined ? formData.preferences.join(', ') : customer.preferences.join(', ')}
                    onChange={(e) => handlePreferencesChange(e.target.value)}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                  />
                  <textarea
                    value={formData.notes !== undefined ? formData.notes : customer.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-4">
                  <NeonButton onClick={handleSave}>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </NeonButton>
                  <NeonButton variant="secondary" onClick={handleCancel}>
                    <X size={18} className="mr-2" />
                    Cancel
                  </NeonButton>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <User size={18} className="mr-2 text-cyan-400" />
                      {customer.name}
                    </h3>
                    <p className="text-white/60 text-sm flex items-center mt-1">
                      <Mail size={14} className="mr-2" />
                      {customer.email}
                    </p>
                    <p className="text-white/60 text-sm flex items-center mt-1">
                      <Phone size={14} className="mr-2" />
                      {customer.phone}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center text-white/70 mb-2">
                      <Calendar size={16} className="mr-2 text-purple-400" />
                      Joined: {new Date(customer.dateJoined).toLocaleDateString()}
                    </div>
                    <p className="text-sm text-white/60">Total Visits: <span className="text-cyan-400">{customer.totalVisits}</span></p>
                    <p className="text-sm text-white/60">Total Spent: <span className="text-green-400">${customer.totalSpent}</span></p>
                    {customer.lastVisit && (
                      <p className="text-sm text-white/60">Last Visit: {new Date(customer.lastVisit).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div>
                    {customer.preferences.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-white/80 mb-2">Preferences:</p>
                        <div className="flex flex-wrap gap-1">
                          {customer.preferences.map((pref, index) => (
                            <span key={index} className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs">
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {customer.notes && (
                      <p className="text-white/60 text-sm">{customer.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCustomer(customer)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No customers found matching your search.</p>
        </div>
      )}
    </div>
  );
};
