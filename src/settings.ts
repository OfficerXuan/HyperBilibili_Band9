import { storage } from "./tsimports"

interface SettingsInterface {
  fresh_type: number;
  home_vid_count: number;
  enableFullAnimation: boolean;
  enableInterconnectMode: boolean;
}

export let SETTINGS: SettingsInterface = {
  fresh_type: 3, //视频推荐相关度，范围1-3，根据大数据推送
  home_vid_count: 10,
  enableFullAnimation: false,
  enableInterconnectMode: true
};

export function loadSettings(): void {
  storage.get({
    key: 'settings',
    success: function (data) {
      if (data) {
        const storedSettings = JSON.parse(data);
        SETTINGS = {
          ...SETTINGS,
          ...storedSettings
        };
      }
      console.log('Settings loaded:', SETTINGS);
    },
    fail: function (data, code) {
      console.log(`Failed to load settings, code = ${code}`);
    }
  });
}

export function saveSettings(params: Partial<SettingsInterface>): void {
  SETTINGS = {
    ...SETTINGS,
    ...params
  };
  storage.set({
    key: 'settings',
    value: JSON.stringify(SETTINGS),
    success: function () {
      console.log('Settings saved successfully');
    },
    fail: function (data, code) {
      console.log(`Failed to save settings, code = ${code}`);
    }
  });
}