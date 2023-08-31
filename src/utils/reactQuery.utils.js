import axios from "axios";
import { useQuery } from "react-query";

export const customUseQuery = (key, endPoint, options) => {
  return useQuery(key, endPoint, options);
};
