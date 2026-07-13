// The possible destinations for new tabs opened using Vimium's `createTab` command.
const newTabDestinations = {
  browserNewTabPage: "browserNewTabPage",
  vimiumNewTabPage: "vimiumNewTabPage",
  customUrl: "customUrl",
};

const vimiumNewTabPageUrl = "https://vimium.github.io/new-tab/";


const defaultOptions = {
  scrollStepSize: 60,
  smoothScroll: true,
  keyMappings: `
" Kopium: These are hardcoded/frozen in lib/settings.js and user CAN NOT change it via options page.
" Kopium is to be used as unpacked extension and user should edit frozen options by editing the source.
"
" My current keymappings approach:
"
" - Keep all my maps explicit here in versioned settings.js (start with unmapAll)
" - Most default vimium keys are very good so prefer them, but change some to more like LazyVim
" BTW List of default Chrome keys is on: https://support.google.com/chrome/answer/157179
" BTW List of default Vimium maps is in ../background_scripts/commands.js -> const defaultKeyMappings 
" BTW List of all Vimium commands is in ../background_scripts/all_commands.js

" All my maps will be explicitly defined here, even though some are same as in Vimium defaultKeyMappings.
unmapAll

" All maps in same order as in ../background_scripts/all_commands.js :

map j scrollDown
map k scrollUp
map gg scrollToTop
map G scrollToBottom

map d scrollPageDown
" BTW It's half page down; BTW c-d is used by chrome (bookmark dialog)
map u scrollPageUp
" BTW It's half page up; BTW c-u is used by chrome (view source)

map D scrollFullPageDown
map U scrollFullPageUp

map h scrollLeft
map l scrollRight

map zH scrollToLeft
map zL scrollToRight

map r reload
map R reload hard

map yy copyCurrentUrl
map po openCopiedUrlInCurrentTab
map pn openCopiedUrlInNewTab
map ph openCopiedUrlInNewTab position=before
map pe openCopiedUrlInNewTab position=end

map gi focusInput

map gu goUp
map gU goToRoot

map i enterInsertMode
map v enterVisualMode
map V enterVisualLineMode

map ; passNextKey
map <a-;> passNextKey
" BTW see https://github.com/philc/vimium/wiki/Tips-and-Tricks#using-the-escape-key-in-inputs
" With ; I can't pass the esc key to page when in input element (like github in command panel)
" I also tried other maps like <c-esc>, but looks like in "input editing" mode at least on github,
" keys are highjacked by input element or chrome or github.. fortunately <a-;> enters passNextKey mode.
" https://github.com/philc/vimium/issues/2889#issuecomment-1848922027

mapkey <c-;> <c-[>
" Hotfix for opposite issue of the above: when a page eagerly reacts to any esc keypress,
" but we ONLY want to exit vimium insert mode.. f.e. youtube in fullscreen ends fullscreen on esc
" Now we can use <c-;> to send <c-[> (which is practically esc) ONLY to vimium.
" This idea is from: https://github.com/philc/vimium/issues/3485#issuecomment-583923707

" Generally maybe underlying problem is some pages override some vimium keys later on, f.e.:
" when youtube enters fullscreen, or when github enters command pallete with inserting "mode".
" So maybe I should implement PR for specific pages to auto fix such behaviour.
" Is there already any page specific code/hotfixes in Vimium at all?


map gi focusInput

map fo LinkHints.activateMode
map fh LinkHints.activateMode action=hover
map ff LinkHints.activateMode action=focus
map fcc LinkHints.activateMode action=copy-text
" BTW mnemonic: follow -> copy content (meaning just content of link?)

map fb LinkHints.activateModeToOpenInNewTab
map fn LinkHints.activateModeToOpenInNewForegroundTab
map fa LinkHints.activateModeWithQueue
map fd LinkHints.activateModeToDownloadLink
map fi LinkHints.activateModeToOpenIncognito
map fcl LinkHints.activateModeToCopyLinkUrl 

map g[ goPrevious
map g] goNext
" TODO_later: Implement specific rules to some pages to find nontypical "previous"/"next" links.
" TODO_later: Check how grabBackFocus works and make it work on at least all AI chats pages.

map gn nextFrame
map gm mainFrame

map m Marks.activateCreateMode
map \` Marks.activateGotoMode
map ' Marks.activateGotoMode
" BTW these also have the "swap" boolean option, to use global marks with lower letters (because used more often).
" But let's not do this, because more important (than slight convenience) is to have it memorized like in vim.

map o Vomnibar.activate
map O Vomnibar.activateInNewTab
map b Vomnibar.activateBookmarks
map B Vomnibar.activateBookmarksInNewTab
map <a-/> Vomnibar.activateTabSelection
map ge Vomnibar.activateEditUrl
map gE Vomnibar.activateEditUrlInNewTab

" BTW Some Vomnibar commands have options like query and keyword,
" TODO_later: implement some maps with these options (at least as a working examples)

map / enterFindMode
map n performFind
map N performBackwardsFind
map * findSelected
map # findSelectedBackwards

map <c-o> goBack
map <c-i> goForward

map en showHelp
" BTW Vimium C have "showTip" which would be better to simulate messaging like :ec 'Use <a-N>'
" TODO_someday: Implement showTip or :echo too!
map <a-N> createTab
" my newer convention from neovim (should work more reliably in more modes)
" BTW looks like it overrides new chrome "split" window key, but I don't care - niri is better for two windows.
" TODO_someday: collect all new chrome features list (especially cool windows inside tabs is like vim)
" and allow to configure my own keybindings even if need to diverge Kopium code more from Vimium.

" map eN createTab window
" map eI createTab incognito
map eN showHelp
map eI showHelp
" Not needed, I have Super+B in niri. (and default chrome C-n and C-N for incognito)

" Experiment for superfast opening MOST needed stuff:
" map et createTab window https://translate.google.pl/?sl=en&tl=pl
" map eg createTab window https://grok.com
" BTW not needed much, I have more universal Super+Alt+B for niri -> mybookmarks (neovim pick)

" TODO: How to translate (or google, or any search engine) SELECTED text??

map <a-,> previousTab
map <a-.> nextTab

map qb visitPreviousTab
" BTW This is fastest and I treat chrome tabs as buffers anyway (H, L, ..)
" BTW it works across chrome windows too!
" BTW I tried to map vimlike <c-6> but it's taken by chrome keys
" (sometimes chrome just activated 6th tab anyway)
" UPDATE: TODO Better key for alternative tab, but first in neovim/neovide! (bigger exciting issue there, see myvirc)

map gH firstTab
" BTW also chrome Ctrl+1 (and same Alt+1)
map gL lastTab
" BTW also chrome Ctrl+9 (and same Alt+9)

map qn duplicateTab
map qp togglePinTab
map qmm toggleMuteTab
map qma toggleMuteTab all
map qmo toggleMuteTab other
map <a-m> toggleMuteTab
map <a-M> toggleMuteTab all
" BTW muting should work reliably no matter current "mode"

map q. removeTab
map qq removeTab
" Additional "drive by" shortcut for closing tabs with one hand
map <a-q> removeTab
" Another one hand key (nicer than c-w) and similar to niri closing apps with Super+Q

map <c-.> removeTab
" Let's try this too, should work even when input element is active (<a-q> does not)


map <a-Q> restoreTab
" Nice "Undo" after removeTab with <a-q>
" map <a-b> restoreTab
" Restoring should work reliably no matter current "mode"
" TODO: test and choose which keys I need for restoreTab

map <a-E> moveTabToNewWindow
" TODO: It would be VERY useful to have map <a-B> moveTabBackToLastWindow
" (or es like in neovim, maybe also new kind of split window??)
" Try to implement it??

" map qeH closeTabsOnLeft
" map qeL closeTabsOnRight
" map qeO closeOtherTabs
" Disabled temporarily because I too often have too much tabs open,
" and it's dangerous, also I guess I don't need it much for now.

map <a-\<> moveTabLeft
map <a-\>> moveTabRight
" BTW Nice when combined with a-, and a-. and a-q and a-Q

map zp setZoom level=1.5
map zi zoomIn
map zo zoomOut
map z0 zoomReset

map gs toggleViewSource

map ? showHelp

    `,
  linkHintCharacters: "sadfjklewcmpgh",
  linkHintNumbers: "0123456789",
  filterLinkHints: false,
  hideHud: false,
  hideUpdateNotifications: false,
  userDefinedLinkHintCss: `\
div > .vimiumHintMarker {
/* linkhint boxes */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FFF785),
  color-stop(100%,#FFC542));
border: 1px solid #E3BE23;
}

div > .vimiumHintMarker span {
/* linkhint text */
color: black;
font-weight: bold;
font-size: 12px;
}

div > .vimiumHintMarker > .matchingCharacter {
}\
`,
  // Default exclusion rules.
  exclusionRules: [
    // Disable Vimium on Gmail.
    // {
    //   passKeys: "",
    //   pattern: "https?://mail.google.com/*",
    // },
  ],

  // NOTE: If a page contains both a single angle-bracket link and a double angle-bracket link,
  // then in most cases the single bracket link will be "prev/next page" and the double bracket
  // link will be "first/last page", so we put the single bracket first in the pattern string so
  // that it gets searched for first.

  // "\bprev\b,\bprevious\b,\bback\b,<,‹,←,«,≪,<<"
  previousPatterns: "prev,previous,back,older,<,\u2039,\u2190,\xab,\u226a,<<",
  // "\bnext\b,\bmore\b,>,›,→,»,≫,>>"
  nextPatterns: "next,more,newer,>,\u203a,\u2192,\xbb,\u226b,>>",
  // default/fall back search engine
  searchUrl: "https://www.google.com/search?q=",
  // put in an example search engine
  /*
  TODO_maybe: hardcode my search engines in some nicer way?
      maybe with more autocompletion?? see: https://github.com/philc/vimium/pull/4091
  # My custom (same as in: chrome://settings/searchEngines)
  # TODO NOW: test custom engines and add some for grok, chatgpt, etc
  */
  searchEngines: `

x: https://x.com/search?q=%s&src=typed_query X Top
xl: https://x.com/search?q=%s&src=typed_query&f=live X Latest
xp: https://x.com/search?q=%s&src=typed_query&f=user X People
xm: https://x.com/search?q=%s&src=typed_query&f=media X Media
xx: https://x.com/i/grok?text=%s Grok XAi

cai: https://chatgpt.com/?q=%s&hints=search Closed AI ChatGPT

y: https://you.com/search?q=%s You.com
yc: https://you.com/search?q=%s&tbm=youchat You.com chat

g: https://www.google.com/search?q=%s Google
gl: https://www.google.com/search?q=%s&btnI I'm feeling lucky...
gk: https://keep.google.com/#search/text=%s
gm: https://www.google.pl/maps/search/%s?hl=en&source=opensearch Google Maps
yt: https://www.youtube.com/results?search_query=%s YouTube

gh: https://github.com/search?q=%s&ref=opensearch GitHub

t: https://translate.google.pl/?sl=en&tl=pl&text=%s Translate EN -> PL
tpl: https://translate.google.pl/?sl=pl&tl=en&text=%s Translate PL -> EN

acs: https://cs.android.com/search?q=%s&ss=androidx%2Fplatform%2Fframeworks%2Fsupport Android Code Search
ads: https://developer.android.com/s/results?q=%s Android Developer Search

mdn: https://developer.mozilla.org/en-US/search?q=%s MDN Web Docs

r: https://www.reddit.com/search/?q=%s Reddit
rc: https://www.reddit.com/search/?q=%s&type=communities Reddit Communities
rm: https://www.reddit.com/search/?q=%s&type=media Reddit Media
rp: https://www.reddit.com/search/?q=%s&type=people Reddit People

pwn: https://encyklopedia.pwn.pl/szukaj/%s.html Encyklopedia PWN

f: https://www.facebook.com/search/top?q=%s Facebook
fp: https://www.facebook.com/search/people?q=%s Facebook People
fpo: https://www.facebook.com/search/posts?q=%s Facebook Posts
fph: https://www.facebook.com/search/photos?q=%s Facebook Photos
fvd: https://www.facebook.com/search/videos?q=%s Facebook Videos
fmw: https://www.facebook.com/marketplace/warsaw/search?query=%s Facebook Market Place Warsaw
fmwr: https://www.facebook.com/marketplace/110145572342035/search?query=%s Facebook Market Place Wroclaw
fmbr: https://www.facebook.com/marketplace/106013599429326/search?query=%s Facebook Market Place Brzeg
fmop: https://www.facebook.com/marketplace/112476435434769/search?query=%s Facebook Market Place Opole

w: https://en.wikipedia.org/wiki/Special:Search?search=%s Wikipedia (en)
wpl: https://pl.wikipedia.org/wiki/Specjalna:Szukaj?search=%s Wikipedia (pl)

wyk: https://wykop.pl/szukaj/wszystkie/%s Wykop.pl
yah: https://search.yahoo.com/search?p=%s Yahoo
ago: https://www.allegro.pl/search.php?string=%s Allegro
amz: https://www.amazon.com/s/?field-keywords=%s Amazon

ddg: https://duckduckgo.com/?q=%s DuckDuckGo
msb: https://www.bing.com/search?q=%s Microsoft Bing
`,
    // More examples from Vimium
    // w: https://www.wikipedia.org/w/index.php?title=Special:Search&search=%s Wikipedia
    // g: https://www.google.com/search?q=%s Google
    // l: https://www.google.com/search?q=%s&btnI I'm feeling lucky...
    // y: https://www.youtube.com/results?search_query=%s Youtube
    // gm: https://www.google.com/maps?q=%s Google maps
    // b: https://www.bing.com/search?q=%s Bing
    // d: https://duckduckgo.com/?q=%s DuckDuckGo
    // az: https://www.amazon.com/s/?field-keywords=%s
    // qw: https://www.qwant.com/?q=%s Qwant\

  newTabDestination: newTabDestinations.customUrl, // Kopium: needs to be frozen as customUrl, also for redirect.js

  // TODO my own black, dark, light, white, etc mini html only pages (with/without offline service workers??)
  // newTabCustomUrl: "https://scaulfield7.github.io/html-only-website-in-dark-mode/",
  newTabCustomUrl: "https://mareklangiewicz.pl/Kopium/board/", // defined here in kopium project, published by github actions.
  // newTabCustomUrl: "https://vimium.github.io/new-tab/", // from yet another: https://github.com/vimium/vimium.github.io 
  // newTabCustomUrl: "chrome://new-tab-page",
  // newTabCustomUrl: "chrome://newtab", // same as about:newtab ; DO NOT use to redirect new tab - potential loop!
  // newTabCustomUrl: "chrome://about", // nice list of all? chrome special pages, but not as new tab page

  openVomnibarOnNewTabPage: true,
  grabBackFocus: false,
  regexFindMode: false,
  waitForEnterForFilteredHints: true,
  helpDialog_showAdvancedCommands: false,
  ignoreKeyboardLayout: false,
};

