import AdminUser from './AdminUser';
import { User } from './types';
export default AdminUser;

export * from './AdminUserAction';
export * from './AdminUserBody';
export * from './AdminUserHeader';
export * from './types';

export const SampleUsers: User[] = [
  {
    id: 1,
    name: 'john',
    email: 'john@email.com',
    is_admin: false,
    avatar: 'https://picsum.photos/200',
  },
  {
    id: 2,
    name: 'jem',
    email: 'jem@email.com',
    is_admin: true,
    avatar: 'https://picsum.photos/200',
  },
  {
    id: 3,
    name: 'jorge',
    email: 'jorge@email.com',
    is_admin: true,
    avatar: 'https://picsum.photos/200',
  },
  {
    id: 4,
    name: 'ervin',
    email: 'ervin@email.com',
    is_admin: false,
    avatar: 'https://picsum.photos/200',
  },
  {
    id: 5,
    name: 'gwen',
    email: 'gwen@email.com',
    is_admin: false,
    avatar: 'https://picsum.photos/200',
  },
  {
    id: 6,
    name: 'jerald',
    email: 'jerald@email.com',
    is_admin: false,
    avatar: 'https://picsum.photos/200',
  },
];
