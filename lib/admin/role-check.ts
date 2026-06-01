export type Role = "user" | "editor" | "moderator" | "admin";

export const ROLE_HIERARCHY: Record<Role, number> = {
  user: 0,
  editor: 1,
  moderator: 2,
  admin: 3,
};

export const STAFF_ROLES: Role[] = ["editor", "moderator", "admin"];

export function hasMinimumRole(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function isStaffRole(role: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY.editor;
}
