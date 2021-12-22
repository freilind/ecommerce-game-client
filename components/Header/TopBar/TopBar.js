import React, { useState, useEffect } from "react";
import { Container, Grid, Image, Input, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            className="top-bar__left"
          >
            <Icon name="chess knight" color="green" size="big" />
            <Logo />
            <Icon name="chess" color="green" size="big" />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            className="top-bar__right"
          >
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

const Logo = () => (
  <Link href="/">
    <a>
      <Image src="/logo.png" alt="logo" />
    </a>
  </Link>
);

const Search = () => {
  const [searchStr, setSearchStr] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon={{ name: "search" }}
      value={router.query.query}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
};

export default TopBar;
