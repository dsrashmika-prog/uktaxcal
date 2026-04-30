import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://netpayhome.co.uk';
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/tax-check`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }
    ]
}
