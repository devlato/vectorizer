/*
	imagetracer.js version 1.2.6
	Simple raster image tracer and vectorizer written in JavaScript.
	andras@jankovics.net
*/

/*

The Unlicense / PUBLIC DOMAIN

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org/

*/

export type SVGString = string & { __svgString: never };
export const isSVGString = (value: unknown): value is SVGString => typeof value === 'string' && value.includes('svg');

export type ResultCallback = (svgString: SVGString) => void;
export type TraceDataCallback = (traceData: TraceData) => void;
export type CanvasCallback = (canvas: HTMLCanvasElement) => void;
export type Dimensions = {
  width: number;
  height: number;
};
export type TraceData = {
  layers: TracedSegment[][];
  palette: Palette;
} & Dimensions;
export type TraceDataLayerItem = {
  segments: TraceDataLayerItemSegment[];
};
export type TraceDataLayerItemSegment = {
  type: TraceDataLayerItemSegmentType;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} & (
  | {
      x3: number;
      y3: number;
    }
  | {
      x3?: undefined;
      y3?: undefined;
    }
);

export type TraceDataLayerItemSegmentType = 'L' | 'Q';
export type Point = {
  x: number;
  y: number;
};
export type PathPoint = Point & {
  t?: number;
  linesegment?: number;
};
export type ImageData = {
  data: Uint8ClampedArray;
} & Dimensions;
export type ClusteredImageData = {
  array: number[][];
  palette: Palette;
};
export type Box = [number, number, number, number];
export type Path = {
  isholepath: boolean;
  points: PathPoint[];
  boundingbox: Box;
  holechildren: number[];
};
export type Segment = TraceDataLayerItemSegment;
export type TracedSegment = {
  segments: Segment[];
  boundingbox: Box;
  holechildren: number[];
  isholepath: boolean;
};
export type Options = {
  // Tracing
  corsenabled: boolean;
  ltres: number;
  qtres: number;
  pathomit: number;
  rightangleenhance: boolean;

  // Color quantization
  colorsampling: 0 | 1 | 2;
  numberofcolors: number;
  mincolorratio: number;
  colorquantcycles: number;

  // Layering method
  layering: 0 | 1;

  // SVG rendering
  strokewidth: number;
  linefilter: boolean;
  scale: number;
  roundcoords: number;
  viewbox: boolean;
  desc: boolean;

  // Blur
  blurradius: 0 | 1 | 2 | 3 | 4 | 5;
  blurdelta: number;

  // Debug
  layercontainerid: string | undefined;
  lcpr: Exclude<number, 0> | 0;
  qcpr: Exclude<number, 0> | 0;

  // Palette
  pal: Palette | undefined;
};
export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Palette = PaletteColor[];
export type PaletteColor = {
  r: ColorComponentValue;
  g: ColorComponentValue;
  b: ColorComponentValue;
  a: ColorComponentValue;
};
export type ColorComponentValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140
  | 141
  | 142
  | 143
  | 144
  | 145
  | 146
  | 147
  | 148
  | 149
  | 150
  | 151
  | 152
  | 153
  | 154
  | 155
  | 156
  | 157
  | 158
  | 159
  | 160
  | 161
  | 162
  | 163
  | 164
  | 165
  | 166
  | 167
  | 168
  | 169
  | 170
  | 171
  | 172
  | 173
  | 174
  | 175
  | 176
  | 177
  | 178
  | 179
  | 180
  | 181
  | 182
  | 183
  | 184
  | 185
  | 186
  | 187
  | 188
  | 189
  | 190
  | 191
  | 192
  | 193
  | 194
  | 195
  | 196
  | 197
  | 198
  | 199
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 209
  | 210
  | 211
  | 212
  | 213
  | 214
  | 215
  | 216
  | 217
  | 218
  | 219
  | 220
  | 221
  | 222
  | 223
  | 224
  | 225
  | 226
  | 227
  | 228
  | 229
  | 230
  | 231
  | 232
  | 233
  | 234
  | 235
  | 236
  | 237
  | 238
  | 239
  | 240
  | 241
  | 242
  | 243
  | 244
  | 245
  | 246
  | 247
  | 248
  | 249
  | 250
  | 251
  | 252
  | 253
  | 254
  | 255;

export type ColorSampling = 'disabled' | 'random' | 'deterministic';
export type Layering = 'sequential' | 'parallel';
export type BlurRadius = 1 | 2 | 3 | 4 | 5 | 'disabled';
export type PointRadius = number | 'disabled';

export const DEFAULT_OPTIONS: Options = {
  // Tracing
  corsenabled: false,
  ltres: 1,
  qtres: 1,
  pathomit: 8,
  rightangleenhance: true,

  // Color quantization
  colorsampling: 2,
  numberofcolors: 16,
  mincolorratio: 0,
  colorquantcycles: 3,

  // Layering method
  layering: 0,

  // SVG rendering
  strokewidth: 1,
  linefilter: false,
  scale: 1,
  roundcoords: 1,
  viewbox: true,
  desc: false,

  // Blur
  blurradius: 0,
  blurdelta: 20,

  // Debug
  layercontainerid: undefined,
  lcpr: 0,
  qcpr: 0,

  // Palette
  pal: undefined,
};

