import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.io.vteen.v2',
  appName: 'VTeen Pro',
  webDir: 'dist',
  server: {
    // Để trống url để chạy app React local. 
    // Nếu muốn load thẳng website thì điền: 'https://vteen.io.vn'
    cleartext: false
  },
  ios: {
    contentInset: 'never',
    backgroundColor: '#050510',
    allowsLinkPreview: false,
    preferences: {
      AllowsInlineMediaPlayback: 'true',
      AllowsPictureInPictureMediaPlayback: 'true',
      MediaPlaybackRequiresUserAction: 'false',
    }
  }
};

export default config;
