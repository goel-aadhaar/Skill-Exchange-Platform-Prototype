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
  const { submitRating } = useApp();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitRating({
        requestId: request.id,
        rating,
        tags: selectedTags,
        review
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
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
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-900">
              Mentor: {request.mentorName}
            </div>
            <div className="text-[11px] text-[#8B1E2D] font-semibold mt-0.5">
              Topic: {request.skillName}
            </div>
          </div>
          <div className="text-[10px] text-slate-500 text-right">
            <span>Conducted on:</span>
            <div className="font-semibold text-slate-700">{request.preferredDate}</div>
          </div>
        </div>

        {/* Star Rating selector */}
        <div className="text-center py-2 bg-white rounded-xl border border-slate-100 p-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Overall Session Rating
          </label>
          <div className="flex justify-center items-center gap-2">
            <StarRating
              rating={rating}
              size="lg"
              interactive={true}
              onRatingChange={(r) => setRating(r)}
              showNumber={false}
            />
          </div>
          <div className="text-xs font-bold text-amber-600 mt-2">
            {rating === 5 && '★★★★★ Exceptional & Super Helpful'}
            {rating === 4 && '★★★★☆ Very Good & Actionable'}
            {rating === 3 && '★★★☆☆ Good & Informative'}
            {rating === 2 && '★★☆☆☆ Fair'}
            {rating === 1 && '★☆☆☆☆ Needs Improvement'}
          </div>
        </div>

        {/* Feedback tags */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            What went particularly well? (Select tags)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] font-semibold shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Detailed Review / Testimonial *
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={3}
            required
            placeholder="Write a brief note explaining how the mentor helped you..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E2D] hover:bg-[#721522] rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>Submitting Review...</>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Submit Rating & Review
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
