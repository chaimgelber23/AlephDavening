'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RequireAuth } from '@/components/RequireAuth';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import type { Nusach, Pronunciation, TransliterationMode, VoiceGender, DisplaySettings } from '@/types';

export default function SettingsPage() {
  return (
    <Suspense>
      <RequireAuth>
        <SettingsContent />
      </RequireAuth>
    </Suspense>
  );
}

function SettingsContent() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const updatePassword = useAuthStore((s) => s.updatePassword);
  const updateEmail = useAuthStore((s) => s.updateEmail);
  const deleteAccount = useAuthStore((s) => s.deleteAccount);
  const profile = useUserStore((s) => s.profile);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const displaySettings = useUserStore((s) => s.displaySettings);
  const updateDisplaySettings = useUserStore((s) => s.updateDisplaySettings);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Account
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [newEmail, setNewEmail] = useState('');
  const [accountMsg, setAccountMsg] = useState('');

  // Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Delete
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Auto-focus password tab if redirected from recovery
  const tab = searchParams.get('tab');
  useEffect(() => {
    if (tab === 'password') {
      document.getElementById('password-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [tab]);

  const handleSaveName = () => {
    updateProfile({ displayName });
    setAccountMsg('Name updated');
    setTimeout(() => setAccountMsg(''), 2000);
  };

  const handleChangeEmail = async () => {
    if (!newEmail) return;
    const { error } = await updateEmail(newEmail);
    if (error) {
      setAccountMsg(error);
    } else {
      setAccountMsg('Verification email sent to ' + newEmail);
      setNewEmail('');
    }
    setTimeout(() => setAccountMsg(''), 4000);
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordMsg('');

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const { error } = await updatePassword(newPassword);
    if (error) {
      setPasswordError(error);
    } else {
      setPasswordMsg('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    }
    setTimeout(() => { setPasswordMsg(''); setPasswordError(''); }, 3000);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const { error } = await deleteAccount();
    if (error) {
      setDeleting(false);
      alert('Failed to delete account: ' + error);
    } else {
      router.replace('/');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB] pb-12">
      {/* Header */}
      <div className="bg-[#1B4965] text-white px-6 py-8 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <Link href="/" className="text-[#5FA8D3] text-sm hover:text-white transition-colors">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold mt-2">Settings</h1>
          <p className="text-[#5FA8D3] text-sm mt-1">{user?.email}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Account Section */}
        <SettingsSection title="Account">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-1.5">
                Display Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 outline-none text-sm"
                  placeholder="Your name"
                />
                <button
                  onClick={handleSaveName}
                  className="px-4 py-2.5 rounded-xl bg-[#1B4965] text-white text-sm font-medium hover:bg-[#163d55] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-1.5">
                Change Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 outline-none text-sm"
                  placeholder="new@email.com"
                />
                <button
                  onClick={handleChangeEmail}
                  disabled={!newEmail}
                  className="px-4 py-2.5 rounded-xl bg-[#1B4965] text-white text-sm font-medium hover:bg-[#163d55] transition-colors disabled:opacity-50"
                >
                  Update
                </button>
              </div>
            </div>

            {accountMsg && (
              <p className="text-sm text-[#4A7C59]">{accountMsg}</p>
            )}
          </div>
        </SettingsSection>

        {/* Security Section */}
        <SettingsSection title="Security" id="password-section">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 outline-none text-sm"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleChangePassword}
              disabled={!newPassword}
              className="px-6 py-2.5 rounded-xl bg-[#1B4965] text-white text-sm font-medium hover:bg-[#163d55] transition-colors disabled:opacity-50"
            >
              Update Password
            </button>
            {passwordError && <p className="text-sm text-[#C17767]">{passwordError}</p>}
            {passwordMsg && <p className="text-sm text-[#4A7C59]">{passwordMsg}</p>}
          </div>
        </SettingsSection>

        {/* Learning Preferences */}
        <SettingsSection title="Learning Preferences">
          <div className="space-y-5">
            {/* Nusach */}
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-2">
                Nusach (Pronunciation)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['ashkenaz', 'sefard', 'edot'] as Nusach[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => updateProfile({ nusach: n })}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                      profile.nusach === n
                        ? 'border-[#1B4965] bg-[#1B4965]/5 text-[#1B4965]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {n === 'ashkenaz' ? 'Ashkenaz' : n === 'sefard' ? 'Sefard' : 'Edot'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pronunciation */}
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-1">
                Audio Pronunciation
              </label>
              <p className="text-xs text-gray-400 mb-2">
                How should prayers sound when you tap Listen?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'modern' as const, label: 'Modern Israeli', desc: 'Shabbat, Baruch' },
                  { value: 'american' as const, label: 'American Shul', desc: 'Shabbos, Boruch' },
                ] as { value: Pronunciation; label: string; desc: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateProfile({ pronunciation: opt.value })}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors text-left ${
                      profile.pronunciation === opt.value
                        ? 'border-[#1B4965] bg-[#1B4965]/5 text-[#1B4965]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="block">{opt.label}</span>
                    <span className="text-xs font-normal text-gray-400">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Gender */}
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-1">
                Voice
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Choose a male or female voice for audio playback
              </p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'male' as const, label: 'Male Voice' },
                  { value: 'female' as const, label: 'Female Voice' },
                ] as { value: VoiceGender; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateProfile({ voiceGender: opt.value })}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors ${
                      profile.voiceGender === opt.value
                        ? 'border-[#1B4965] bg-[#1B4965]/5 text-[#1B4965]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Goal */}
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-2">
                Daily Goal
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 10, 15].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => updateProfile({ dailyGoalMinutes: mins })}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                      profile.dailyGoalMinutes === mins
                        ? 'border-[#1B4965] bg-[#1B4965]/5 text-[#1B4965]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Transliteration */}
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-2">
                Transliteration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'full' as const, label: 'Full' },
                  { value: 'faded' as const, label: 'Faded' },
                  { value: 'tap' as const, label: 'Tap to Show' },
                  { value: 'off' as const, label: 'Off' },
                ] as { value: TransliterationMode; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateProfile({ transliterationMode: opt.value })}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                      profile.transliterationMode === opt.value
                        ? 'border-[#1B4965] bg-[#1B4965]/5 text-[#1B4965]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Speed */}
            <div>
              <label className="block text-sm font-medium text-[#2D3142] mb-2">
                Audio Speed: {profile.audioSpeed}x
              </label>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.25}
                value={profile.audioSpeed}
                onChange={(e) => updateProfile({ audioSpeed: parseFloat(e.target.value) })}
                className="w-full accent-[#1B4965]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5x</span>
                <span>1x</span>
                <span>2x</span>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Display Preferences */}
        <SettingsSection title="Display Preferences">
          <p className="text-xs text-gray-400 -mt-2 mb-1">
            Toggle layers on or off as you gain confidence
          </p>
          <div className="space-y-3">
            {([
              { key: 'showTransliteration' as keyof DisplaySettings, label: 'Transliteration', desc: 'Romanized pronunciation below Hebrew' },
              { key: 'showTranslation' as keyof DisplaySettings, label: 'Translation', desc: 'English translation of prayers' },
              { key: 'showInstructions' as keyof DisplaySettings, label: 'Instructions', desc: 'Physical actions, tips, and notes' },
              { key: 'showAmudCues' as keyof DisplaySettings, label: 'Amud Cues', desc: 'Who says what (leader vs. congregation)' },
            ]).map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div className="flex-1 mr-4">
                  <p className="text-sm font-medium text-[#2D3142]">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <button
                  onClick={() => updateDisplaySettings({ [key]: !displaySettings[key] })}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                    displaySettings[key] ? 'bg-[#1B4965]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      displaySettings[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-[#1B4965] hover:text-[#1B4965] transition-colors"
        >
          Sign Out
        </button>

        {/* Danger Zone */}
        <SettingsSection title="Danger Zone" danger>
          <p className="text-sm text-gray-600 mb-4">
            Permanently delete your account and all your progress data. This cannot be undone.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2.5 rounded-xl border-2 border-[#C17767] text-[#C17767] text-sm font-medium hover:bg-[#C17767]/5 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-3 bg-[#C17767]/5 rounded-xl p-4">
              <p className="text-sm font-medium text-[#C17767]">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C17767]/30 focus:border-[#C17767] outline-none text-sm"
                placeholder="DELETE"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteInput !== 'DELETE' || deleting}
                  className="px-6 py-2.5 rounded-xl bg-[#C17767] text-white text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'Deleting...' : 'Permanently Delete'}
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); }}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </SettingsSection>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  danger = false,
  id,
  children,
}: {
  title: string;
  danger?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border ${
        danger ? 'border-[#C17767]/30' : 'border-gray-100'
      } p-6 space-y-4`}
    >
      <h2
        className={`text-lg font-bold ${
          danger ? 'text-[#C17767]' : 'text-[#2D3142]'
        }`}
      >
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