// Lookup tables for pathscan
// pathscan_combined_lookup[ arr[py][px] ][ dir ] = [nextarrpypx, nextdir, deltapx, deltapy];
const PATHSCAN_COMBINED_LOOKUP: Array<Array<[number, number, number, number]>> = [
  [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ], // arr[py][px]===0 is invalid
  [
    [0, 1, 0, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [0, 2, -1, 0],
  ],
  [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [0, 1, 0, -1],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 1, 0],
    [-1, -1, -1, -1],
    [0, 2, -1, 0],
    [-1, -1, -1, -1],
  ],

  [
    [-1, -1, -1, -1],
    [0, 0, 1, 0],
    [0, 3, 0, 1],
    [-1, -1, -1, -1],
  ],
  [
    [13, 3, 0, 1],
    [13, 2, -1, 0],
    [7, 1, 0, -1],
    [7, 0, 1, 0],
  ],
  [
    [-1, -1, -1, -1],
    [0, 1, 0, -1],
    [-1, -1, -1, -1],
    [0, 3, 0, 1],
  ],
  [
    [0, 3, 0, 1],
    [0, 2, -1, 0],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ],

  [
    [0, 3, 0, 1],
    [0, 2, -1, 0],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ],
  [
    [-1, -1, -1, -1],
    [0, 1, 0, -1],
    [-1, -1, -1, -1],
    [0, 3, 0, 1],
  ],
  [
    [11, 1, 0, -1],
    [14, 0, 1, 0],
    [14, 3, 0, 1],
    [11, 2, -1, 0],
  ],
  [
    [-1, -1, -1, -1],
    [0, 0, 1, 0],
    [0, 3, 0, 1],
    [-1, -1, -1, -1],
  ],

  [
    [0, 0, 1, 0],
    [-1, -1, -1, -1],
    [0, 2, -1, 0],
    [-1, -1, -1, -1],
  ],
  [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [0, 1, 0, -1],
    [0, 0, 1, 0],
  ],
  [
    [0, 1, 0, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [0, 2, -1, 0],
  ],
  [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ], // arr[py][px]===15 is invalid
];

export default class ImageTracer {
  private readonly versionnumber = '1.2.6';

  // Loading an image from a URL, tracing when loaded,
  // then executing callback with the scaled svg string as argument
  imageToSVG(imageURL: string, callback: ResultCallback, options?: Options) {
    const opts = this.checkoptions(options);
    // loading image, tracing and callback
    this.loadImage(
      imageURL,
      (canvas) => {
        callback(this.imagedataToSVG(this.getImgdata(canvas), opts));
      },
      opts,
    );
  }

  // Tracing imagedata, then returning the scaled svg string
  imagedataToSVG(imageData: ImageData, options?: Options): SVGString {
    const opts = this.checkoptions(options);
    // tracing imagedata
    const traceData = this.imagedataToTracedata(imageData, opts);
    // returning SVG string
    return this.getsvgstring(traceData, opts);
  }

  // Loading an image from a URL, tracing when loaded,
  // then executing callback with tracedata as argument
  imageToTracedata(imageURL: string, callback: TraceDataCallback, options?: Options) {
    const opts = this.checkoptions(options);
    // loading image, tracing and callback
    this.loadImage(
      imageURL,
      (canvas) => {
        callback(this.imagedataToTracedata(this.getImgdata(canvas), opts));
      },
      opts,
    );
  }

  // Tracing imagedata, then returning tracedata (layers with paths, palette, image size)
  imagedataToTracedata(imageData: ImageData, options?: Options): TraceData {
    const opts = this.checkoptions(options);

    // 1. Color quantization
    const ii = this.colorquantization(imageData, opts);

    let tracedata: TraceData;

    if (opts.layering === 0) {
      // Sequential layering

      // create tracedata object
      tracedata = {
        layers: [],
        palette: ii.palette,
        width: ii.array[0].length - 2,
        height: ii.array.length - 2,
      };

      // Loop to trace each color layer
      for (let colornum = 0; colornum < ii.palette.length; colornum++) {
        // layeringstep -> pathscan -> internodes -> batchtracepaths
        const tracedlayer = this.batchtracepaths(
          this.internodes(this.pathscan(this.layeringstep(ii, colornum), opts.pathomit), opts),
          opts.ltres,
          opts.qtres,
        );

        // adding traced layer
        tracedata.layers.push(tracedlayer);
      } // End of color loop
    } else {
      // Parallel layering
      // 2. Layer separation and edge detection
      const ls = this.layering(ii);

      // Optional edge node visualization
      if (opts.layercontainerid) {
        this.drawLayers(ls, this.specpalette, opts.scale, opts.layercontainerid);
      }

      // 3. Batch pathscan
      const bps = this.batchpathscan(ls, opts.pathomit);

      // 4. Batch interpollation
      const bis = this.batchinternodes(bps, opts);

      // 5. Batch tracing and creating tracedata object
      tracedata = {
        layers: this.batchtracelayers(bis, opts.ltres, opts.qtres),
        palette: ii.palette,
        width: imageData.width,
        height: imageData.height,
      };
    } // End of parallel layering

    // return tracedata
    return tracedata;
  }

  // creating options object, setting defaults for missing values
  checkoptions(options?: Options) {
    return {
      ...options,
      ...DEFAULT_OPTIONS,
    };
  }

  // 1. Color quantization
  // Using a form of k-means clustering repeatead options.colorquantcycles times. http://en.wikipedia.org/wiki/Color_quantization
  private colorquantization(imageData: ImageData, options: Options): ClusteredImageData {
    const array: number[][] = [];
    let idx = 0;
    let cd: number;
    let cdl: number;
    let ci: number;
    const paletteacc: Array<PaletteColor & { n: ColorComponentValue }> = [];
    const pixelnum = imageData.width * imageData.height;
    let i: number;
    let j: number;
    let k: number;
    let cnt: number;
    let palette: Palette;

    // imgd.data must be RGBA, not just RGB
    if (imageData.data.length < pixelnum * 4) {
      const newimgddata = new Uint8ClampedArray(pixelnum * 4);
      for (let pxcnt = 0; pxcnt < pixelnum; pxcnt++) {
        newimgddata[pxcnt * 4] = imageData.data[pxcnt * 3];
        newimgddata[pxcnt * 4 + 1] = imageData.data[pxcnt * 3 + 1];
        newimgddata[pxcnt * 4 + 2] = imageData.data[pxcnt * 3 + 2];
        newimgddata[pxcnt * 4 + 3] = 255;
      }
      imageData.data = newimgddata;
    } // End of RGBA imgd.data check

    // Filling arr (color index array) with -1
    for (j = 0; j < imageData.height + 2; j++) {
      array[j] = [];
      for (i = 0; i < imageData.width + 2; i++) {
        array[j][i] = -1;
      }
    }

    // Use custom palette if pal is defined or sample / generate custom length palette
    if (options.pal) {
      palette = options.pal;
    } else if (options.colorsampling === 0) {
      palette = this.generatepalette(options.numberofcolors);
    } else if (options.colorsampling === 1) {
      palette = this.samplepalette(options.numberofcolors, imageData);
    } else {
      palette = this.samplepalette2(options.numberofcolors, imageData);
    }

    // Selective Gaussian blur preprocessing
    if (options.blurradius > 0) {
      imageData = this.blur(imageData, options.blurradius, options.blurdelta);
    }

    // Repeat clustering step options.colorquantcycles times
    for (cnt = 0; cnt < options.colorquantcycles; cnt++) {
      // Average colors from the second iteration
      if (cnt > 0) {
        // averaging paletteacc for palette
        for (k = 0; k < palette.length; k++) {
          // averaging
          if (paletteacc[k].n > 0) {
            palette[k] = {
              r: Math.floor(paletteacc[k].r / paletteacc[k].n) as ColorComponentValue,
              g: Math.floor(paletteacc[k].g / paletteacc[k].n) as ColorComponentValue,
              b: Math.floor(paletteacc[k].b / paletteacc[k].n) as ColorComponentValue,
              a: Math.floor(paletteacc[k].a / paletteacc[k].n) as ColorComponentValue,
            };
          }

          // Randomizing a color, if there are too few pixels and there will be a new cycle
          if (paletteacc[k].n / pixelnum < options.mincolorratio && cnt < options.colorquantcycles - 1) {
            palette[k] = {
              r: Math.floor(Math.random() * 255) as ColorComponentValue,
              g: Math.floor(Math.random() * 255) as ColorComponentValue,
              b: Math.floor(Math.random() * 255) as ColorComponentValue,
              a: Math.floor(Math.random() * 255) as ColorComponentValue,
            };
          }
        } // End of palette loop
      } // End of Average colors from the second iteration

      // Reseting palette accumulator for averaging
      for (i = 0; i < palette.length; i++) {
        paletteacc[i] = { r: 0, g: 0, b: 0, a: 0, n: 0 };
      }

      // loop through all pixels
      for (j = 0; j < imageData.height; j++) {
        for (i = 0; i < imageData.width; i++) {
          // pixel index
          idx = (j * imageData.width + i) * 4;

          // find closest color from palette by measuring (rectilinear) color distance between this pixel and all palette colors
          ci = 0;
          cdl = 1024; // 4 * 256 is the maximum RGBA distance
          for (k = 0; k < palette.length; k++) {
            // In my experience, https://en.wikipedia.org/wiki/Rectilinear_distance works better than https://en.wikipedia.org/wiki/Euclidean_distance
            cd =
              Math.abs(palette[k].r - imageData.data[idx]) +
              Math.abs(palette[k].g - imageData.data[idx + 1]) +
              Math.abs(palette[k].b - imageData.data[idx + 2]) +
              Math.abs(palette[k].a - imageData.data[idx + 3]);

            // Remember this color if this is the closest yet
            if (cd < cdl) {
              cdl = cd;
              ci = k;
            }
          } // End of palette loop

          // add to palettacc
          paletteacc[ci].r += imageData.data[idx];
          paletteacc[ci].g += imageData.data[idx + 1];
          paletteacc[ci].b += imageData.data[idx + 2];
          paletteacc[ci].a += imageData.data[idx + 3];
          paletteacc[ci].n++;

          // update the indexed color array
          array[j + 1][i + 1] = ci;
        } // End of i loop
      } // End of j loop
    } // End of Repeat clustering step options.colorquantcycles times

    return { array, palette };
  }

  // Sampling a palette from imagedata
  private samplepalette(numberofcolors: number, imageData: ImageData): Palette {
    let idx: number;
    const palette: Palette = [];

    for (let i = 0; i < numberofcolors; i++) {
      idx = Math.floor((Math.random() * imageData.data.length) / 4) * 4;
      palette.push({
        r: imageData.data[idx] as ColorComponentValue,
        g: imageData.data[idx + 1] as ColorComponentValue,
        b: imageData.data[idx + 2] as ColorComponentValue,
        a: imageData.data[idx + 3] as ColorComponentValue,
      });
    }

    return palette;
  }

  // Deterministic sampling a palette from imagedata: rectangular grid
  private samplepalette2(numberofcolors: number, imageData: ImageData): Palette {
    let idx: number;
    const palette: Palette = [];
    const ni = Math.ceil(Math.sqrt(numberofcolors));
    const nj = Math.ceil(numberofcolors / ni);
    const vx = imageData.width / (ni + 1);
    const vy = imageData.height / (nj + 1);

    for (let j = 0; j < nj; j++) {
      for (let i = 0; i < ni; i++) {
        if (palette.length === numberofcolors) {
          break;
        } else {
          idx = Math.floor((j + 1) * vy * imageData.width + (i + 1) * vx) * 4;
          palette.push({
            r: imageData.data[idx] as ColorComponentValue,
            g: imageData.data[idx + 1] as ColorComponentValue,
            b: imageData.data[idx + 2] as ColorComponentValue,
            a: imageData.data[idx + 3] as ColorComponentValue,
          });
        }
      }
    }
    return palette;
  }

  // Generating a palette with numberofcolors
  private generatepalette(numberofcolors: number): Palette {
    const palette: Palette = [];
    let rcnt: number;
    let gcnt: number;
    let bcnt: number;
    if (numberofcolors < 8) {
      // Grayscale
      const graystep = Math.floor(255 / (numberofcolors - 1));
      for (let i = 0; i < numberofcolors; i++) {
        palette.push({
          r: (i * graystep) as ColorComponentValue,
          g: (i * graystep) as ColorComponentValue,
          b: (i * graystep) as ColorComponentValue,
          a: 255,
        });
      }
    } else {
      // RGB color cube
      const colorqnum = Math.floor(Math.pow(numberofcolors, 1 / 3)), // Number of points on each edge on the RGB color cube
        colorstep = Math.floor(255 / (colorqnum - 1)), // distance between points
        rndnum = numberofcolors - colorqnum * colorqnum * colorqnum; // number of random colors

      for (rcnt = 0; rcnt < colorqnum; rcnt++) {
        for (gcnt = 0; gcnt < colorqnum; gcnt++) {
          for (bcnt = 0; bcnt < colorqnum; bcnt++) {
            palette.push({
              r: (rcnt * colorstep) as ColorComponentValue,
              g: (gcnt * colorstep) as ColorComponentValue,
              b: (bcnt * colorstep) as ColorComponentValue,
              a: 255,
            });
          } // End of blue loop
        } // End of green loop
      } // End of red loop

      // Rest is random
      for (rcnt = 0; rcnt < rndnum; rcnt++) {
        palette.push({
          r: Math.floor(Math.random() * 255) as ColorComponentValue,
          g: Math.floor(Math.random() * 255) as ColorComponentValue,
          b: Math.floor(Math.random() * 255) as ColorComponentValue,
          a: Math.floor(Math.random() * 255) as ColorComponentValue,
        });
      }
    } // End of numberofcolors check

    return palette;
  }

  // 2. Layer separation and edge detection
  // Edge node types ( ▓: this layer or 1; ░: not this layer or 0 )
  // 12  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓
  // 48  ░░  ░░  ░░  ░░  ░▓  ░▓  ░▓  ░▓  ▓░  ▓░  ▓░  ▓░  ▓▓  ▓▓  ▓▓  ▓▓
  //     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
  private layering(ii: ClusteredImageData): number[][][] {
    // Creating layers for each indexed color in arr
    const layers: number[][][] = [];
    let val = 0;
    const ah = ii.array.length;
    const aw = ii.array[0].length;
    let n1: number;
    let n2: number;
    let n3: number;
    let n4: number;
    let n5: number;
    let n6: number;
    let n7: number;
    let n8: number;
    let i: number;
    let j: number;
    let k: number;

    // Create layers
    for (k = 0; k < ii.palette.length; k++) {
      layers[k] = [];
      for (j = 0; j < ah; j++) {
        layers[k][j] = [];
        for (i = 0; i < aw; i++) {
          layers[k][j][i] = 0;
        }
      }
    }

    // Looping through all pixels and calculating edge node type
    for (j = 1; j < ah - 1; j++) {
      for (i = 1; i < aw - 1; i++) {
        // This pixel's indexed color
        val = ii.array[j][i];

        // Are neighbor pixel colors the same?
        n1 = ii.array[j - 1][i - 1] === val ? 1 : 0;
        n2 = ii.array[j - 1][i] === val ? 1 : 0;
        n3 = ii.array[j - 1][i + 1] === val ? 1 : 0;
        n4 = ii.array[j][i - 1] === val ? 1 : 0;
        n5 = ii.array[j][i + 1] === val ? 1 : 0;
        n6 = ii.array[j + 1][i - 1] === val ? 1 : 0;
        n7 = ii.array[j + 1][i] === val ? 1 : 0;
        n8 = ii.array[j + 1][i + 1] === val ? 1 : 0;

        // this pixel's type and looking back on previous pixels
        layers[val][j + 1][i + 1] = 1 + n5 * 2 + n8 * 4 + n7 * 8;
        if (!n4) {
          layers[val][j + 1][i] = +2 + n7 * 4 + n6 * 8;
        }
        if (!n2) {
          layers[val][j][i + 1] = +n3 * 2 + n5 * 4 + 8;
        }
        if (!n1) {
          layers[val][j][i] = +n2 * 2 + 4 + n4 * 8;
        }
      } // End of i loop
    } // End of j loop

    return layers;
  }

  // 2. Layer separation and edge detection
  // Edge node types ( ▓: this layer or 1; ░: not this layer or 0 )
  // 12  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓
  // 48  ░░  ░░  ░░  ░░  ░▓  ░▓  ░▓  ░▓  ▓░  ▓░  ▓░  ▓░  ▓▓  ▓▓  ▓▓  ▓▓
  //     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
  private layeringstep(ii: ClusteredImageData, cnum: number): number[][] {
    // Creating layers for each indexed color in arr
    const layer: number[][] = [];
    const ah = ii.array.length;
    const aw = ii.array[0].length;
    let i: number;
    let j: number;

    // Create layer
    for (j = 0; j < ah; j++) {
      layer[j] = [];
      for (i = 0; i < aw; i++) {
        layer[j][i] = 0;
      }
    }

    // Looping through all pixels and calculating edge node type
    for (j = 1; j < ah; j++) {
      for (i = 1; i < aw; i++) {
        layer[j][i] =
          (ii.array[j - 1][i - 1] === cnum ? 1 : 0) +
          (ii.array[j - 1][i] === cnum ? 2 : 0) +
          (ii.array[j][i - 1] === cnum ? 8 : 0) +
          (ii.array[j][i] === cnum ? 4 : 0);
      } // End of i loop
    } // End of j loop

    return layer;
  }

  // Point in polygon test
  private pointinpoly(p: Point, pa: Point[]): boolean {
    let isin = false;

    for (let i = 0, j = pa.length - 1; i < pa.length; j = i++) {
      isin =
        pa[i].y > p.y !== pa[j].y > p.y && p.x < ((pa[j].x - pa[i].x) * (p.y - pa[i].y)) / (pa[j].y - pa[i].y) + pa[i].x
          ? !isin
          : isin;
    }

    return isin;
  }

  // 3. Walking through an edge node array, discarding edge node types 0 and 15 and creating paths from the rest.
  // Walk directions (dir): 0 > ; 1 ^ ; 2 < ; 3 v
  private pathscan(array: number[][], pathomit: number): Path[] {
    const paths: Path[] = [];
    let pacnt = 0;
    let pcnt = 0;
    let px = 0;
    let py = 0;
    const w = array[0].length;
    const h = array.length;
    let dir = 0;
    let pathfinished = true;
    let holepath = false;
    let lookuprow: [number, number, number, number];

    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        if (array[j][i] == 4 || array[j][i] == 11) {
          // Other values are not valid

          // Init
          px = i;
          py = j;
          paths[pacnt] = {
            isholepath: false,
            points: [],
            boundingbox: [px, py, px, py],
            holechildren: [],
          };
          pathfinished = false;
          pcnt = 0;
          holepath = array[j][i] == 11;
          dir = 1;

          // Path points loop
          while (!pathfinished) {
            // New path point
            paths[pacnt].points[pcnt] = {
              x: px - 1,
              y: py - 1,
              t: array[py][px],
            };

            // Bounding box
            if (px - 1 < paths[pacnt].boundingbox[0]) {
              paths[pacnt].boundingbox[0] = px - 1;
            }
            if (px - 1 > paths[pacnt].boundingbox[2]) {
              paths[pacnt].boundingbox[2] = px - 1;
            }
            if (py - 1 < paths[pacnt].boundingbox[1]) {
              paths[pacnt].boundingbox[1] = py - 1;
            }
            if (py - 1 > paths[pacnt].boundingbox[3]) {
              paths[pacnt].boundingbox[3] = py - 1;
            }

            // Next: look up the replacement, direction and coordinate changes = clear this cell, turn if required, walk forward
            lookuprow = PATHSCAN_COMBINED_LOOKUP[array[py][px]][dir];
            array[py][px] = lookuprow[0];
            dir = lookuprow[1];
            px += lookuprow[2];
            py += lookuprow[3];

            // Close path
            if (px - 1 === paths[pacnt].points[0].x && py - 1 === paths[pacnt].points[0].y) {
              pathfinished = true;

              // Discarding paths shorter than pathomit
              if (paths[pacnt].points.length < pathomit) {
                paths.pop();
              } else {
                paths[pacnt].isholepath = holepath ? true : false;

                // Finding the parent shape for this hole
                if (holepath) {
                  let parentidx = 0;
                  let parentbbox: Box = [-1, -1, w + 1, h + 1];
                  for (let parentcnt = 0; parentcnt < pacnt; parentcnt++) {
                    if (
                      !paths[parentcnt].isholepath &&
                      this.boundingboxincludes(paths[parentcnt].boundingbox, paths[pacnt].boundingbox) &&
                      this.boundingboxincludes(parentbbox, paths[parentcnt].boundingbox) &&
                      this.pointinpoly(paths[pacnt].points[0], paths[parentcnt].points)
                    ) {
                      parentidx = parentcnt;
                      parentbbox = paths[parentcnt].boundingbox;
                    }
                  }

                  paths[parentidx].holechildren.push(pacnt);
                } // End of holepath parent finding

                pacnt++;
              }
            } // End of Close path

            pcnt++;
          } // End of Path points loop
        } // End of Follow path
      } // End of i loop
    } // End of j loop

    return paths;
  }

  private boundingboxincludes(parentbbox: Box, childbbox: Box): boolean {
    return (
      parentbbox[0] < childbbox[0] &&
      parentbbox[1] < childbbox[1] &&
      parentbbox[2] > childbbox[2] &&
      parentbbox[3] > childbbox[3]
    );
  }

  // 3. Batch pathscan
  private batchpathscan(layers: number[][][], pathomit: number): Path[][] {
    return layers.map((l) => this.pathscan(l, pathomit));
  }

  // 4. interpollating between path points for nodes with 8 directions ( East, SouthEast, S, SW, W, NW, N, NE )
  private internodes(paths: Path[], options: Options): Path[] {
    const ins: Path[] = [];
    let palen = 0;
    let nextidx = 0;
    let nextidx2 = 0;
    let previdx = 0;
    let previdx2 = 0;
    let pacnt: number;
    let pcnt: number;

    // paths loop
    for (pacnt = 0; pacnt < paths.length; pacnt++) {
      ins[pacnt] = {
        points: [],
        boundingbox: paths[pacnt].boundingbox,
        holechildren: paths[pacnt].holechildren,
        isholepath: paths[pacnt].isholepath,
      };
      palen = paths[pacnt].points.length;

      // pathpoints loop
      for (pcnt = 0; pcnt < palen; pcnt++) {
        // next and previous point indexes
        nextidx = (pcnt + 1) % palen;
        nextidx2 = (pcnt + 2) % palen;
        previdx = (pcnt - 1 + palen) % palen;
        previdx2 = (pcnt - 2 + palen) % palen;

        // right angle enhance
        if (
          options.rightangleenhance &&
          this.testrightangle(paths[pacnt], previdx2, previdx, pcnt, nextidx, nextidx2)
        ) {
          // Fix previous direction
          if (ins[pacnt].points.length > 0) {
            ins[pacnt].points[ins[pacnt].points.length - 1].linesegment = this.getdirection(
              ins[pacnt].points[ins[pacnt].points.length - 1].x,
              ins[pacnt].points[ins[pacnt].points.length - 1].y,
              paths[pacnt].points[pcnt].x,
              paths[pacnt].points[pcnt].y,
            );
          }

          // This corner point
          ins[pacnt].points.push({
            x: paths[pacnt].points[pcnt].x,
            y: paths[pacnt].points[pcnt].y,
            linesegment: this.getdirection(
              paths[pacnt].points[pcnt].x,
              paths[pacnt].points[pcnt].y,
              (paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2,
              (paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2,
            ),
          });
        } // End of right angle enhance

        // interpolate between two path points
        ins[pacnt].points.push({
          x: (paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2,
          y: (paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2,
          linesegment: this.getdirection(
            (paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2,
            (paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2,
            (paths[pacnt].points[nextidx].x + paths[pacnt].points[nextidx2].x) / 2,
            (paths[pacnt].points[nextidx].y + paths[pacnt].points[nextidx2].y) / 2,
          ),
        });
      } // End of pathpoints loop
    } // End of paths loop

    return ins;
  }

  private testrightangle(path: Path, idx1: number, idx2: number, idx3: number, idx4: number, idx5: number): boolean {
    return (
      (path.points[idx3].x === path.points[idx1].x &&
        path.points[idx3].x === path.points[idx2].x &&
        path.points[idx3].y === path.points[idx4].y &&
        path.points[idx3].y === path.points[idx5].y) ||
      (path.points[idx3].y === path.points[idx1].y &&
        path.points[idx3].y === path.points[idx2].y &&
        path.points[idx3].x === path.points[idx4].x &&
        path.points[idx3].x === path.points[idx5].x)
    );
  }

  getdirection(x1: number, y1: number, x2: number, y2: number): Direction {
    let val: Direction = 8;
    if (x1 < x2) {
      if (y1 < y2) {
        val = 1;
      } // SouthEast
      else if (y1 > y2) {
        val = 7;
      } // NE
      else {
        val = 0;
      } // E
    } else if (x1 > x2) {
      if (y1 < y2) {
        val = 3;
      } // SW
      else if (y1 > y2) {
        val = 5;
      } // NW
      else {
        val = 4;
      } // W
    } else {
      if (y1 < y2) {
        val = 2;
      } // S
      else if (y1 > y2) {
        val = 6;
      } // N
      else {
        val = 8;
      } // center, this should not happen
    }
    return val;
  }

  // 4. Batch interpollation
  private batchinternodes(bpaths: Path[][], options: Options) {
    return bpaths.map((p) => this.internodes(p, options));
  }

  // 5. tracepath() : recursively trying to fit straight and quadratic spline segments on the 8 direction internode path
  // 5.1. Find sequences of points with only 2 segment types
  // 5.2. Fit a straight line on the sequence
  // 5.3. If the straight line fails (distance error > ltres), find the point with the biggest error
  // 5.4. Fit a quadratic spline through errorpoint (project this to get controlpoint), then measure errors on every point in the sequence
  // 5.5. If the spline fails (distance error > qtres), find the point with the biggest error, set splitpoint = fitting point
  // 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
  private tracepath(path: Path, ltres: number, qtres: number): TracedSegment {
    let pcnt = 0;
    let segtype1;
    let segtype2;
    let seqend;
    const smp: TracedSegment = {
      segments: [],
      boundingbox: path.boundingbox,
      holechildren: path.holechildren,
      isholepath: path.isholepath,
    };

    while (pcnt < path.points.length) {
      // 5.1. Find sequences of points with only 2 segment types
      segtype1 = path.points[pcnt].linesegment;
      segtype2 = -1;
      seqend = pcnt + 1;
      while (
        (path.points[seqend].linesegment === segtype1 ||
          path.points[seqend].linesegment === segtype2 ||
          segtype2 === -1) &&
        seqend < path.points.length - 1
      ) {
        if (path.points[seqend].linesegment !== segtype1 && segtype2 === -1) {
          segtype2 = path.points[seqend].linesegment;
        }
        seqend++;
      }
      if (seqend === path.points.length - 1) {
        seqend = 0;
      }

      // 5.2. - 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
      smp.segments = smp.segments.concat(this.fitseq(path, ltres, qtres, pcnt, seqend));

      // forward pcnt;
      if (seqend > 0) {
        pcnt = seqend;
      } else {
        pcnt = path.points.length;
      }
    } // End of pcnt loop

    return smp;
  }

  // 5.2. - 5.6. recursively fitting a straight or quadratic line segment on this sequence of path nodes,
  // called from tracepath()
  private fitseq(
    path: Path,
    ltres: number,
    qtres: number,
    seqstart: number,
    seqend: number,
  ): TraceDataLayerItemSegment[] {
    // return if invalid seqend
    if (seqend > path.points.length || seqend < 0) {
      return [];
    }

    // variables
    let errorpoint = seqstart;
    let errorval = 0;
    let curvepass = true;
    let px: number;
    let py: number;
    let dist2: number;

    let tl = seqend - seqstart;
    if (tl < 0) {
      tl += path.points.length;
    }
    const vx = (path.points[seqend].x - path.points[seqstart].x) / tl,
      vy = (path.points[seqend].y - path.points[seqstart].y) / tl;

    // 5.2. Fit a straight line on the sequence
    let pcnt = (seqstart + 1) % path.points.length;
    let pl: number;
    while (pcnt != seqend) {
      pl = pcnt - seqstart;
      if (pl < 0) {
        pl += path.points.length;
      }
      px = path.points[seqstart].x + vx * pl;
      py = path.points[seqstart].y + vy * pl;
      dist2 =
        (path.points[pcnt].x - px) * (path.points[pcnt].x - px) +
        (path.points[pcnt].y - py) * (path.points[pcnt].y - py);
      if (dist2 > ltres) {
        curvepass = false;
      }
      if (dist2 > errorval) {
        errorpoint = pcnt;
        errorval = dist2;
      }
      pcnt = (pcnt + 1) % path.points.length;
    }
    // return straight line if fits
    if (curvepass) {
      return [
        {
          type: 'L',
          x1: path.points[seqstart].x,
          y1: path.points[seqstart].y,
          x2: path.points[seqend].x,
          y2: path.points[seqend].y,
        },
      ];
    }

    // 5.3. If the straight line fails (distance error>ltres), find the point with the biggest error
    const fitpoint = errorpoint;
    curvepass = true;
    errorval = 0;

    // 5.4. Fit a quadratic spline through this point, measure errors on every point in the sequence
    // helpers and projecting to get control point
    let t = (fitpoint - seqstart) / tl,
      t1 = (1 - t) * (1 - t),
      t2 = 2 * (1 - t) * t,
      t3 = t * t;
    const cpx = (t1 * path.points[seqstart].x + t3 * path.points[seqend].x - path.points[fitpoint].x) / -t2,
      cpy = (t1 * path.points[seqstart].y + t3 * path.points[seqend].y - path.points[fitpoint].y) / -t2;

    // Check every point
    pcnt = seqstart + 1;
    while (pcnt != seqend) {
      t = (pcnt - seqstart) / tl;
      t1 = (1 - t) * (1 - t);
      t2 = 2 * (1 - t) * t;
      t3 = t * t;
      px = t1 * path.points[seqstart].x + t2 * cpx + t3 * path.points[seqend].x;
      py = t1 * path.points[seqstart].y + t2 * cpy + t3 * path.points[seqend].y;

      dist2 =
        (path.points[pcnt].x - px) * (path.points[pcnt].x - px) +
        (path.points[pcnt].y - py) * (path.points[pcnt].y - py);

      if (dist2 > qtres) {
        curvepass = false;
      }
      if (dist2 > errorval) {
        errorpoint = pcnt;
        errorval = dist2;
      }
      pcnt = (pcnt + 1) % path.points.length;
    }
    // return spline if fits
    if (curvepass) {
      return [
        {
          type: 'Q',
          x1: path.points[seqstart].x,
          y1: path.points[seqstart].y,
          x2: cpx,
          y2: cpy,
          x3: path.points[seqend].x,
          y3: path.points[seqend].y,
        },
      ];
    }
    // 5.5. If the spline fails (distance error>qtres), find the point with the biggest error
    const splitpoint = fitpoint; // Earlier: Math.floor((fitpoint + errorpoint)/2);

    // 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
    return this.fitseq(path, ltres, qtres, seqstart, splitpoint).concat(
      this.fitseq(path, ltres, qtres, splitpoint, seqend),
    );
  }

  // 5. Batch tracing paths
  private batchtracepaths(internodepaths: Path[], ltres: number, qtres: number): TracedSegment[] {
    return internodepaths.map((i) => this.tracepath(i, ltres, qtres));
  }

  // 5. Batch tracing layers
  private batchtracelayers(binternodes: Path[][], ltres: number, qtres: number): TracedSegment[][] {
    return binternodes.map((b) => this.batchtracepaths(b, ltres, qtres));
  }

  // Rounding to given decimals https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
  private roundtodec(val: number, places?: number): number {
    return +val.toFixed(places);
  }

  // Getting SVG path element string from a traced path
  svgpathstring(tracedata: TraceData, lnum: number, pathnum: number, options: Options): SVGString {
    const layer = tracedata.layers[lnum];
    const smp = layer[pathnum];
    const str: string[] = [];

    // Line filter
    if (options.linefilter && smp.segments.length < 3) {
      return str.join('') as SVGString;
    }

    // Starting path element, desc contains layer and path number
    str.push(
      `<path ${options.desc ? `desc="l ${lnum} p ${pathnum}" ` : ''} ${this.tosvgcolorstr(
        tracedata.palette[lnum],
        options,
      )}d="`,
    );

    // Creating non-hole path string
    if (options.roundcoords === -1) {
      str.push(spacify('M', smp.segments[0].x1 * options.scale, smp.segments[0].y1 * options.scale));
      for (let pcnt = 0; pcnt < smp.segments.length; pcnt++) {
        const pnt = smp.segments[pcnt];
        str.push(spacify(pnt.type, pnt.x2 * options.scale, pnt.y2 * options.scale));
        if (pnt.x3 != null) {
          str.push(spacify(pnt.x3 * options.scale, pnt.y3 * options.scale));
        }
      }
      str.push(spacify('Z'));
    } else {
      str.push(
        spacify(
          'M',
          this.roundtodec(smp.segments[0].x1 * options.scale, options.roundcoords),
          this.roundtodec(smp.segments[0].y1 * options.scale, options.roundcoords),
        ),
      );
      for (let pcnt = 0; pcnt < smp.segments.length; pcnt++) {
        const pnt = smp.segments[pcnt];
        str.push(
          spacify(
            pnt.type,
            this.roundtodec(pnt.x2 * options.scale, options.roundcoords),
            this.roundtodec(pnt.y2 * options.scale, options.roundcoords),
          ),
        );
        if (pnt.x3 != null) {
          str.push(
            spacify(
              this.roundtodec(pnt.x3 * options.scale, options.roundcoords),
              this.roundtodec(pnt.y3 * options.scale, options.roundcoords),
            ),
          );
        }
      }
      str.push(spacify('Z'));
    } // End of creating non-hole path string

    // Hole children
    for (let hcnt = 0; hcnt < smp.holechildren.length; hcnt++) {
      const hsmp = layer[smp.holechildren[hcnt]];
      const prev = hsmp.segments[hsmp.segments.length - 1];
      // Creating hole path string
      if (options.roundcoords === -1) {
        if (prev.x3 != null) {
          str.push(spacify('M', prev.x3 * options.scale, prev.y3 * options.scale));
        } else {
          str.push(spacify('M', prev.x2 * options.scale, prev.y2 * options.scale));
        }

        for (let pcnt = hsmp.segments.length - 1; pcnt >= 0; pcnt--) {
          str.push(spacify(hsmp.segments[pcnt].type));
          if (hsmp.segments[pcnt].x3 != null) {
            str.push(spacify(hsmp.segments[pcnt].x2 * options.scale, hsmp.segments[pcnt].y2 * options.scale));
          }

          str.push(spacify(hsmp.segments[pcnt].x1 * options.scale, hsmp.segments[pcnt].y1 * options.scale));
        }
      } else {
        if (prev.x3 != null) {
          str.push(spacify('M', this.roundtodec(prev.x3 * options.scale), this.roundtodec(prev.y3 * options.scale)));
        } else {
          str.push(spacify('M', this.roundtodec(prev.x2 * options.scale), this.roundtodec(prev.y2 * options.scale)));
        }

        for (let pcnt = hsmp.segments.length - 1; pcnt >= 0; pcnt--) {
          const pnt = hsmp.segments[pcnt];
          str.push(spacify(pnt.type));
          if (pnt.x3 != null) {
            str.push(spacify(this.roundtodec(pnt.x2 * options.scale), this.roundtodec(pnt.y2 * options.scale)));
          }
          str.push(spacify(this.roundtodec(pnt.x1 * options.scale), this.roundtodec(pnt.y1 * options.scale)));
        }
      } // End of creating hole path string

      str.push(spacify('Z')); // Close path
    } // End of holepath check

    // Closing path element
    str.push('" />');

    // Rendering control points
    if (options.lcpr || options.qcpr) {
      for (let pcnt = 0; pcnt < smp.segments.length; pcnt++) {
        const pnt = smp.segments[pcnt];
        if (pnt.x3 != null && options.qcpr) {
          str.push(
            `<circle cx="${pnt.x2 * options.scale}" cy="${pnt.y2 * options.scale}" r="${
              options.qcpr
            }" fill="cyan" stroke-width="${options.qcpr * 0.2}" stroke="black" />`,
            `<circle cx="${pnt.x3 * options.scale}" cy="${pnt.y3 * options.scale}" r="${
              options.qcpr
            }" fill="white" stroke-width="${options.qcpr * 0.2}" stroke="black" />`,
            `<line x1="${pnt.x1 * options.scale}" y1="${pnt.y1 * options.scale}" x2="${pnt.x2 * options.scale}" y2="${
              pnt.y2 * options.scale
            }" stroke-width="${options.qcpr * 0.2}" stroke="cyan" />`,
            `<line x1="${pnt.x2 * options.scale}" y1="${pnt.y2 * options.scale}" x2="${pnt.x3 * options.scale}" y2="${
              pnt.y3 * options.scale
            }" stroke-width="${options.qcpr * 0.2}" stroke="cyan" />`,
          );
        }
        if (pnt.x3 == null && options.lcpr) {
          str.push(
            `<circle cx="${pnt.x2 * options.scale}" cy="${pnt.y2 * options.scale}" r="${
              options.lcpr
            }" fill="white" stroke-width="${options.lcpr * 0.2}" stroke="black" />`,
          );
        }
      }

      // Hole children control points
      for (let hcnt = 0; hcnt < smp.holechildren.length; hcnt++) {
        const hsmp = layer[smp.holechildren[hcnt]];
        for (let pcnt = 0; pcnt < hsmp.segments.length; pcnt++) {
          const pnt = hsmp.segments[pcnt];
          if (pnt.x3 != null && options.qcpr) {
            str.push(
              `<circle cx="${pnt.x2 * options.scale}" cy="${pnt.y2 * options.scale}" r="${
                options.qcpr
              }" fill="cyan" stroke-width="${options.qcpr * 0.2}" stroke="black" />`,
              `<circle cx="${pnt.x3 * options.scale}" cy="${pnt.y3 * options.scale}" r="${
                options.qcpr
              }" fill="white" stroke-width="${options.qcpr * 0.2}" stroke="black" />`,
              `<line x1="${pnt.x1 * options.scale}" y1="${pnt.y1 * options.scale}" x2="${pnt.x2 * options.scale}" y2="${
                pnt.y2 * options.scale
              }" stroke-width="${options.qcpr * 0.2}" stroke="cyan" />`,
              `<line x1="${pnt.x2 * options.scale}" y1="${pnt.y2 * options.scale}" x2="${pnt.x3 * options.scale}" y2="${
                pnt.y3 * options.scale
              }" stroke-width="${options.qcpr * 0.2}" stroke="cyan" />`,
            );
          }
          if (pnt.x3 == null && options.lcpr) {
            str.push(
              `<circle cx="${pnt.x2 * options.scale}" cy="${pnt.y2 * options.scale}" r="${
                options.lcpr
              }" fill="white" stroke-width="${options.lcpr * 0.2}" stroke="black" />`,
            );
          }
        }
      }
    } // End of Rendering control points

    return str.join('') as SVGString;
  }

  // Converting tracedata to an SVG string
  getsvgstring(tracedata: TraceData, options: Options): SVGString {
    options = this.checkoptions(options);

    const w = tracedata.width * options.scale;
    const h = tracedata.height * options.scale;

    // SVG start
    const svgstr: string[] = [
      `<svg ${
        options.viewbox ? `viewBox="0 0 ${w} ${h}"` : `width="${w}" height="${h}"`
      } version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with imagetracer.js version ${
        this.versionnumber
      }">`,
    ];

    // Drawing: Layers and Paths loops
    for (let lcnt = 0; lcnt < tracedata.layers.length; lcnt++) {
      for (let pcnt = 0; pcnt < tracedata.layers[lcnt].length; pcnt++) {
        // Adding SVG <path> string
        if (!tracedata.layers[lcnt][pcnt].isholepath) {
          svgstr.push(this.svgpathstring(tracedata, lcnt, pcnt, options));
        }
      } // End of paths loop
    } // End of layers loop

    // SVG End
    svgstr.push('</svg>');

    return svgstr.join('') as SVGString;
  }

  // Comparator for numeric Array.sort
  compareNumbers(a: number, b: number): number {
    return a - b;
  }

  // Convert color object to rgba string
  torgbastr(c: PaletteColor): string {
    return `rgba(${c.r}, ${c.g}, ${c.b}, #{c.a})`;
  }

  // Convert color object to SVG color string
  tosvgcolorstr(c: PaletteColor, options: Options): SVGString {
    return `fill="rgb(${c.r}, ${c.g}, ${c.b})" stroke="rgb(${c.r}, ${c.g}, ${c.b})" stroke-width="${
      options.strokewidth
    }" opacity="${c.a / 255.0}" ` as SVGString;
  }

  // Helper function: Appending an <svg> element to a container from an svgstring
  appendSVGString(svgstr: SVGString, parentid?: string) {
    let div;
    if (parentid != null) {
      div = document.getElementById(parentid);
      if (!div) {
        div = document.createElement('div');
        div.id = parentid;
        document.body.appendChild(div);
      }
    } else {
      div = document.createElement('div');
      document.body.appendChild(div);
    }
    div.innerHTML += svgstr;
  }

  ////////////////////////////////////////////////////////////
  //
  //  Canvas functions
  //
  ////////////////////////////////////////////////////////////

  // Gaussian kernels for blur
  gks = [
    [0.27901, 0.44198, 0.27901],
    [0.135336, 0.228569, 0.272192, 0.228569, 0.135336],
    [0.086776, 0.136394, 0.178908, 0.195843, 0.178908, 0.136394, 0.086776],
    [0.063327, 0.093095, 0.122589, 0.144599, 0.152781, 0.144599, 0.122589, 0.093095, 0.063327],
    [0.049692, 0.069304, 0.089767, 0.107988, 0.120651, 0.125194, 0.120651, 0.107988, 0.089767, 0.069304, 0.049692],
  ];

  // Selective Gaussian blur for preprocessing
  blur(imgd: ImageData, radius: number, delta: number) {
    let i, j, k, d, idx, racc, gacc, bacc, aacc, wacc;

    // new ImageData
    const imgd2: ImageData = { width: imgd.width, height: imgd.height, data: new Uint8ClampedArray() };

    // radius and delta limits, this kernel
    radius = Math.floor(radius);
    if (radius < 1) {
      return imgd;
    }
    if (radius > 5) {
      radius = 5;
    }
    delta = Math.abs(delta);
    if (delta > 1024) {
      delta = 1024;
    }
    const thisgk = this.gks[radius - 1];

    // loop through all pixels, horizontal blur
    for (j = 0; j < imgd.height; j++) {
      for (i = 0; i < imgd.width; i++) {
        racc = 0;
        gacc = 0;
        bacc = 0;
        aacc = 0;
        wacc = 0;
        // gauss kernel loop
        for (k = -radius; k < radius + 1; k++) {
          // add weighted color values
          if (i + k > 0 && i + k < imgd.width) {
            idx = (j * imgd.width + i + k) * 4;
            racc += imgd.data[idx] * thisgk[k + radius];
            gacc += imgd.data[idx + 1] * thisgk[k + radius];
            bacc += imgd.data[idx + 2] * thisgk[k + radius];
            aacc += imgd.data[idx + 3] * thisgk[k + radius];
            wacc += thisgk[k + radius];
          }
        }
        // The new pixel
        idx = (j * imgd.width + i) * 4;
        imgd2.data[idx] = Math.floor(racc / wacc);
        imgd2.data[idx + 1] = Math.floor(gacc / wacc);
        imgd2.data[idx + 2] = Math.floor(bacc / wacc);
        imgd2.data[idx + 3] = Math.floor(aacc / wacc);
      } // End of width loop
    } // End of horizontal blur

    // copying the half blurred imgd2
    const himgd = new Uint8ClampedArray(imgd2.data);

    // loop through all pixels, vertical blur
    for (j = 0; j < imgd.height; j++) {
      for (i = 0; i < imgd.width; i++) {
        racc = 0;
        gacc = 0;
        bacc = 0;
        aacc = 0;
        wacc = 0;
        // gauss kernel loop
        for (k = -radius; k < radius + 1; k++) {
          // add weighted color values
          if (j + k > 0 && j + k < imgd.height) {
            idx = ((j + k) * imgd.width + i) * 4;
            racc += himgd[idx] * thisgk[k + radius];
            gacc += himgd[idx + 1] * thisgk[k + radius];
            bacc += himgd[idx + 2] * thisgk[k + radius];
            aacc += himgd[idx + 3] * thisgk[k + radius];
            wacc += thisgk[k + radius];
          }
        }
        // The new pixel
        idx = (j * imgd.width + i) * 4;
        imgd2.data[idx] = Math.floor(racc / wacc);
        imgd2.data[idx + 1] = Math.floor(gacc / wacc);
        imgd2.data[idx + 2] = Math.floor(bacc / wacc);
        imgd2.data[idx + 3] = Math.floor(aacc / wacc);
      } // End of width loop
    } // End of vertical blur

    // Selective blur: loop through all pixels
    for (j = 0; j < imgd.height; j++) {
      for (i = 0; i < imgd.width; i++) {
        idx = (j * imgd.width + i) * 4;
        // d is the difference between the blurred and the original pixel
        d =
          Math.abs(imgd2.data[idx] - imgd.data[idx]) +
          Math.abs(imgd2.data[idx + 1] - imgd.data[idx + 1]) +
          Math.abs(imgd2.data[idx + 2] - imgd.data[idx + 2]) +
          Math.abs(imgd2.data[idx + 3] - imgd.data[idx + 3]);
        // selective blur: if d>delta, put the original pixel back
        if (d > delta) {
          imgd2.data[idx] = imgd.data[idx];
          imgd2.data[idx + 1] = imgd.data[idx + 1];
          imgd2.data[idx + 2] = imgd.data[idx + 2];
          imgd2.data[idx + 3] = imgd.data[idx + 3];
        }
      }
    } // End of Selective blur

    return imgd2;
  }

  // Helper function: loading an image from a URL, then executing callback with canvas as argument
  loadImage(url: string, callback: CanvasCallback, options: Options) {
    const img = new Image();
    if (options && options.corsenabled) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      if (context == null) {
        throw new Error('Cannot initialize 2d context');
      }
      context.drawImage(img, 0, 0);
      callback(canvas);
    };
    img.src = url;
  }

  // Helper function: getting ImageData from a canvas
  getImgdata(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (context == null) {
      throw new Error('Cannot initialize 2d context');
    }
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }

  // Special palette to use with drawlayers()
  specpalette: Palette = [
    { r: 0, g: 0, b: 0, a: 255 },
    { r: 128, g: 128, b: 128, a: 255 },
    { r: 0, g: 0, b: 128, a: 255 },
    { r: 64, g: 64, b: 128, a: 255 },
    { r: 192, g: 192, b: 192, a: 255 },
    { r: 255, g: 255, b: 255, a: 255 },
    { r: 128, g: 128, b: 192, a: 255 },
    { r: 0, g: 0, b: 192, a: 255 },
    { r: 128, g: 0, b: 0, a: 255 },
    { r: 128, g: 64, b: 64, a: 255 },
    { r: 128, g: 0, b: 128, a: 255 },
    { r: 168, g: 168, b: 168, a: 255 },
    { r: 192, g: 128, b: 128, a: 255 },
    { r: 192, g: 0, b: 0, a: 255 },
    { r: 255, g: 255, b: 255, a: 255 },
    { r: 0, g: 128, b: 0, a: 255 },
  ];

  // Helper function: Drawing all edge node layers into a container
  drawLayers(layers: number[][][], palette: Palette, scale: number, parentid?: string) {
    scale = scale || 1;

    // Preparing container
    let div: HTMLDivElement;
    if (parentid) {
      div =
        (document.getElementById(parentid) as HTMLDivElement) ??
        (() => {
          div = document.createElement('div');
          div.id = parentid;
          document.body.appendChild(div);
          return div;
        })();
    } else {
      div = document.createElement('div');
      document.body.appendChild(div);
    }

    // Layers loop
    Object.keys(layers).forEach((k) => {
      // width, height
      const layer = layers[+k];
      const w = layer[0].length;
      const h = layer.length;

      // Creating new canvas for every layer
      const canvas = document.createElement('canvas');
      canvas.width = w * scale;
      canvas.height = h * scale;
      const context = canvas.getContext('2d');
      if (context == null) {
        throw new Error('Cannot initialize 2d context');
      }

      // Drawing
      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          context.fillStyle = this.torgbastr(palette[layer[j][i] % palette.length]);
          context.fillRect(i * scale, j * scale, scale, scale);
        }
      }

      // Appending canvas to container
      div.appendChild(canvas);
    });
  }
}

const spacify = (...strings: (string | number)[]): SVGString => strings.map((v) => `${v} `).join('') as SVGString;
