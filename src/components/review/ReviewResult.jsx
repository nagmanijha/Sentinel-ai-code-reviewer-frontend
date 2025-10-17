import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Copy,
  Check,
  Code as CodeIcon, // Renamed to avoid conflict with <code>
  FileText
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
// Assuming a Badge component exists at this path
import Badge from '../ui/Badge'; 

// A simple Badge component placeholder if it doesn't exist
// const Badge = ({ variant, children, ...props }) => {
//     const variants = {
//         destructive: 'bg-red-100 text-red-800',
//         warning: 'bg-yellow-100 text-yellow-800',
//         success: 'bg-green-100 text-green-800',
//         secondary: 'bg-gray-200 text-gray-800',
//         outline: 'border border-gray-300 text-gray-700'
//     };
//     return (
//         <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant] || variants.secondary}`} {...props}>
//             {children}
//         </span>
//     );
// };


const ReviewResult = ({ review, code, language, onNewReview }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = () => {
    // Using document.execCommand for better iframe compatibility
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const parseReviewContent = (text) => {
    if (!text) return [];

    // More sophisticated parsing for different review formats
    const sections = text.split(/(?=\n\s*(?:❌|✅|🔍|💡|##|###|\d+\.\s*\[?(?:CRITICAL|MAJOR|MINOR|INFO)))/gi);

    return sections.map((section, index) => {
      const lines = section.trim().split('\n').filter(line => line.trim());
      if (lines.length === 0) return null;

      const firstLine = lines[0].toLowerCase();
      
      let type = 'info';
      let icon = <Info className="h-4 w-4" />;
      let title = 'Review Note';
      let severity = 'info';

      if (firstLine.includes('❌') || firstLine.includes('critical') || firstLine.includes('error') || firstLine.includes('issue')) {
        type = 'critical';
        icon = <AlertTriangle className="h-4 w-4" />;
        title = 'Critical Issue';
        severity = 'critical';
      } else if (firstLine.includes('⚠️') || firstLine.includes('warning') || firstLine.includes('major')) {
        type = 'warning';
        icon = <AlertTriangle className="h-4 w-4" />;
        title = 'Warning';
        severity = 'warning';
      } else if (firstLine.includes('✅') || firstLine.includes('positive') || firstLine.includes('good')) {
        type = 'positive';
        icon = <CheckCircle className="h-4 w-4" />;
        title = 'Positive Finding';
        severity = 'positive';
      } else if (firstLine.includes('💡') || firstLine.includes('suggestion') || firstLine.includes('improvement') || firstLine.includes('recommendation')) {
        type = 'suggestion';
        icon = <Lightbulb className="h-4 w-4" />;
        title = 'Improvement Suggestion';
        severity = 'suggestion';
      }

      const potentialTitle = lines[0].replace(/['❌'|'✅'|'🔍'|'💡'|'⚠️'|'##']|\*\*/gu, '').trim();
      if (potentialTitle.length > 0 && potentialTitle.length < 100) {
        title = potentialTitle;
      }

      const content = lines.slice(1).join('\n') || lines[0];
      const isExpanded = expandedSections[index] !== false; // Default to expanded

      return {
        id: index,
        type,
        icon,
        title,
        content,
        severity,
        isExpanded,
        lines: lines.length
      };
    }).filter(Boolean);
  };

  const formatContent = (content) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockContent = '';
    let elements = [];
  
    lines.forEach((line, lineIndex) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${lineIndex}`} className="bg-gray-800 text-white p-3 my-2 rounded-md text-sm font-mono overflow-x-auto">
              <code>{codeBlockContent.trim()}</code>
            </pre>
          );
          codeBlockContent = '';
        }
        inCodeBlock = !inCodeBlock;
        return;
      }
  
      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        return;
      }
      
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
        elements.push(<li key={lineIndex} className="ml-5 list-disc">{trimmedLine.substring(2)}</li>);
      } else if (trimmedLine.match(/^\d+\./)) {
        elements.push(<li key={lineIndex} className="ml-5 list-decimal">{trimmedLine.replace(/^\d+\.\s*/, '')}</li>);
      } else if (trimmedLine) {
        elements.push(<p key={lineIndex} className="mb-2 leading-relaxed">{line}</p>);
      }
    });

    if (inCodeBlock) {
        elements.push(
          <pre key="code-end" className="bg-gray-800 text-white p-3 my-2 rounded-md text-sm font-mono overflow-x-auto">
            <code>{codeBlockContent.trim()}</code>
          </pre>
        );
    }
  
    return elements;
  };

  const reviewSections = parseReviewContent(review);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-50 border-red-600 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      suggestion: 'bg-blue-50 border-blue-200 text-blue-800',
      positive: 'bg-green-50 border-green-200 text-green-800',
      info: 'bg-gray-50 border-gray-200 text-gray-800'
    };
    return colors[severity] || colors.info;
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      critical: <Badge variant="destructive">Critical</Badge>,
      warning: <Badge variant="warning">Warning</Badge>,
      suggestion: <Badge variant="secondary">Suggestion</Badge>,
      positive: <Badge variant="success">Positive</Badge>,
      info: <Badge variant="outline">Info</Badge>
    };
    return badges[severity] || badges.info;
  };

  return (
    <div className="space-y-6">
      {reviewSections.length > 0 && (
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Review Summary</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onNewReview}
              >
                New Review
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {reviewSections.filter(s => s.severity === 'critical').length > 0 && (
                <Badge variant="destructive">
                  {reviewSections.filter(s => s.severity === 'critical').length} Critical
                </Badge>
              )}
              {reviewSections.filter(s => s.severity === 'warning').length > 0 && (
                <Badge variant="warning">
                  {reviewSections.filter(s => s.severity === 'warning').length} Warnings
                </Badge>
              )}
              {reviewSections.filter(s => s.severity === 'suggestion').length > 0 && (
                <Badge variant="secondary">
                  {reviewSections.filter(s => s.severity === 'suggestion').length} Suggestions
                </Badge>
              )}
              {reviewSections.filter(s => s.severity === 'positive').length > 0 && (
                <Badge variant="success">
                  {reviewSections.filter(s => s.severity === 'positive').length} Positive
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Code Review Findings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Detailed analysis of your {language} code with actionable insights
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {reviewSections.length > 0 ? (
            reviewSections.map((section) => (
              <div
                key={section.id}
                className={`border rounded-lg transition-all duration-200 ${
                  getSeverityColor(section.severity)
                } ${section.isExpanded ? 'shadow-sm' : ''}`}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1 rounded ${
                        section.severity === 'critical' ? 'bg-red-500' :
                        section.severity === 'warning' ? 'bg-yellow-300' :
                        section.severity === 'suggestion' ? 'bg-blue-300' :
                        section.severity === 'positive' ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{section.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getSeverityBadge(section.severity)}
                          <span className="text-xs text-gray-500">
                            {section.lines} point{section.lines !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      {section.isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {section.isExpanded && (
                  <div className="px-4 pb-4 border-t border-opacity-50 pt-3">
                    <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                      {formatContent(section.content)}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Info className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No review findings to display</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CodeIcon className="h-5 w-5" />
              Original Code
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{language}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {copiedCode ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copiedCode ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono">
              <code>{code}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewResult;

