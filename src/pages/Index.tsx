import { FloatingNavigation } from '@/components/layout/FloatingNavigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BeautyTipsSection } from '@/components/sections/BeautyTipsSection';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { FeedbackSection } from '@/components/sections/FeedbackSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <FloatingNavigation />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <BeautyTipsSection />
      <FeedbackSection />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Index;
