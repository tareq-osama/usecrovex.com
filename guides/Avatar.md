# Next.js + WP GraphQL - Fetching Profile Pictures

## GraphQL Query Examples

### 1. Fetch User with Profile Picture

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    r2ProfilePicture
    avatar {
      url
    }
  }
}
```

### 2. Fetch Current User Profile Picture

```graphql
query GetCurrentUser {
  viewer {
    id
    name
    email
    r2ProfilePicture
  }
}
```

### 3. Fetch Multiple Users with Profile Pictures

```graphql
query GetUsers {
  users {
    nodes {
      id
      name
      email
      r2ProfilePicture
    }
  }
}
```

## Next.js Implementation Examples

### Using Apollo Client

```typescript
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://website.usecorvex.com/graphql',
  credentials: 'include', // if using cookies for auth
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

### Fetch User Profile Picture Component

```typescript
// components/UserProfile.tsx
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      r2ProfilePicture
    }
  }
`;

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data?.user;
  const profilePicture = user?.r2ProfilePicture;

  return (
    <div>
      <h2>{user.name}</h2>
      {profilePicture ? (
        <img 
          src={profilePicture} 
          alt={`${user.name}'s profile picture`}
          className="rounded-full w-24 h-24 object-cover"
        />
      ) : (
        <div className="rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
```

### Using fetch/React Query

```typescript
// hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';

const GET_USER_QUERY = `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      r2ProfilePicture
    }
  }
`;

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch('https://website.usecorvex.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_USER_QUERY,
          variables: { id: userId },
        }),
      });

      const { data } = await response.json();
      return data.user;
    },
  });
}
```

### Component Using React Query

```typescript
// components/UserAvatar.tsx
import { useUserProfile } from '@/hooks/useUserProfile';

interface UserAvatarProps {
  userId: string;
  size?: number;
}

export default function UserAvatar({ userId, size = 48 }: UserAvatarProps) {
  const { data: user, isLoading } = useUserProfile(userId);

  if (isLoading) {
    return (
      <div 
        className="rounded-full bg-gray-200 animate-pulse"
        style={{ width: size, height: size }}
      />
    );
  }

  const profilePicture = user?.r2ProfilePicture;

  return (
    <div>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={`${user.name}'s avatar`}
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold"
          style={{ width: size, height: size }}
        >
          {user?.name?.charAt(0).toUpperCase() || '?'}
        </div>
      )}
    </div>
  );
}
```

### Server Component (Next.js 13+ App Router)

```typescript
// app/users/[id]/page.tsx
async function getUser(id: string) {
  const response = await fetch('https://website.usecorvex.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
            r2ProfilePicture
          }
        }
      `,
      variables: { id },
    }),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  const { data } = await response.json();
  return data.user;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  return (
    <div>
      <h1>{user.name}</h1>
      {user.r2ProfilePicture ? (
        <img 
          src={user.r2ProfilePicture} 
          alt={`${user.name}'s profile`}
          className="rounded-full w-32 h-32 object-cover"
        />
      ) : (
        <div className="rounded-full w-32 h-32 bg-gray-300" />
      )}
    </div>
  );
}
```

## Helper Function

```typescript
// lib/graphql.ts
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const response = await fetch('https://website.usecorvex.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data;
}

// Usage
const user = await fetchGraphQL(`
  query {
    user(id: "1") {
      r2ProfilePicture
    }
  }
`);
```

## Notes

- The `r2ProfilePicture` field returns `null` if no profile picture is set
- Always check if the field exists before using it
- The URL points directly to your R2 bucket, so images load fast
- Consider adding error handling for broken image URLs
- You can use Next.js Image component for optimization:

```typescript
import Image from 'next/image';

<Image
  src={user.r2ProfilePicture}
  alt="Profile picture"
  width={96}
  height={96}
  className="rounded-full"
/>
```

