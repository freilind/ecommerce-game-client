import React from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";

const Platform = () => {
  const { query } = useRouter();
  return (
    <BasicLayout className="platform">
      <h1>{query.platform}</h1>
    </BasicLayout>
  );
};

export default Platform;
