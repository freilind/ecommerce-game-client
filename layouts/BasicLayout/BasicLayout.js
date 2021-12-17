import { Container } from "semantic-ui-react";
import classNames from "classnames";
import Header from "../../components/Header";

const BasicLayout = ({ children, className }) => {
  return (
    <Container
      fluid
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
