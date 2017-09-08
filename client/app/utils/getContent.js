const TheUrl = 'https://deliver.kenticocloud.com/446769e3-c0cb-4b62-b042-38a5a481483b/items?depth=10&system.type=polozka_v_hornim_menu&order=elements.poradi[asc]';

export function getContent() {
  return fetch(TheUrl).then(response => response.json());
}
