import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gpadxlfxuxzpbpkfippw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYWR4bGZ4dXh6cGJwa2ZpcHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTQ2NTcsImV4cCI6MjA3NTE5MDY1N30.E0XSBerTzH-oXocZD_QygAdsal96L0tZYHCff-I4NC4'

export default ({ app }, inject) => {
  const supabase = createClient(supabaseUrl, supabaseKey)
  inject('supabase', supabase)
}
