import axios from "axios";
import React from "react";
import _ from "lodash";
import { useQuery } from "react-query";
import { customUseQuery } from "../../utils/reactQuery.utils";
import { useNavigate } from "react-router-dom";

const UsersScreen = () => {
  // navigate
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("User get successfully");
  };

  const onError = (err) => {
    console.log("Failed to get users", err);
  };

  // api call by useQuery (custom hook)
  const useQueryOptions = {
    onSuccess,
    onError,
    staleTime: 5000,
    // enabled: true,
    // refetchOnMount: true,
    // refetchInterval: 5000,
    // select: (data) => {
    //   const names = data.data.map((item) => item.name);
    //   return names;
    // },
  };

  const getUsers = () => {
    return axios.get("http://localhost:4000/users");
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    customUseQuery("users", getUsers, useQueryOptions);

  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //   "users",
  //   getUsers,
  //   {
  //     staleTime: 5000,
  //     select: (data) => {
  //       const names = data.data.map((item) => item.name);
  //       return names;
  //     },
  //     // enabled: false,
  //     // refetchOnMount:true
  //     // refetchInterval:5000
  //   }
  // );

  return (
    <div className="user_screen_wrapper">
      <div className="loading">
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "5px",
        }}
      >
        {data?.data &&
          data?.data.map((item, i) => {
            return (
              <div
                onClick={() => navigate(`/user_details/${item.id}`)}
                key={i}
                className="name"
              >
                {`${i + 1}.`} {item.name}
              </div>
            );
          })}
      </div>
      {isError && <div className="error">{error?.message}</div>}
      {/* {_.isEmpty(data) && (
        <div className="button" onClick={refetch}>
          Get Data
        </div>
      )} */}
    </div>
  );
};

export default UsersScreen;
