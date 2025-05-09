export function replaceAndCapitalize(input: string): string {
  console.log("object", input);
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
