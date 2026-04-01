import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const posts = await getPublishedBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/leadership",
    "/gallery",
    "/membership-card",
    "/contact",
    "/blog",
    "/login",
    "/reset-access",
    "/signup"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at)
  }));

  return [...staticRoutes, ...blogRoutes];
}
