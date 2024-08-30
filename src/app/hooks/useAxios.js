import { useCallback } from "react";
import { notification } from "antd";
import axiosClient from "../util/axiosClient";
import { MESSAGES } from "../constants/constant";

let isNotificationDisplayed = false;
const useAxios = () => {
  const request = useCallback(
    async (method, endpoint, requestData) => {
      try {     
        console.log(endpoint)

        const response = await axiosClient({
          method,
          url: endpoint,
          ...(method === "get"
            ? { params: requestData }
            : { data: requestData })
        });

        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.log(error)
        let errorMessage = "Something went wrong";
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          errorMessage = MESSAGES.SERVER_ERROR;
          if (!isNotificationDisplayed) {
            isNotificationDisplayed = true;
            notification.error({
              message: "Error",
              description: errorMessage,
              onClose: () => {
                isNotificationDisplayed = false;
              },
            });
          }
        } else {
          errorMessage = error.message || errorMessage;
          notification.error({
            message: "Error",
            description: errorMessage,
          });
        }

        throw new Error(errorMessage);
      }
    },
    []
  );

  const get = useCallback(
    (endpoint, params) => {
      return request("get", endpoint, params);
    },
    [request]
  );

  const post = useCallback(
    (endpoint, data, includeToken = false) => {
      return request("post", endpoint, data, includeToken);
    },
    [request]
  );

  const put = useCallback(
    (endpoint, data, includeToken = false) => {
      return request("put", endpoint, data, includeToken);
    },
    [request]
  );

  const del = useCallback(
    (endpoint, includeToken = false) => {
      return request("delete", endpoint, null, includeToken);
    },
    [request]
  );

  const patch = useCallback(
    (endpoint, data, includeToken = false) => {
      return request("patch", endpoint, data, includeToken);
    },
    [request]
  );

  return { get, post, put, del, patch };
};

export default useAxios;
