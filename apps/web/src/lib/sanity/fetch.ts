import { client } from "./client";

export async function sanityFetch<T>(query: string) {
  return client.fetch<T>(query, {}, { next: { revalidate: 60 } });
}
