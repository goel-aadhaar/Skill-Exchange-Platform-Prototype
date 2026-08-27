'use client';

import React, { useState } from 'react';
import { MentoringRequest } from '../../types';
import { Modal } from '../common/Modal';
import { StarRating } from '../common/StarRating';
import { useApp } from '../../context/AppContext';
import { Star, Sparkles, Check, Send } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: MentoringRequest | null;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  request
}) => {
  const { submitRatingReview } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Clear Explanations',
    'Practical Examples'
  ]);
  const [review, setReview] = useState<string>(
    'The mentor was exceptionally clear, structured, and provided practical industry examples that helped me grasp the concepts immediately!'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!request) return null;

  const availableTags = [
    'Clear Explanations',
    'Practical Examples',
    'Punctual & Patient',
    'Interview Cracking Tips',
    'Real-world Datasets',
    'Structured Frameworks',
    'Excel / Code Best Practices',
    'Highly Recommended'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;

    setIsSubmitting(true);
    const success = await submitRatingReview({
      requestId: request.id,
      mentorId: request.mentorId,
      skillName: request.skillName,
      rating,
      tags: selectedTags,
      review
    });
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rate & Review Peer Mentor"
      subtitle={`Share your experience learning with ${request.mentorName}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Mentor & Topic Info */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-900">
              Mentor: {request.mentorName}
            </div>
            <div className="text-[11px] text-blue-900 font-bold mt-0.5">
              Topic: {request.skillName}
            </div>
          </div>
          <div className="text-[10px] text-slate-500 text-right">
            <span>Conducted on:</span>
            <div className="font-semibold text-slate-700">{request.preferredDate || 'Recent'}</div>
          </div>
        </div>

        {/* Star Rating selector */}
        <div className="text-center py-2 bg-white rounded-2xl border border-slate-200 p-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Overall Session Rating
          </label>
          <div className="flex justify-center my-2">
            <StarRating
              rating={rating}
              size="lg"
              interactive
              onRatingChange={(newRate: number) => setRating(newRate)}
            />
          </div>
          <span className="text-xs font-extrabold text-amber-700">
            {rating === 5 && 'Outstanding session! Highly recommend.'}
            {rating === 4 && 'Very good session, clear concepts.'}
            {rating === 3 && 'Good session, met expectations.'}
            {rating === 2 && 'Fair, could be improved.'}
            {rating === 1 && 'Needs significant improvement.'}
          </span>
        </div>

        {/* Feedback tags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Highlight Strengths (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-amber-700" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Written Peer Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={3}
            required
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-extrabold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-slate-900" />
            <span>{isSubmitting ? 'Updating in PostgreSQL...' : `Submit ${rating}★ Review`}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
