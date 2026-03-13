-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Set admin for aminlu94@gmail.com
-- Note: This updates by joining with auth.users to find the profile by email
UPDATE profiles SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'aminlu94@gmail.com'
);
