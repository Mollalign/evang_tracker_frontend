import { apiClient } from './client'
import {
  Person,
  PersonPayload,
  PersonUpdatePayload,
} from '@/types/person'

type ListPeopleParams = {
  reportId?: string
}

export const peopleAPI = {
  listPeople: async (params?: ListPeopleParams): Promise<Person[]> => {
    const response = await apiClient.get<Person[]>('/api/people', {
      params: {
        report_id: params?.reportId,
      },
    })

    const people = response.data

    if (params?.reportId) {
      return people.filter((person) => person.report_id === params.reportId)
    }

    return people
  },

  getPerson: async (id: string): Promise<Person> => {
    const response = await apiClient.get<Person>(`/api/people/${id}`)
    return response.data
  },

  createPerson: async (payload: PersonPayload): Promise<Person> => {
    const response = await apiClient.post<Person>('/api/people', payload)
    return response.data
  },

  updatePerson: async (
    id: string,
    payload: PersonUpdatePayload
  ): Promise<Person> => {
    const response = await apiClient.put<Person>(`/api/people/${id}`, payload)
    return response.data
  },

  deletePerson: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/people/${id}`)
  },
}

