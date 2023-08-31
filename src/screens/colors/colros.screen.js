import React, { Fragment } from "react";
import { customInfiniteUseQuery } from "../../utils/reactQuery.utils";
import axios from "axios";
const ColorScreen = () => {
  // useQueryOptions
  const useQueryOptions = {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 5) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  };

  const getColors = ({ pageParam = 1 }) => {
    return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
    );
  };

  // apicall
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = customInfiniteUseQuery(["colors"], getColors, useQueryOptions);

  return (
    <div style={{ padding: "20px" }}>
      <div className="color_list_wrapper">
        {isLoading && <div className="loading">Loading...</div>}
        {isError && <div className="error">{error?.message}</div>}
        {data?.pages &&
          data?.pages.map((group, index) => {
            return (
              <Fragment key={index}>
                {group.data.map((colors, i) => {
                  return (
                    <div key={i} className="color">
                      {`${colors.id}. `} {colors.color}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        <div>
          {isFetching && <div className="error">{error?.message}</div>}
          <button
            onClick={fetchNextPage}
            disabled={!hasNextPage}
            style={{ padding: "5px", marginTop: "10px" }}
          >
            load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorScreen;
