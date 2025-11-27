import { Person } from './person'

export interface Report {
  id: string
  evangelist_id: string
  outreach_name: string
  location: string
  date: string
  heard_count: number
  interested_count: number
  accepted_count: number
  repented_count: number
  notes?: string | null
  created_at: string
  updated_at: string
}

export type ReportPayload = Omit<
  Report,
  'id' | 'evangelist_id' | 'created_at' | 'updated_at'
>

export type ReportUpdatePayload = Partial<ReportPayload>

export interface ReportWithPeople extends Report {
  people?: Person[]
}

