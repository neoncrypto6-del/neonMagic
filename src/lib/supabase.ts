import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whgiqvpoouiefcpgcgjv.supabase.co';
// Using the provided service role key as requested by user context, though typically anon key is used client-side.
// In a real production app, we would use the anon key and RLS policies.
const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZ2lxdnBvb3VpZWZjcGdjZ2p2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDM4MTk3MywiZXhwIjoyMDg1OTU3OTczfQ.BO0Ejiwvo67NUzUcQJWKESsjburuVVETrNZA7pI2pSY';

export const supabase = createClient(supabaseUrl, supabaseKey);