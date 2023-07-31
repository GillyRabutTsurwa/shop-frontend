import Stripe from "stripe";
import imageUrlBuilder from "@sanity/image-url";
import { RuntimeConfig } from "nuxt/schema";
import { client, fetchProducts } from "./products";


const config: RuntimeConfig = useRuntimeConfig();

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

//NOTE: have access to this via vite (which Nuxt uses)
const isProduction = import.meta.env.MODE === "production";

const clientProdUrl = config.public.client_url.production;
const clientDevUrl = config.public.client_url.development;

const CLIENT_URL = isProduction ? clientProdUrl : clientDevUrl;

const stripe = new Stripe(config.stripe.dev_key, {
    apiVersion: "2022-11-15"
});


export default defineEventHandler(async (event) => {
    const body = await readBody(event); // data coming from frontend. not using a form but it's still easy
    console.log(body);





    const products = await fetchProducts();
    console.log("---------");
    console.log(products);
    
    const lineItems = body.items.map((currentItem) => {
        const storeItem = products.find((currentProduct) => currentProduct._id === currentItem.id);
        const str = storeItem.mainImage.asset._ref;
        const { baseUrl, projectId, dataset, source } = urlFor(str).options;
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: storeItem.name,
                    images: [`${baseUrl}/images/${projectId}/${dataset}/${str.slice(6, str.length - 4)}.jpg`],
                },
                unit_amount: storeItem.price,
            },
            quantity: currentItem.quantity,
        };
    });

    console.log(lineItems);

    //     // =======================================

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems,
                success_url: `${CLIENT_URL}/success`,
                cancel_url: `${CLIENT_URL}`,
                locale: "en",
                shipping_address_collection: {
                    allowed_countries: ["US"],
                },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: "fixed_amount",
                            fixed_amount: {
                                amount: 0,
                                currency: "usd",
                            },
                            display_name: "Free shipping",
                            delivery_estimate: {
                                minimum: {
                                    unit: "business_day",
                                    value: 5,
                                },
                                maximum: {
                                    unit: "business_day",
                                    value: 7,
                                },
                            },
                        },
                    },
                    {
                        shipping_rate_data: {
                            type: "fixed_amount",
                            fixed_amount: {
                                amount: 1500,
                                currency: "usd",
                            },
                            display_name: "Next day air",
                            delivery_estimate: {
                                minimum: {
                                    unit: "business_day",
                                    value: 1,
                                },
                                maximum: {
                                    unit: "business_day",
                                    value: 1,
                                },
                            },
                        },
                    },
                ],
            });
            console.log(session.url);
            return {
                url: session.url
            }
        } catch (err) {
            console.error(err);
        }
    
});