const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️  SUPABASE_URL or SUPABASE_KEY not found in .env. Falling back to in-memory mode (if implemented) or failing.");
}

const supabase = createClient(supabaseUrl || 'https://xyz.supabase.co', supabaseKey || 'public-anon-key');

module.exports = supabase;
