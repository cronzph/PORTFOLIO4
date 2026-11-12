import { useEffect, useMemo, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../lib/firebase';

export const isBlogPost = (post) => post.blog === true || post.type === 'blog';

export function getPostCategories(post) {
  if (Array.isArray(post.categories) && post.categories.length) return post.categories;
  if (post.category) return [post.category];
  return [];
}

export function getPostImage(post) {
  return post.bannerImage?.data || post.coverImage || post.images?.[0]?.data || null;
}

export function getPostDate(post) {
  return post.publishedAt || post.createdAt || Date.now();
}

/**
 * Live portfolio data: posts, highlights and blog categories.
 * Everything is subscribed with onValue, so admin edits appear without a reload.
 */
export function usePosts() {
  const [posts, setPosts] = useState({});
  const [highlights, setHighlights] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    let postsReady = false;
    let extrasReady = 0;

    const settle = () => {
      if (alive && postsReady && extrasReady >= 2) setLoading(false);
    };

    const unsubPosts = onValue(
      ref(db, 'posts'),
      (snap) => {
        const data = {};
        snap.forEach((child) => {
          data[child.key] = { id: child.key, ...child.val() };
        });
        if (!alive) return;
        setPosts(data);
        postsReady = true;
        settle();
      },
      (err) => {
        if (!alive) return;
        setError(err.message);
        setLoading(false);
      }
    );

    const unsubHighlights = onValue(
      ref(db, 'highlights'),
      (snap) => {
        const data = {};
        snap.forEach((child) => {
          const value = child.val();
          if (value?.category && value?.postId) data[value.category] = value.postId;
        });
        if (!alive) return;
        setHighlights(data);
        extrasReady += 1;
        settle();
      },
      () => {
        extrasReady += 1;
        settle();
      }
    );

    const unsubCategories = onValue(
      ref(db, 'blogCategories'),
      (snap) => {
        const list = [];
        snap.forEach((child) => list.push({ id: child.key, ...child.val() }));
        if (!alive) return;
        setCategories(list.sort((a, b) => (a.name || '').localeCompare(b.name || '')));
        extrasReady += 1;
        settle();
      },
      () => {
        extrasReady += 1;
        settle();
      }
    );

    return () => {
      alive = false;
      unsubPosts();
      unsubHighlights();
      unsubCategories();
    };
  }, []);

  const all = useMemo(
    () => Object.values(posts).sort((a, b) => getPostDate(b) - getPostDate(a)),
    [posts]
  );

  const projects = useMemo(() => all.filter((post) => !isBlogPost(post)), [all]);
  const blogPosts = useMemo(() => all.filter(isBlogPost), [all]);

  const featuredBlog = useMemo(
    () => blogPosts.find((post) => post.featured === true) || blogPosts[0] || null,
    [blogPosts]
  );

  // Home slider: highlighted projects first, then the newest ones.
  const featuredProjects = useMemo(() => {
    const picked = [];
    const seen = new Set();

    Object.values(highlights).forEach((id) => {
      const post = posts[id];
      if (post && !isBlogPost(post) && !seen.has(id)) {
        seen.add(id);
        picked.push(post);
      }
    });

    projects.forEach((post) => {
      if (picked.length < 3 && !seen.has(post.id)) {
        seen.add(post.id);
        picked.push(post);
      }
    });

    return picked.slice(0, 3);
  }, [highlights, posts, projects]);

  const counts = useMemo(
    () => ({
      projects: projects.length,
      posts: blogPosts.length,
      categories: new Set(projects.flatMap((post) => getPostCategories(post))).size,
    }),
    [projects, blogPosts]
  );

  return {
    posts,
    projects,
    blogPosts,
    featuredBlog,
    featuredProjects,
    highlights,
    categories,
    counts,
    loading,
    error,
  };
}