const frozenOptions = {
  keyMappings: defaultOptions.keyMappings, 
  newTabDestination: defaultOptions.newTabDestination,
  newTabCustomUrl: defaultOptions.newTabCustomUrl,
  // TODO: other that should be frozen
};

/*
 * This class fetches and exposes the view over Vimium's settings data, which is stored in
 * chrome.storage. It merges the user's customizations into the default setting values.
 * It dispatches the "change" event when the settings have been changed.
 */
const Settings = {
  _settings: null,
  _chromeStorageListenerInstalled: false,

  defaultOptions,
  frozenOptions, // TODO: use it to disable these options on options page
  newTabDestinations,
  vimiumNewTabPageUrl,

  async onLoaded() {
    if (!this.isLoaded()) {
      await this.load();
    }
  },

  async chromeStorageOnChanged(_changes, area) {
    // We store data with keys [settings-v1, ...] into the local storage. Only broadcast an event if
    // the object stored with the settings key has changed.
    // We only store settings in the sync area, so storage.sync changes must be settings changes.
    if (area == "sync") {
      await this.load();
      this.dispatchEvent("change");
    }
  },

  async load() {
    // NOTE(philc): If we change the schema of the settings object in a backwards-incompatible way,
    // then we can fetch the whole storage object here and migrate any old settings the user has to
    // the new schema.
    if (!this._chromeStorageListenerInstalled) {
      this._chromeStorageListenerInstalled = true;
      chrome.storage.onChanged.addListener((changes, area) =>
        this.chromeStorageOnChanged(changes, area)
      );
    }

    let result = await chrome.storage.sync.get(null); // Get every key.
    result = this.migrateSettingsIfNecessary(result);
    result["settingsVersion"] = Utils.getCurrentVersion();
    this._settings = Object.assign(globalThis.structuredClone(defaultOptions), result, frozenOptions);
  },

  isLoaded() {
    return this._settings != null;
  },

  get(key) {
    if (!this.isLoaded()) {
      throw new Error(`Getting the setting ${key} before settings have been loaded.`);
    }
    return globalThis.structuredClone(this._settings[key]);
  },

  async set(key, value) {
    if (!this.isLoaded()) {
      throw new Error(`Writing the setting ${key} before settings have been loaded.`);
    }
    this._settings[key] = value;
    await this.setSettings(this._settings);
  },

  getSettings() {
    return globalThis.structuredClone(this._settings);
  },

  migratePre2_0(settings) {
    // Prior to Vimium version 2.0.0:
    // - In chrome.storages.sync, the value of each setting was encoded as a JSON string using
    //   JSON.stringify. This was probably an artifact of originally using localStorage, but is no
    //   longer necessary now that chrome.storage exists and can store objects. Note that when
    //   exporting a backup of settings on the options page, the values were not encoded as JSON
    //   strings.
    // - We only stored the settingsVersion key in the JSON payload when a user exported a backup of
    //   their settings. It wasn't set when writing the settings to chrome.storage.sync.

    // NOTE(philc): We want to migrate settings which have JSON-encoded values. Based on the notes
    // above, that should mean we only need to migrate if the settings object is missing a
    // "settingsVersion" key.
    const shouldMigrate = settings["settingsVersion"] == null;
    if (!shouldMigrate) return settings;

    // Migration for v2.0.0: decode all values so that they're not JSON string encoded.
    const newSettings = {};
    for (const [k, v] of Object.entries(settings)) {
      // Most pre-2.0 settings were strings, but the global marks were stored as native values. See
      // #4323. So check the setting value's type before migrating.
      if (typeof v === "string") {
        newSettings[k] = JSON.parse(v);
      } else {
        newSettings[k] = v;
      }
    }
    // This key is no longer stored in our settings, but rather chrome.storage.session.
    delete newSettings.passNextKeyKeys;
    return newSettings;
  },

  migratePre2_4(settings) {
    const version = settings["settingsVersion"];
    // In 2.4 we added some new settings which control the URL that new tabs are opened in.
    const shouldMigrate = version && (Utils.compareVersions(version, "2.4") < 0);
    if (!shouldMigrate) return settings;
    const previousDefaultNewTabUrl = "about:newtab";
    if (settings.newTabUrl == previousDefaultNewTabUrl) {
      settings.newTabDestination = newTabDestinations.browserNewTabPage;
    } else if (settings.newTabUrl == "pages/blank.html") {
      // This was meant to be used as a blank page, but we no longer include this page in Vimium.
      // We use "vimium.github.io/new-tab/" instead.
      settings.newTabDestination = newTabDestinations.vimiumNewTabPage;
    } else if (settings.newTabUrl) {
      // It's some other custom URL the user has set.
      settings.newTabDestination = newTabDestinations.customUrl;
      settings.newTabCustomUrl = settings.newTabUrl;
    }
    delete settings.newTabUrl;
    return settings;
  },

  // Returns a settings object and performs any migrations required if the settings object is from
  // an older version of Vimium.
  migrateSettingsIfNecessary(settings) {
    settings = this.migratePre2_0(settings);
    settings = this.migratePre2_4(settings);
    return settings;
  },

  async setSettings(settings) {
    settings = this.migrateSettingsIfNecessary(settings);
    settings["settingsVersion"] = Utils.getCurrentVersion();
    const result = this.pruneOutDefaultValues(settings);
    // If, after pruning, some keys were removed because their values are now equal to the default
    // values, then explicitly clear those from storage. Otherwise they will remain.
    // NOTE(philc): This kind of sharp edge is a reason to switch to storing the settings object as
    // one big object, rather than as top-level keys in chrome.storage. The tradeoff is that each
    // value in chrome-storage has a maximum size.
    const resultKeys = Object.keys(result);
    const removedKeys = Object.keys(settings).filter((key) => !resultKeys.includes(key));
    await chrome.storage.sync.remove(removedKeys);
    await chrome.storage.sync.set(result);
    await this.load();
  },

  // Returns a new object, removing the keys from `settings` which are equal to the default values
  // for those keys.
  pruneOutDefaultValues(settings) {
    const clonedSettings = globalThis.structuredClone(settings);
    for (const [k, v] of Object.entries(settings)) {
      if (JSON.stringify(v) == JSON.stringify(defaultOptions[k])) {
        delete clonedSettings[k];
      }
    }
    return clonedSettings;
  },

  // Used only by tests.
  async clear() {
    this._settings = null;
    await chrome.storage.sync.clear();
  },
};

Object.assign(Settings, EventDispatcher);

globalThis.Settings = Settings;
