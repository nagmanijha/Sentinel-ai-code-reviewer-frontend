import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Zap, Shield, Code, BrainCircuit } from 'lucide-react' // Changed icon for the last feature
import Button from '../components/ui/Button'

const Home = () => {
  const { user } = useAuth()

  // Upgraded feature descriptions for a more professional tone
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: 'Deep Static Analysis',
      description: 'Uncover complex bugs, logical errors, and anti-patterns that traditional linters miss.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Vulnerability Detection',
      description: 'Proactively identify security flaws before they reach production, with actionable mitigation advice.'
    },
    {
      icon: <Code className="h-8 w-8 text-primary-600" />,
      title: 'Comprehensive Language Support',
      description: 'Gain consistent, high-quality analysis across your entire tech stack, from Python to JavaScript and beyond.'
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary-600" />, // More professional icon
      title: 'Actionable Intelligence',
      description: 'Receive clear feedback with best-practice recommendations, transforming every review into a learning opportunity.'
    }
  ]

  // Placeholder for your app's professional name
  const AppName = "Sentinel";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ship with Confidence.
              <span className="text-primary-600 block">Instant Code Audits.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {AppName} analyzes your code for critical vulnerabilities, performance bottlenecks,
              and deviations from best practices, delivering actionable insights in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/review">
                  <Button size="lg" variant='primary'>
                    Analyze New Code
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant='primary' size="lg">
                      Create Your Free Account
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A More Intelligent Workflow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Go beyond linting. Integrate deep, contextual analysis into every stage of your development cycle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Elevate Your Engineering Standards.
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop shipping preventable errors. Integrate intelligent code analysis into your workflow 
            and build more robust, secure, and maintainable software.
          </p>
          {!user && (
            <Link to="/register">
              <Button size="lg" variant="primary">
                Get Started for Free
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home