import { useState, useEffect } from 'react';
import { Service, Stylist, Appointment, Customer, Promotion, Package, GalleryImage, Feedback } from '@/types/spa';

interface Subscriber {
  (): void;
}

class DataStore {
  private services: Service[] = [];
  private stylists: Stylist[] = [];
  private appointments: Appointment[] = [];
  private customers: Customer[] = [];
  private promotions: Promotion[] = [];
  private packages: Package[] = [];
  private galleryImages: GalleryImage[] = [];
  private feedback: Feedback[] = [];
  private subscribers: Set<Subscriber> = new Set();

  constructor() {
    // Load data from localStorage on initialization
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const savedServices = localStorage.getItem('spa-services');
      const savedStylists = localStorage.getItem('spa-stylists');
      const savedAppointments = localStorage.getItem('spa-appointments');
      const savedCustomers = localStorage.getItem('spa-customers');
      const savedPromotions = localStorage.getItem('spa-promotions');
      const savedPackages = localStorage.getItem('spa-packages');
      const savedGalleryImages = localStorage.getItem('spa-gallery');
      const savedFeedback = localStorage.getItem('spa-feedback');

      if (savedServices) this.services = JSON.parse(savedServices);
      if (savedStylists) this.stylists = JSON.parse(savedStylists);
      if (savedAppointments) this.appointments = JSON.parse(savedAppointments);
      if (savedCustomers) this.customers = JSON.parse(savedCustomers);
      if (savedPromotions) this.promotions = JSON.parse(savedPromotions);
      if (savedPackages) this.packages = JSON.parse(savedPackages);
      if (savedGalleryImages) this.galleryImages = JSON.parse(savedGalleryImages);
      if (savedFeedback) this.feedback = JSON.parse(savedFeedback);

      console.log('DataStore: Loaded from localStorage');
      console.log('Services:', this.services.length);
      console.log('Stylists:', this.stylists.length);
      console.log('Appointments:', this.appointments.length);
      console.log('Promotions:', this.promotions.length);
      console.log('Gallery:', this.galleryImages.length);
      console.log('Feedback:', this.feedback.length);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('spa-services', JSON.stringify(this.services));
      localStorage.setItem('spa-stylists', JSON.stringify(this.stylists));
      localStorage.setItem('spa-appointments', JSON.stringify(this.appointments));
      localStorage.setItem('spa-customers', JSON.stringify(this.customers));
      localStorage.setItem('spa-promotions', JSON.stringify(this.promotions));
      localStorage.setItem('spa-packages', JSON.stringify(this.packages));
      localStorage.setItem('spa-gallery', JSON.stringify(this.galleryImages));
      localStorage.setItem('spa-feedback', JSON.stringify(this.feedback));
      console.log('DataStore: Saved to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }

  subscribe(callback: Subscriber): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // Services
  getServices(): Service[] {
    return [...this.services];
  }

  addService(service: Service) {
    console.log('DataStore: Adding service:', service);
    this.services.push(service);
    this.saveToStorage();
    this.notifySubscribers();
  }

  updateService(id: string, updates: Partial<Service>) {
    console.log('DataStore: Updating service:', id, updates);
    const index = this.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.services[index] = { ...this.services[index], ...updates };
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deleteService(id: string) {
    console.log('DataStore: Deleting service:', id);
    this.services = this.services.filter(s => s.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Stylists
  getStylists(): Stylist[] {
    return [...this.stylists];
  }

  addStylist(stylist: Stylist) {
    console.log('DataStore: Adding stylist:', stylist);
    this.stylists.push(stylist);
    this.saveToStorage();
    this.notifySubscribers();
  }

  updateStylist(id: string, updates: Partial<Stylist>) {
    console.log('DataStore: Updating stylist:', id, updates);
    const index = this.stylists.findIndex(s => s.id === id);
    if (index !== -1) {
      this.stylists[index] = { ...this.stylists[index], ...updates };
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deleteStylist(id: string) {
    console.log('DataStore: Deleting stylist:', id);
    this.stylists = this.stylists.filter(s => s.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Appointments
  getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  addAppointment(appointment: Omit<Appointment, 'id'>) {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    console.log('DataStore: Adding appointment:', newAppointment);
    this.appointments.push(newAppointment);
    this.saveToStorage();
    this.notifySubscribers();
    return newAppointment;
  }

  updateAppointment(id: string, updates: Partial<Appointment>) {
    console.log('DataStore: Updating appointment:', id, updates);
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...updates };
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deleteAppointment(id: string) {
    console.log('DataStore: Deleting appointment:', id);
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Customers
  getCustomers(): Customer[] {
    return [...this.customers];
  }

  addCustomer(customer: Customer) {
    console.log('DataStore: Adding customer:', customer);
    this.customers.push(customer);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Promotions
  getPromotions(): Promotion[] {
    return [...this.promotions];
  }

  addPromotion(promotion: Promotion) {
    console.log('DataStore: Adding promotion:', promotion);
    this.promotions.push(promotion);
    this.saveToStorage();
    this.notifySubscribers();
  }

  updatePromotion(id: string, updates: Partial<Promotion>) {
    console.log('DataStore: Updating promotion:', id, updates);
    const index = this.promotions.findIndex(p => p.id === id);
    if (index !== -1) {
      this.promotions[index] = { ...this.promotions[index], ...updates };
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deletePromotion(id: string) {
    console.log('DataStore: Deleting promotion:', id);
    this.promotions = this.promotions.filter(p => p.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Packages
  getPackages(): Package[] {
    return [...this.packages];
  }

  addPackage(packageItem: Package) {
    console.log('DataStore: Adding package:', packageItem);
    this.packages.push(packageItem);
    this.saveToStorage();
    this.notifySubscribers();
  }

  updatePackage(id: string, updates: Partial<Package>) {
    console.log('DataStore: Updating package:', id, updates);
    const index = this.packages.findIndex(p => p.id === id);
    if (index !== -1) {
      this.packages[index] = { ...this.packages[index], ...updates };
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deletePackage(id: string) {
    console.log('DataStore: Deleting package:', id);
    this.packages = this.packages.filter(p => p.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Gallery
  getGalleryImages(): GalleryImage[] {
    return [...this.galleryImages];
  }

  addGalleryImage(image: GalleryImage) {
    console.log('DataStore: Adding gallery image:', image);
    this.galleryImages.push(image);
    this.saveToStorage();
    this.notifySubscribers();
  }

  updateGalleryImage(id: string, updates: Partial<GalleryImage>) {
    console.log('DataStore: Updating gallery image:', id, updates);
    const index = this.galleryImages.findIndex(img => img.id === id);
    if (index !== -1) {
      this.galleryImages[index] = { ...this.galleryImages[index], ...updates };
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deleteGalleryImage(id: string) {
    console.log('DataStore: Deleting gallery image:', id);
    this.galleryImages = this.galleryImages.filter(img => img.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  // Feedback
  getFeedback(): Feedback[] {
    return [...this.feedback];
  }

  addFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'status'>) {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'new'
    };
    console.log('DataStore: Adding feedback:', newFeedback);
    this.feedback.push(newFeedback);
    this.saveToStorage();
    this.notifySubscribers();
    return newFeedback;
  }

  updateFeedbackStatus(id: string, status: 'new' | 'read' | 'responded') {
    console.log('DataStore: Updating feedback status:', id, status);
    const index = this.feedback.findIndex(f => f.id === id);
    if (index !== -1) {
      this.feedback[index].status = status;
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  addFeedbackResponse(id: string, response: string) {
    console.log('DataStore: Adding feedback response:', id, response);
    const index = this.feedback.findIndex(f => f.id === id);
    if (index !== -1) {
      this.feedback[index].response = response;
      this.feedback[index].status = 'responded';
      this.saveToStorage();
      this.notifySubscribers();
    }
  }

  deleteFeedback(id: string) {
    console.log('DataStore: Deleting feedback:', id);
    this.feedback = this.feedback.filter(f => f.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }
}

// Create single instance
export const dataStore = new DataStore();

// React hooks for components
export const useServices = () => {
  const [services, setServices] = useState<Service[]>(dataStore.getServices());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newServices = dataStore.getServices();
      console.log('useServices: Updated services count:', newServices.length);
      setServices(newServices);
    });
    return unsubscribe;
  }, []);

  return services;
};

export const useStylists = () => {
  const [stylists, setStylists] = useState<Stylist[]>(dataStore.getStylists());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newStylists = dataStore.getStylists();
      console.log('useStylists: Updated stylists count:', newStylists.length);
      setStylists(newStylists);
    });
    return unsubscribe;
  }, []);

  return stylists;
};

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(dataStore.getAppointments());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newAppointments = dataStore.getAppointments();
      console.log('useAppointments: Updated appointments count:', newAppointments.length);
      setAppointments(newAppointments);
    });
    return unsubscribe;
  }, []);

  return appointments;
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(dataStore.getCustomers());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newCustomers = dataStore.getCustomers();
      console.log('useCustomers: Updated customers count:', newCustomers.length);
      setCustomers(newCustomers);
    });
    return unsubscribe;
  }, []);

  return customers;
};

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(dataStore.getPromotions());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newPromotions = dataStore.getPromotions();
      console.log('usePromotions: Updated promotions count:', newPromotions.length);
      setPromotions(newPromotions);
    });
    return unsubscribe;
  }, []);

  return promotions;
};

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>(dataStore.getPackages());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newPackages = dataStore.getPackages();
      console.log('usePackages: Updated packages count:', newPackages.length);
      setPackages(newPackages);
    });
    return unsubscribe;
  }, []);

  return packages;
};

export const useGalleryImages = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(dataStore.getGalleryImages());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newGalleryImages = dataStore.getGalleryImages();
      console.log('useGalleryImages: Updated gallery images count:', newGalleryImages.length);
      setGalleryImages(newGalleryImages);
    });
    return unsubscribe;
  }, []);

  return galleryImages;
};

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>(dataStore.getFeedback());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      const newFeedback = dataStore.getFeedback();
      console.log('useFeedback: Updated feedback count:', newFeedback.length);
      setFeedback(newFeedback);
    });
    return unsubscribe;
  }, []);

  return feedback;
};
