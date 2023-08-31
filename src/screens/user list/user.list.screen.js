import React from "react";
import { customUseQuery } from "../../utils/reactQuery.utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import arrowIcon from "../../assets/icon/arrow_left.svg";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  // params
  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // useQueryKey
  const useQueryKey = ["user_details", id];

  // endPointFunction
  const getUserDetails = () => {
    return axios.get(`http://localhost:4000/users/${id}`);
  };

  const onSuccess = () => {
    console.log("Successfully get user details");
  };
  const onError = (err) => {
    console.log("Failed to get user details", err);
  };

  // useQueryKeyOptions
  const useQueryOptions = {
    onSuccess,
    onError,
    // enabled: true,
    // refetchOnMount: true,
    // refetchInterval: 5000,
    // select: (data) => {
    //   const names = data.data.map((item) => item.name);
    //   return names;
    // },
  };

  // api call
  const { isLoading, data, isError, error } = customUseQuery(
    useQueryKey,
    getUserDetails,
    useQueryOptions
  );

  return (
    <div className="user_details_wrapper">
      <div className="user_details_heading_wrapper">
        <div className="user_details_heading">User Details</div>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
      {isError && <div className="error">{error?.message}</div>}
      {data?.data && (
        <div className="user_details_list_wrapper">
          <div className="user_details_list">
            <div className="user_details_list_heading">Name: </div>
            <div className="user_details_list_item">{data?.data.name}</div>
          </div>
          <div className="user_details_list">
            <div className="user_details_list_heading">Email: </div>
            <div className="user_details_list_item">{data?.data.email}</div>
          </div>
          <div className="user_details_list">
            <div className="user_details_list_heading">User name: </div>
            <div className="user_details_list_item">{data?.data.username}</div>
          </div>
          <div className="user_details_list">
            <div className="user_details_list_heading">Phone: </div>
            <div className="user_details_list_item">{data?.data.phone}</div>
          </div>
          <div className="user_details_list">
            <div className="user_details_list_heading">Website: </div>
            <div className="user_details_list_item">{data?.data.website}</div>
          </div>
          <div className="user_details_list">
            <div className="user_details_list_heading">Address: </div>
            <div className="user_details_list_item">
              {data?.data.address.city}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
