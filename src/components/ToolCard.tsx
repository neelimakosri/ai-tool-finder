import { ExternalLink, Star, Tag } from 'lucide-react';
import { AITool } from '../lib/supabase';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Tag className="w-3 h-3" />
              {tool.category}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">{tool.rating}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-sm font-medium text-green-600">{tool.pricing}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>

      {tool.features.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
          <div className="flex flex-wrap gap-2">
            {tool.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium group-hover:shadow-md"
      >
        Visit Website
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
