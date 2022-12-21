import { getDayCount } from "../../utils/formatTime"
const currentYear = new Date().getFullYear()
export const dateList = [
  {
    label: "All time",
    value: ""
  },
  {
    label: "Today",
    value: "1"
  },
  {
    label: "Yesterday",
    value: "2"
  },
  {
    label: "Last 30 days",
    value: "30"
  },
  {
    label: "Last 90 days",
    value: "90"
  },
  {
    label: "Last 180 days",
    value: "180"
  },
  {
    label: "This year",
    value: getDayCount(`${currentYear}/1/1`) + ""
  }
]
export const sortByList = [
  {
    label: "Payment (high to low)",
    value: "desc"
  },
  {
    label: "Payment (low to high)",
    value: "asc"
  }
]

export const STATE = [
  { label: "AL", value: "AL" },
  { label: "AK", value: "AK" },
  { label: "AZ", value: "AZ" },
  { label: "AR", value: "AR" },
  { label: "CA", value: "CA" },
  { label: "CO", value: "CO" },
  { label: "CT", value: "CT" },
  { label: "DE", value: "DE" },
  { label: "DC", value: "DC" },
  { label: "FL", value: "FL" },
  { label: "GA", value: "GA" },
  { label: "HI", value: "HI" },
  { label: "ID", value: "ID" },
  { label: "IL", value: "IL" },
  { label: "IN", value: "IN" },
  { label: "IA", value: "IA" },
  { label: "KS", value: "KS" },
  { label: "KY", value: "KY" },
  { label: "LA", value: "LA" },
  { label: "ME", value: "ME" },
  { label: "MD", value: "MD" },
  { label: "MA", value: "MA" },
  { label: "MI", value: "MI" },
  { label: "MN", value: "MN" },
  { label: "MS", value: "MS" },
  { label: "MO", value: "MO" },
  { label: "MO", value: "MO" },
  { label: "NE", value: "NE" },
  { label: "NV", value: "NV" },
  { label: "NH", value: "NH" },
  { label: "NJ", value: "NJ" },
  { label: "NM", value: "NM" },
  { label: "NY", value: "NY" },
  { label: "NC", value: "NC" },
  { label: "ND", value: "ND" },
  { label: "OH", value: "OH" },
  { label: "OK", value: "OK" },
  { label: "OR", value: "OR" },
  { label: "PA", value: "PA" },
  { label: "RI", value: "RI" },
  { label: "SC", value: "SC" },
  { label: "SD", value: "SD" },
  { label: "TN", value: "TN" },
  { label: "TX", value: "TX" },
  { label: "UT", value: "UT" },
  { label: "VT", value: "VT" },
  { label: "VA", value: "VA" },
  { label: "WA", value: "WA" },
  { label: "WV", value: "WV" },
  { label: "WI", value: "WI" },
  { label: "WY", value: "WY" }
]
