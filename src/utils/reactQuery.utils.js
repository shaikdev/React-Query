import axios from "axios";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";

export const customUseQuery = (key, endPoint, options) => {
  return useQuery(key, endPoint, options);
};

export const customInfiniteUseQuery = (key, endPoint, options) => {
  return useInfiniteQuery(key, endPoint, options);
};

// mutation
export const customMutationUseQuery = (endPoint, options) => {
  const queryClient = useQueryClient();
  // this is for normal post method without getUpdated Data
  // return useMutation(endPoint, options);
  // query invalidation post and get updated data
  // return useMutation(endPoint,options)

  // handling mutation response (getUpdatedData without callback)
  return useMutation(endPoint, {
    onSuccess: (data) => {
      queryClient.setQueryData("colors", (previousData) => {
        return {
          ...previousData,
          data: [...previousData.data, data.data],
        };
      });
    },
  });

  // optimistic update (getPrevious and updated data without callback)
  // return useMutation(endPoint, {
  //   onMutate: async (newData) => {
  //     await queryClient.cancelQueries("colors");
  //     const previousColorData = queryClient.getQueryData("colors");
  //     queryClient.setQueryData("colors", (previousData) => {
  //       return {
  //         ...previousData,
  //         data: [...previousColorData.data, { ...newData }],
  //       };
  //     });
  //     return previousColorData;
  //   },
  //   onError: (_error, _data, context) => {
  //     queryClient.setQueryData("colors", context.previousColorData);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries("colos");
  //   },
  // });
};
