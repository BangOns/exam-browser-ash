export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  subject?: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'System Admin', email: 'admin@school.id', role: 'admin' },
  { id: '2', name: 'Ahmad Teacher', email: 'teacher@school.id', role: 'teacher', subject: 'Mathematics' },
  { id: '3', name: 'Budi Student', email: 'student@school.id', role: 'student' },
];

export function loginUser(email: string): User | null {
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch (e: unknown) {
        console.error("Failed to parse user", e);
        return null;
      }
    }
  }
  return null;
}
