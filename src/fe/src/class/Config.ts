interface Algorithm {
  endpoint: string;
  name: string;
}

class Config {
  static algorithms: Algorithm[] = [
    { endpoint: "steepest-ascent-hill-climbing", name: "HC-Steepest" },
    { endpoint: "sideways-move-hill-climbing", name: "HC-Sideways Move" },
    { endpoint: "random-restart-hill-climbing", name: "HC-Random Restart" },
    { endpoint: "stochastic-hill-climbing", name: "HC-Stochastic" },
    { endpoint: "simulated-annealing", name: "Simulated Annealing" },
    { endpoint: "genetic-algorithm", name: "Genetic Algorithm" },
  ];

  static playbackSpeeds: number[] = [0.25, 0.5, 1, 2, 4, 8, 16];

  static maxSideways: number = 50;
  static maxRestart: number = 5;
  static startPopulation: number = 10000;
  static maxIteration: number = 5;
}

export default Config;
