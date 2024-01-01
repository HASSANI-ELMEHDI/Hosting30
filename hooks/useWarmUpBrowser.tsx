import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
//to warm up the browser when we do the sign in the browser comes up faster in android
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};