/*
  # Create AI Tools Database Schema

  1. New Tables
    - `ai_tools`
      - `id` (uuid, primary key) - Unique identifier for each AI tool
      - `name` (text) - Name of the AI tool
      - `description` (text) - Detailed description of the tool
      - `category` (text) - Main category (e.g., "Image Generation", "Writing", "Coding")
      - `keywords` (text array) - Searchable keywords for matching
      - `url` (text) - Website URL of the tool
      - `logo_url` (text) - Logo/icon URL
      - `features` (text array) - Key features of the tool
      - `pricing` (text) - Pricing information (e.g., "Free", "Freemium", "$20/month")
      - `rating` (numeric) - User rating (1-5)
      - `created_at` (timestamp) - Record creation timestamp
      - `updated_at` (timestamp) - Record update timestamp

  2. Security
    - Enable RLS on `ai_tools` table
    - Add policy for public read access (anyone can view tools)
    - Add policy for authenticated users to suggest new tools (insert)
    
  3. Indexes
    - Add GIN index on keywords array for faster search
    - Add index on category for filtering
*/

CREATE TABLE IF NOT EXISTS ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  keywords text[] NOT NULL DEFAULT '{}',
  url text NOT NULL,
  logo_url text DEFAULT '',
  features text[] DEFAULT '{}',
  pricing text DEFAULT 'Free',
  rating numeric DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view AI tools"
  ON ai_tools
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can add AI tools"
  ON ai_tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_ai_tools_keywords ON ai_tools USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools (category);
CREATE INDEX IF NOT EXISTS idx_ai_tools_name ON ai_tools (name);
