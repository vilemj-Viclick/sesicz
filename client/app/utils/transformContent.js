function getPath(parentLocation, slug) {
  return `#${parentLocation.join('/')}${parentLocation.length > 0 ?
    '/' :
    ''}${slug}`;
}

function createArticleTransformer(transformPage) {
  return ({ elements, system }, parentLocation) => {
    const slug = elements.cesta_v_adresnim_radku.value;
    const path = getPath(parentLocation, slug);
    return {
      type: system.type,
      linkPath: path,
      text: elements.text.value,
      title: elements.titulek.value,
      subPages: elements.podstranky.value.map(itemCodeName => transformPage(itemCodeName, parentLocation.concat([slug]))),
    };
  };
}

function createMenuItemTransformer(transformPage) {
  return ({ elements, system }, parentLocation) => {
    const slug = elements.cesta_v_adresnim_radku.value;
    const path = getPath(parentLocation, slug);
    return {
      type: system.type,
      linkPath: path,
      text: elements.text_polozky.value,
      subPages: elements.podstranky.value.map(itemCodeName => transformPage(itemCodeName, parentLocation.concat([slug]))),
    };
  };
}

function createPageTransformer(items, modularContent, transformerFactories) {
  const transformers = {};

  const transformPage = (pageCodeName, parentLocation) => {
    const page = modularContent[pageCodeName] || items.find(item => item.system.codename === pageCodeName);
    const transform = transformers[page.system.type];

    return transform(page, parentLocation);
  };

  Object.keys(transformerFactories)
    .reduce((transformerAggregate, contentType) => {
      // eslint-disable-next-line no-param-reassign
      transformerAggregate[contentType] = transformerFactories[contentType](transformPage);
      return transformerAggregate;
    }, transformers);

  return transformPage;
}

const transformerFactoryByContentType = {
  clanek: createArticleTransformer,
  polozka_v_hornim_menu: createMenuItemTransformer,
};

export function transformContent(contentResponse) {
  const { items, modular_content } = contentResponse;

  const transformPage = createPageTransformer(items, modular_content, transformerFactoryByContentType);

  return items.map(item => transformPage(item.system.codename, []));
}
