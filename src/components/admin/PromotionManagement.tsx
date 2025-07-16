
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Tag, Percent } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { usePromotions, dataStore } from '@/lib/dataStore';
import { Promotion } from '@/types/spa';

export const PromotionManagement = () => {
  const promotions = usePromotions();
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Promotion>>({});

  const handleSave = () => {
    if (editingPromotion) {
      dataStore.updatePromotion(editingPromotion.id, formData);
      setEditingPromotion(null);
    } else if (isAddingNew) {
      const newPromotion: Promotion = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        code: formData.code || '',
        discountType: formData.discountType || 'percentage',
        discountValue: formData.discountValue || 0,
        type: formData.discountType || 'percentage',
        value: formData.discountValue || 0,
        validFrom: formData.validFrom || new Date(),
        validUntil: formData.validUntil || new Date(),
        endDate: formData.validUntil || new Date(),
        active: formData.active !== undefined ? formData.active : true,
        applicableServices: formData.applicableServices || [],
        usageLimit: formData.usageLimit,
        usageCount: 0,
        createdAt: new Date()
      };
      dataStore.addPromotion(newPromotion);
      setIsAddingNew(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      dataStore.deletePromotion(id);
    }
  };

  const handleCancel = () => {
    setEditingPromotion(null);
    setIsAddingNew(false);
    setFormData({});
  };

  const handleServicesChange = (value: string) => {
    const services = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, applicableServices: services });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Promotions Management</h2>
        <NeonButton onClick={() => setIsAddingNew(true)} disabled={isAddingNew || !!editingPromotion}>
          <Plus size={18} className="mr-2" />
          Add Promotion
        </NeonButton>
      </div>

      {/* Add New Promotion Form */}
      {isAddingNew && (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add New Promotion</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Promotion Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Promo Code (optional)"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <select
              value={formData.discountType || 'percentage'}
              onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            >
              <option value="percentage">Percentage Discount</option>
              <option value="fixed">Fixed Amount Discount</option>
            </select>
            <input
              type="number"
              placeholder={formData.discountType === 'percentage' ? 'Discount %' : 'Discount Amount (₹)'}
              value={formData.discountValue || ''}
              onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="date"
              placeholder="Valid From"
              value={formData.validFrom ? new Date(formData.validFrom).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, validFrom: new Date(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="date"
              placeholder="Valid Until"
              value={formData.validUntil ? new Date(formData.validUntil).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, validUntil: new Date(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Usage Limit (optional)"
              value={formData.usageLimit || ''}
              onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active !== undefined ? formData.active : true}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded border-cyan-400/30"
              />
              <label htmlFor="active" className="text-white">Active Promotion</label>
            </div>
            <input
              type="text"
              placeholder="Applicable Services (comma separated, optional)"
              value={formData.applicableServices?.join(', ') || ''}
              onChange={(e) => handleServicesChange(e.target.value)}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <NeonButton onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Save Promotion
            </NeonButton>
            <NeonButton variant="secondary" onClick={handleCancel}>
              <X size={18} className="mr-2" />
              Cancel
            </NeonButton>
          </div>
        </GlassCard>
      )}

      {/* Promotions List */}
      <div className="grid grid-cols-1 gap-4">
        {promotions.map((promotion) => (
          <GlassCard key={promotion.id} className="p-6">
            {editingPromotion?.id === promotion.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name !== undefined ? formData.name : promotion.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={formData.code !== undefined ? formData.code : promotion.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <select
                    value={formData.discountType !== undefined ? formData.discountType : promotion.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  >
                    <option value="percentage">Percentage Discount</option>
                    <option value="fixed">Fixed Amount Discount</option>
                  </select>
                  <input
                    type="number"
                    value={formData.discountValue !== undefined ? formData.discountValue : promotion.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="date"
                    value={formData.validFrom ? new Date(formData.validFrom).toISOString().split('T')[0] : new Date(promotion.validFrom).toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, validFrom: new Date(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="date"
                    value={formData.validUntil ? new Date(formData.validUntil).toISOString().split('T')[0] : new Date(promotion.validUntil).toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, validUntil: new Date(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    value={formData.usageLimit !== undefined ? formData.usageLimit : promotion.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`active-${promotion.id}`}
                      checked={formData.active !== undefined ? formData.active : promotion.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded border-cyan-400/30"
                    />
                    <label htmlFor={`active-${promotion.id}`} className="text-white">Active Promotion</label>
                  </div>
                  <input
                    type="text"
                    value={formData.applicableServices !== undefined ? formData.applicableServices.join(', ') : promotion.applicableServices?.join(', ') || ''}
                    onChange={(e) => handleServicesChange(e.target.value)}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                  />
                  <textarea
                    value={formData.description !== undefined ? formData.description : promotion.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{promotion.name}</h3>
                    <div className="flex items-center text-green-400">
                      <Percent size={16} />
                      <span className="ml-1">
                        {promotion.discountType === 'percentage' ? `${promotion.discountValue}%` : `₹${promotion.discountValue}`} OFF
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${promotion.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {promotion.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">{promotion.description}</p>
                  {promotion.code && (
                    <div className="bg-black/30 border border-green-400/30 rounded-lg p-2 mb-3 inline-block">
                      <span className="text-green-400 text-sm font-mono">{promotion.code}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/60">
                    <div>
                      <p>Valid From:</p>
                      <p className="text-white">{new Date(promotion.validFrom).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p>Valid Until:</p>
                      <p className="text-white">{new Date(promotion.validUntil).toLocaleDateString('en-IN')}</p>
                    </div>
                    {promotion.usageLimit && (
                      <div>
                        <p>Usage:</p>
                        <p className="text-white">{promotion.usageCount || 0} / {promotion.usageLimit}</p>
                      </div>
                    )}
                    {promotion.applicableServices && promotion.applicableServices.length > 0 && (
                      <div>
                        <p>Applicable Services:</p>
                        <p className="text-white">{promotion.applicableServices.length} services</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingPromotion(promotion)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(promotion.id)}
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

      {promotions.length === 0 && (
        <div className="text-center py-12">
          <Tag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">No promotions found. Click "Add Promotion" to create your first promotion.</p>
        </div>
      )}
    </div>
  );
};
