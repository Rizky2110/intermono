import React from "react";
import { random } from "../utils";

const useUniqueId = (length = 20) => {
  const [id, setId] = React.useState("");
  const rand = random(length);
  React.useEffect(() => {
    if (!id) setId(rand);
  }, [id, rand]);

  return id;
};

export default useUniqueId;
