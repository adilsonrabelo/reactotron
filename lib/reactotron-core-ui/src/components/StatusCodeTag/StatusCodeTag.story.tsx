import React from "react"

import StatusCodeTag from "./index"

export default {
  title: "Status Code Tag",
}

export const Success = () => <StatusCodeTag statusCode={200} />

export const Redirect = () => <StatusCodeTag statusCode={301} />

export const ClientError = () => <StatusCodeTag statusCode={404} />

export const ServerError = () => <StatusCodeTag statusCode={500} />

export const AllStatuses = () => (
  <div style={{ display: "flex", gap: 8 }}>
    <StatusCodeTag statusCode={200} />
    <StatusCodeTag statusCode={201} />
    <StatusCodeTag statusCode={301} />
    <StatusCodeTag statusCode={304} />
    <StatusCodeTag statusCode={400} />
    <StatusCodeTag statusCode={404} />
    <StatusCodeTag statusCode={500} />
    <StatusCodeTag statusCode={503} />
  </div>
)
