import MagicCube from "./MagicCube";

class Result {
  OriginalCube: MagicCube;
  Buffer: number[][][];
  MagicCubes: MagicCube[] | null = null;
  DeltaE: number[] | null = null;
  ExecutionTimeInMS: number;
  IndexChange: number[][][] | null = null;
  Iterations: number | null = null;
  LocalOptimum: number | null = null;
  ObjectiveFunctions: number[] | null = null;
  ObjectiveFunctionsMean: number[] | null = null;
  RestartCount: number | null = null;
  RestartPerIteration: number[] | null = null;
  Algorithm: string;
  MaxIteration: number;
  Population: number | null;

  constructor({
    Buffer,
    CubeStates,
    DeltaE,
    ExecutionTimeInMS,
    IndexChange,
    Iterations,
    LocalOptimum,
    ObjectiveFunctions,
    ObjectiveFunctionsMean,
    RestartCount,
    RestartPerIteration,
    MagicCube,
    Algorithm,
    Population,
  }: {
    Buffer: number[][][];
    CubeStates: number[][][][];
    DeltaE: number[];
    ExecutionTimeInMS: number;
    IndexChange: number[][][];
    Iterations: number;
    LocalOptimum: number;
    ObjectiveFunctions: number[];
    ObjectiveFunctionsMean: number[];
    RestartCount: number;
    RestartPerIteration: number[];
    MagicCube: MagicCube;
    Algorithm: string;
    Population: number;
  }) {
    this.Buffer = Buffer;
    this.DeltaE = DeltaE;
    this.ObjectiveFunctions = ObjectiveFunctions;
    this.OriginalCube = MagicCube;
    this.ExecutionTimeInMS = ExecutionTimeInMS;
    this.IndexChange = IndexChange;
    this.Iterations = Iterations;
    this.LocalOptimum = LocalOptimum;
    this.ObjectiveFunctions = ObjectiveFunctions;
    this.ObjectiveFunctionsMean = ObjectiveFunctionsMean;
    this.RestartCount = RestartCount;
    this.RestartPerIteration = RestartPerIteration;

    this.MaxIteration = 0;
    this.Algorithm = Algorithm;
    this.Population = this.Algorithm == "genetic-algorithm" ? Population : null;

    this.initMagicCubes(CubeStates);

    console.log("Result", this);
  }

  initMagicCubes(CubeStates: number[][][][]): void {
    this.MagicCubes = [];
    for (let i = 0; i < CubeStates.length; i++) {
      const magicCube = new MagicCube(this.OriginalCube.getSize(), false);
      magicCube.setCube(CubeStates[i]);
      this.MagicCubes.push(magicCube);
    }
    this.MaxIteration = this.MagicCubes.length - 1;
  }
}

export default Result;
