import { apiClient } from './client'
import {
  Report,
  ReportPayload,
  ReportUpdatePayload,
} from '@/types/report'

export const reportsAPI = {
  listReports: async (): Promise<Report[]> => {
    const response = await apiClient.get<Report[]>('/api/reports')
    return response.data
  },

  getReport: async (id: string): Promise<Report> => {
    const response = await apiClient.get<Report>(`/api/reports/${id}`)
    return response.data
  },

  createReport: async (payload: ReportPayload): Promise<Report> => {
    const response = await apiClient.post<Report>('/api/reports', payload)
    return response.data
  },

  updateReport: async (
    id: string,
    payload: ReportUpdatePayload
  ): Promise<Report> => {
    const response = await apiClient.put<Report>(
      `/api/reports/${id}`,
      payload
    )
    return response.data
  },

  deleteReport: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/reports/${id}`)
  },
}

