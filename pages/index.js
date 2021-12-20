import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { getLastGamesApi } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";

const Home = () => {
  const [games, setGames] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(20);
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!games && <Loader active>Loading games</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No games.</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
};

export default Home;
