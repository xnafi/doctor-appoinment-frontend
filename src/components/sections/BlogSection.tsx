import React from "react";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  emoji: string;
  color: string;
}

const posts: BlogPost[] = [
  {
    slug: "managing-diabetes-lifestyle",
    category: "Diabetes",
    title: "Managing Diabetes Through Lifestyle Changes",
    excerpt:
      "Small, consistent changes to diet, exercise, and sleep patterns can significantly improve blood sugar control. Here's what the latest evidence recommends.",
    readTime: "4 min read",
    date: "May 10, 2026",
    emoji: "💊",
    color: "#1a4f7a",
  },
  {
    slug: "high-blood-pressure-myths",
    category: "Hypertension",
    title: "5 Myths About High Blood Pressure You Should Stop Believing",
    excerpt:
      "Hypertension is often called the silent killer — and misconceptions about it are surprisingly common. Let's debunk the most dangerous myths.",
    readTime: "5 min read",
    date: "Apr 28, 2026",
    emoji: "❤️",
    color: "#82b440",
  },
  {
    slug: "fever-when-to-see-doctor",
    category: "General Health",
    title: "Fever in Adults: When Is It Time to See a Doctor?",
    excerpt:
      "Not every fever needs a clinic visit — but some do. Dr. Tirthankar explains the warning signs you should never ignore and when to seek care immediately.",
    readTime: "3 min read",
    date: "Apr 15, 2026",
    emoji: "🌡️",
    color: "#1a4f7a",
  },
];

export function BlogSection() {
  return (
    <section
      id="blog"
      className="section-padding bg-(--color-surface-white)"
    >
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="Health Blog"
            title="Tips & Insights from Dr. Tirthankar"
            subtitle="Evidence-based health guidance written for everyday patients."
            align="left"
            className="flex-1"
          />
          <Button as="link" href="#blog" variant="ghost" size="md"
            icon={<ArrowRight size={16} aria-hidden="true" />}
            iconPosition="right"
          >
            All Articles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="card flex flex-col group"
            >
              {/* Cover */}
              <div
                className="h-44 flex items-center justify-center text-5xl"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #0f2d4a, #1a5f8a)"
                    : "linear-gradient(135deg, #3a6a1a, #5a9430)",
                }}
                aria-hidden="true"
              >
                {post.emoji}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="flex items-center gap-1 text-body-xs font-semibold"
                    style={{ color: post.color }}
                  >
                    <Tag size={11} aria-hidden="true" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-body-xs text-[var(--color-text-muted)]">
                    <Clock size={11} aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-heading-md text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-body-sm text-[var(--color-text-secondary)] line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-surface-muted)] mt-auto">
                  <span className="text-body-xs text-[var(--color-text-muted)]">
                    {post.date}
                  </span>
                  <span
                    className="flex items-center gap-1 text-body-xs font-semibold text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  >
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
