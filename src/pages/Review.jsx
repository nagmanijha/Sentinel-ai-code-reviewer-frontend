import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CodeReviewForm from '../components/review/CodeReviewForm'
import ReviewResult from '../components/review/ReviewResult'

const Review = () => {
  const { user } = useAuth()
  const [reviewData, setReviewData] = useState(null)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleReviewComplete = (review, code, language) => {
    setReviewData({ review, code, language })
  }

  const handleNewReview = () => {
    setReviewData(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!reviewData ? (
        <CodeReviewForm onReviewComplete={handleReviewComplete} />
      ) : (
        <ReviewResult 
          review={reviewData.review}
          code={reviewData.code}
          language={reviewData.language}
          onNewReview={handleNewReview}
        />
      )}
    </div>
  )
}

export default Review