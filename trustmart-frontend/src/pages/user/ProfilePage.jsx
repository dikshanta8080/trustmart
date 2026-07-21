import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../utils/api';
import { User, MapPin, Mail, ShieldCheck, Save, Camera, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAddress(user.address || '');
      setEmail(user.email || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const formData = new FormData();
    formData.append('multipartFile', file);

    try {
      setUploading(true);
      setError('');
      setSuccess('');
      await userAPI.updateProfileImage(formData);
      await refreshUser();
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Full Name is required');
      return;
    }

    if (!address.trim()) {
      setError('Address is required');
      return;
    }

    try {
      setLoading(true);
      await userAPI.updateProfile({
        name: name.trim(),
        address: address.trim()
      });
      await refreshUser();
      setSuccess('Profile details updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account information and preferences</p>
      </div>

      {/* Banner Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative"></div>

        {/* Profile Avatar Widget */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
            <div className="relative group">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Avatar" 
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl border-4 border-white shadow-md">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer border border-white transition group-hover:scale-110">
                <Camera className="w-4 h-4" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
              </label>
            </div>
            
            <div className="text-center sm:text-left pb-2">
              <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-1.5">
                {name || 'Loading...'}
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </h2>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>

          {uploading && (
            <div className="text-xs text-blue-600 flex items-center gap-1.5 mb-4 animate-pulse">
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              Uploading profile photo...
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-50">
            
            {/* Email (Read Only) */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Email Address (Permanent)
              </label>
              <div className="relative bg-gray-50 rounded-lg">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition text-gray-700 font-medium"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Delivery Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition text-gray-700 font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-75 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Details
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
