import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type AITool = {
  id: number;
  name: string;
  category: string;
  description: string;
  pricing: string;
  rating: number;
  website: string;
  tags: string[];

};

export default function App() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [tools, selectedCategory, searchQuery]);

  const fetchTools = async (search = "") => {
    setLoading(true);

    let query = supabase.from("ai_tools").select("*");

   

    const { data, error } = await query.order("rating", { ascending: false });

    if (error) {
      console.error("Supabase error:", error.message);
      setLoading(false);
      return;
    }

    setTools(data || []);
    const uniqueCategories = [...new Set((data || []).map((tool) => tool.category))];
    setCategories(uniqueCategories);
    setLoading(false);
  };

  const filterTools = () => {
  let filtered = tools;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      tool => tool.category === selectedCategory
    );
  }

  if (searchQuery.trim() !== "") {
    const keywords = searchQuery
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    filtered = filtered.filter(tool =>
      keywords.some(word =>
        tool.name.toLowerCase().includes(word) ||
        tool.description.toLowerCase().includes(word) ||
        tool.category.toLowerCase().includes(word) ||
        tool.tags.join(" ").toLowerCase().includes(word)
      )
    );
  }

  setFilteredTools(filtered);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">✨ AI Tool Finder</h1>
        <p className="text-gray-600 mb-6">
          Discover the perfect AI tool for your needs. Search by keyword, category, or feature.
        </p>

        <div className="flex gap-2 justify-center mb-6">
          <input
            type="text"
            placeholder="Search for AI tools..."
            className="w-full max-w-xl px-4 py-3 border rounded-xl shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          
          />
          
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
           onClick={() => {
  setSelectedCategory("All");
  setSearchQuery("");
}}

            className={`px-4 py-2 rounded-lg ${
              selectedCategory === "All" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
  setSelectedCategory(cat);
  setSearchQuery(cat);
}}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-500">Loading AI tools...</p>}

        {!loading && filteredTools.length === 0 && (
          <p className="text-gray-500">No AI tools found matching your search.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl shadow p-5 text-left">
              <h2 className="text-xl font-semibold text-blue-600 mb-1">{tool.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{tool.category}</p>
              <p className="text-gray-600 mb-3">{tool.description}</p>
              <p className="text-sm mb-1">
                <b>Pricing:</b> {tool.pricing}
              </p>
              <p className="text-sm mb-2">
                <b>Rating:</b> ⭐ {tool.rating}
              </p>
              <a
                href={tool.website}
                target="_blank"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
