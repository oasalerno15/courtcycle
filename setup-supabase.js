#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 CourtCycle Supabase Setup');
console.log('============================\n');

console.log('📋 Follow these steps to set up Supabase authentication:\n');

console.log('1️⃣  Create a Supabase Project:');
console.log('   • Go to https://supabase.com');
console.log('   • Click "New Project"');
console.log('   • Name: courtcycle-auth');
console.log('   • Choose your region\n');

console.log('2️⃣  Get your project credentials:');
console.log('   • Go to Settings → API in your Supabase dashboard');
console.log('   • Copy the Project URL and anon public key\n');

console.log('3️⃣  Update your .env.local file:');
console.log('   • Replace the placeholder values in .env.local');
console.log('   • NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
console.log('   • NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n');

console.log('4️⃣  Enable Google OAuth (optional):');
console.log('   • In Supabase: Authentication → Providers → Google');
console.log('   • Follow the Google Cloud Console setup in SUPABASE_SETUP.md\n');

console.log('5️⃣  Restart your development server:');
console.log('   • npm run dev\n');

const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file already exists');
  console.log('📝 Edit it with your Supabase credentials\n');
} else {
  console.log('❌ .env.local file not found');
  console.log('Creating one now...\n');
  
  const envTemplate = `# Supabase Configuration
# Replace these with your actual Supabase project credentials
# Get them from: https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site URL for OAuth redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file with template\n');
}

console.log('📖 For detailed instructions, see: SUPABASE_SETUP.md');
console.log('🔗 Quick links:');
console.log('   • Supabase Dashboard: https://supabase.com/dashboard');
console.log('   • Google Cloud Console: https://console.cloud.google.com/');
console.log('\n✨ Once configured, your authentication will work perfectly!'); 