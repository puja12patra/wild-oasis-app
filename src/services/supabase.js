
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ptblboatccgsccmniktl.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0Ymxib2F0Y2Nnc2NjbW5pa3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTkzMjQsImV4cCI6MjA3OTE5NTMyNH0.RkynZ157o_qn4j9gOgjjZvHdErcgrTa189N33igTD3c";

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;