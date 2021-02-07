import React, { useState } from "react";
import { motion } from "framer-motion";
import { showUp } from "../styles/animations";
import { Card, Icon, Image, Grid } from "semantic-ui-react";

const ByDish = () => {
  const [dish, setDish] = useState("");
  return (
    <motion.div
      variants={showUp}
      initial="hidden"
      animate="visible"
      className="dish-main-container"
    >
      <div className="dish-head">
        <div className="dish-search">
          <label htmlFor="bydish">Enter your dish</label>
          <input
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            type="text"
            placeholder="Example: Pasta..."
          />
          <button type="submit">Search</button>
        </div>
      </div>
      <div className="dish-body">
        <Grid centered columns={4}>
          <Grid.Row>
            <Grid.Column>
              <Card style={{ marginBottom: 30 }}>
                <Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </motion.div>
  );
};

export default ByDish;
