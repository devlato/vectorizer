import { ControlName, PresetId, CanvaImageBlob } from '@canva/editing-extensions-api-typings';
import { imageToSVGAsync, isSVGString, OptionsBuilder, SVGString } from './imagetracer';
import { presets } from './presets';
import { checkExists } from './utils';
import { createPreviewCanvas, setCanvasSize } from 'canvas';

const WEB_WORKER_URL =
  'https://apps.canva-apps-dev.com/BADa0xBSJXo/UADa06HQcTs/AADzB-VLWPU/2/AADzB-VLWPU_pSOai8/html/9fd3fa7e-8824-44e3-a8f3-150333905736.html?lib=0.0.83-alpha.0&libBase=https%3A%2F%2Fapps.canva-apps-dev.com%2Fbundle%2Fv1%2Fediting-extensions-api.&v=2';

const webWorker = new Worker(WEB_WORKER_URL);

webWorker.postMessage({ text: 'Test' });

export type State = {
  presetId: string | undefined;
  options: OptionsBuilder;
};

const { imageHelpers } = window.canva;

const displayPreview = ({
  context,
  preview,
}: {
  context: CanvasRenderingContext2D;
  preview: HTMLImageElement | SVGString;
}) => {
  if (!isSVGString(preview)) {
    context.drawImage(preview, 0, 0);
    return;
  }

  const blob = new Blob([preview], { type: 'image/svg+xml' });
  const svg = URL.createObjectURL(blob);
  const img = document.createElement('img');
  img.src = svg;
  context.drawImage(img, 0, 0);
};

const renderPreview = async (imageURL: string, options: OptionsBuilder): Promise<SVGString> =>
  imageToSVGAsync(imageURL, options.build());

const getPreset = (presetId: PresetId) => presets.find((p) => p.id === presetId);

const canva = window.canva.init();
canva.onReady(async ({ fullSizeImage, previewImage, previewSize, presetId }) => {
  const img = fullSizeImage != null ? await imageHelpers.fromUrl(fullSizeImage.url) : undefined;
  let previewImageURL: string | undefined;
  let fullImage: CanvaImageBlob | undefined = img != null ? img : undefined;
  const canvas = createPreviewCanvas(previewSize);
  const context = checkExists(canvas.getContext('2d'), 'Failed to initialize a 2D Context');
  const state: State = {
    presetId,
    options:
      presetId != null
        ? OptionsBuilder.fromHumanReadableOptions(checkExists(getPreset(presetId)).options)
        : OptionsBuilder.create(),
  };

  if (previewImage != null) {
    // Preview mode
    previewImageURL = previewImage.url;
  }

  if (previewImageURL != null) {
    displayPreview({
      context,
      preview: await renderPreview(previewImageURL, state.options),
    });
  }

  canva.onImageUpdate(async ({ image }) => {
    fullImage = image;
    previewImageURL = await imageHelpers.toDataUrl(image);
    displayPreview({
      context,
      preview: await renderPreview(previewImageURL, state.options),
    });
  });

  canva.onSaveRequest(async () => {
    const fullSizeImage = checkExists(fullImage);

    const svgString = await renderPreview(await imageHelpers.toDataUrl(fullSizeImage), state.options);
    console.log('__svgString =', svgString);

    return {
      blob: new Blob([svgString], { type: 'image/svg+xml' }),
      width: fullSizeImage.width,
      height: fullSizeImage.height,
      imageType: 'image/svg+xml',
    };
  });

  canva.onPresetSelected(async ({ presetId }) => {
    const preset = checkExists(getPreset(presetId), `Preset with id "${presetId}" is not found`);
    state.options.update(OptionsBuilder.fromHumanReadableOptions(preset.options).build());

    displayPreview({
      context,
      preview: await renderPreview(checkExists(previewImageURL, 'No preview image URL is specified'), state.options),
    });
  });

  const renderCustomControls = () => [<ControlName.COLOR_PICKER id="test" label="Test" color="#000000" />];

  const renderControls = () => {
    canva.updateControlPanel(renderCustomControls());
  };

  canva.onPresetsRequest(async ({ image }) => {
    const url = await imageHelpers.toDataUrl(image);

    const promises = presets.map(async (p) => {
      const svgString = await renderPreview(url, OptionsBuilder.fromHumanReadableOptions(p.options));

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

  // canva.onControlsEvent(({ message: event }) => {
  //   // Do notnhig
  // });

  canva.onViewportResize(async ({ size, commit }) => {
    if (commit) {
      setCanvasSize(canvas, size);
    }
  });

  renderControls();
});
