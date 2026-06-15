'use client';

import { useState, useEffect } from "react";
import { submitReview, getReviews } from "@/app/lib/actions";
import { type Review } from "@/app/lib/types";

const REVIEWS_PER_PAGE = 4;

type ReviewBoardProps = {
  productId: number;
  reviewerName: string; // pass from server component
};

export default function ReviewBoard({ productId, reviewerName }: ReviewBoardProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", comment: "", rating: 5 });

  useEffect(() => {
    getReviews(productId).then((data) => {
      setReviews(data as Review[]);
      setLoading(false);
    });
  }, [productId]);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
  );
  const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
  );

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
        .then(res => res.json())
        .then(data => {
        setReviews(data);
        setLoading(false);
        });
    }, [productId]);

    const handleSubmit = async () => {
        await submitReview({
            productId,
            reviewerName,
            title: form.title,
            comment: form.comment,
            rating: form.rating,
        });
        fetch(`/api/reviews?productId=${productId}`)
            .then(res => res.json())
            .then(setReviews);
        setSubmitted(true);
        setShowForm(false);
        setForm({ title: "", comment: "", rating: 5 });
    };

  return (
    <div className="mt-4" id="product-reviews">
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>
        <button
          onClick={() => setShowForm(s => !s)}
          className="text-sm bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md"
        >
          {showForm ? "Cancel" : "Leave a Review"}
        </button>
      </div>

      {submitted && (
        <p className="mt-3 text-sm text-teal-600 font-medium">Thanks for your review!</p>
      )}

      {showForm && (
        <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded-xl p-5 flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-neutral-700 uppercase">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Summarize your experience"
              className="w-full mt-1 px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-700 uppercase">Rating</label>
            <select
              value={form.rating}
              onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
              className="w-full mt-1 px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>{"⭐".repeat(n)} ({n})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-700 uppercase">Comment</label>
            <textarea
              value={form.comment}
              onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
              placeholder="Tell us what you think..."
              rows={4}
              className="w-full mt-1 px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!form.title || !form.comment}
            className="self-end bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-5 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
          >
            Submit Review
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500 mt-4">Loading reviews...</p>
      ) : (
        <div className="mt-4">
          {visibleReviews.map(r => (
            <div key={r.id} className="border-b border-neutral-300 py-4">
              <h3 className="text-lg font-semibold mt-1">{r.title}</h3>
              <p className="flex items-center gap-1 text-neutral-700">
                <span>Reviewer: {r.reviewer_name}</span>
                <span className="ml-4 flex items-center gap-1">
                  Verified: {r.verified_purchase ? <CheckIcon /> : <XIcon />}
                </span>
              </p>
              <p className="text-neutral-700">{r.comment}</p>
              <p className="text-sm text-neutral-500">Rating: {r.rating} ⭐</p>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-sm text-neutral-500">No reviews yet — be the first!</p>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        {hasMore && (
          <button
            onClick={() => setVisibleCount(c => c + REVIEWS_PER_PAGE)}
            className="text-sm text-cyan-600 hover:underline"
          >
            Show more ({reviews.length - visibleCount} remaining)
          </button>
        )}
        {visibleCount > REVIEWS_PER_PAGE && (
          <button
            onClick={() => setVisibleCount(REVIEWS_PER_PAGE)}
            className="text-sm text-neutral-500 hover:underline"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}