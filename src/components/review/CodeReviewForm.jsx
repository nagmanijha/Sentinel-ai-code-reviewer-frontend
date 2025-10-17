import React, { useState } from 'react'
import { apiService } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import Button from '../ui/Button'
import CodeEditor from '../ui/CodeEditor'
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card'

const CodeReviewForm = ({ onReviewComplete }) => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const { loading, error, callApi } = useApi()

  const languages = [
    'javascript', 'python', 'java', 'typescript', 'cpp', 'csharp', 'php', 'ruby', 'go', 'rust'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!code.trim()) {
      alert('Please enter some code to review')
      return
    }

    try {
      const result = await callApi(() => 
        apiService.post('/ai/get-review', { code, language })
      )
      onReviewComplete(result.review, code, language)
    } catch (error) {
      // Error handled by useApi hook
    }
  }

  const sampleCode = `// Example: Add your code here
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`

  const loadSampleCode = () => {
    setCode(sampleCode)
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Code Review Request</CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Paste your code below and get AI-powered review suggestions
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Programming Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={loadSampleCode}
              >
                Load Sample
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => setCode('')}
              >
                Clear
              </Button>
            </div>
          </div>
          
          <div>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              placeholder="Paste your code here or click 'Load Sample' to try with example code..."
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              cursor='pointer'
              loading={loading}
              disabled={!code.trim()}
              variant=''
            >
              {loading ? 'Analyzing Code...' : 'Get Code Review'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CodeReviewForm