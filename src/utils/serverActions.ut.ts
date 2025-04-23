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
