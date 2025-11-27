export type SpiritualStatus = 'interested' | 'accepted' | 'repented'

export interface Person {
  id: string
  report_id: string
  full_name: string
  phone_number?: string | null
  status: SpiritualStatus
  created_at: string
  updated_at: string
}

export interface PersonPayload {
  full_name: string
  phone_number?: string
  status: SpiritualStatus
  report_id: string
}

export type PersonUpdatePayload = Partial<Omit<PersonPayload, 'report_id'>> & {
  report_id?: string
}

