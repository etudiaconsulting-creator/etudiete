/** Returns true if the profile has admin role. */
export function isAdmin(profile: { role?: string } | null | undefined): boolean {
  return profile?.role === "admin";
}
