import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import _ from "lodash";

const UsersScreen = () => {
  const getUsers = () => {
    return axios.get("http://localhost:4000/users");
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "users",
    getUsers,
    {
      staleTime: 5000,
      select: (data) => {
        const names = data.data.map((item) => item.name);
        return names;
      },
      // enabled: false,
      // refetchOnMount:true
      // refetchInterval:5000
    }
  );
  return (
    <div className="user_screen_wrapper">
      <div className="loading">
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      {data &&
        data.map((item, i) => {
          return (
            <div
              style={{ marginTop: `${i !== 0 && "10px"}` }}
              key={i}
              className="name"
            >
              {`${i + 1}.`} {item}
            </div>
          );
        })}
      {isError && <div className="error">{error?.message}</div>}
      {_.isEmpty(data) && (
        <div className="button" onClick={refetch}>
          Get Data
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
