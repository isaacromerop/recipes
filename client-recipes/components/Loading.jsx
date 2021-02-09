import React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";

const Loading = () => {
  return (
    <Container>
      <Dimmer active inline="centered">
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    </Container>
  );
};

export default Loading;
