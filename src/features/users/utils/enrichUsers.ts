import type {
  DummyJSONUser,
  User,
  Role,
  Status,
} from '@/features/users/types/user.types';

/**
 * Mapping for DummyJSON roles to application Role type
 */
function mapRole(apiRole: string): Role {
  const lowerRole = apiRole.toLowerCase();
  if (lowerRole === 'admin') return 'Admin';
  if (lowerRole === 'moderator') return 'Editor';
  return 'Viewer';
}

/**
 * Enrich DummyJSON user data with extra fields
 * Transform DummyJSON API structure to match application User interface
 */
export function enrichUsers(users: DummyJSONUser[]): User[] {
  return users.map((user, index) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    username: user.username,
    email: user.email,
    address: {
      street: user.address.address,
      city: user.address.city,
      state: user.address.state,
      zipcode: user.address.postalCode,
      country: user.address.country,
    },
    phone: user.phone,
    company: {
      name: user.company?.name || '',
      title: user.company?.title || '',
      department: user.company?.department || '',
    },
    university: user.university,

    role: mapRole(user.role),
    status: (index % 4 === 0 ? 'inactive' : 'active') as Status,
    avatar: user.image,
  }));
}
