import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  url: string;
  logo_url: string;
  features: string[];
  pricing: string;
  rating: number;
  created_at: string;
  updated_at: string;
}
