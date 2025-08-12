export interface Goal {
  id: string
  user_id: string
  title: string
  motivation: string | null
  target_days: number
  start_date: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      goals: {
        Row: Goal
        Insert: Omit<Goal, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Goal, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}