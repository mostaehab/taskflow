export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

/**
 * The workspace roster. Kept in one place so people render consistently across
 * the sidebar, inbox, task cards, project rosters and the dashboard.
 */
export const workspace = {
  name: "Acme Product",
  plan: "Team plan",
};

export const teamMembers: TeamMember[] = [
  { id: "me", name: "Mostafa Ehab", role: "Product Lead" },
  { id: "jane", name: "Jane Doe", role: "Frontend Engineer" },
  { id: "marcus", name: "Marcus Lee", role: "Backend Engineer" },
  { id: "priya", name: "Priya Nair", role: "Product Designer" },
  { id: "david", name: "David Kim", role: "QA Engineer" },
  { id: "sara", name: "Sara Osman", role: "Project Manager" },
  { id: "leo", name: "Leo Martins", role: "DevOps Engineer" },
  { id: "amelia", name: "Amelia Ross", role: "Data Analyst" },
];

export const currentUserId = "me";

export const getMember = (id: string): TeamMember =>
  teamMembers.find((member) => member.id === id) ?? teamMembers[0];

export const memberName = (id: string): string => getMember(id).name;
