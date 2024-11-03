import MagicCube from "./MagicCube";

class Result {
  Buffer: number[][][];
  IndexChange: number[][][];
  ObjectiveFunctions: number[];
  OriginalCube: MagicCube;
  MagicCubes: MagicCube[] | null = null;
  MaxIteration: number;

  constructor({
    Buffer,
    IndexChange,
    ObjectiveFunctions,
    MagicCube,
  }: {
    Buffer: number[][][];
    IndexChange: number[][][];
    ObjectiveFunctions: number[];
    MagicCube: MagicCube;
  }) {
    this.Buffer = Buffer;
    this.IndexChange = IndexChange;
    this.ObjectiveFunctions = ObjectiveFunctions;
    this.OriginalCube = MagicCube;
    this.MagicCubes = null;
    this.MaxIteration = IndexChange.length;

    this.initMagicCubes();

    console.log("Result", this);
  }

  initMagicCubes(): void {
    this.MagicCubes = [this.OriginalCube];
    for (let i = 0; i < this.IndexChange.length; i++) {
      const magicCube = new MagicCube(this.OriginalCube.getSize(), false);
      const indexChange: number[][] = this.IndexChange[i];
      magicCube.setCube(this.MagicCubes[i].getBuffer());
      magicCube.swapElement(
        indexChange[0][0],
        indexChange[0][1],
        indexChange[0][2],
        indexChange[1][0],
        indexChange[1][1],
        indexChange[1][2]
      );
      this.MagicCubes.push(magicCube);
    }
  }
}

export default Result;
