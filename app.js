(() => {
  const data = window.POKOPIA_TRACKER_DATA;
  const habitatIndex = window.POKOPIA_HABITAT_INDEX;
  if (!data) {
    document.body.innerHTML = '<p style="padding:24px">Tracker data could not be loaded.</p>';
    return;
  }

  const STORAGE_KEY = 'pokopia-poketracker-v1';
  const LANGUAGE_KEY = 'pokopia-language-v1';
  const POKEMON_NAMES_KEY = 'pokopia-pokemon-names-v1';
  const HABITAT_NAMES_KEY = 'pokopia-habitat-names-v1';
  const LANGUAGE_IDS = { ja: 1, ko: 3, 'zh-Hant': 4, fr: 5, de: 6, es: 7, it: 8, en: 9, 'zh-Hans': 12 };
  const GOOGLE_LANGUAGE = { ja: 'ja', ko: 'ko', 'zh-Hant': 'zh-TW', fr: 'fr', de: 'de', es: 'es', it: 'it', en: 'en', 'zh-Hans': 'zh-CN' };
  const UI = {
    en: { main: 'Main', event: 'Event', pokemonDex: 'Pokémon Dex', habitatDex: 'Habitat Dex', language: 'Language', filters: 'Filters', search: 'Search', searchPlaceholder: 'Name, number, ability…', status: 'Status', all: 'All', missing: 'Missing', checked: 'Checked', clearFilters: 'Clear filters', emptyHelp: 'Try clearing or changing the filters.', entry: 'entry', entries: 'entries', pokemonHint: 'Tap a sprite to mark it as registered.', habitatHint: 'Tap a habitat image to mark it as complete.', noCriteria: 'No construction criteria documented.', information: 'Information about', check: 'Check', uncheck: 'Uncheck', habitat: 'habitat', complete: 'Habitat complete ✓', markComplete: 'Mark habitat complete', howTo: 'How to make it', criteria: 'Criteria', foundHere: 'Pokémon found here', notDocumented: 'Not documented' },
    es: { main: 'Principal', event: 'Evento', pokemonDex: 'Pokédex', habitatDex: 'Dex de hábitats', language: 'Idioma', filters: 'Filtros', search: 'Buscar', searchPlaceholder: 'Nombre, número, habilidad…', status: 'Estado', all: 'Todos', missing: 'Pendientes', checked: 'Registrados', clearFilters: 'Limpiar filtros', emptyHelp: 'Prueba a limpiar o cambiar los filtros.', entry: 'entrada', entries: 'entradas', pokemonHint: 'Toca un sprite para marcarlo como registrado.', habitatHint: 'Toca la imagen de un hábitat para marcarlo como completado.', noCriteria: 'No hay criterios de construcción documentados.', information: 'Información sobre', check: 'Marcar', uncheck: 'Desmarcar', habitat: 'hábitat', complete: 'Hábitat completado ✓', markComplete: 'Marcar hábitat como completado', howTo: 'Cómo crearlo', criteria: 'Criterios', foundHere: 'Pokémon que aparecen aquí', notDocumented: 'No documentado' },
    fr: { main: 'Principal', event: 'Événement', pokemonDex: 'Pokédex', habitatDex: 'Dex des habitats', language: 'Langue', filters: 'Filtres', search: 'Rechercher', searchPlaceholder: 'Nom, numéro, capacité…', status: 'Statut', all: 'Tous', missing: 'Manquants', checked: 'Obtenus', clearFilters: 'Effacer les filtres', emptyHelp: 'Modifiez ou effacez les filtres.', entry: 'entrée', entries: 'entrées', pokemonHint: 'Touchez un sprite pour l’enregistrer.', habitatHint: 'Touchez l’image d’un habitat pour le compléter.', noCriteria: 'Aucun critère de construction documenté.', information: 'Informations sur', check: 'Cocher', uncheck: 'Décocher', habitat: 'habitat', complete: 'Habitat terminé ✓', markComplete: 'Marquer comme terminé', howTo: 'Comment le créer', criteria: 'Critères', foundHere: 'Pokémon présents', notDocumented: 'Non documenté' },
    de: { main: 'Hauptspiel', event: 'Event', pokemonDex: 'Pokédex', habitatDex: 'Habitat-Dex', language: 'Sprache', filters: 'Filter', search: 'Suchen', searchPlaceholder: 'Name, Nummer, Fähigkeit…', status: 'Status', all: 'Alle', missing: 'Fehlend', checked: 'Erfasst', clearFilters: 'Filter löschen', emptyHelp: 'Ändere oder lösche die Filter.', entry: 'Eintrag', entries: 'Einträge', pokemonHint: 'Tippe auf ein Sprite, um es zu erfassen.', habitatHint: 'Tippe auf ein Habitatbild, um es abzuschließen.', noCriteria: 'Keine Baukriterien dokumentiert.', information: 'Informationen zu', check: 'Markieren', uncheck: 'Markierung entfernen', habitat: 'Habitat', complete: 'Habitat abgeschlossen ✓', markComplete: 'Habitat abschließen', howTo: 'Herstellung', criteria: 'Kriterien', foundHere: 'Pokémon in diesem Habitat', notDocumented: 'Nicht dokumentiert' },
    it: { main: 'Principale', event: 'Evento', pokemonDex: 'Pokédex', habitatDex: 'Dex habitat', language: 'Lingua', filters: 'Filtri', search: 'Cerca', searchPlaceholder: 'Nome, numero, abilità…', status: 'Stato', all: 'Tutti', missing: 'Mancanti', checked: 'Registrati', clearFilters: 'Azzera filtri', emptyHelp: 'Prova a cambiare o azzerare i filtri.', entry: 'voce', entries: 'voci', pokemonHint: 'Tocca uno sprite per registrarlo.', habitatHint: 'Tocca l’immagine di un habitat per completarlo.', noCriteria: 'Nessun criterio di costruzione documentato.', information: 'Informazioni su', check: 'Seleziona', uncheck: 'Deseleziona', habitat: 'habitat', complete: 'Habitat completato ✓', markComplete: 'Segna habitat come completato', howTo: 'Come crearlo', criteria: 'Criteri', foundHere: 'Pokémon presenti', notDocumented: 'Non documentato' },
    ja: { main: 'メイン', event: 'イベント', pokemonDex: 'ポケモン図鑑', habitatDex: '生息地図鑑', language: '言語', filters: 'フィルター', search: '検索', searchPlaceholder: '名前・番号・能力…', status: '状態', all: 'すべて', missing: '未登録', checked: '登録済み', clearFilters: 'フィルターを解除', emptyHelp: 'フィルターを変更または解除してください。', entry: '件', entries: '件', pokemonHint: 'スプライトをタップして登録します。', habitatHint: '生息地の画像をタップして完成にします。', noCriteria: '作成条件は記録されていません。', information: '情報：', check: '登録', uncheck: '解除', habitat: '生息地', complete: '完成済み ✓', markComplete: '完成にする', howTo: '作り方', criteria: '条件', foundHere: 'ここにいるポケモン', notDocumented: '記録なし' },
    ko: { main: '메인', event: '이벤트', pokemonDex: '포켓몬 도감', habitatDex: '서식지 도감', language: '언어', filters: '필터', search: '검색', searchPlaceholder: '이름, 번호, 능력…', status: '상태', all: '전체', missing: '미등록', checked: '등록됨', clearFilters: '필터 지우기', emptyHelp: '필터를 변경하거나 지워 보세요.', entry: '개', entries: '개', pokemonHint: '스프라이트를 눌러 등록하세요.', habitatHint: '서식지 이미지를 눌러 완료하세요.', noCriteria: '건설 조건이 기록되지 않았습니다.', information: '정보:', check: '등록', uncheck: '해제', habitat: '서식지', complete: '서식지 완료 ✓', markComplete: '서식지 완료로 표시', howTo: '만드는 방법', criteria: '조건', foundHere: '이곳의 포켓몬', notDocumented: '기록 없음' },
    'zh-Hans': { main: '主线', event: '活动', pokemonDex: '宝可梦图鉴', habitatDex: '栖息地图鉴', language: '语言', filters: '筛选', search: '搜索', searchPlaceholder: '名称、编号、能力…', status: '状态', all: '全部', missing: '未登记', checked: '已登记', clearFilters: '清除筛选', emptyHelp: '请更改或清除筛选条件。', entry: '项', entries: '项', pokemonHint: '点击图像即可登记。', habitatHint: '点击栖息地图像即可完成。', noCriteria: '没有记录建造条件。', information: '信息：', check: '登记', uncheck: '取消登记', habitat: '栖息地', complete: '栖息地已完成 ✓', markComplete: '标记栖息地为完成', howTo: '建造方法', criteria: '条件', foundHere: '这里的宝可梦', notDocumented: '未记录' },
    'zh-Hant': { main: '主線', event: '活動', pokemonDex: '寶可夢圖鑑', habitatDex: '棲息地圖鑑', language: '語言', filters: '篩選', search: '搜尋', searchPlaceholder: '名稱、編號、能力…', status: '狀態', all: '全部', missing: '未登記', checked: '已登記', clearFilters: '清除篩選', emptyHelp: '請變更或清除篩選條件。', entry: '項', entries: '項', pokemonHint: '點擊圖像即可登記。', habitatHint: '點擊棲息地圖片即可完成。', noCriteria: '沒有記錄建造條件。', information: '資訊：', check: '登記', uncheck: '取消登記', habitat: '棲息地', complete: '棲息地已完成 ✓', markComplete: '標記棲息地為完成', howTo: '建造方法', criteria: '條件', foundHere: '這裡的寶可夢', notDocumented: '未記錄' }
  };
  const state = {
    section: 'main',
    view: 'pokemon',
    query: '',
    status: 'all',
    ideal: '',
    litter: '',
    favorite: '',
    ability: '',
    language: localStorage.getItem(LANGUAGE_KEY) || 'en',
    pokemonNames: loadJson(POKEMON_NAMES_KEY),
    habitatNames: loadJson(HABITAT_NAMES_KEY),
    namesLoading: new Set(),
    checks: loadChecks()
  };

  const els = {
    grid: document.querySelector('#pokemon-grid'),
    sectionTabs: document.querySelector('.section-tabs'),
    viewSwitch: document.querySelector('.view-switch'),
    empty: document.querySelector('#empty-state'),
    results: document.querySelector('#results-count'),
    hint: document.querySelector('#view-hint'),
    progressCount: document.querySelector('#progress-count'),
    progressPercent: document.querySelector('#progress-percent'),
    progressFill: document.querySelector('#progress-fill'),
    filtersToggle: document.querySelector('#filters-toggle'),
    language: document.querySelector('#language-select'),
    filtersPanel: document.querySelector('#filters-panel'),
    search: document.querySelector('#search-input'),
    status: document.querySelector('#status-filter'),
    ideal: document.querySelector('#ideal-filter'),
    litter: document.querySelector('#litter-filter'),
    favorite: document.querySelector('#favorite-filter'),
    ability: document.querySelector('#ability-filter'),
    clearFilters: document.querySelector('#clear-filters'),
    dialog: document.querySelector('#info-dialog'),
    dialogContent: document.querySelector('#dialog-content'),
    dialogClose: document.querySelector('#dialog-close')
  };

  els.language.value = state.language;

  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
  }

  function ui(key) {
    return UI[state.language]?.[key] || UI.en[key] || key;
  }

  function loadChecks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        pokemon: saved.pokemon || {},
        habitat: saved.habitat || {}
      };
    } catch {
      return { pokemon: {}, habitat: {} };
    }
  }

  function saveChecks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.checks));
  }

  function sectionEntries() {
    return data.sections[state.section]?.entries || [];
  }

  function habitatFromDetail(detail, pokemon) {
    if (!detail) return null;
    const normalizedDetail = String(detail).replace(/\r/g, '').trim();
    if (!normalizedDetail) return null;
    let parts = normalizedDetail.split(/\s+-\s+/, 2);
    if (parts.length === 1 && normalizedDetail.includes('\n')) {
      const [firstLine, ...rest] = normalizedDetail.split('\n');
      parts = [firstLine, rest.join('\n')];
    }
    const name = parts[0]?.trim();
    if (!name || name.startsWith('(')) return null;
    return {
      name,
      criteria: parts[1]?.trim() || '',
      pokemon
    };
  }

  function canonical(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  function editDistance(left, right) {
    const a = canonical(left);
    const b = canonical(right);
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i += 1) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const held = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
        previous = held;
      }
    }
    return row[b.length];
  }

  function sourceHabitats() {
    const habitats = [];
    sectionEntries().forEach(pokemon => {
      [pokemon.habitat1Details, pokemon.habitat2Details].forEach(detail => {
        const parsed = habitatFromDetail(detail, pokemon);
        if (!parsed) return;
        let habitat = habitats.find(item => canonical(item.name) === canonical(parsed.name));
        if (!habitat) {
          habitat = { name: parsed.name, criteria: parsed.criteria, pokemon: [] };
          habitats.push(habitat);
        }
        if (!habitat.criteria && parsed.criteria) habitat.criteria = parsed.criteria;
        if (!habitat.pokemon.some(entry => entry.id === pokemon.id)) habitat.pokemon.push(pokemon);
      });
    });
    return habitats;
  }

  function closestSourceHabitat(name, sources, claimed) {
    const exact = sources.find(item => !claimed.has(item) && canonical(item.name) === canonical(name));
    if (exact) return exact;
    let best = null;
    let distance = Infinity;
    sources.forEach(item => {
      if (claimed.has(item)) return;
      const candidateDistance = editDistance(name, item.name);
      if (candidateDistance < distance) {
        best = item;
        distance = candidateDistance;
      }
    });
    const threshold = Math.max(2, Math.floor(canonical(name).length * 0.18));
    return distance <= threshold ? best : null;
  }

  function habitatEntries() {
    const official = habitatIndex?.[state.section] || [];
    const sources = sourceHabitats();
    const claimed = new Set();
    const imagePrefix = state.section === 'event' ? 'e' : state.section === 'dlc' ? 'b' : '';
    return official.map((name, index) => {
      const source = closestSourceHabitat(name, sources, claimed);
      if (source) claimed.add(source);
      const position = index + 1;
      return {
        id: `habitat-${state.section}-${String(position).padStart(3, '0')}`,
        section: state.section,
        number: `#${String(position).padStart(3, '0')}`,
        name,
        criteria: source?.criteria || '',
        pokemon: source?.pokemon || [],
        imageUrl: `https://www.serebii.net/pokemonpokopia/habitatdex/${imagePrefix}${position}.png`
      };
    });
  }

  function currentEntries() {
    return state.view === 'pokemon' ? sectionEntries() : habitatEntries();
  }

  function isChecked(entry) {
    return Boolean(state.checks[state.view][entry.id]);
  }

  function toggleChecked(entry) {
    const bucket = state.checks[state.view];
    bucket[entry.id] = !bucket[entry.id];
    if (!bucket[entry.id]) delete bucket[entry.id];
    saveChecks();
    render();
  }

  function normalized(value) {
    return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  }

  function speciesId(entry) {
    return entry.spriteUrl?.match(/\/small\/(\d+)/)?.[1]?.replace(/^0+(?=\d)/, '') || '';
  }

  function displayName(entry) {
    if (state.language === 'en') return entry.name;
    if (entry.imageUrl) return state.habitatNames[state.language]?.[entry.id] || entry.name;
    const id = speciesId(entry);
    const translated = state.pokemonNames[state.language]?.[id];
    const english = state.pokemonNames.en?.[id];
    if (!translated) return entry.name;
    if (english && canonical(entry.name).startsWith(canonical(english))) {
      const suffix = entry.name.slice(english.length).trim();
      return suffix ? `${translated} · ${suffix}` : translated;
    }
    return entry.name;
  }

  function matchesFilters(entry) {
    if (state.status === 'checked' && !isChecked(entry)) return false;
    if (state.status === 'missing' && isChecked(entry)) return false;

    if (state.view === 'habitat') {
      const query = normalized(state.query).trim();
      if (!query) return true;
      return [entry.name, displayName(entry), entry.criteria, ...entry.pokemon.flatMap(pokemon => [pokemon.name, displayName(pokemon)])]
        .map(normalized)
        .join(' ')
        .includes(query);
    }

    if (state.ideal && entry.idealHabitat !== state.ideal) return false;
    if (state.litter && entry.litterDrop?.label !== state.litter) return false;
    if (state.favorite && !entry.favorites.includes(state.favorite)) return false;
    if (state.ability && !entry.abilities.includes(state.ability)) return false;

    const query = normalized(state.query).trim();
    if (!query) return true;
    const haystack = [
      entry.number,
      entry.name,
      displayName(entry),
      ...entry.abilities,
      entry.home,
      entry.litterDrop?.label,
      entry.habitat1,
      entry.habitat1Details,
      entry.habitat2,
      entry.habitat2Details,
      entry.idealHabitat,
      ...entry.favorites
    ].map(normalized).join(' ');
    return haystack.includes(query);
  }

  function setOptions(select, values, currentValue) {
    const firstLabel = select.querySelector('option')?.textContent || 'Any';
    select.replaceChildren();
    const any = document.createElement('option');
    any.value = '';
    any.textContent = firstLabel;
    select.append(any);
    [...new Set(values.filter(Boolean))]
      .sort((a, b) => a.localeCompare(b))
      .forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.append(option);
      });
    select.value = currentValue;
  }

  function rebuildFilterOptions() {
    const entries = sectionEntries();
    setOptions(els.ideal, entries.map(entry => entry.idealHabitat), state.ideal);
    setOptions(els.litter, entries.map(entry => entry.litterDrop?.label), state.litter);
    setOptions(els.favorite, entries.flatMap(entry => entry.favorites), state.favorite);
    setOptions(els.ability, entries.flatMap(entry => entry.abilities), state.ability);
    [els.ideal, els.litter, els.favorite, els.ability].forEach(select => {
      select.closest('.field').hidden = state.view === 'habitat';
    });
  }

  function renderProgress(entries) {
    const checked = entries.filter(isChecked).length;
    const total = entries.length;
    const percent = total ? Math.round((checked / total) * 100) : 0;
    els.progressCount.textContent = `${checked} / ${total}`;
    els.progressPercent.textContent = `${percent}%`;
    els.progressFill.style.width = `${percent}%`;
  }

  function makePokemonCard(entry) {
    const card = document.createElement('article');
    card.className = `pokemon-card${isChecked(entry) ? ' is-checked' : ''}`;
    card.dataset.id = entry.id;

    const toggle = document.createElement('button');
    toggle.className = 'sprite-toggle';
    toggle.type = 'button';
    const localizedName = displayName(entry);
    toggle.setAttribute('aria-label', `${isChecked(entry) ? ui('uncheck') : ui('check')} ${localizedName}`);
    toggle.setAttribute('aria-pressed', String(isChecked(entry)));
    toggle.title = `${entry.number} ${localizedName}`;

    const img = document.createElement('img');
    img.src = entry.spriteUrl || '';
    img.alt = localizedName;
    img.loading = 'lazy';
    img.decoding = 'async';
    toggle.append(img);
    toggle.addEventListener('click', () => toggleChecked(entry));

    const info = document.createElement('button');
    info.className = 'info-button';
    info.type = 'button';
    info.textContent = 'i';
    info.setAttribute('aria-label', `${ui('information')} ${localizedName}`);
    info.addEventListener('click', () => openInfo(entry));

    card.append(toggle, info);
    return card;
  }

  function makeHabitatCard(entry) {
    const card = document.createElement('article');
    card.className = `habitat-card${isChecked(entry) ? ' is-checked' : ''}`;

    const toggle = document.createElement('button');
    toggle.className = 'habitat-toggle';
    toggle.type = 'button';
    const localizedName = displayName(entry);
    toggle.setAttribute('aria-label', `${isChecked(entry) ? ui('uncheck') : ui('check')} ${ui('habitat')} ${localizedName}`);
    toggle.setAttribute('aria-pressed', String(isChecked(entry)));

    const imageWrap = document.createElement('span');
    imageWrap.className = 'habitat-image-wrap';
    const image = document.createElement('img');
    image.className = 'habitat-image';
    image.src = entry.imageUrl;
    image.alt = localizedName;
    image.loading = 'lazy';
    image.decoding = 'async';
    imageWrap.append(image);
    const label = document.createElement('span');
    label.className = 'habitat-label';
    const number = document.createElement('span');
    number.className = 'habitat-number';
    number.textContent = entry.number;
    const name = document.createElement('strong');
    name.textContent = localizedName;
    label.append(number, name);
    toggle.append(imageWrap, label);
    toggle.addEventListener('click', () => toggleChecked(entry));

    const info = document.createElement('button');
    info.className = 'info-button';
    info.type = 'button';
    info.textContent = 'i';
    info.setAttribute('aria-label', `${ui('information')} ${localizedName}`);
    info.addEventListener('click', () => openInfo(entry));
    card.append(toggle, info);
    return card;
  }

  function makeCard(entry) {
    return state.view === 'pokemon' ? makePokemonCard(entry) : makeHabitatCard(entry);
  }

  function text(value, fallback = '—') {
    return value || fallback;
  }

  function detailItem(label, value, wide = false) {
    const item = document.createElement('div');
    item.className = `detail-item${wide ? ' wide' : ''}`;
    const labelEl = document.createElement('span');
    labelEl.className = 'detail-label';
    labelEl.textContent = label;
    const valueEl = document.createElement('div');
    valueEl.className = 'detail-value';
    valueEl.textContent = text(value);
    item.append(labelEl, valueEl);
    return item;
  }

  function tagItem(label, values, emptyText = 'Not documented') {
    const item = document.createElement('div');
    item.className = 'detail-item wide';
    const labelEl = document.createElement('span');
    labelEl.className = 'detail-label';
    labelEl.textContent = label;
    const list = document.createElement('div');
    list.className = 'tag-list';
    if (values.length) {
      values.forEach(value => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = value;
        list.append(tag);
      });
    } else {
      list.textContent = emptyText;
    }
    item.append(labelEl, list);
    return item;
  }

  function makeSection(title) {
    const section = document.createElement('section');
    section.className = 'detail-section';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const grid = document.createElement('div');
    grid.className = 'detail-grid';
    section.append(heading, grid);
    return { section, grid };
  }

  function openInfo(entry) {
    if (state.view === 'habitat') {
      openHabitatInfo(entry);
      return;
    }
    els.dialogContent.replaceChildren();
    const body = document.createElement('div');
    body.className = 'dialog-body';

    const hero = document.createElement('div');
    hero.className = 'dialog-hero';
    const sprite = document.createElement('img');
    sprite.src = entry.spriteUrl || '';
    sprite.alt = displayName(entry);
    const heroText = document.createElement('div');
    const number = document.createElement('p');
    number.className = 'dialog-number';
    number.textContent = entry.number;
    const title = document.createElement('h2');
    title.className = 'dialog-title';
    title.textContent = displayName(entry);
    const check = document.createElement('button');
    check.className = 'dialog-check';
    check.type = 'button';
    check.textContent = isChecked(entry)
      ? (state.view === 'pokemon' ? 'Registered ✓' : 'Habitat complete ✓')
      : (state.view === 'pokemon' ? 'Mark as registered' : 'Mark habitat complete');
    check.addEventListener('click', () => {
      toggleChecked(entry);
      openInfo(entry);
    });
    heroText.append(number, title, check);
    hero.append(sprite, heroText);
    body.append(hero);

    const basics = makeSection('Pokémon');
    basics.grid.append(
      tagItem('Abilities', entry.abilities, 'Not documented'),
      detailItem('Registered in source sheet', entry.registeredInSource ? 'Yes' : 'No')
    );
    body.append(basics.section);

    const habitat = makeSection('Habitat');
    habitat.grid.append(
      detailItem('Ideal Habitat', entry.idealHabitat),
      detailItem('Habitat 1', entry.habitat1),
      detailItem('Habitat 1 Details', entry.habitat1Details, true),
      detailItem('Habitat 2', entry.habitat2),
      detailItem('Habitat 2 Details', entry.habitat2Details, true)
    );
    body.append(habitat.section);

    const preferences = makeSection('Drops and favorites');
    const litterItem = document.createElement('div');
    litterItem.className = 'detail-item';
    const litterLabel = document.createElement('span');
    litterLabel.className = 'detail-label';
    litterLabel.textContent = 'Litter Drop';
    const litterLine = document.createElement('div');
    litterLine.className = 'litter-line';
    if (entry.litterDrop?.url) {
      const litterImg = document.createElement('img');
      litterImg.src = entry.litterDrop.url;
      litterImg.alt = '';
      litterLine.append(litterImg);
    }
    const litterText = document.createElement('span');
    litterText.textContent = text(entry.litterDrop?.label);
    litterLine.append(litterText);
    litterItem.append(litterLabel, litterLine);
    preferences.grid.append(litterItem, tagItem('Favorites', entry.favorites));
    if (!entry.favoritesDocumented && entry.section === 'dlc') {
      const note = document.createElement('p');
      note.className = 'source-note';
      note.textContent = 'Favorites are not documented for this entry in the source spreadsheet.';
      preferences.section.append(note);
    }
    body.append(preferences.section);

    const source = makeSection('Source / future customization');
    source.grid.append(
      detailItem('Home', entry.home),
      detailItem('Source location', `${entry.sourceSheet}, row ${entry.sourceRow}`)
    );
    const sourceNote = document.createElement('p');
    sourceNote.className = 'source-note';
    sourceNote.textContent = 'Home is preserved from the spreadsheet but is not yet used as a customization feature.';
    source.section.append(sourceNote);
    body.append(source.section);

    els.dialogContent.append(body);
    if (!els.dialog.open) els.dialog.showModal();
  }

  function openHabitatInfo(entry) {
    els.dialogContent.replaceChildren();
    const body = document.createElement('div');
    body.className = 'dialog-body';

    const hero = document.createElement('div');
    hero.className = 'habitat-dialog-hero';
    const habitatImage = document.createElement('img');
    habitatImage.className = 'habitat-dialog-image';
    habitatImage.src = entry.imageUrl;
    habitatImage.alt = displayName(entry);
    const heroText = document.createElement('div');
    heroText.className = 'habitat-dialog-copy';
    const number = document.createElement('p');
    number.className = 'dialog-number';
    number.textContent = entry.number;
    const title = document.createElement('h2');
    title.className = 'dialog-title';
    title.textContent = displayName(entry);
    const check = document.createElement('button');
    check.className = 'dialog-check';
    check.type = 'button';
    check.textContent = isChecked(entry) ? ui('complete') : ui('markComplete');
    check.addEventListener('click', () => {
      toggleChecked(entry);
      openHabitatInfo(entry);
    });
    heroText.append(number, title, check);
    hero.append(habitatImage, heroText);
    body.append(hero);

    const construction = makeSection(ui('howTo'));
    const criteriaItem = detailItem(ui('criteria'), entry.criteria || ui('noCriteria'), true);
    construction.grid.append(criteriaItem);
    body.append(construction.section);

    const pokemon = makeSection(ui('foundHere'));
    pokemon.grid.append(tagItem('Pokémon', entry.pokemon.map(displayName), ui('notDocumented')));
    body.append(pokemon.section);

    const references = document.createElement('div');
    references.className = 'habitat-reference-links';
    const serebii = document.createElement('a');
    serebii.href = 'https://www.serebii.net/pokemonpokopia/habitats.shtml';
    serebii.target = '_blank';
    serebii.rel = 'noreferrer';
    serebii.textContent = 'Serebii habitat images';
    const bulbapedia = document.createElement('a');
    bulbapedia.href = state.section === 'dlc'
      ? 'https://bulbapedia.bulbagarden.net/wiki/Habitat_Dex_(Basin)'
      : state.section === 'event'
        ? 'https://bulbapedia.bulbagarden.net/wiki/Habitat_Dex_(Event)'
        : 'https://bulbapedia.bulbagarden.net/wiki/Habitat_Dex';
    bulbapedia.target = '_blank';
    bulbapedia.rel = 'noreferrer';
    bulbapedia.textContent = 'Bulbapedia criteria reference';
    references.append(serebii, bulbapedia);
    body.append(references);

    els.dialogContent.append(body);
    if (!els.dialog.open) els.dialog.showModal();
    if (state.language !== 'en' && entry.criteria) {
      translateTexts([entry.criteria], state.language).then(values => {
        if (els.dialog.open && values[0]) criteriaItem.querySelector('.detail-value').textContent = values[0];
      });
    }
  }

  async function translateTexts(texts, language) {
    if (language === 'en' || !texts.length) return texts;
    try {
      const params = new URLSearchParams({
        client: 'gtx', sl: 'en', tl: GOOGLE_LANGUAGE[language], dt: 't', q: texts.join('\n')
      });
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
      if (!response.ok) throw new Error('Translation service unavailable');
      const payload = await response.json();
      const translated = payload[0].map(part => part[0]).join('').split('\n');
      return translated.length === texts.length ? translated : texts;
    } catch {
      return texts;
    }
  }

  function csvValue(value) {
    const trimmed = String(value || '').trim();
    return trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1).replace(/""/g, '"')
      : trimmed;
  }

  async function ensurePokemonNames(language) {
    if (language === 'en' || state.pokemonNames[language]) return;
    const loadingKey = `pokemon-${language}`;
    if (state.namesLoading.has(loadingKey)) return;
    state.namesLoading.add(loadingKey);
    try {
      const response = await fetch('https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv');
      if (!response.ok) throw new Error('Pokémon names unavailable');
      const csv = await response.text();
      const wanted = new Set(Object.values(data.sections).flatMap(section => section.entries.map(speciesId)).filter(Boolean));
      const targetId = String(LANGUAGE_IDS[language]);
      const translated = {};
      const english = { ...(state.pokemonNames.en || {}) };
      csv.split(/\r?\n/).forEach(line => {
        const parts = line.split(',');
        const id = parts[0];
        const languageId = parts[1];
        if (!wanted.has(id) || (languageId !== targetId && languageId !== '9')) return;
        const name = csvValue(parts[2]);
        if (languageId === targetId) translated[id] = name;
        if (languageId === '9') english[id] = name;
      });
      state.pokemonNames.en = english;
      state.pokemonNames[language] = translated;
      localStorage.setItem(POKEMON_NAMES_KEY, JSON.stringify(state.pokemonNames));
    } catch {
      state.pokemonNames[language] = {};
    } finally {
      state.namesLoading.delete(loadingKey);
      if (state.language === language) render();
    }
  }

  async function ensureHabitatNames(language) {
    if (language === 'en') return;
    const entries = habitatEntries();
    state.habitatNames[language] ||= {};
    const missing = entries.filter(entry => !state.habitatNames[language][entry.id]);
    if (!missing.length) return;
    const loadingKey = `habitat-${language}-${state.section}`;
    if (state.namesLoading.has(loadingKey)) return;
    state.namesLoading.add(loadingKey);
    try {
      for (let offset = 0; offset < missing.length; offset += 30) {
        const batch = missing.slice(offset, offset + 30);
        const translated = await translateTexts(batch.map(entry => entry.name), language);
        batch.forEach((entry, index) => {
          state.habitatNames[language][entry.id] = translated[index] || entry.name;
        });
        if (state.language === language) render();
      }
      localStorage.setItem(HABITAT_NAMES_KEY, JSON.stringify(state.habitatNames));
    } finally {
      state.namesLoading.delete(loadingKey);
      if (state.language === language) render();
    }
  }

  function queueNameTranslations() {
    if (state.language === 'en') return;
    ensurePokemonNames(state.language);
    ensureHabitatNames(state.language);
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = ui(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      element.placeholder = ui(element.dataset.i18nPlaceholder);
    });
    els.language.setAttribute('aria-label', ui('language'));
  }

  function render() {
    const entries = currentEntries();
    const visible = entries.filter(matchesFilters);
    document.body.dataset.section = state.section;
    els.sectionTabs.dataset.active = state.section;
    els.viewSwitch.dataset.active = state.view;

    document.querySelectorAll('[data-section-tab]').forEach(button => {
      button.classList.toggle('is-active', button.dataset.sectionTab === state.section);
    });
    document.querySelectorAll('[data-view]').forEach(button => {
      button.classList.toggle('is-active', button.dataset.view === state.view);
    });

    els.grid.classList.toggle('habitat-grid', state.view === 'habitat');
    els.grid.replaceChildren(...visible.map(makeCard));
    els.grid.hidden = visible.length === 0;
    els.empty.hidden = visible.length !== 0;
    els.results.textContent = `${visible.length} ${visible.length === 1 ? ui('entry') : ui('entries')}`;
    els.hint.textContent = state.view === 'pokemon'
      ? ui('pokemonHint')
      : ui('habitatHint');
    renderProgress(entries);
    queueNameTranslations();
  }

  function resetFilters() {
    state.query = '';
    state.status = 'all';
    state.ideal = '';
    state.litter = '';
    state.favorite = '';
    state.ability = '';
    els.search.value = '';
    els.status.value = 'all';
    els.ideal.value = '';
    els.litter.value = '';
    els.favorite.value = '';
    els.ability.value = '';
  }

  document.querySelectorAll('[data-section-tab]').forEach(button => {
    button.addEventListener('click', () => {
      state.section = button.dataset.sectionTab;
      resetFilters();
      rebuildFilterOptions();
      render();
    });
  });

  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      state.view = button.dataset.view;
      resetFilters();
      rebuildFilterOptions();
      render();
    });
  });

  els.filtersToggle.addEventListener('click', () => {
    const opening = els.filtersPanel.hidden;
    els.filtersPanel.hidden = !opening;
    els.filtersToggle.setAttribute('aria-expanded', String(opening));
  });
  els.language.addEventListener('change', event => {
    state.language = event.target.value;
    localStorage.setItem(LANGUAGE_KEY, state.language);
    applyLanguage();
    render();
  });
  els.search.addEventListener('input', event => { state.query = event.target.value; render(); });
  els.status.addEventListener('change', event => { state.status = event.target.value; render(); });
  els.ideal.addEventListener('change', event => { state.ideal = event.target.value; render(); });
  els.litter.addEventListener('change', event => { state.litter = event.target.value; render(); });
  els.favorite.addEventListener('change', event => { state.favorite = event.target.value; render(); });
  els.ability.addEventListener('change', event => { state.ability = event.target.value; render(); });
  els.clearFilters.addEventListener('click', () => { resetFilters(); render(); });
  els.dialogClose.addEventListener('click', () => els.dialog.close());
  els.dialog.addEventListener('click', event => {
    const box = els.dialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (outside) els.dialog.close();
  });

  applyLanguage();
  rebuildFilterOptions();
  render();
})();
