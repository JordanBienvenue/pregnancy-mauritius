import { describe, it, expect } from "vitest";
import { blogPostCreateSchema, blogPublishSchema } from "@/lib/validations/blog";

describe("blogPostCreateSchema", () => {
  const validPost = {
    slug: "test-article",
    title: "Test Article Title",
    content: "This is the content of the test article.",
    author: "Manman Moris",
    category: "healthcare",
  };

  it("accepts valid blog post", () => {
    const result = blogPostCreateSchema.safeParse(validPost);
    expect(result.success).toBe(true);
  });

  it("rejects slug with spaces", () => {
    const result = blogPostCreateSchema.safeParse({ ...validPost, slug: "test article" });
    expect(result.success).toBe(false);
  });

  it("rejects slug with uppercase", () => {
    const result = blogPostCreateSchema.safeParse({ ...validPost, slug: "Test-Article" });
    expect(result.success).toBe(false);
  });

  it("rejects short title", () => {
    const result = blogPostCreateSchema.safeParse({ ...validPost, title: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects short content", () => {
    const result = blogPostCreateSchema.safeParse({ ...validPost, content: "short" });
    expect(result.success).toBe(false);
  });

  it("defaults read_time to 5", () => {
    const result = blogPostCreateSchema.safeParse(validPost);
    if (result.success) {
      expect(result.data.read_time).toBe(5);
    }
  });
});

describe("blogPublishSchema", () => {
  it("accepts true", () => {
    expect(blogPublishSchema.safeParse({ is_published: true }).success).toBe(true);
  });

  it("accepts false", () => {
    expect(blogPublishSchema.safeParse({ is_published: false }).success).toBe(true);
  });

  it("rejects non-boolean", () => {
    expect(blogPublishSchema.safeParse({ is_published: "yes" }).success).toBe(false);
  });
});
