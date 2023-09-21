import React, { useState } from "react";
import {
  customMutationUseQuery,
  customUseQuery,
} from "../../utils/reactQuery.utils";
import axios from "axios";
import { useQueryClient } from "react-query";

const CreateColorScreen = () => {
  //   state
  const [isColor, setColor] = useState("");
  //   useQuery
  const queryClient = useQueryClient();
  const onSuccess = () => {
    console.log("Successfully get user details");
  };
  const onError = (err) => {
    console.log("Failed to get user details", err);
  };

  const useQueryOptions = {
    onSuccess,
    onError,
  };

  const createUseQueryOptions = {
    // this method useQuery invalidations for create and get updated data
    onSuccess: () => {
      queryClient.invalidateQueries("colors");
      setColor("");
    },
  };

  // endpoint
  const getColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors`);
  };

  const createColorEndpoint = (data) => {
    return axios.post("http://localhost:4000/colors", data);
  };
  const { isLoading, data, error, isError } = customUseQuery(
    "colors",
    getColors,
    useQueryOptions
  );

  const { mutate } = customMutationUseQuery(
    createColorEndpoint,
    createUseQueryOptions
  );

  const handleSubmit = () => {
    const body = {
      color: isColor,
    };
    mutate(body);
  };

  return (
    <div className="create_user_screen">
      <div className="input_wrapper">
        <input value={isColor} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div onClick={() => handleSubmit()} className="create_user_button">
        Submit
      </div>

      <div style={{ marginTop: "30px" }}>
        {isLoading && <div className="loading">Loading...</div>}
        {isError && <div className="error">{error?.message}</div>}

        {data?.data &&
          data.data.map((item, i) => {
            return (
              <div
                key={i}
                style={{ marginTop: `${i !== 0 && "10px"}` }}
                className="color"
              >
                {`${i + 1}. ${item.color}`}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreateColorScreen;
