
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, MessageSquare, Trash2, Send, Clock, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useFeedback, dataStore } from '@/lib/dataStore';
import { Feedback } from '@/types/spa';

export const FeedbackManagement = () => {
  const feedback = useFeedback();
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseText, setResponseText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const statusColors = {
    new: 'bg-green-500/20 text-green-400',
    read: 'bg-blue-500/20 text-blue-400',
    responded: 'bg-purple-500/20 text-purple-400'
  };

  const handleMarkAsRead = (id: string) => {
    dataStore.updateFeedbackStatus(id, 'read');
  };

  const handleSendResponse = () => {
    if (selectedFeedback && responseText.trim()) {
      dataStore.addFeedbackResponse(selectedFeedback.id, responseText);
      setSelectedFeedback(null);
      setResponseText('');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      dataStore.deleteFeedback(id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
      />
    ));
  };

  const filteredFeedback = filterStatus === 'all' 
    ? feedback 
    : feedback.filter(f => f.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Customer Feedback</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-black/20 border border-cyan-400/30 rounded-lg text-white"
        >
          <option value="all">All Feedback</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-cyan-400/30 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Respond to {selectedFeedback.customerName}
            </h3>
            <div className="mb-4 p-4 bg-white/5 rounded-lg">
              <p className="text-white/70 text-sm mb-2">Original Message:</p>
              <p className="text-white">{selectedFeedback.message}</p>
            </div>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="w-full h-32 p-3 bg-black/20 border border-cyan-400/30 rounded-lg text-white resize-none"
              placeholder="Type your response..."
            />
            <div className="flex space-x-4 mt-4">
              <NeonButton onClick={handleSendResponse}>
                <Send size={18} className="mr-2" />
                Send Response
              </NeonButton>
              <NeonButton 
                variant="secondary" 
                onClick={() => {
                  setSelectedFeedback(null);
                  setResponseText('');
                }}
              >
                Cancel
              </NeonButton>
            </div>
          </div>
        </div>
      )}

      {/* Feedback List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredFeedback.map((item) => (
          <GlassCard key={item.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.customerName}</h3>
                    <p className="text-white/60 text-sm">{item.customerEmail}</p>
                    <p className="text-white/50 text-xs">
                      {new Date(item.createdAt).toLocaleDateString('en-IN')} at {new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      {renderStars(item.rating)}
                      <span className="ml-2 text-cyan-400 font-semibold">{item.rating}/5</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[item.status]}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-white">{item.message}</p>
                </div>

                {/* Detailed Ratings */}
                {(item.serviceRating || item.staffRating || item.facilityRating) && (
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    {item.serviceRating && (
                      <div>
                        <p className="text-white/60">Service Quality</p>
                        <div className="flex items-center">
                          {renderStars(item.serviceRating)}
                          <span className="ml-1 text-white">{item.serviceRating}/5</span>
                        </div>
                      </div>
                    )}
                    {item.staffRating && (
                      <div>
                        <p className="text-white/60">Staff Service</p>
                        <div className="flex items-center">
                          {renderStars(item.staffRating)}
                          <span className="ml-1 text-white">{item.staffRating}/5</span>
                        </div>
                      </div>
                    )}
                    {item.facilityRating && (
                      <div>
                        <p className="text-white/60">Facilities</p>
                        <div className="flex items-center">
                          {renderStars(item.facilityRating)}
                          <span className="ml-1 text-white">{item.facilityRating}/5</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Response */}
                {item.response && (
                  <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mb-4">
                    <p className="text-cyan-400 text-sm font-semibold mb-2">Your Response:</p>
                    <p className="text-white">{item.response}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                {item.status === 'new' && (
                  <button
                    onClick={() => handleMarkAsRead(item.id)}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Mark as Read"
                  >
                    <Eye size={18} />
                  </button>
                )}
                
                {item.status !== 'responded' && (
                  <button
                    onClick={() => setSelectedFeedback(item)}
                    className="p-2 text-green-400 hover:text-green-300 transition-colors"
                    title="Respond"
                  >
                    <MessageSquare size={18} />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            {filterStatus === 'all' 
              ? 'No feedback received yet.'
              : `No ${filterStatus} feedback found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};
