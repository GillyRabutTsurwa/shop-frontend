import groq from "groq";
import { createClient } from "@sanity/client";
import { RuntimeConfig } from "nuxt/schema";
import { SanityClient } from "@nuxtjs/sanity/dist/runtime/client";

const config: RuntimeConfig = useRuntimeConfig();

export const client: SanityClient = createClient({
    projectId: config.public.sanity.projectId,
    dataset: "production",
    apiVersion: "2022-01-12", // use current date (YYYY-MM-DD) to target the latest API version
    useCdn: true,
});

export async function fetchProducts() {
    const products = await client.fetch(groq`*[_type == "product"]`);
    return products;
}

export default defineEventHandler(async (event) => {
    return {
        products: await fetchProducts()
    }
})