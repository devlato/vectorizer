import { PresetId, CanvaImageBlob } from '@canva/editing-extensions-api-typings';
import { imageDataToSVGAsync, OptionsBuilder } from 'imagetracer';
import { presets } from 'presets';
import { checkExists } from 'utils';

// const WEB_WORKER_URL =
//   'https://apps.canva-apps-dev.com/BADa0xBSJXo/UADa06HQcTs/AADzB-VLWPU/2/AADzB-VLWPU_pSOai8/js/5aa4a11a-8254-4027-aecb-4ddf02b5f91b.js';
//
// const webWorker = new Worker(WEB_WORKER_URL);
//
// webWorker.postMessage({ text: 'Test' });

export type State = {
  presetId: PresetId | undefined;
  // options: OptionsBuilder;
};

const getPreset = (presetId: PresetId) => presets.find((p) => p.id === presetId);

const loadImageData = async (url: string, crossOrigin = false): Promise<ImageData> =>
  new Promise((resolve, reject) => {
    try {
      const img = new Image();

      if (crossOrigin) {
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
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      };
      img.src = url;
    } catch (e) {
      reject(e);
    }
  });

const setStyles = () => {
  const styleContainer = document.createElement('style');
  styleContainer.type = 'text/css';
  styleContainer.innerHTML = `
body > div {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}
  
body > div > svg {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
`;
  document.head.appendChild(styleContainer);
};

const createSvgContainer = () => {
  const svgContainer = document.createElement('div');

  document.body.appendChild(svgContainer);

  return svgContainer;
};

const getPresetOptions = (presetId: PresetId | undefined) => {
  const preset =
    presetId != null
      ? checkExists(getPreset(presetId as PresetId), `Preset with id "${presetId}" is not found`)
      : undefined;

  return preset != null
    ? OptionsBuilder.fromHumanReadableOptions(preset.options).build()
    : OptionsBuilder.create().build();
};

const loadCanvaBlob = async (image: CanvaImageBlob): Promise<ImageData> => ({
  data: new Uint8ClampedArray(await image.blob.arrayBuffer()),
  width: image.width,
  height: image.height,
});

const canva = window.canva.init();
const { imageHelpers } = window.canva;
canva.onReady(async ({ fullSizeImage, previewImage, image, presetId }) => {
  setStyles();

  const img = await loadCanvaBlob(checkExists(image, 'image must exist'));
  let fullImg = fullSizeImage?.url != null ? await loadImageData(fullSizeImage.url) : img;
  let previewImg = previewImage?.url != null ? await loadImageData(previewImage?.url) : img;

  const state: State = { presetId };
  const svgContainer = createSvgContainer();

  const preview = async () => {
    canva.toggleSpinner('preview', true);

    if (previewImg != null) {
      svgContainer.innerHTML = await imageDataToSVGAsync(previewImg, getPresetOptions(state.presetId));
    }

    canva.toggleSpinner('preview', false);
  };

  canva.onImageUpdate(async ({ image }) => {
    fullImg = await loadImageData(await imageHelpers.toDataUrl(image));
    previewImg = fullImg;
    await preview();
  });

  canva.onSaveRequest(async () => {
    const fullSizeImage = checkExists(fullImg, 'fullImg must exist');
    const svgString = await imageDataToSVGAsync(previewImg, getPresetOptions(state.presetId));

    return {
      blob: new Blob([svgString], { type: 'image/svg+xml' }),
      width: fullSizeImage.width,
      height: fullSizeImage.height,
      imageType: 'image/svg+xml',
    };
  });

  canva.onPresetSelected(async ({ presetId }) => {
    state.presetId = presetId;
    await preview();
  });

  const renderCustomControls = () => [];

  const renderControls = () => {
    canva.updateControlPanel(renderCustomControls());
  };

  canva.onPresetsRequest(async ({ image }) => {
    const thumbnailImg = await loadCanvaBlob(image);

    const promises = presets.map(async (p) => {
      const svgString = await imageDataToSVGAsync(thumbnailImg, getPresetOptions(state.presetId));

      return {
        id: p.id,
        label: p.label,
        image: {
          blob: new Blob([svgString], { type: 'image/svg+xml' }),
          width: 200,
          height: 200,
          imageType: 'image/svg+xml',
        },
        kind: 'simple' as const,
      };
    });

    return Promise.all(promises);
  });

  renderControls();
  await preview();
});
