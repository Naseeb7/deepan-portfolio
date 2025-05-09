"use server";
import { cookies } from "next/headers";

export const fetchAllProjects = async (category?: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    query GetAllProjects($category: String) {
                        projects(category: $category) {
                            id
                            name
                            heroImage
                            category
                        }
                    }
                `,
        variables: {
          category,
        },
      }),
      cache: "no-cache",
    }
  );

  const { data } = await response.json();
  return data?.projects || [];
};

export const fetchProjectById = async (id: string) => {
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
      cache: "force-cache",
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
          name: $name, 
          heroImage: $heroImage, 
          overview: $overview, 
          challenge: $challenge, 
          photos: $photos, 
          details: $details, 
          url: $url, 
          category: $category
        ) {
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
