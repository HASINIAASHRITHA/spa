
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Image } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useGalleryImages, dataStore } from '@/lib/dataStore';
import { GalleryImage } from '@/types/spa';

export const GalleryManagement = () => {
  const galleryImages = useGalleryImages();
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({});

  const handleSave = () => {
    if (editingImage) {
      dataStore.updateGalleryImage(editingImage.id, formData);
      setEditingImage(null);
    } else if (isAddingNew) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        url: formData.url || '',
        category: formData.category || 'spa',
        createdAt: new Date()
      };
      dataStore.addGalleryImage(newImage);
      setIsAddingNew(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      dataStore.deleteGalleryImage(id);
    }
  };

  const handleCancel = () => {
    setEditingImage(null);
    setIsAddingNew(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
        <NeonButton onClick={() => setIsAddingNew(true)} disabled={isAddingNew || !!editingImage}>
          <Plus size={18} className="mr-2" />
          Add Image
        </NeonButton>
      </div>

      {/* Add New Image Form */}
      {isAddingNew && (
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add New Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            />
            <select
              value={formData.category || 'spa'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryImage['category'] })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
            >
              <option value="spa">Spa Facilities</option>
              <option value="treatment">Treatment Rooms</option>
              <option value="relaxation">Relaxation Areas</option>
              <option value="amenities">Amenities</option>
              <option value="exterior">Exterior</option>
            </select>
            <input
              type="url"
              placeholder="Image URL"
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <NeonButton onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Save Image
            </NeonButton>
            <NeonButton variant="secondary" onClick={handleCancel}>
              <X size={18} className="mr-2" />
              Cancel
            </NeonButton>
          </div>
        </GlassCard>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <GlassCard key={image.id} className="overflow-hidden">
            {editingImage?.id === image.id ? (
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  value={formData.title !== undefined ? formData.title : image.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded text-white"
                />
                <select
                  value={formData.category !== undefined ? formData.category : image.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryImage['category'] })}
                  className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded text-white"
                >
                  <option value="spa">Spa Facilities</option>
                  <option value="treatment">Treatment Rooms</option>
                  <option value="relaxation">Relaxation Areas</option>
                  <option value="amenities">Amenities</option>
                  <option value="exterior">Exterior</option>
                </select>
                <input
                  type="url"
                  value={formData.url !== undefined ? formData.url : image.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded text-white"
                />
                <textarea
                  value={formData.description !== undefined ? formData.description : image.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 bg-black/20 border border-cyan-400/30 rounded text-white"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <NeonButton onClick={handleSave}>
                    <Save size={16} className="mr-1" />
                    Save
                  </NeonButton>
                  <NeonButton variant="secondary" onClick={handleCancel}>
                    <X size={16} className="mr-1" />
                    Cancel
                  </NeonButton>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => setEditingImage(image)}
                      className="p-1 bg-black/50 text-cyan-400 hover:text-cyan-300 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-1 bg-black/50 text-red-400 hover:text-red-300 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs">
                      {image.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                  {image.description && (
                    <p className="text-white/70 text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </>
            )}
          </GlassCard>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-12">
          <Image size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">No gallery images found. Click "Add Image" to upload your first image.</p>
        </div>
      )}
    </div>
  );
};
