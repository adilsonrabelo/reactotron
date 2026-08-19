import React, { FunctionComponent } from "react"
import styled from "styled-components"

export type StatusCategory = "success" | "redirect" | "clientError" | "serverError" | "unknown"

export function getStatusCategory(statusCode?: number): StatusCategory {
  if (!statusCode) return "unknown"
  if (statusCode >= 200 && statusCode < 300) return "success"
  if (statusCode >= 300 && statusCode < 400) return "redirect"
  if (statusCode >= 400 && statusCode < 500) return "clientError"
  if (statusCode >= 500) return "serverError"
  return "unknown"
}

interface BadgeProps {
  $category: StatusCategory
}

function categoryColor(props: BadgeProps & { theme: any }) {
  switch (props.$category) {
    case "success":
      return props.theme.statusSuccess
    case "redirect":
      return props.theme.statusRedirect
    case "clientError":
      return props.theme.statusClientError
    case "serverError":
      return props.theme.statusServerError
    default:
      return props.theme.statusDefault
  }
}

const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: #ffffff;
  background-color: ${categoryColor};
  user-select: text;
  cursor: text;
`

interface Props {
  statusCode: number
}

const StatusCodeTag: FunctionComponent<Props> = ({ statusCode }) => (
  <Badge $category={getStatusCategory(statusCode)}>{statusCode}</Badge>
)

export default StatusCodeTag
