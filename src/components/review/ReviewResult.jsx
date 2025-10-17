import React from 'react'
import { CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react'
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card'
import Button from '../ui/Button'

const ReviewResult = ({ review, code, language, onNewReview }) => {
  const formatReview = (text) => {
    if (!text) return null

    // Split by common section markers
    const sections = text.split(/(?=\n\s*(?:❌|✅|🔍|💡|###|\d+\.))/g)
    
    return sections.map((section, index) => {
      let icon = null
      let bgColor = 'bg-gray-50'
      let borderColor = 'border-gray-200'
      
      if (section.includes('❌') || section.includes('Issues:')) {
        icon = <AlertTriangle className="h-5 w-5 text-red-500" />
        bgColor = 'bg-red-50'
        borderColor = 'border-red-200'
      } else if (section.includes('✅') || section.includes('Recommendations:')) {
        icon = <CheckCircle className="h-5 w-5 text-green-500" />
        bgColor = 'bg-green-50'
        borderColor = 'border-green-200'
      } else if (section.includes('💡') || section.includes('Improvements:')) {
        icon = <Lightbulb className="h-5 w-5 text-yellow-500" />
        bgColor = 'bg-yellow-50'
        borderColor = 'border-yellow-200'
      } else {
        icon = <Info className="h-5 w-5 text-blue-500" />
        bgColor = 'bg-blue-50'
        borderColor = 'border-blue-200'
      }

      return (
        <div
          key={index}
          className={`p-4 rounded-lg border ${borderColor} ${bgColor} mb-4 animate-fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start space-x-3">
            {icon}
            <div className="flex-1">
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: section
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
                }}
              />
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="space-y-6">
      <Card className="animate-slide-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Code Review Results</CardTitle>
            <Button
              variant="primary"
              size="sm"
              onClick={onNewReview}
            >
              New Review
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            AI-powered analysis of your {language} code
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {formatReview(review)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Original Code</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}



export default ReviewResult