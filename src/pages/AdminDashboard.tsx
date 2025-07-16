
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Scissors, 
  Star, 
  Settings, 
  BarChart3, 
  Package,
  MessageSquare,
  Image,
  Tag
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ServiceManagement } from '@/components/admin/ServiceManagement';
import { StylistManagement } from '@/components/admin/StylistManagement';
import { AppointmentManagement } from '@/components/admin/AppointmentManagement';
import { CustomerManagement } from '@/components/admin/CustomerManagement';
import { FeedbackManagement } from '@/components/admin/FeedbackManagement';
import { GalleryManagement } from '@/components/admin/GalleryManagement';
import { PromotionManagement } from '@/components/admin/PromotionManagement';
import { 
  useServices, 
  useStylists, 
  useAppointments, 
  useCustomers, 
  useFeedback,
  useGalleryImages,
  usePromotions
} from '@/lib/dataStore';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const services = useServices();
  const stylists = useStylists();
  const appointments = useAppointments();
  const customers = useCustomers();
  const feedback = useFeedback();
  const galleryImages = useGalleryImages();
  const promotions = usePromotions();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'services', label: 'Service Management', icon: Scissors },
    { id: 'stylists', label: 'Stylist Management', icon: Users },
    { id: 'appointments', label: 'Appointment Management', icon: Calendar },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'gallery', label: 'Gallery Management', icon: Image },
    { id: 'promotions', label: 'Promotions Management', icon: Tag },
    { id: 'feedback', label: 'Feedback Management', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServiceManagement />;
      case 'stylists':
        return <StylistManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'promotions':
        return <PromotionManagement />;
      case 'feedback':
        return <FeedbackManagement />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Services</p>
                  <p className="text-2xl font-bold text-white">{services.length}</p>
                </div>
                <Scissors className="text-cyan-400" size={24} />
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Active Stylists</p>
                  <p className="text-2xl font-bold text-white">{stylists.filter(s => s.available).length}</p>
                </div>
                <Users className="text-purple-400" size={24} />
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Today's Appointments</p>
                  <p className="text-2xl font-bold text-white">
                    {appointments.filter(apt => {
                      const today = new Date();
                      const aptDate = new Date(apt.dateTime);
                      return aptDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
                <Calendar className="text-green-400" size={24} />
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Customer Reviews</p>
                  <p className="text-2xl font-bold text-white">{feedback.length}</p>
                </div>
                <Star className="text-yellow-400" size={24} />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Gallery Images</p>
                  <p className="text-2xl font-bold text-white">{galleryImages.length}</p>
                </div>
                <Image className="text-pink-400" size={24} />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Active Promotions</p>
                  <p className="text-2xl font-bold text-white">
                    {promotions.filter(p => p.active && new Date(p.validUntil) > new Date()).length}
                  </p>
                </div>
                <Tag className="text-orange-400" size={24} />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Customers</p>
                  <p className="text-2xl font-bold text-white">{customers.length}</p>
                </div>
                <Users className="text-blue-400" size={24} />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-white">
                    {feedback.filter(f => f.status === 'new').length}
                  </p>
                </div>
                <MessageSquare className="text-red-400" size={24} />
              </div>
            </GlassCard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-black text-white mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            LUXE SPA ADMIN DASHBOARD
          </h1>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon size={18} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
