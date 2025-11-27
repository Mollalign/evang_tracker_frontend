'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Loader2, ShieldCheck, Sparkles, UserCog } from 'lucide-react'

import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const { user } = useAuth()
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPreferences, setIsSavingPreferences] = useState(false)

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSavingProfile(true)
    setTimeout(() => {
      setIsSavingProfile(false)
      toast.success('Profile updated', {
        description: 'Your profile changes are safely stored.',
      })
    }, 1200)
  }

  const handlePreferenceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSavingPreferences(true)
    setTimeout(() => {
      setIsSavingPreferences(false)
      toast.success('Preferences updated', {
        description: 'Your notification rhythm has been refreshed.',
      })
    }, 1200)
  }

  return (
    <motion.div
      className="space-y-8 pb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="rounded-[30px] border border-white/40 bg-white/80 p-6 shadow-lg glass-panel dark:border-white/10 dark:bg-slate-900/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Settings
            </p>
            <h1 className="font-[var(--font-playfair)] text-4xl text-slate-900 dark:text-white">
              Steward your profile & preferences
            </h1>
            <p className="text-sm text-slate-500">
              Update information for both administrators and evangelists.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Role · {user?.role ?? 'evangelist'}
          </div>
        </div>
      </section>

      <form
        onSubmit={handleProfileSubmit}
        className="space-y-6 rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-xl glass-panel dark:border-white/10 dark:bg-slate-900/70"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 p-3 text-white shadow-lg">
            <UserCog className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Profile details</h2>
            <p className="text-sm text-slate-500">
              Update your name, contact information, and picture.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: 'Full name', name: 'fullName', defaultValue: user?.full_name ?? '' },
            { label: 'Email address', name: 'email', defaultValue: user?.email ?? '', type: 'email' },
            { label: 'Phone number', name: 'phone', defaultValue: user?.phone_number ?? '' },
            { label: 'Ministry region', name: 'region', placeholder: 'e.g. Downtown' },
          ].map((field) => (
            <div className="floating-label" key={field.name}>
              <input
                name={field.name}
                placeholder=" "
                type={field.type ?? 'text'}
                defaultValue={field.defaultValue}
              />
              <label>{field.label}</label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg hover:scale-[1.01]"
            disabled={isSavingProfile}
          >
            {isSavingProfile ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              'Save profile'
            )}
          </Button>
        </div>
      </form>

      <form
        onSubmit={handlePreferenceSubmit}
        className="space-y-6 rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-xl glass-panel dark:border-white/10 dark:bg-slate-900/70"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-3 text-white shadow-lg">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Notification rhythm</h2>
            <p className="text-sm text-slate-500">
              Decide how often you receive follow-up reminders.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {['Daily', 'Twice weekly', 'Weekly'].map((cadence) => (
            <label
              key={cadence}
              className="rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <input type="radio" name="cadence" value={cadence} className="hidden" defaultChecked={cadence === 'Weekly'} />
              <p className="text-sm font-semibold text-slate-900">{cadence}</p>
              <p className="text-xs text-slate-500">
                {cadence === 'Daily'
                  ? 'Great for evangelists on mission trips'
                  : cadence === 'Weekly'
                  ? 'Balanced reminder rhythm'
                  : 'Perfect for admins overseeing teams'}
              </p>
            </label>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Celebration animations</p>
          <label className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm">
            <input type="checkbox" defaultChecked className="h-5 w-5" />
            <span className="text-sm text-slate-600">
              Show celebratory confetti when a report is submitted
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            variant="secondary"
            className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg hover:scale-[1.01]"
            disabled={isSavingPreferences}
          >
            {isSavingPreferences ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Updating…
              </>
            ) : (
              'Save preferences'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

