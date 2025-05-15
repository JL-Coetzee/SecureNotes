import footballTactics from "./assets/hobbies/football-tactics.jpg";
import ghostOfTsushima from "./assets/hobbies/ghost-of-tsushima.jpeg";
import interstellarBlackhole from "./assets/hobbies/interstellar-blackhole.jpg";
import jonBellion from "./assets/hobbies/jon-bellion.jpg";
import mountainsThroughCarWindow from "./assets/hobbies/mountains-through-car-window.jpg";
import oceanView from "./assets/hobbies/ocean-view.jpg";
import openRoad from "./assets/hobbies/open-road.jpg";
import orchestra from "./assets/hobbies/orchestra.jpg";
import charlesFerrari from "./assets/hobbies/charles-ferrari-top-view.jpg";
import hamiltonCockpit from "./assets/hobbies/hamilton-cockpit.jpg";
import hamiltonPanther from "./assets/hobbies/hamilton-panther.jpg";
import martinOdegaard from "./assets/hobbies/martin-odegaard.jpg";
import springboks from "./assets/hobbies/rwc-2023-final-whistle.jpg";
import spiderman from "./assets/hobbies/spiderman2.jpeg";
import silhouette from "./assets/hobbies/people-silhouette.jpeg";

interface ImageData {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export const images: ImageData[] = [
  {
    src: hamiltonCockpit,
    alt: "Lewis Hamilton in Mercedes-AMG Formula 1 Cockpit",
    caption: "Lewis Hamilton in Mercedes-AMG F1 Car",
    category: "motorsport",
  },
  {
    src: jonBellion,
    alt: "Jon Bellion",
    caption: "Jon Bellion",
    category: "music",
  },
  {
    src: martinOdegaard,
    alt: "Arsenal's Martin Odegaard dribbling the ball",
    caption: "Martin Odegaard Dribbling a Football",
    category: "sport",
  },
  {
    src: springboks,
    alt: "Springboks winning the 2023 Rugby World Cup Final",
    caption: "Final Whistle as Springboks Win 2023 RWC",
    category: "sport",
  },
  {
    src: ghostOfTsushima,
    alt: "Ghost of Tsushima landscape",
    caption: "Ghost of Tsushima",
    category: "video games",
  },
  {
    src: hamiltonPanther,
    alt: "Lewis Hamilton commemorating Chadwick Boseman by doing the 'Black Panther' pose",
    caption: "Lewis Hamilton Celebrating",
    category: "motorsport",
  },
  {
    src: spiderman,
    alt: "Spiderman in Marvel's Spiderman 2",
    caption: "Marvel's Spiderman 2",
    category: "video games",
  },
  {
    src: interstellarBlackhole,
    alt: "Interstellar black hole visualization",
    caption: 'Blackhole from "Interstellar"',
    category: "sci-fi",
  },
  {
    src: mountainsThroughCarWindow,
    alt: "Mountains view through car window",
    caption: "Mountains Through Car Window",
    category: "nature",
  },
  {
    src: charlesFerrari,
    alt: "Charles Leclerc crossing the finish line in his Ferrari Formula 1 car",
    caption: "Charles Leclerc Crossing the Finish Line",
    category: "motorsport",
  },
  {
    src: oceanView,
    alt: "Ocean view at sunset",
    caption: "Ocean View",
    category: "nature",
  },
  {
    src: footballTactics,
    alt: "Football tactics on display",
    caption: "Football Tactics",
    category: "sport",
  },
  {
    src: openRoad,
    alt: "Open road stretching into the horizon",
    caption: "Open Road",
    category: "nature",
  },
  {
    src: orchestra,
    alt: "Orchestra performing on stage",
    caption: "Orchestra Performance",
    category: "music",
  },
  {
    src: silhouette,
    alt: "Silhouette of friends on hill watching the sunset",
    caption: "Friends enjoying the sunset",
    category: "socialising",
  },
];
