class MagicCube {
  buffer: number[][][];
  size: number;

  constructor(size: number, random: boolean = false) {
    this.size = size;
    this.buffer = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Array(size).fill(0))
    );

    if (random) {
      this.randomizeValue();
    } else {
      this.initValue();
    }
  }

  setElement(x: number, y: number, z: number, value: number): void {
    if (this.isValidIndex(x, y, z)) {
      this.buffer[x][y][z] = value;
    } else {
      throw new Error("Invalid index");
    }
  }

  getElement(x: number, y: number, z: number): number {
    if (this.isValidIndex(x, y, z)) {
      return this.buffer[x][y][z];
    }
    throw new Error("Invalid index");
  }

  getBuffer(): number[][][] {
    return this.buffer;
  }

  getSize(): number {
    return this.size;
  }

  setCube(cube: number[][][]): void {
    if (cube.length !== this.size) {
      throw new Error("Invalid size");
    }

    for (let x = 0; x < this.size; x++) {
      if (cube[x].length !== this.size) {
        throw new Error("Invalid size");
      }

      for (let y = 0; y < this.size; y++) {
        if (cube[x][y].length !== this.size) {
          throw new Error("Invalid size");
        }

        for (let z = 0; z < this.size; z++) {
          this.buffer[x][y][z] = cube[x][y][z];
        }
      }
    }
  }

  private isValidIndex(x: number, y: number, z: number): boolean {
    return (
      x >= 0 &&
      x < this.size &&
      y >= 0 &&
      y < this.size &&
      z >= 0 &&
      z < this.size
    );
  }

  private initValue(): void {
    let counter = 1;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let z = 0; z < this.size; z++) {
          this.buffer[x][y][z] = counter++;
        }
      }
    }
  }

  private randomizeValue(): void {
    const values = Array.from({ length: this.size ** 3 }, (_, i) => i + 1);
    const shuffledValues = values.sort(() => Math.random() - 0.5);

    let counter = 0;
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let z = 0; z < this.size; z++) {
          this.buffer[x][y][z] = shuffledValues[counter++];
        }
      }
    }
  }
}

export default MagicCube;
