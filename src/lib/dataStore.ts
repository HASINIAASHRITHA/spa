import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
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
  private unsubscribeFunctions: (() => void)[] = [];

  constructor() {
    // Start real-time listeners on initialization
    this.startRealtimeListeners();
  }

  private startRealtimeListeners() {
    try {
      this.listenToServicesInRealtime();
      this.listenToStylistsInRealtime();
      this.listenToAppointmentsInRealtime();
      this.listenToCustomersInRealtime();
      this.listenToPromotionsInRealtime();
      this.listenToPackagesInRealtime();
      this.listenToGalleryImagesInRealtime();
      this.listenToFeedbackInRealtime();

      console.log('DataStore: Started real-time listeners');
    } catch (error) {
      console.error('Error starting real-time listeners:', error);
    }
  }

  private listenToServicesInRealtime() {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      this.services = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Service[];
      console.log('Real-time update - Services:', this.services.length);
      this.notifySubscribers(); // This updates all components immediately
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToStylistsInRealtime() {
    const unsubscribe = onSnapshot(collection(db, "stylists"), (snapshot) => {
      this.stylists = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data()
      })) as Stylist[];
      console.log('Real-time update - Stylists:', this.stylists.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to stylists:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToAppointmentsInRealtime() {
    const unsubscribe = onSnapshot(query(collection(db, "appointments"), orderBy("createdAt", "desc")), (snapshot) => {
      this.appointments = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        dateTime: doc.data().dateTime?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Appointment[];
      console.log('Real-time update - Appointments:', this.appointments.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to appointments:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToCustomersInRealtime() {
    const unsubscribe = onSnapshot(collection(db, "customers"), (snapshot) => {
      this.customers = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        dateOfBirth: doc.data().dateOfBirth?.toDate() || undefined,
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Customer[];
      console.log('Real-time update - Customers:', this.customers.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to customers:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToPromotionsInRealtime() {
    const unsubscribe = onSnapshot(collection(db, "promotions"), (snapshot) => {
      this.promotions = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        validFrom: doc.data().validFrom?.toDate() || new Date(),
        validUntil: doc.data().validUntil?.toDate() || new Date(),
        endDate: doc.data().endDate?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Promotion[];
      console.log('Real-time update - Promotions:', this.promotions.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to promotions:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToPackagesInRealtime() {
    const unsubscribe = onSnapshot(collection(db, "packages"), (snapshot) => {
      this.packages = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        validUntil: doc.data().validUntil?.toDate() || new Date()
      })) as Package[];
      console.log('Real-time update - Packages:', this.packages.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to packages:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToGalleryImagesInRealtime() {
    const unsubscribe = onSnapshot(collection(db, "gallery"), (snapshot) => {
      this.galleryImages = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as GalleryImage[];
      console.log('Real-time update - Gallery:', this.galleryImages.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to gallery images:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  private listenToFeedbackInRealtime() {
    const unsubscribe = onSnapshot(query(collection(db, "feedback"), orderBy("createdAt", "desc")), (snapshot) => {
      this.feedback = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Feedback[];
      console.log('Real-time update - Feedback:', this.feedback.length);
      this.notifySubscribers();
    }, (error) => {
      console.error('Error listening to feedback:', error);
    });
    this.unsubscribeFunctions.push(unsubscribe);
  }

  // Cleanup method to unsubscribe from all listeners
  destroy() {
    this.unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    this.unsubscribeFunctions = [];
    this.subscribers.clear();
    console.log('DataStore: Cleaned up all listeners');
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

  // Services added with permanent timestamp
  async addService(service: Service) {
    const docRef = await addDoc(collection(db, "services"), {
      ...service,
      createdAt: new Date()
    });
    // Data saved to Firebase cloud ✅
  }

  async updateService(id: string, updates: Partial<Service>) {
    console.log('DataStore: Updating service:', id, updates);
    try {
      await updateDoc(doc(db, "services", id), updates);
      console.log('Service updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  async deleteService(id: string) {
    console.log('DataStore: Deleting service:', id);
    try {
      await deleteDoc(doc(db, "services", id));
      console.log('Service deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }

  // Stylists
  getStylists(): Stylist[] {
    return [...this.stylists];
  }

  async addStylist(stylist: Stylist) {
    console.log('DataStore: Adding stylist:', stylist);
    try {
      const docRef = await addDoc(collection(db, "stylists"), stylist);
      console.log('Stylist added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return docRef.id;
    } catch (error) {
      console.error('Error adding stylist:', error);
      throw error;
    }
  }

  async updateStylist(id: string, updates: Partial<Stylist>) {
    console.log('DataStore: Updating stylist:', id, updates);
    try {
      await updateDoc(doc(db, "stylists", id), updates);
      console.log('Stylist updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating stylist:', error);
      throw error;
    }
  }

  async deleteStylist(id: string) {
    console.log('DataStore: Deleting stylist:', id);
    try {
      await deleteDoc(doc(db, "stylists", id));
      console.log('Stylist deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting stylist:', error);
      throw error;
    }
  }

  // Appointments
  getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  async addAppointment(appointment: Omit<Appointment, 'id'>) {
    const newAppointment: Appointment = {
      ...appointment,
      id: '', // Will be set by Firestore
    };
    console.log('DataStore: Adding appointment:', newAppointment);
    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...newAppointment,
        createdAt: new Date()
      });
      console.log('Appointment added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return { ...newAppointment, id: docRef.id };
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  }

  async updateAppointment(id: string, updates: Partial<Appointment>) {
    console.log('DataStore: Updating appointment:', id, updates);
    try {
      await updateDoc(doc(db, "appointments", id), updates);
      console.log('Appointment updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }

  async deleteAppointment(id: string) {
    console.log('DataStore: Deleting appointment:', id);
    try {
      await deleteDoc(doc(db, "appointments", id));
      console.log('Appointment deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  // Customers
  getCustomers(): Customer[] {
    return [...this.customers];
  }

  async addCustomer(customer: Customer) {
    console.log('DataStore: Adding customer:', customer);
    try {
      const docRef = await addDoc(collection(db, "customers"), {
        ...customer,
        createdAt: new Date()
      });
      console.log('Customer added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return docRef.id;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  }

  // Promotions
  getPromotions(): Promotion[] {
    return [...this.promotions];
  }

  async addPromotion(promotion: Promotion) {
    console.log('DataStore: Adding promotion:', promotion);
    try {
      const docRef = await addDoc(collection(db, "promotions"), {
        ...promotion,
        createdAt: new Date()
      });
      console.log('Promotion added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return docRef.id;
    } catch (error) {
      console.error('Error adding promotion:', error);
      throw error;
    }
  }

  async updatePromotion(id: string, updates: Partial<Promotion>) {
    console.log('DataStore: Updating promotion:', id, updates);
    try {
      await updateDoc(doc(db, "promotions", id), updates);
      console.log('Promotion updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating promotion:', error);
      throw error;
    }
  }

  async deletePromotion(id: string) {
    console.log('DataStore: Deleting promotion:', id);
    try {
      await deleteDoc(doc(db, "promotions", id));
      console.log('Promotion deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting promotion:', error);
      throw error;
    }
  }

  // Packages
  getPackages(): Package[] {
    return [...this.packages];
  }

  async addPackage(packageItem: Package) {
    console.log('DataStore: Adding package:', packageItem);
    try {
      const docRef = await addDoc(collection(db, "packages"), packageItem);
      console.log('Package added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return docRef.id;
    } catch (error) {
      console.error('Error adding package:', error);
      throw error;
    }
  }

  async updatePackage(id: string, updates: Partial<Package>) {
    console.log('DataStore: Updating package:', id, updates);
    try {
      await updateDoc(doc(db, "packages", id), updates);
      console.log('Package updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating package:', error);
      throw error;
    }
  }

  async deletePackage(id: string) {
    console.log('DataStore: Deleting package:', id);
    try {
      await deleteDoc(doc(db, "packages", id));
      console.log('Package deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting package:', error);
      throw error;
    }
  }

  // Gallery
  getGalleryImages(): GalleryImage[] {
    return [...this.galleryImages];
  }

  async addGalleryImage(image: GalleryImage) {
    console.log('DataStore: Adding gallery image:', image);
    try {
      const docRef = await addDoc(collection(db, "gallery"), {
        ...image,
        createdAt: new Date()
      });
      console.log('Gallery image added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return docRef.id;
    } catch (error) {
      console.error('Error adding gallery image:', error);
      throw error;
    }
  }

  async updateGalleryImage(id: string, updates: Partial<GalleryImage>) {
    console.log('DataStore: Updating gallery image:', id, updates);
    try {
      await updateDoc(doc(db, "gallery", id), updates);
      console.log('Gallery image updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  }

  async deleteGalleryImage(id: string) {
    console.log('DataStore: Deleting gallery image:', id);
    try {
      await deleteDoc(doc(db, "gallery", id));
      console.log('Gallery image deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      throw error;
    }
  }

  // Feedback
  getFeedback(): Feedback[] {
    return [...this.feedback];
  }

  async addFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'status'>) {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: '', // Will be set by Firestore
      createdAt: new Date(),
      status: 'new'
    };
    console.log('DataStore: Adding feedback:', newFeedback);
    try {
      const docRef = await addDoc(collection(db, "feedback"), newFeedback);
      console.log('Feedback added successfully with ID:', docRef.id);
      // Remove local state manipulation - let real-time listener handle it
      return { ...newFeedback, id: docRef.id };
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  }

  async updateFeedbackStatus(id: string, status: 'new' | 'read' | 'responded') {
    console.log('DataStore: Updating feedback status:', id, status);
    try {
      await updateDoc(doc(db, "feedback", id), { status });
      console.log('Feedback status updated successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error updating feedback status:', error);
      throw error;
    }
  }

  async addFeedbackResponse(id: string, response: string) {
    console.log('DataStore: Adding feedback response:', id, response);
    try {
      await updateDoc(doc(db, "feedback", id), { 
        response, 
        status: 'responded' 
      });
      console.log('Feedback response added successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error adding feedback response:', error);
      throw error;
    }
  }

  async deleteFeedback(id: string) {
    console.log('DataStore: Deleting feedback:', id);
    try {
      await deleteDoc(doc(db, "feedback", id));
      console.log('Feedback deleted successfully');
      // Remove local state manipulation - let real-time listener handle it
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
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
