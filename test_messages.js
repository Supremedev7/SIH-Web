const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('messages').select(`
    id,
    sender:user_profiles!messages_sender_id_fkey(auth_id)
  `);
  console.log(error);
}
run();
