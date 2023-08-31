import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

export const customUseQuery = (key, endPoint, options) => {
  return useQuery(key, endPoint, options);
};

export const customInfiniteUseQuery = (key, endPoint, options) => {
  return useInfiniteQuery(key, endPoint, options);
};
