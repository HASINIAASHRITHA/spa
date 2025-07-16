
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useServices, dataStore } from '@/lib/dataStore';
import { formatIndianPrice } from '@/types/spa';
import { Service } from '@/types/spa';

export const ServiceManagement = () => {
  const services = useServices();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});

  const handleSave = () => {
    if (editingService) {
      dataStore.updateService(editingService.id, formData);
      setEditingService(null);
    } else if (isAddingNew) {
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        duration: formData.duration || 60,
        price: formData.price || 0,
        category: formData.category || 'general',
        image: formData.image || '/placeholder.svg',
        createdAt: new Date()
      };
      dataStore.addService(newService);
      setIsAddingNew(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      dataStore.deleteService(id);
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsAddingNew(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Service Management</h2>
        <NeonButton onClick={() => setIsAddingNew(true)} disabled={isAddingNew || !!editingService}>
          <Plus size={18} className="mr-2" />
          Add Service
        </NeonButton>
      </div>

      {/* Add New Service Form */}
      {isAddingNew && (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
              Save Service
            </NeonButton>
            <NeonButton variant="secondary" onClick={handleCancel}>
              <X size={18} className="mr-2" />
              Cancel
            </NeonButton>
          </div>
        </GlassCard>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <GlassCard key={service.id} className="p-6">
            {editingService?.id === service.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name !== undefined ? formData.name : service.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={formData.category !== undefined ? formData.category : service.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    value={formData.duration !== undefined ? formData.duration : service.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    value={formData.price !== undefined ? formData.price : service.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="url"
                    value={formData.image !== undefined ? formData.image : service.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                  />
                  <textarea
                    value={formData.description !== undefined ? formData.description : service.description}
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
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <p className="text-cyan-400 mb-2">{service.category}</p>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <div className="flex space-x-4 text-sm text-white/60">
                    <span>{service.duration} min</span>
                    <span>{formatIndianPrice(service.price)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No services found. Click "Add Service" to create your first service.</p>
        </div>
      )}
    </div>
  );
};
