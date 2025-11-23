// lib/queries/get-user-profile.ts
import { graphqlClient } from "../graphql-client";

const GET_USER_PROFILE_BY_ID = `
  query GetUserProfileById($id: ID!) {
    user(id: $id) {
      id
      name
      r2ProfilePicture
    }
  }
`;

const GET_USER_PROFILE_BY_DB_ID = `
  query GetUserProfileByDbId($id: ID!) {
    user(id: $id, idType: DATABASE_ID) {
      id
      name
      r2ProfilePicture
    }
  }
`;

export interface UserProfile {
  id: string;
  name: string;
  r2ProfilePicture?: string | null;
}

export async function getUserProfile(userId: string, databaseId?: number): Promise<UserProfile | null> {
  try {
    // Try with databaseId first if available (more reliable)
    if (databaseId) {
      try {
        const data = await graphqlClient.request<{ user: UserProfile | null }>(
          GET_USER_PROFILE_BY_DB_ID, 
          { id: databaseId.toString() }
        );
        if (data.user) {
          if (process.env.NODE_ENV === 'development') {
            console.log('=== USER QUERY BY DATABASE_ID ===');
            console.log('Full user data:', JSON.stringify(data.user, null, 2));
            console.log('r2ProfilePicture:', data.user.r2ProfilePicture);
            console.log('Query used: GET_USER_PROFILE_BY_DB_ID');
            console.log('databaseId used:', databaseId);
          }
          return data.user;
        }
      } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('=== USER QUERY BY DATABASE_ID FAILED ===');
          console.warn('Error:', error?.message || error);
          console.warn('Full error:', JSON.stringify(error, null, 2));
        }
        // Try global ID next
      }
    }
    
    // Fallback to global ID
    try {
      const data = await graphqlClient.request<{ user: UserProfile | null }>(
        GET_USER_PROFILE_BY_ID, 
        { id: userId }
      );
      if (process.env.NODE_ENV === 'development') {
        console.log('=== USER QUERY BY GLOBAL_ID ===');
        console.log('Full user data:', JSON.stringify(data.user, null, 2));
        console.log('r2ProfilePicture:', data.user?.r2ProfilePicture);
        console.log('Query used: GET_USER_PROFILE_BY_ID');
        console.log('userId used:', userId);
      }
      return data.user;
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('=== USER QUERY BY GLOBAL_ID FAILED ===');
        console.error('Error:', error?.message || error);
        console.error('Full error:', JSON.stringify(error, null, 2));
      }
      return null;
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('=== GET_USER_PROFILE ERROR ===');
      console.error('Error:', error?.message || error);
      console.error('Full error:', JSON.stringify(error, null, 2));
    }
    return null;
  }
}

