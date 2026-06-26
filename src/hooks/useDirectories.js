import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import {
  fetchDirectories
} from "../api/directoriesApi";

export default function useDirectories({

  cursor,
  search,
  status
}) {

  const queryClient = useQueryClient();

  const query = useQuery({

    queryKey: [
      "directories",
      cursor,
      search,
      status
    ],

    queryFn: () =>
      fetchDirectories({
        cursor,
        search,
        status
      }),

    placeholderData: previousData => previousData
  });

  if (query.data?.nextCursor !== null) {

    queryClient.prefetchQuery({

      queryKey: [
        "directories",
        query.data.nextCursor,
        search,
        status
      ],

      queryFn: () =>
        fetchDirectories({

          cursor: query.data.nextCursor,
          search,
          status
        })
    });
  }

  return query;
}