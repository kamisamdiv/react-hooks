/** Purely presentational list of matching users. */
export default function UserList({ users }) {
  return (
    <ul className="list-none divide-y divide-line p-0" data-testid="user-list">
      {users.map((user) => (
        <li key={user.id} className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
          <span className="font-medium">{user.name}</span>
          <span className="rounded-[3px] bg-tag-gray px-1.5 py-px text-[13px] leading-5 text-tag-gray-ink">
            {user.role}
          </span>
        </li>
      ))}
    </ul>
  );
}
