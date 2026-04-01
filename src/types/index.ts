export type UserRole = "admin" | "member";
export type MembershipStatus = "pending" | "approved" | "rejected";

export type Profile = {
  id: string;
  full_name: string;
  role: UserRole;
  membership_status: MembershipStatus;
  avatar_url: string | null;
  created_at: string;
};

export type Election = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  created_at: string;
};

export type Position = {
  id: string;
  election_id: string;
  name: string;
  sort_order: number;
};

export type Candidate = {
  id: string;
  position_id: string;
  name: string;
  manifesto: string | null;
  image_url: string | null;
};

export type Vote = {
  id: string;
  election_id: string;
  position_id: string;
  candidate_id: string;
  user_id: string;
  created_at: string;
};

export type Payment = {
  id: string;
  user_id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  reference: string;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type LeadershipProfile = {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  caption: string | null;
  event_date: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type AuditSetting = {
  key: string;
  value: string;
  updated_at: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
};
