import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useSearchBooks(query, enabled = true) {
  return useQuery({
    queryKey: ['books', 'search', query],
    queryFn: async () => {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
      );
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    },
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBookDetails(bookKey) {
  return useQuery({
    queryKey: ['books', 'details', bookKey],
    queryFn: async () => {
      const apiKey = bookKey.startsWith('/works/') ? bookKey : `/works/${bookKey}`;
      const bookRes = await fetch(`https://openlibrary.org${apiKey}.json`);
      if (!bookRes.ok) throw new Error('Book not found');
      const bookData = await bookRes.json();

      let authorName = 'Unknown Author';
      if (bookData.authors?.[0]?.author?.key) {
        try {
          const authorRes = await fetch(
            `https://openlibrary.org${bookData.authors[0].author.key}.json`
          );
          const authorData = await authorRes.json();
          authorName = authorData.name;
        } catch {
          authorName = bookData.authors[0]?.name || 'Unknown Author';
        }
      }

      return {
        key: bookKey,
        title: bookData.title,
        author_name: [authorName],
        cover_i: bookData.covers?.[0],
        first_publish_year: bookData.first_publish_date,
        description:
          bookData.description?.value ||
          bookData.description ||
          'No description available.',
      };
    },
    enabled: !!bookKey,
    staleTime: 10 * 60 * 1000,
  });
}

export function useRecommendations() {
  return useQuery({
    queryKey: ['books', 'recommendations'],
    queryFn: async () => {
      const res = await fetch(
        'https://openlibrary.org/subjects/fantasy.json?limit=2'
      );
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      return res.json();
    },
    staleTime: 15 * 60 * 1000,
  });
}
