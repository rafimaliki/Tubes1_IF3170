interface Algorithm {
  endpoint: string;
  name: string;
}

class Config {
  static algorithms: Algorithm[] = [
    { endpoint: "hillclimbing-steepest", name: "HC-Steepest" },
    { endpoint: "hillclimbing-sideways", name: "HC-Sideways Move" },
    { endpoint: "hillclimbing-randomrestart", name: "HC-Random Restart" },
    { endpoint: "hillclimbing-stochastic", name: "HC-Stochastic" },
    { endpoint: "simulated-annealing", name: "Simulated Annealing" },
    { endpoint: "genetic-algorithm", name: "Genetic Algorithm" },
  ];

  static playbackSpeeds: number[] = [0.25, 0.5, 1, 2, 4, 8, 16];
}

export default Config;
