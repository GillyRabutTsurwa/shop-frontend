import { createClient } from "@sanity/client";

export const client = createClient({
    name: "default",
    title: "shop",
    projectId: "qqpcfqbo",
    dataset: "production",
    apiVersion: "2022-01-12", // use current date (YYYY-MM-DD) to target the latest API version
    useCdn: true,
});
