/* eslint-disable @typescript-eslint/camelcase */
import { UnreachableError } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import imageTracer from './imagetracer_v1.2.6';

export type SVGString = string & { __svgString: never };
export const isSVGString = (value: unknown): value is SVGString => typeof value === 'string' && value.includes('svg');

export type ResultCallback = (svgString: SVGString) => void;
export type CanvasCallback = (canvas: HTMLCanvasElement) => void;
export type TraceData = {
  layers: TraceDataLayer;
};
export type TraceDataLayer = TraceDataLayerItem[];
export type TraceDataLayerItem = {
  segments: TraceDataLayerItemSegment[];
};
export type TraceDataLayerItemSegment = {
  type: TraceDataLayerItemSegmentType;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3?: number;
  y3?: number;
};
export type TraceDataLayerItemSegmentType = 'L';
export type ImageData = {
  data: Uint8ClampedArray;
  height: number;
  width: number;
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
export type HumanReadableOptions = Readonly<{
  tracing: Readonly<{
    enableCORS: boolean;
    straightLinesThreshold: number;
    quadraticSplinesErrorThreshold: number;
    nodePathLenghtDiscardThreshold: number;
    enableEnhancingRightAngleCorners: boolean;
  }>;
  colorQuantization: Readonly<{
    samplingAlhorithm: ColorSampling;
    numberOfColors: number;
    minColorRatio: number;
    numberOfCycles: number;
  }>;
  layering: Layering;
  svg: Readonly<{
    strokeWidth: number;
    enableLineFilter: boolean;
    scale: number;
    roundCoordinatesDecimalPlace: number;
    enableViewbox: boolean;
    enableDescriptions: boolean;
  }>;
  blur: Readonly<{
    radius: BlurRadius;
    delta: number;
  }>;
  debug: Readonly<{
    layerContainerID: string | undefined;
    straightLineControlPointRadius: PointRadius;
    quadraticSplineControlPointerRadius: PointRadius;
  }>;
  palette: Palette | undefined;
}>;
export type HumanReadableInputOptions = Partial<{
  tracing: Partial<HumanReadableOptions['tracing']>;
  colorQuantization: Partial<HumanReadableOptions['colorQuantization']>;
  layering: HumanReadableOptions['layering'];
  svgRendering: Partial<HumanReadableOptions['svg']>;
  blurPreprocessing: Partial<HumanReadableOptions['blur']>;
  debug: Partial<HumanReadableOptions['debug']>;
  palette: HumanReadableOptions['palette'];
}>;
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

export const RGBA = (
  r: ColorComponentValue,
  g: ColorComponentValue,
  b: ColorComponentValue,
  a: ColorComponentValue,
): PaletteColor => ({ r, g, b, a });

export type ColorSampling = 'disabled' | 'random' | 'deterministic';
export type Layering = 'sequential' | 'parallel';
export type BlurRadius = 1 | 2 | 3 | 4 | 5 | 'disabled';
export type PointRadius = number | 'disabled';

const DEFAULT_OPTIONS: Options = {
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
  viewbox: false,
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

export class OptionsBuilder {
  private options: Options;

  static create() {
    return new OptionsBuilder();
  }

  static fromOptions(options: Options): OptionsBuilder {
    return new OptionsBuilder({
      ...DEFAULT_OPTIONS,
      ...options,
    });
  }

  static fromHumanReadableOptions(options: HumanReadableInputOptions): OptionsBuilder {
    const optionsBuilder = OptionsBuilder.create();
    const { tracing, colorQuantization, layering, svgRendering, blurPreprocessing, debug, palette } = options;

    if (tracing != null) {
      const {
        enableCORS,
        straightLinesThreshold,
        quadraticSplinesErrorThreshold,
        nodePathLenghtDiscardThreshold,
        enableEnhancingRightAngleCorners,
      } = tracing;

      enableCORS != null && optionsBuilder.tracingEnableCORS(enableCORS);
      straightLinesThreshold != null && optionsBuilder.tracingStraightLinesErrorThreshold(straightLinesThreshold);
      quadraticSplinesErrorThreshold != null &&
        optionsBuilder.tracingQuadraticSplinesErrorThreshold(quadraticSplinesErrorThreshold);
      nodePathLenghtDiscardThreshold != null &&
        optionsBuilder.tracingNodePathLenghtDiscardThreshold(nodePathLenghtDiscardThreshold);
      enableEnhancingRightAngleCorners != null &&
        optionsBuilder.tracingEnhancingEnableRightAngleCorners(enableEnhancingRightAngleCorners);
    }

    if (colorQuantization != null) {
      const {
        samplingAlhorithm: colorSampling,
        numberOfColors,
        minColorRatio,
        numberOfCycles: colorQuantCycles,
      } = colorQuantization;

      colorSampling != null && optionsBuilder.colorQuantizationColorSampling(colorSampling);
      numberOfColors != null && optionsBuilder.colorQuantizationNumberOfColors(numberOfColors);
      minColorRatio != null && optionsBuilder.colorQuantizationMinColorRatio(minColorRatio);
      colorQuantCycles != null && optionsBuilder.colorQuantizationColorQuantCycles(colorQuantCycles);
    }

    layering != null && optionsBuilder.layering(layering);

    if (svgRendering != null) {
      const {
        strokeWidth,
        enableLineFilter,
        scale,
        roundCoordinatesDecimalPlace,
        enableViewbox,
        enableDescriptions,
      } = svgRendering;

      strokeWidth != null && optionsBuilder.svgRenderingStrokeWidth(strokeWidth);
      enableLineFilter != null && optionsBuilder.svgRenderingEnableLineFilter(enableLineFilter);
      scale != null && optionsBuilder.svgRenderingScale(scale);
      roundCoordinatesDecimalPlace != null &&
        optionsBuilder.svgRenderingRoundCoordinatesDecimalPlace(roundCoordinatesDecimalPlace);
      enableViewbox != null && optionsBuilder.svgRenderingEnableViewbox(enableViewbox);
      enableDescriptions != null && optionsBuilder.svgRenderingEnableDescriptions(enableDescriptions);
    }

    if (blurPreprocessing != null) {
      const { radius: blurRadius, delta: blurDelta } = blurPreprocessing;

      blurRadius != null && optionsBuilder.blurPreprocessingBlurRadius(blurRadius);
      blurDelta != null && optionsBuilder.blurPreprocessingBlurDelta(blurDelta);
    }

    if (debug != null) {
      const { layerContainerID, straightLineControlPointRadius, quadraticSplineControlPointerRadius } = debug;

      layerContainerID != null && optionsBuilder.debugLayerContainerID(layerContainerID);
      straightLineControlPointRadius != null &&
        optionsBuilder.debugStraghtLineControlPointRadius(straightLineControlPointRadius);
      quadraticSplineControlPointerRadius != null &&
        optionsBuilder.debugQuadraticSplineControlPointerRadius(quadraticSplineControlPointerRadius);
    }

    palette != null && optionsBuilder.palette(palette);

    return optionsBuilder;
  }

  static fromOptionsBuilder(optionsBuilder: OptionsBuilder): OptionsBuilder {
    return optionsBuilder.copy();
  }

  /**
   * Creates new Options Builder, optionally from existing options
   */
  constructor(options: Partial<Options> = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  /**
   * Enable or disable CORS Image loading.
   *
   * @default false
   */
  tracingEnableCORS(enableCORS: boolean): this {
    this.options.corsenabled = enableCORS;

    return this;
  }

  /**
   * Sets error treshold for straight lines.
   *
   * @default 1
   */
  tracingStraightLinesErrorThreshold(straightLinesThreshold: number): this {
    this.options.ltres = straightLinesThreshold;

    return this;
  }

  /**
   * Sets error treshold for quadratic splines.
   *
   * @default 1
   */
  tracingQuadraticSplinesErrorThreshold(quadraticSplinesErrorThreshold: number): this {
    this.options.qtres = quadraticSplinesErrorThreshold;

    return this;
  }

  /**
   * Sets a minimal edge node paths length. Edge node paths shorter than this will be discarded for noise reduction.
   *
   * @default 8
   */
  tracingNodePathLenghtDiscardThreshold(nodePathLenghtDiscardThreshold: number): this {
    this.options.pathomit = nodePathLenghtDiscardThreshold;

    return this;
  }

  /**
   * Enable or disable enhance right angle corners.
   *
   * @default true
   */
  tracingEnhancingEnableRightAngleCorners(enableEnhancingRightAngleCorners: boolean): this {
    this.options.rightangleenhance = enableEnhancingRightAngleCorners;

    return this;
  }

  /**
   * Sets a color sampling alhorithm.
   *
   * @default 'deterministic'
   */
  colorQuantizationColorSampling(colorSampling: ColorSampling): this {
    this.options.colorsampling = (() => {
      switch (colorSampling) {
        case 'disabled':
          return 0;
        case 'random':
          return 1;
        case 'deterministic':
          return 2;
        default:
          throw new UnreachableError(colorSampling);
      }
    })();

    return this;
  }

  /**
   * Number of colors to use on palette if the palette configuration is not defined.
   *
   * @default 16
   */
  colorQuantizationNumberOfColors(numberOfColors: number): this {
    this.options.numberofcolors = numberOfColors;

    return this;
  }

  /**
   * Color quantization will randomize a color if fewer pixels than (total pixels*mincolorratio) has it.
   *
   * @default 0
   */
  colorQuantizationMinColorRatio(minColorRatio: number): this {
    this.options.mincolorratio = minColorRatio;

    return this;
  }

  /**
   * Color quantization will be repeated this many times.
   *
   * @default 3
   */
  colorQuantizationColorQuantCycles(colorQuantCycles: number): this {
    this.options.colorquantcycles = colorQuantCycles;

    return this;
  }

  /**
   * Sets the layering parallelization.
   *
   * @default 'sequential'
   */
  layering(layering: Layering): this {
    this.options.layering = layering === 'sequential' ? 0 : 1;

    return this;
  }

  /**
   * Sets the output SVG stroke-width.
   *
   * @default 1
   */
  svgRenderingStrokeWidth(strokeWidth: number): this {
    this.options.strokewidth = strokeWidth;

    return this;
  }

  /**
   * Enables or disables line filter for noise reduction.
   *
   * @default false
   */
  svgRenderingEnableLineFilter(enableLineFilter: boolean): this {
    this.options.linefilter = enableLineFilter;

    return this;
  }

  /**
   * Every coordinate will be multiplied with this, to scale the SVG.
   *
   * @default 1
   */
  svgRenderingScale(scale: number): this {
    this.options.scale = scale;

    return this;
  }

  /**
   * Rounds coordinates to a given decimal place.
   *
   * @default 1
   * @example 1 means rounded to 1 decimal place like 7.3 ; 3 means rounded to 3 places, like 7.356.
   */
  svgRenderingRoundCoordinatesDecimalPlace(roundCoordinatesDecimalPlace: number): this {
    this.options.roundcoords = roundCoordinatesDecimalPlace;

    return this;
  }

  /**
   * Enables or disables SVG viewBox.
   *
   * @default false
   */
  svgRenderingEnableViewbox(enableViewbox: boolean): this {
    this.options.viewbox = enableViewbox;

    return this;
  }

  /**
   * Enables or disables SVG descriptions.
   *
   * @default false
   */
  svgRenderingEnableDescriptions(enableDescriptions: boolean): this {
    this.options.viewbox = enableDescriptions;

    return this;
  }

  /**
   * Sets a selective Gaussian blur preprocessing level, from 1 to 5.
   *
   * @default 'disabled'
   */
  blurPreprocessingBlurRadius(blurRadius: BlurRadius): this {
    this.options.blurradius = blurRadius === 'disabled' ? 0 : blurRadius;

    return this;
  }

  /**
   * Sets the RGBA delta treshold for selective Gaussian blur preprocessing.
   *
   * @default 20
   */
  blurPreprocessingBlurDelta(blurDelta: number): this {
    this.options.blurdelta = blurDelta;

    return this;
  }

  /**
   * Sets a container div ID, for visualizing edge node layers.
   *
   * @default undefined
   */
  debugLayerContainerID(layerContainerID: string | undefined): this {
    this.options.layercontainerid = layerContainerID;

    return this;
  }

  /**
   * Sets a straight line control point radius, if this is greater than zero, small circles will be drawn in the SVG.
   * Do not use this for big/complex images.
   *
   * @default 'disabled'
   */
  debugStraghtLineControlPointRadius(straightLineControlPointRadius: PointRadius): this {
    this.options.lcpr = straightLineControlPointRadius === 'disabled' ? 0 : straightLineControlPointRadius;

    return this;
  }

  /**
   * Quadratic spline control point radius, if this is greater than zero, small circles and lines will be drawn in the SVG.
   * Do not use this for big/complex images.
   *
   * @default 'disabled'
   */
  debugQuadraticSplineControlPointerRadius(quadraticSplineControlPointerRadius: PointRadius): this {
    this.options.qcpr = quadraticSplineControlPointerRadius === 'disabled' ? 0 : quadraticSplineControlPointerRadius;

    return this;
  }

  /**
   * Ses the initial palette.
   *
   * @default undefined
   */
  palette(palette: Palette | undefined): this {
    this.options.pal = palette;

    return this;
  }

  /**
   * Bulk updates the options.
   */
  update(options: Partial<Options> = {}): this {
    this.options = {
      ...this.build(),
      ...options,
    };

    return this;
  }

  /**
   * Resets the options to defaults.
   */
  reset(): this {
    this.options = { ...DEFAULT_OPTIONS };

    return this;
  }

  /**
   * Produces a deep copy of the current OptionsBuilder.
   */
  copy(): OptionsBuilder {
    return OptionsBuilder.fromOptions(this.build());
  }

  buildHumanReadable(): HumanReadableOptions {
    return {
      tracing: {
        enableCORS: this.options.corsenabled,
        straightLinesThreshold: this.options.ltres,
        quadraticSplinesErrorThreshold: this.options.qtres,
        nodePathLenghtDiscardThreshold: this.options.pathomit,
        enableEnhancingRightAngleCorners: this.options.rightangleenhance,
      },
      colorQuantization: {
        samplingAlhorithm: (() => {
          switch (this.options.colorsampling) {
            case 0:
              return 'disabled';
            case 1:
              return 'random';
            case 2:
              return 'deterministic';
            default:
              throw new UnreachableError(this.options.colorsampling);
          }
        })(),
        numberOfColors: this.options.numberofcolors,
        minColorRatio: this.options.mincolorratio,
        numberOfCycles: this.options.colorquantcycles,
      },
      layering: this.options.layering === 0 ? 'sequential' : 'parallel',
      svg: {
        strokeWidth: this.options.strokewidth,
        enableLineFilter: this.options.linefilter,
        scale: this.options.scale,
        roundCoordinatesDecimalPlace: this.options.roundcoords,
        enableViewbox: this.options.viewbox,
        enableDescriptions: this.options.desc,
      },
      blur: {
        radius: this.options.blurradius === 0 ? 'disabled' : this.options.blurradius,
        delta: this.options.blurdelta,
      },
      debug: {
        layerContainerID: this.options.layercontainerid,
        straightLineControlPointRadius: this.options.lcpr === 0 ? 'disabled' : this.options.lcpr,
        quadraticSplineControlPointerRadius: this.options.qcpr === 0 ? 'disabled' : this.options.qcpr,
      },
      palette: this.options.pal,
    };
  }

  /**
   * Returns the options.
   */
  build(): Options {
    return {
      ...DEFAULT_OPTIONS,
      ...this.options,
    };
  }
}

export const imageToSVG = imageTracer.imageToSVG as (
  imageURL: string,
  callback: ResultCallback,
  options?: Options,
) => void;

export const imageToSVGAsync = async (imageURL: string, options?: Options): Promise<SVGString> =>
  new Promise((resolve, reject) => {
    try {
      imageToSVG(
        imageURL,
        (svgString) => {
          resolve(svgString);
        },
        options,
      );
    } catch (e) {
      reject(e);
    }
  });

export const imagedataToSVG = imageTracer.imagedataToSVG as (imageData: ImageData, options?: Options) => SVGString;

export const imageToTracedata = imageTracer.imageToTracedata as (
  imageURL: string,
  callback: ResultCallback,
  options?: Options,
) => void;

export const imagedataToTracedata = imageTracer.imagedataToTracedata as (
  imageData: ImageData,
  options?: Options,
) => TraceData;

export const appendSVGString = imageTracer.appendSVGString as (svgString: SVGString, parentID: string) => void;

export const loadImage = imageTracer.loadImage as (imageURL: string, callback: CanvasCallback) => void;

export const getImgdata = imageTracer.getImgdata as (canvas: HTMLCanvasElement) => ImageData;

export const getsvgstring = imageTracer.getsvgstring as (traceData: TraceData, options?: Options) => SVGString;
