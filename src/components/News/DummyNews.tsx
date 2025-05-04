import React from "react";

export interface NewsArticle {
  title: string;
  description: string;
  excerpt: string;
  featured_image: string;
  category: string;
  tags: string;
  author: string;
  published_at: string;
  status: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
}

export const News: NewsArticle[] = [
  {
    title: "Nepal Introduces New Tech Policy",
    description:
      "The government of Nepal has announced a new technology policy aimed at boosting innovation.",
    excerpt: "New tech policy to support innovation in Nepal.",
    featured_image: "https://example.com/images/tech-policy.jpg",
    category: "Technology",
    tags: "Nepal, Policy, Tech",
    author: "Namuna Sharma",
    published_at: "2024-06-15",
    status: "published",
    meta_title: "Nepal's New Technology Policy",
    meta_description:
      "A look into Nepal's latest policy to boost technological innovation.",
    keywords: "Nepal, tech, policy, innovation",
    og_image: "https://example.com/images/tech-policy-og.jpg",
  },
  {
    title: "Kathmandu Hosts Annual Art Festival",
    description:
      "Artists from across Nepal gathered in Kathmandu to showcase their work at the annual art festival.",
    excerpt: "Kathmandu's art scene flourishes during annual festival.",
    featured_image: "https://example.com/images/art-festival.jpg",
    category: "Culture",
    tags: "Art, Kathmandu, Festival",
    author: "Bibek Thapa",
    published_at: "2024-07-01",
    status: "draft",
    meta_title: "Kathmandu Art Festival 2024",
    meta_description:
      "Explore the highlights of Kathmandu's annual art celebration.",
    keywords: "art, festival, Kathmandu, culture",
    og_image: "https://example.com/images/art-festival-og.jpg",
  },
  {
    title: "Electric Vehicle Sales Rise in Nepal",
    description:
      "EV adoption grows as more Nepalese opt for sustainable transport options.",
    excerpt: "Electric vehicles see a 40% rise in sales this year.",
    featured_image: "https://example.com/images/ev-sales.jpg",
    category: "Environment",
    tags: "EV, Nepal, Sustainability",
    author: "Srijana Basnet",
    published_at: "2024-05-20",
    status: "published",
    meta_title: "Rise in Electric Vehicle Sales in Nepal",
    meta_description:
      "A look at why more Nepalese are choosing electric vehicles.",
    keywords: "electric vehicles, sustainability, Nepal, environment",
    og_image: "https://example.com/images/ev-sales-og.jpg",
  },
];
