import React from "react";
import Head from "next/head";

const Seo = (props) => {
  const { title, description } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
};

export default Seo;

Seo.defaultProps = {
  title: "Gaming - Your favorite games.",
  description:
    "Your favorite games for Steam, PlayStation, Xbox, Switch.",
};
