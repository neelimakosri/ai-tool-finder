import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ToolCard } from './components/ToolCard';
import { CategoryFilter } from './components/CategoryFilter';
import { supabase, AITool } from './lib/supabase';
import { Sparkles, Loader2 } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [tools, selectedCategory, searchQuery]);

  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching tools:', error);
    } else if (data) {
      setTools(data);
      const uniqueCategories = [...new Set(data.map((tool) => tool.category))];
      setCategories(uniqueCategories);
    }
    setLoading(false);
  };

  const filterTools = () => {
    let filtered = tools;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((tool) => {
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDescription = tool.description.toLowerCase().includes(query);
        const matchesCategory = tool.category.toLowerCase().includes(query);
        const matchesKeywords = tool.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );
        const matchesFeatures = tool.features.some((feature) =>
          feature.toLowerCase().includes(query)
        );
        return matchesName || matchesDescription || matchesCategory || matchesKeywords || matchesFeatures;
      });
    }

    setFilteredTools(filtered);
  };

  const handleSearch = () => {
    setSearching(true);
    filterTools();
    setTimeout(() => setSearching(false), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AI Tool Finder
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect AI tool for your needs. Search by keyword, category, or feature.
          </p>
        </div>

        <div className="mb-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {searching ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : filteredTools.length > 0 ? (
              <>
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    Found <span className="font-semibold text-blue-600">{filteredTools.length}</span> AI tool{filteredTools.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No AI tools found matching your search.</p>
                <p className="text-gray-400 mt-2">Try a different keyword or category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
