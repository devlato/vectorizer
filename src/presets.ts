import { PresetId } from '@canva/editing-extensions-api-typings';
import { HumanReadableInputOptions, RGBA } from './imagetracer';

export type Preset = {
  id: PresetId;
  label: string;
  options: HumanReadableInputOptions;
};

export const presets: Preset[] = [
  // {
  //   // Default
  //   id: 'default',
  //   label: 'Default',
  //   options: OptionsBuilder.create().buildHumanReadable(),
  // },
  {
    // Posterized 1
    id: 'posterized_1' as PresetId,
    label: 'Posterized',
    options: {
      colorQuantization: {
        samplingAlhorithm: 'disabled',
        numberOfColors: 2,
      },
    },
  },
  {
    // Posterized 2
    id: 'posterized_2' as PresetId,
    label: 'More Posterized',
    options: {
      colorQuantization: {
        numberOfColors: 4,
      },
      blurPreprocessing: {
        radius: 5,
      },
    },
  },
  {
    // Curvy
    id: 'curvy' as PresetId,
    label: 'Curvy',
    options: {
      tracing: {
        straightLinesThreshold: 0.01,
        enableEnhancingRightAngleCorners: false,
      },
      svgRendering: {
        enableLineFilter: true,
      },
    },
  },
  {
    // Sharp
    id: 'sharp' as PresetId,
    label: 'Sharp',
    options: {
      tracing: {
        quadraticSplinesErrorThreshold: 0.01,
      },
      svgRendering: {
        enableLineFilter: false,
      },
    },
  },
  {
    // Detailed
    id: 'detailed' as PresetId,
    label: 'Detailed',
    options: {
      tracing: {
        nodePathLenghtDiscardThreshold: 0,
        straightLinesThreshold: 0.5,
        quadraticSplinesErrorThreshold: 0.5,
      },
      colorQuantization: {
        numberOfColors: 64,
      },
      svgRendering: {
        roundCoordinatesDecimalPlace: 2,
      },
    },
  },
  {
    // Smoothed
    id: 'smoothed' as PresetId,
    label: 'Smoothed',
    options: {
      blurPreprocessing: {
        radius: 5,
        delta: 64,
      },
    },
  },
  {
    // Grayscale
    id: 'grayscale' as PresetId,
    label: 'Grayscale',
    options: {
      colorQuantization: {
        samplingAlhorithm: 'disabled',
        numberOfCycles: 1,
        numberOfColors: 7,
      },
    },
  },
  {
    // Fixed Palette
    id: 'fixed_palette' as PresetId,
    label: 'Fixed Palette',
    options: {
      colorQuantization: {
        samplingAlhorithm: 'disabled',
        numberOfCycles: 1,
        numberOfColors: 27,
      },
    },
  },
  {
    // Random 1
    id: 'random_1' as PresetId,
    label: 'Random',
    options: {
      colorQuantization: {
        samplingAlhorithm: 'random',
        numberOfColors: 8,
      },
    },
  },
  {
    // Random 2
    id: 'random_2' as PresetId,
    label: 'More Random',
    options: {
      colorQuantization: {
        samplingAlhorithm: 'random',
        numberOfColors: 64,
      },
    },
  },
  {
    // Artistic 1
    id: 'artistic_1' as PresetId,
    label: 'Artistic',
    options: {
      tracing: {
        straightLinesThreshold: 0.01,
        nodePathLenghtDiscardThreshold: 0,
      },
      colorQuantization: {
        samplingAlhorithm: 'disabled',
        numberOfCycles: 1,
        numberOfColors: 16,
      },
      svgRendering: {
        strokeWidth: 2,
        enableLineFilter: true,
      },
      blurPreprocessing: {
        radius: 5,
        delta: 64,
      },
    },
  },
  {
    // Artistic 2
    id: 'artistic_2' as PresetId,
    label: 'More Artistic',
    options: {
      tracing: {
        quadraticSplinesErrorThreshold: 0.01,
      },
      colorQuantization: {
        samplingAlhorithm: 'disabled',
        numberOfCycles: 1,
        numberOfColors: 4,
      },
      svgRendering: {
        strokeWidth: 0,
      },
    },
  },
  {
    // Artistic 3
    id: 'artistic_3' as PresetId,
    label: 'Fancy',
    options: {
      tracing: {
        straightLinesThreshold: 10,
        quadraticSplinesErrorThreshold: 10,
      },
      colorQuantization: {
        numberOfColors: 8,
      },
    },
  },
  {
    // Artistic 3
    id: 'artistic_3' as PresetId,
    label: 'Majestic',
    options: {
      tracing: {
        straightLinesThreshold: 10,
        quadraticSplinesErrorThreshold: 10,
      },
      colorQuantization: {
        numberOfColors: 64,
      },
      svgRendering: {
        strokeWidth: 2,
      },
      blurPreprocessing: {
        radius: 5,
        delta: 256,
      },
    },
  },
  {
    // Posterized 3
    id: 'posterized_3' as PresetId,
    label: 'Crooked',
    options: {
      tracing: {
        straightLinesThreshold: 1,
        quadraticSplinesErrorThreshold: 1,
        nodePathLenghtDiscardThreshold: 20,
        enableEnhancingRightAngleCorners: true,
      },
      colorQuantization: {
        samplingAlhorithm: 'disabled',
        numberOfColors: 3,
        minColorRatio: 0,
        numberOfCycles: 3,
      },
      svgRendering: {
        strokeWidth: 0,
        enableLineFilter: false,
        roundCoordinatesDecimalPlace: 1,
      },
      blurPreprocessing: {
        radius: 3,
        delta: 20,
      },
      palette: [RGBA(255, 0, 100, 255), RGBA(255, 255, 255, 255)],
    },
  },
];
