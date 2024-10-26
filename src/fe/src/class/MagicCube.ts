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

    // this.buffer[0][0][0] = 67;
    // this.buffer[0][0][1] = 18;
    // this.buffer[0][0][2] = 119;
    // this.buffer[0][0][3] = 106;
    // this.buffer[0][0][4] = 5;
    // this.buffer[0][1][0] = 116;
    // this.buffer[0][1][1] = 17;
    // this.buffer[0][1][2] = 14;
    // this.buffer[0][1][3] = 73;
    // this.buffer[0][1][4] = 95;
    // this.buffer[0][2][0] = 40;
    // this.buffer[0][2][1] = 50;
    // this.buffer[0][2][2] = 81;
    // this.buffer[0][2][3] = 65;
    // this.buffer[0][2][4] = 79;
    // this.buffer[0][3][0] = 56;
    // this.buffer[0][3][1] = 120;
    // this.buffer[0][3][2] = 55;
    // this.buffer[0][3][3] = 49;
    // this.buffer[0][3][4] = 35;
    // this.buffer[0][4][0] = 36;
    // this.buffer[0][4][1] = 110;
    // this.buffer[0][4][2] = 46;
    // this.buffer[0][4][3] = 22;
    // this.buffer[0][4][4] = 101;
    // this.buffer[1][0][0] = 66;
    // this.buffer[1][0][1] = 72;
    // this.buffer[1][0][2] = 27;
    // this.buffer[1][0][3] = 102;
    // this.buffer[1][0][4] = 48;
    // this.buffer[1][1][0] = 26;
    // this.buffer[1][1][1] = 39;
    // this.buffer[1][1][2] = 92;
    // this.buffer[1][1][3] = 44;
    // this.buffer[1][1][4] = 114;
    // this.buffer[1][2][0] = 32;
    // this.buffer[1][2][1] = 93;
    // this.buffer[1][2][2] = 88;
    // this.buffer[1][2][3] = 83;
    // this.buffer[1][2][4] = 19;
    // this.buffer[1][3][0] = 113;
    // this.buffer[1][3][1] = 57;
    // this.buffer[1][3][2] = 9;
    // this.buffer[1][3][3] = 62;
    // this.buffer[1][3][4] = 74;
    // this.buffer[1][4][0] = 78;
    // this.buffer[1][4][1] = 54;
    // this.buffer[1][4][2] = 99;
    // this.buffer[1][4][3] = 24;
    // this.buffer[1][4][4] = 60;
    // this.buffer[2][0][0] = 42;
    // this.buffer[2][0][1] = 111;
    // this.buffer[2][0][2] = 85;
    // this.buffer[2][0][3] = 2;
    // this.buffer[2][0][4] = 75;
    // this.buffer[2][1][0] = 30;
    // this.buffer[2][1][1] = 118;
    // this.buffer[2][1][2] = 21;
    // this.buffer[2][1][3] = 123;
    // this.buffer[2][1][4] = 23;
    // this.buffer[2][2][0] = 89;
    // this.buffer[2][2][1] = 68;
    // this.buffer[2][2][2] = 63;
    // this.buffer[2][2][3] = 58;
    // this.buffer[2][2][4] = 37;
    // this.buffer[2][3][0] = 103;
    // this.buffer[2][3][1] = 3;
    // this.buffer[2][3][2] = 105;
    // this.buffer[2][3][3] = 8;
    // this.buffer[2][3][4] = 96;
    // this.buffer[2][4][0] = 51;
    // this.buffer[2][4][1] = 15;
    // this.buffer[2][4][2] = 41;
    // this.buffer[2][4][3] = 124;
    // this.buffer[2][4][4] = 84;
    // this.buffer[3][0][0] = 115;
    // this.buffer[3][0][1] = 98;
    // this.buffer[3][0][2] = 4;
    // this.buffer[3][0][3] = 1;
    // this.buffer[3][0][4] = 97;
    // this.buffer[3][1][0] = 52;
    // this.buffer[3][1][1] = 64;
    // this.buffer[3][1][2] = 117;
    // this.buffer[3][1][3] = 69;
    // this.buffer[3][1][4] = 13;
    // this.buffer[3][2][0] = 107;
    // this.buffer[3][2][1] = 43;
    // this.buffer[3][2][2] = 38;
    // this.buffer[3][2][3] = 33;
    // this.buffer[3][2][4] = 94;
    // this.buffer[3][3][0] = 12;
    // this.buffer[3][3][1] = 82;
    // this.buffer[3][3][2] = 34;
    // this.buffer[3][3][3] = 87;
    // this.buffer[3][3][4] = 100;
    // this.buffer[3][4][0] = 29;
    // this.buffer[3][4][1] = 28;
    // this.buffer[3][4][2] = 122;
    // this.buffer[3][4][3] = 125;
    // this.buffer[3][4][4] = 11;
    // this.buffer[4][0][0] = 25;
    // this.buffer[4][0][1] = 16;
    // this.buffer[4][0][2] = 80;
    // this.buffer[4][0][3] = 104;
    // this.buffer[4][0][4] = 90;
    // this.buffer[4][1][0] = 91;
    // this.buffer[4][1][1] = 77;
    // this.buffer[4][1][2] = 71;
    // this.buffer[4][1][3] = 6;
    // this.buffer[4][1][4] = 70;
    // this.buffer[4][2][0] = 47;
    // this.buffer[4][2][1] = 61;
    // this.buffer[4][2][2] = 45;
    // this.buffer[4][2][3] = 76;
    // this.buffer[4][2][4] = 86;
    // this.buffer[4][3][0] = 31;
    // this.buffer[4][3][1] = 53;
    // this.buffer[4][3][2] = 112;
    // this.buffer[4][3][3] = 109;
    // this.buffer[4][3][4] = 10;
    // this.buffer[4][4][0] = 121;
    // this.buffer[4][4][1] = 108;
    // this.buffer[4][4][2] = 7;
    // this.buffer[4][4][3] = 20;
    // this.buffer[4][4][4] = 59;

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
