import { createClient } from './supabase'
import { type Goal } from '../types/database'

export async function createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at' | 'user_id'>) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('goals')
    .insert([{ ...goal, user_id: user.id }])
    .select()
    .single()

  return { data, error }
}

export async function getUserGoals() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function updateGoal(goalId: string, updates: Partial<Goal>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('goals')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', goalId)
    .select()
    .single()

  return { data, error }
}

export async function deleteGoal(goalId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId)

  return { data, error }
}