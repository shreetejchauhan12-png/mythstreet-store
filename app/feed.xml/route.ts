const BASE_URL = "https://mythstreet.com";

export async function GET() {
  try {
    const response = await fetch(
      "https://mythstreet-backend.onrender.com/api/products/feed",
      {
        next: { revalidate: 3600 },
      }
    );

    const products = await response.json();

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>MythStreet Products</title>
<link>${BASE_URL}</link>
<description>Premium Streetwear by MythStreet</description>

${products
  .map(
    (product: any) => `
<item>
<g:id>${product.id}</g:id>
<g:title><![CDATA[${product.title}]]></g:title>
<g:description><![CDATA[
${product.title} by MythStreet.
Premium streetwear crafted for comfort and style.
]]></g:description>

<g:link>
${BASE_URL}/product/${product.id}
</g:link>

<g:image_link>
${BASE_URL}/${product.image}
</g:image_link>

<g:availability>in_stock</g:availability>

<g:condition>new</g:condition>

<g:price>${product.price} INR</g:price>

<g:brand>MythStreet</g:brand>
</item>
`
  )
  .join("")}

</channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });

  } catch (error) {
    return new Response("Feed Error", {
      status: 500,
    });
  }
}
