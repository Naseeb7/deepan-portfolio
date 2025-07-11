"use server";
import {
  Projectcategory,
  ProjectType,
  RevalidateTags,
} from "@/constants/enums";
import { cookies } from "next/headers";

export const fetchAllProjects = async (
  type: ProjectType = ProjectType.PROJECT,
  category?: Projectcategory
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    query GetAllProjects($category: String, $type: String) {
                        projects(category: $category, type: $type) {
                        type
                            id
                            name
                            heroImage
                            category
                        }
                    }
                `,
        variables: {
          category,
          type,
        },
      }),
      cache: "force-cache",
      next: {
        tags: [RevalidateTags.PROJECTS],
      },
    }
  );

  const { data } = await response.json();
  return data?.projects || [];
};

export const fetchProjectById = async (
  id: string,
  cache_strategy: RequestCache = "force-cache"
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    query GetProjectById($id: ID!) {
                        project(id: $id) {
                            type
                            id
                            name
                            heroImage
                            overview
                            challenge
                            photos
                            details
                            url
                            category
                        }
                    }
                `,
        variables: {
          id,
        },
      }),
      cache: cache_strategy,
      next: {
        tags: [RevalidateTags.SINGLEPROJECTS],
      },
    }
  );

  const { data } = await response.json();
  return data?.project || null;
};

export const submitContactForm = async (props: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const { firstName, lastName, email, phone, message } = props;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    mutation SubmitContactForm(
                      $firstName: String, 
                      $lastName: String, 
                      $email: String, 
                      $phone: String, 
                      $message: String
                    ) {
                        submitContact(
                          firstName: $firstName, 
                          lastName: $lastName, 
                          email: $email, 
                          phone: $phone, 
                          message: $message
                        ) {
                            firstName
                            lastName
                            email
                            phone
                            message
                        }
                    }
                `,
        variables: {
          firstName,
          lastName,
          email,
          phone,
          message,
        },
      }),
      cache: "no-cache",
    }
  );

  const { data } = await response.json();
  if (data?.submitContact) {
    return {
      ...data.submitContact,
      success: true,
    };
  } else {
    return {
      success: false,
      message: "An error occurred",
    };
  }
};

export const handleLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                    mutation Login($username: String!, $password: String!) {
                        login(username: $username, password: $password)
                    }
                `,
          variables: {
            username,
            password,
          },
        }),
        cache: "no-cache",
      }
    );

    const { data } = await response.json();
    if (data?.login) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.login, { path: "/" });
    }
    return data?.login || null;
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: error };
  }
};

export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const cookieStore = await cookies();
    const authHeader = cookieStore.get("token")?.value;
    console.log("uploadImage", file);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authHeader}`,
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Upload failed:", errorText);
      throw new Error("Upload failed");
    }

    const json = await res.json();
    console.log("Upload result:", json);
    return json.secure_url;
  } catch (error) {
    console.error("Error during image upload:", error);
    throw error;
  }
}

export async function addProject(data: any): Promise<any> {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const authHeader = cookieStore.get("token")?.value;

    if (!authHeader) {
      throw new Error("Authorization token missing");
    }

    // Prepare GraphQL query and variables
    const query = `
      mutation AddProject(
        $type: String = "project",
        $name: String!, 
        $heroImage: String, 
        $overview: String, 
        $challenge: String, 
        $photos: [String!], 
        $details: [String!], 
        $url: String, 
        $category: String
      ) {
        addProject(
          type: $type,
          name: $name, 
          heroImage: $heroImage, 
          overview: $overview, 
          challenge: $challenge, 
          photos: $photos, 
          details: $details, 
          url: $url, 
          category: $category
        ) {
          type
          name 
          heroImage 
          overview 
          challenge 
          photos 
          details 
          url 
          category 
        }
      }`;

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authHeader}`,
        },
        credentials: "include",
        body: JSON.stringify({
          query,
          variables: { ...data },
        }),
      }
    );

    // Check if the response is okay
    if (!res.ok) {
      throw new Error(`GraphQL request failed with status: ${res.status}`);
    }

    const json = await res.json();

    // Handle GraphQL errors if they exist
    if (json.errors) {
      const errorMessage = json.errors
        .map((error: any) => error.message)
        .join(", ");
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    return json.data.addProject;
  } catch (error: any) {
    // Log the error and rethrow it
    console.error("Error adding project:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
}

export async function updateProject(data: any): Promise<any> {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const authHeader = cookieStore.get("token")?.value;

    if (!authHeader) {
      throw new Error("Authorization token missing");
    }

    // Prepare GraphQL query and variables
    const query = `
      mutation UpdateProject(
        $id: ID!,
        $type: String!,
        $name: String, 
        $heroImage: String, 
        $overview: String, 
        $challenge: String, 
        $photos: [String!], 
        $details: [String!], 
        $url: String, 
        $category: String
      ) {
        updateProject(
          id: $id,
          type: $type,
          name: $name, 
          heroImage: $heroImage, 
          overview: $overview, 
          challenge: $challenge, 
          photos: $photos, 
          details: $details, 
          url: $url, 
          category: $category
        ) {
          type
          name 
          heroImage 
          overview 
          challenge 
          photos 
          details 
          url 
          category 
        }
      }`;

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authHeader}`,
        },
        credentials: "include",
        body: JSON.stringify({
          query,
          variables: { ...data },
        }),
      }
    );

    // Check if the response is okay
    if (!res.ok) {
      throw new Error(`GraphQL request failed with status: ${res.status}`);
    }

    const json = await res.json();

    // Handle GraphQL errors if they exist
    if (json.errors) {
      const errorMessage = json.errors
        .map((error: any) => error.message)
        .join(", ");
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    return json.data.updateProject;
  } catch (error: any) {
    // Log the error and rethrow it
    console.error("Error adding project:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    // Retrieve token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const query = `
      mutation DeleteProject($id: ID!) {
        deleteProject(id: $id)
      }
    `;

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables: { id },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      const messages = errors.map((e: any) => e.message).join(", ");
      throw new Error(`GraphQL error: ${messages}`);
    }

    return data?.deleteProject ?? false;
  } catch (err: any) {
    console.error("Failed to delete project:", err.message);
    throw new Error(err.message || "Failed to delete project.");
  }
}
