
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingNavigation } from '@/components/layout/FloatingNavigation';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useServices, useStylists, dataStore } from '@/lib/dataStore';
import { formatIndianPrice } from '@/types/spa';
import { useToast } from '@/hooks/use-toast';

const Booking = () => {
  const services = useServices();
  const stylists = useStylists();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: '',
    stylistId: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    console.log('Booking page: loaded services count:', services.length);
    console.log('Booking page: loaded stylists count:', stylists.length);
  }, [services, stylists]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || 
        !formData.serviceId || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const selectedService = services.find(s => s.id === formData.serviceId);
    if (!selectedService) {
      toast({
        title: "Service Not Found",
        description: "Please select a valid service.",
        variant: "destructive"
      });
      return;
    }

    // Create appointment object with all required fields
    const appointmentData = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      serviceId: formData.serviceId,
      stylistId: formData.stylistId || undefined,
      dateTime: new Date(`${formData.date}T${formData.time}`),
      duration: selectedService.duration,
      totalPrice: selectedService.price,
      notes: formData.notes,
      status: 'pending' as const,
      addOns: [],
      checkedIn: false,
      checkedOut: false,
      createdAt: new Date()
    };

    console.log('Creating appointment:', appointmentData);
    dataStore.addAppointment(appointmentData);

    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment for ${selectedService.name} has been scheduled. We'll contact you soon to confirm.`,
    });

    // Reset form
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      serviceId: '',
      stylistId: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <FloatingNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              BOOK YOUR EXPERIENCE
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Schedule your perfect spa day with our luxury treatments and expert therapists
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <User className="inline mr-2" size={16} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <Mail className="inline mr-2" size={16} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Select Service *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    required
                  >
                    <option value="" className="bg-gray-800">Choose a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id} className="bg-gray-800">
                        {service.name} - {formatIndianPrice(service.price)} ({service.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stylist Selection */}
                {stylists.length > 0 && (
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Preferred Stylist (Optional)
                    </label>
                    <select
                      value={formData.stylistId}
                      onChange={(e) => setFormData({...formData, stylistId: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Any available stylist</option>
                      {stylists.filter(stylist => stylist.available).map((stylist) => (
                        <option key={stylist.id} value={stylist.id} className="bg-gray-800">
                          {stylist.name} - {stylist.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <Calendar className="inline mr-2" size={16} />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      <Clock className="inline mr-2" size={16} />
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <MessageSquare className="inline mr-2" size={16} />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none resize-none h-24"
                    placeholder="Any special requests or allergies we should know about?"
                  />
                </div>

                {/* Service Summary */}
                {selectedService && (
                  <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4">
                    <h3 className="text-cyan-400 font-semibold mb-2">Booking Summary</h3>
                    <div className="space-y-1 text-white/70">
                      <p><span className="font-medium">Service:</span> {selectedService.name}</p>
                      <p><span className="font-medium">Duration:</span> {selectedService.duration} minutes</p>
                      <p><span className="font-medium">Price:</span> {formatIndianPrice(selectedService.price)}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <NeonButton type="submit" className="px-8 py-3">
                    Book Appointment
                  </NeonButton>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
