import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useStylists, dataStore } from '@/lib/dataStore';
import { Stylist } from '@/types/spa';

export const StylistManagement = () => {
  const stylists = useStylists();
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Stylist>>({});

  const handleSave = () => {
    if (editingStylist) {
      dataStore.updateStylist(editingStylist.id, formData);
      setEditingStylist(null);
    } else if (isAddingNew) {
      const newStylist: Stylist = {
        id: Date.now().toString(),
        name: formData.name || '',
        title: formData.title || '',
        specializations: formData.specializations || [],
        experience: formData.experience || '0',
        rating: formData.rating || 5.0,
        bio: formData.bio || '',
        profileImage: formData.profileImage || '/placeholder.svg',
        portfolio: [],
        available: formData.available !== undefined ? formData.available : true
      };
      dataStore.addStylist(newStylist);
      setIsAddingNew(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this stylist?')) {
      dataStore.deleteStylist(id);
    }
  };

  const handleCancel = () => {
    setEditingStylist(null);
    setIsAddingNew(false);
    setFormData({});
  };

  const handleSpecialtiesChange = (value: string) => {
    const specializations = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, specializations });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Stylist Management</h2>
        <NeonButton onClick={() => setIsAddingNew(true)} disabled={isAddingNew || !!editingStylist}>
          <Plus size={18} className="mr-2" />
          Add Stylist
        </NeonButton>
      </div>

      {/* Add New Stylist Form */}
      {isAddingNew && (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add New Stylist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Experience (e.g., 5 years)"
              value={formData.experience || ''}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating || ''}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <input
              type="url"
              placeholder="Profile Image URL (optional)"
              value={formData.profileImage || ''}
              onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
            />
            <input
              type="text"
              placeholder="Specializations (comma separated)"
              value={formData.specializations?.join(', ') || ''}
              onChange={(e) => handleSpecialtiesChange(e.target.value)}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
            />
            <textarea
              placeholder="Bio"
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
              rows={3}
            />
            <div className="flex items-center space-x-2 md:col-span-2">
              <input
                type="checkbox"
                id="available"
                checked={formData.available !== undefined ? formData.available : true}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="rounded border-cyan-400/30"
              />
              <label htmlFor="available" className="text-white">Available for bookings</label>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <NeonButton onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Save Stylist
            </NeonButton>
            <NeonButton variant="secondary" onClick={handleCancel}>
              <X size={18} className="mr-2" />
              Cancel
            </NeonButton>
          </div>
        </GlassCard>
      )}

      {/* Stylists List */}
      <div className="grid grid-cols-1 gap-4">
        {stylists.map((stylist) => (
          <GlassCard key={stylist.id} className="p-6">
            {editingStylist?.id === stylist.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name !== undefined ? formData.name : stylist.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={formData.title !== undefined ? formData.title : stylist.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={formData.experience !== undefined ? formData.experience : stylist.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating !== undefined ? formData.rating : stylist.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <input
                    type="url"
                    value={formData.profileImage !== undefined ? formData.profileImage : stylist.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                  />
                  <input
                    type="text"
                    value={formData.specializations !== undefined ? formData.specializations.join(', ') : stylist.specializations.join(', ')}
                    onChange={(e) => handleSpecialtiesChange(e.target.value)}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                  />
                  <textarea
                    value={formData.bio !== undefined ? formData.bio : stylist.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
                    rows={3}
                  />
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input
                      type="checkbox"
                      id={`available-${stylist.id}`}
                      checked={formData.available !== undefined ? formData.available : stylist.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="rounded border-cyan-400/30"
                    />
                    <label htmlFor={`available-${stylist.id}`} className="text-white">Available for bookings</label>
                  </div>
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
                    <h3 className="text-xl font-semibold text-white">{stylist.name}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="text-white text-sm ml-1">{stylist.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${stylist.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {stylist.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-cyan-400 mb-2">{stylist.title}</p>
                  <p className="text-white/70 mb-3">{stylist.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {stylist.specializations.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-400 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-white/60">{stylist.experience} experience</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingStylist(stylist)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(stylist.id)}
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

      {stylists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No stylists found. Click "Add Stylist" to create your first stylist profile.</p>
        </div>
      )}
    </div>
  );
};
