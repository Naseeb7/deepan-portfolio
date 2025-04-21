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
      cache: "no-store", // Prevent caching for fresh data on every request
    }
  );

  const { data } = await response.json();
  return data?.projects || [];
};
