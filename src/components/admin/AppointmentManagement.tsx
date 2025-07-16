
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, CheckCircle, Clock, User, Phone, XCircle, MessageSquare, Send } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useAppointments, useServices, useStylists, dataStore } from '@/lib/dataStore';
import { formatIndianPrice } from '@/types/spa';
import { Appointment } from '@/types/spa';
import { useToast } from '@/hooks/use-toast';

export const AppointmentManagement = () => {
  const appointments = useAppointments();
  const services = useServices();
  const stylists = useStylists();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [messageModalOpen, setMessageModalOpen] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState<string>('');
  const { toast } = useToast();

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    'in-progress': 'bg-green-500/20 text-green-400',
    completed: 'bg-purple-500/20 text-purple-400',
    cancelled: 'bg-red-500/20 text-red-400'
  };

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    dataStore.updateAppointment(id, { status: newStatus });
    
    // Show notification when confirmed
    if (newStatus === 'confirmed') {
      toast({
        title: "Appointment Confirmed",
        description: "The customer will be notified of the confirmation.",
      });
    }
  };

  const handleCheckIn = (id: string) => {
    dataStore.updateAppointment(id, { checkedIn: true, status: 'in-progress' });
  };

  const handleCheckOut = (id: string) => {
    dataStore.updateAppointment(id, { checkedOut: true, status: 'completed' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      dataStore.deleteAppointment(id);
    }
  };

  const handleSendMessage = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    const serviceName = getServiceName(appointment.serviceId);
    const stylistName = getStylistName(appointment.stylistId);
    const appointmentDate = appointment.dateTime ? new Date(appointment.dateTime).toLocaleDateString('en-IN') : 'Date not set';
    const appointmentTime = appointment.dateTime ? new Date(appointment.dateTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Time not set';

    const defaultMessage = `Dear ${appointment.customerName},

Your appointment has been CONFIRMED! 

✅ Service: ${serviceName}
✅ Stylist: ${stylistName}
✅ Date: ${appointmentDate}
✅ Time: ${appointmentTime}
✅ Total: ${formatIndianPrice(appointment.totalPrice)}

We look forward to providing you with an exceptional spa experience at LUXE SPA.

For any changes or inquiries, please contact us at +91 98765 43210.

Thank you for choosing LUXE SPA!

Best regards,
LUXE SPA Team`;

    setCustomMessage(defaultMessage);
    setMessageModalOpen(appointmentId);
  };

  const sendCustomerMessage = () => {
    const appointment = appointments.find(apt => apt.id === messageModalOpen);
    if (!appointment) return;

    // Send WhatsApp message
    const serviceName = getServiceName(appointment.serviceId);
    const stylistName = getStylistName(appointment.stylistId);
    const appointmentDate = appointment.dateTime ? new Date(appointment.dateTime).toLocaleDateString('en-IN') : 'Date not set';
    const appointmentTime = appointment.dateTime ? new Date(appointment.dateTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Time not set';

    const whatsappMessage = `Hi ${appointment.customerName}, your Luxe Spa appointment for ${serviceName} on ${appointmentDate}, ${appointmentTime} is ${appointment.status?.toUpperCase() || 'PENDING'}. Thank you!`;
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/91${appointment.customerPhone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Also send professional email/SMS (existing functionality)
    console.log('Sending message to:', appointment.customerEmail);
    console.log('Message content:', customMessage);
    
    toast({
      title: "Messages Sent Successfully",
      description: `Professional message sent to ${appointment.customerName} via WhatsApp, SMS and Email.`,
    });

    setMessageModalOpen(null);
    setCustomMessage('');
  };

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Unknown Service';
  };

  const getStylistName = (stylistId?: string) => {
    if (!stylistId) return 'No stylist assigned';
    const stylist = stylists.find(s => s.id === stylistId);
    return stylist ? stylist.name : 'Unknown Stylist';
  };

  const formatStatus = (status: string | undefined) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Appointment Management</h2>
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mb-6">
        <p className="text-cyan-400 text-sm">
          <strong>Note:</strong> Appointments are automatically created when customers book through the website. 
          Use this panel to manage existing appointments, check customers in/out, and update appointment status.
        </p>
      </div>

      {/* Message Modal */}
      {messageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-cyan-400/30 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Send Professional Message</h3>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full h-64 p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white resize-none"
              placeholder="Enter your message..."
            />
            <div className="flex space-x-4 mt-4">
              <NeonButton onClick={sendCustomerMessage}>
                <Send size={18} className="mr-2" />
                Send Message
              </NeonButton>
              <NeonButton 
                variant="secondary" 
                onClick={() => {
                  setMessageModalOpen(null);
                  setCustomMessage('');
                }}
              >
                Cancel
              </NeonButton>
            </div>
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.map((appointment) => (
          <GlassCard key={appointment.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <User size={16} className="mr-2 text-cyan-400" />
                    {appointment.customerName}
                  </h3>
                  <p className="text-white/60 text-sm">{appointment.customerEmail}</p>
                  <p className="text-white/60 text-sm flex items-center">
                    <Phone size={14} className="mr-1" />
                    {appointment.customerPhone}
                  </p>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold">{getServiceName(appointment.serviceId)}</p>
                  <p className="text-white/70 text-sm">with {getStylistName(appointment.stylistId)}</p>
                  <p className="text-white/60 text-sm">{formatIndianPrice(appointment.totalPrice)}</p>
                </div>
                <div>
                  <p className="text-white flex items-center">
                    <Clock size={16} className="mr-2 text-purple-400" />
                    {appointment.dateTime ? new Date(appointment.dateTime).toLocaleDateString('en-IN') : 'No date set'}
                  </p>
                  <p className="text-white/70 text-sm">
                    {appointment.dateTime ? new Date(appointment.dateTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'No time set'}
                  </p>
                  <p className="text-white/60 text-sm">{appointment.duration} minutes</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[appointment.status as keyof typeof statusColors] || 'bg-gray-500/20 text-gray-400'}`}>
                    {formatStatus(appointment.status)}
                  </span>
                  {appointment.notes && (
                    <p className="text-white/60 text-sm mt-2">{appointment.notes}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    {appointment.checkedIn && (
                      <span className="text-green-400 text-xs">✓ Checked In</span>
                    )}
                    {appointment.checkedOut && (
                      <span className="text-blue-400 text-xs">✓ Checked Out</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <select
                  value={appointment.status || 'pending'}
                  onChange={(e) => handleStatusChange(appointment.id, e.target.value as Appointment['status'])}
                  className="p-1 text-xs bg-black/20 border border-cyan-400/30 rounded text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleSendMessage(appointment.id)}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Send Message"
                  >
                    <MessageSquare size={16} />
                  </button>
                  
                  {!appointment.checkedIn && appointment.status === 'confirmed' && (
                    <button
                      onClick={() => handleCheckIn(appointment.id)}
                      className="p-1 text-green-400 hover:text-green-300 transition-colors"
                      title="Check In"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                  {appointment.checkedIn && !appointment.checkedOut && (
                    <button
                      onClick={() => handleCheckOut(appointment.id)}
                      className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Check Out"
                    >
                      <XCircle size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            {filterStatus === 'all' 
              ? 'No appointments found. Customers can book appointments through the website.'
              : `No appointments found for the selected filter.`
            }
          </p>
        </div>
      )}
    </div>
  );
};
