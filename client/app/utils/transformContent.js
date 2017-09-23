const getLinkRegex = (guid) =>
  new RegExp(
    `<a [^>]*data-item-id="(${guid || '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'})" [^>]*>`,
    'ig',
  );

function collectLinkGuids(text) {
  const linkGuids = [];
  if (text) {
    const linkRegex = getLinkRegex();
    for (let match = linkRegex.exec(text); match !== null; match = linkRegex.exec(text)) {
      const guid = match[1];
      if (!linkGuids.includes(guid)) {
        linkGuids.push(guid);
      }
    }
  }

  return linkGuids;
}

function flattenTree(allItems) {
  return allItems.reduce(
    (aggregate, increment) =>
      aggregate
        .concat(flattenTree(increment.subPages))
        .concat([increment])
    , [],
  );
}

function getReplacePatterns(linkGuids, allItemsFlat) {
  return linkGuids.map(linkGuid => ({
    pattern: getLinkRegex(linkGuid),
    replacement: `<a href="${allItemsFlat.find(item => item.id === linkGuid).linkPath}">`,
  }));
}

function applyReplacePatterns(text, replacePatterns) {
  return text && replacePatterns.reduce(
    (result, replacement) =>
      result.replace(replacement.pattern, replacement.replacement),
    text,
  );
}

function correctTheLinks(item, allItemsFlat) {
  const linkGuids = collectLinkGuids(item.text);
  const replacePatterns = getReplacePatterns(linkGuids, allItemsFlat);
  const newItemText = applyReplacePatterns(item.text, replacePatterns);
  const transformedSubPages = item.subPages.map((subPage) => correctTheLinks(subPage, allItemsFlat));
  return Object.assign(
    {},
    item,
    {
      text: newItemText,
      subPages: transformedSubPages,
    },
  );
}

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
      id: system.id,
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
      id: system.id,
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

  const transformedItems = items.map(item => transformPage(item.system.codename, []));
  const allItemsFlat = flattenTree(transformedItems);
  const itemsWithCorrectLinks = transformedItems.map((item) => correctTheLinks(item, allItemsFlat));

  return itemsWithCorrectLinks;
}
