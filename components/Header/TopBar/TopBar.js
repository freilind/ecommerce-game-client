import { Container, Grid, Image, Input, Icon } from "semantic-ui-react";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Icon name="chess knight" color="green" size="big" />
            <Logo />
            <Icon name="chess" color="green" size="big" />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Icon name="keyboard outline" color="green" size="big" />
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

const Search = () => <Input id="search-game" icon={{ name: "search" }} />;

export default TopBar;
