import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboardService } from '../services/api'
import { Code, Calendar, Star, ArrowLeft, Filter } from 'lucide-react'
import Button from '../components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ReviewHistory = () => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState({ suggestions: [], pagination: {} })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    language: 'all'
  })

  const languages = ['all', 'javascript', 'python', 'java', 'typescript', 'cpp', 'csharp', 'php', 'ruby', 'go', 'rust']

  useEffect(() => {
    if (user) {
      fetchReviewHistory()
    }
  }, [user, filters])

  const fetchReviewHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dashboardService.getHistory(filters)
      console.log('Review history response:', response) // Debug log
      
      // Handle both response structures
      if (response && response.suggestions) {
        setReviews(response)
      } else if (response && response.data) {
        setReviews(response.data)
      } else {
        setReviews({ suggestions: [], pagination: {} })
      }
    } catch (err) {
      console.error('Failed to fetch review history:', err)
      setError('Failed to load review history. Please try again.')
      setReviews({ suggestions: [], pagination: {} })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Safe access to reviews data
  const suggestions = reviews?.suggestions || []
  const pagination = reviews?.pagination || {}

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Review History</h1>
            <p className="text-gray-600 mt-1">Your past code reviews and analyses</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Language:</label>
            </div>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex-1"></div>
            <Button
              variant="secondary"
              onClick={fetchReviewHistory}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Loading review history...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <p className="text-red-700 mb-4">{error}</p>
            <Button onClick={fetchReviewHistory}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {!loading && !error && (
        <div className="space-y-4">
          {suggestions.length > 0 ? (
            suggestions.map((review, index) => (
              <Card key={review._id || index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Code className="h-5 w-5 text-primary-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Code Review</h3>
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                          {review.language || 'unknown'}
                        </span>
                        {review.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{review.rating}/5</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {review.review ? review.review.substring(0, 200) + '...' : 'No review content available'}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{review.createdAt ? formatDate(review.createdAt) : 'Unknown date'}</span>
                        </div>
                        {review.reviewTime && (
                          <span>Duration: {review.reviewTime}s</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link to="/review" state={{ reviewData: review }}>
                        <Button variant="primary" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-600 mb-6">
                  {filters.language !== 'all' 
                    ? `No ${filters.language} reviews found. Try changing your filters.`
                    : "You haven't completed any code reviews yet."
                  }
                </p>
                <Link to="/review">
                  <Button>
                    Start Your First Review
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination && pagination.pages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="secondary"
            size="sm"
            disabled={filters.page <= 1}
            onClick={() => handleFilterChange('page', filters.page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {filters.page} of {pagination.pages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={filters.page >= pagination.pages}
            onClick={() => handleFilterChange('page', filters.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default ReviewHistory