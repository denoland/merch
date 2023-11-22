export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      supaswagcodes: {
        Row: {
          claimed: boolean | null
          email: string
          swag_code: string | null
        }
        Insert: {
          claimed?: boolean | null
          email: string
          swag_code?: string | null
        }
        Update: {
          claimed?: boolean | null
          email?: string
          swag_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
