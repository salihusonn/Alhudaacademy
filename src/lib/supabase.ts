/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Normalize URL (ensure http:// or https:// if it looks like a domain)
let cleanUrl = rawUrl;
if (cleanUrl && !/^https?:\/\//i.test(cleanUrl)) {
  cleanUrl = `https://${cleanUrl}`;
}

const isValidHttpUrl = (urlStr: string): boolean => {
  try {
    const url = new URL(urlStr);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// Check if Supabase keys are provided and aren't default placeholder strings, and the URL is a valid http/https URL
export const isSupabaseConfigured = (() => {
  if (!cleanUrl || !rawKey) return false;
  
  const lowerUrl = cleanUrl.toLowerCase();
  const lowerKey = rawKey.toLowerCase();
  
  const isPlaceholder = 
    lowerUrl.includes('your_supabase_url') || 
    lowerUrl.includes('placeholder') ||
    lowerKey.includes('your_supabase_anon_key') ||
    lowerKey.includes('placeholder');
    
  return !isPlaceholder && isValidHttpUrl(cleanUrl);
})();

// Graceful fallback URL and key so initialization does not throw an exception on startup if keys are not yet configured
const finalUrl = isSupabaseConfigured ? cleanUrl : 'https://placeholder-project.supabase.co';
const finalKey = isSupabaseConfigured ? rawKey : 'placeholder-anon-key';

export const supabase = createClient(finalUrl, finalKey);

/**
 * Uploads a file to a specified Supabase Storage bucket and returns its public URL.
 * Assumes the bucket exists and has public read access.
 */
export async function uploadToSupabaseStorage(
  bucketName: string,
  file: File,
  prefix: string = 'document'
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase is not configured. Cannot upload file.');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const randomId = Math.floor(100000 + Math.random() * 900000);
  const fileName = `${prefix}-${Date.now()}-${randomId}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (uploadError) {
    console.error(`Error uploading file to storage bucket "${bucketName}":`, uploadError);
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
