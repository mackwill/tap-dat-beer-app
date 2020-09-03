import { useEffect, useState } from "react";
import Axios from "axios";

export default function useBookSearch(query, pageNumber) {
  useEffect(() => {
    Axios.get("/api/").then((res) => {
      res.data;
    });
  });
}
