
import { Appointment } from '@/types/spa';
import { formatIndianPrice } from '@/types/spa';

export const sendAppointmentReminder = (appointment: Appointment, serviceName: string, stylistName: string) => {
  const appointmentDate = appointment.dateTime ? new Date(appointment.dateTime).toLocaleDateString('en-IN') : 'Date not set';
  const appointmentTime = appointment.dateTime ? new Date(appointment.dateTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Time not set';

  const emailContent = `
    Dear ${appointment.customerName},

    This is a reminder for your upcoming appointment at LUXE SPA:

    ✅ Service: ${serviceName}
    ✅ Stylist: ${stylistName}
    ✅ Date: ${appointmentDate}
    ✅ Time: ${appointmentTime}
    ✅ Total: ${formatIndianPrice(appointment.totalPrice)}

    Please arrive 15 minutes early for check-in.

    To reschedule or cancel, please contact us at +91 98765 43210.

    We look forward to providing you with an exceptional spa experience!

    Best regards,
    LUXE SPA Team
  `;

  const smsContent = `LUXE SPA Reminder: Your appointment on ${appointmentDate} at ${appointmentTime} for ${serviceName} is confirmed. Contact +91 98765 43210 for changes.`;

  // In a real application, these would integrate with actual email/SMS services
  console.log('Email reminder sent to:', appointment.customerEmail);
  console.log('Email content:', emailContent);
  console.log('SMS reminder sent to:', appointment.customerPhone);
  console.log('SMS content:', smsContent);

  return {
    email: {
      to: appointment.customerEmail,
      subject: 'LUXE SPA - Appointment Reminder',
      content: emailContent
    },
    sms: {
      to: appointment.customerPhone,
      content: smsContent
    }
  };
};

export const sendAppointmentConfirmation = (appointment: Appointment, serviceName: string, stylistName: string) => {
  const appointmentDate = appointment.dateTime ? new Date(appointment.dateTime).toLocaleDateString('en-IN') : 'Date not set';
  const appointmentTime = appointment.dateTime ? new Date(appointment.dateTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Time not set';

  const confirmationContent = `
    Dear ${appointment.customerName},

    Your appointment has been CONFIRMED at LUXE SPA!

    ✅ Service: ${serviceName}
    ✅ Stylist: ${stylistName}
    ✅ Date: ${appointmentDate}
    ✅ Time: ${appointmentTime}
    ✅ Total: ${formatIndianPrice(appointment.totalPrice)}

    We will send you a reminder 24 hours before your appointment.

    Thank you for choosing LUXE SPA!

    Best regards,
    LUXE SPA Team
  `;

  console.log('Confirmation sent to:', appointment.customerEmail);
  console.log('Confirmation content:', confirmationContent);

  return confirmationContent;
};
