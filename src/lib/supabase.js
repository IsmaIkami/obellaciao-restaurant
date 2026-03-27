import { createClient } from '@supabase/supabase-js'

// For MVP, we'll use environment variables
// You can get these from https://supabase.com (free tier)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database operations
export const db = {
  // Orders
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async addOrder(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateOrder(id, updates) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Reservations
  async getReservations() {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true })
    if (error) throw error
    return data || []
  },

  async addReservation(reservation) {
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateReservation(id, updates) {
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Tables
  async getTables() {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .order('id', { ascending: true })
    if (error) throw error
    return data || []
  },

  async updateTable(id, updates) {
    const { data, error } = await supabase
      .from('tables')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Calls
  async getCalls() {
    const { data, error } = await supabase
      .from('calls')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async addCall(call) {
    const { data, error } = await supabase
      .from('calls')
      .insert([call])
      .select()
    if (error) throw error
    return data[0]
  },

  async resolveCall(id) {
    const { data, error } = await supabase
      .from('calls')
      .update({ done: true })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Real-time subscriptions
  subscribeToOrders(callback) {
    return supabase
      .channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
      .subscribe()
  },

  subscribeToReservations(callback) {
    return supabase
      .channel('reservations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, callback)
      .subscribe()
  },

  subscribeToCalls(callback) {
    return supabase
      .channel('calls')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'calls' }, callback)
      .subscribe()
  },

  subscribeToTables(callback) {
    return supabase
      .channel('tables')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tables' }, callback)
      .subscribe()
  },
}
