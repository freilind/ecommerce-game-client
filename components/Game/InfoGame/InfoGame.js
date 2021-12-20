import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
import CarouselScreenshots from "../CarouselScreenshots";

const InfoGame = (props) => {
  const { game } = props;

  return (
    <div className="info-game">
      <ReactPlayer
        className="info-game__video"
        url={game.video}
        controls={true}
      />
      <CarouselScreenshots title={game.title} screenshots={game.screenshots} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />

        <div className="info-game__content-date">
          <h4>Date release:</h4>
          <p>{moment(game.releaseDate).format("L")}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoGame;
