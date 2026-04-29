import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vn.io.vteen.premium',
  appName: 'VTeen Premium',
  webDir: 'dist',
  server: {
    url: 'https://vteen-pro-max.loca.lt',
    cleartext: true
  },
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
