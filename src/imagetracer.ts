/* eslint-disable @typescript-eslint/camelcase */
import ImageTracer, {
  BlurRadius,
  ColorComponentValue,
  ColorSampling,
  DEFAULT_OPTIONS,
  ImageData,
  Layering,
  Options,
  Palette,
  PaletteColor,
  PointRadius,
  SVGString,
} from 'imagetracer_v1.2.6';
import { UnreachableError } from 'utils';

export type HumanReadableInputOptions = Partial<{
  tracing: Partial<HumanReadableOptions['tracing']>;
  colorQuantization: Partial<HumanReadableOptions['colorQuantization']>;
  layering: HumanReadableOptions['layering'];
  svgRendering: Partial<HumanReadableOptions['svg']>;
  blurPreprocessing: Partial<HumanReadableOptions['blur']>;
  debug: Partial<HumanReadableOptions['debug']>;
  palette: HumanReadableOptions['palette'];
}>;

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

export const RGBA = (
  r: ColorComponentValue,
  g: ColorComponentValue,
  b: ColorComponentValue,
  a: ColorComponentValue,
): PaletteColor => ({ r, g, b, a });

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

export const imageDataToSVGAsync = async (imageData: ImageData, options?: Options): Promise<SVGString> =>
  new ImageTracer().imagedataToSVG(imageData, options);
