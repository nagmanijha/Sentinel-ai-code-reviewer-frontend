import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboardService } from '../services/api'
import { Code, ArrowRight, Calendar, Star, TrendingUp, AlertCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Dashboard = () => {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const stats = await dashboardService.getStats()
      setDashboardData(stats)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load dashboard</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const stats = dashboardData || {
    reviews: { total: 0, thisWeek: 0, improvement: 0 },
    quality: { score: 0, improvement: 0, averageRating: 0 },
    languages: { count: 0, list: [] },
    recentActivity: []
  }

  const statCards = [
    {
      label: 'Reviews Completed',
      value: stats.reviews.total.toString(),
      change: `+${stats.reviews.thisWeek} this week`,
      icon: <Code className="h-6 w-6 text-blue-600" />,
      color: 'blue'
    },
    {
      label: 'Code Quality Score',
      value: `${stats.quality.score}%`,
      change: `+${stats.quality.improvement}% improvement`,
      icon: <Star className="h-6 w-6 text-green-600" />,
      color: 'green'
    },
    {
      label: 'Languages Used',
      value: stats.languages.count.toString(),
      change: stats.languages.list.slice(0, 3).map(lang => lang.name).join(', '),
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      color: 'purple'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.username}!
        </h1>
        <p className="text-gray-600 mt-2">
          {stats.reviews.thisWeek > 0 
            ? `Great work! You've completed ${stats.reviews.thisWeek} reviews this week.`
            : 'Ready to improve your code with AI-powered reviews?'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card 
            key={index} 
            className="animate-fade-in hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-gray-500'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/review">
              <Button className="w-full justify-between group" variant='primary'>
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>New Code Review</span>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-4 py-2">
              <Link to="/dashboard/history">
                <Button variant="secondary" className="w-full">
                  View History
                </Button>
              </Link>
              <Button variant="secondary" className="w-full">
                Settings
              </Button>
            </div>

            {/* Language Distribution */}
            {stats.languages.list.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Language Distribution</h4>
                <div className="space-y-2">
                  {stats.languages.list.slice(0, 4).map((lang, index) => (
                    <div key={lang.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{lang.name}</span>
                      <span className="text-sm font-medium text-gray-900">{lang.count} reviews</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id || index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-50 rounded">
                        <Code className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                            {activity.language}
                          </span>
                          {activity.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600">{activity.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Start your first code review to see activity here.</p>
                <Link to="/review">
                  <Button variant='secondary'>
                    Start Code Review
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      {stats.reviews.thisWeek > 0 && (
        <Card className="mt-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.reviews.thisWeek} reviews</p>
                <p className="text-green-600 text-sm">
                  +{stats.reviews.improvement}% from last week
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.quality.score}%</p>
                <p className="text-green-600 text-sm">
                  +{stats.quality.improvement}% improvement
                </p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.quality.score, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Dashboard