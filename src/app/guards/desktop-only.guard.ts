import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

function isBlockedMobilePlatform(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const userAgentData = (navigator as Navigator & {
    userAgentData?: { mobile?: boolean };
  }).userAgentData;
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  if (userAgentData?.mobile) {
    return true;
  }

  const isAndroid = /Android/i.test(userAgent);
  const isIphoneOrIpod = /iPhone|iPod/i.test(userAgent);
  const isIpad = /iPad/i.test(userAgent);
  const isModernIpadOs = /Macintosh/i.test(userAgent) && maxTouchPoints > 1;

  const isTabletAndroid =
    isAndroid && !/Mobile/i.test(userAgent);

  const isGenericMobile =
    /Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const isTouchTabletPlatform =
    /Android/i.test(platform) ||
    (/Linux/i.test(platform) && isAndroid) ||
    (/Mac/i.test(platform) && maxTouchPoints > 1);

  return (
    isAndroid ||
    isIphoneOrIpod ||
    isIpad ||
    isModernIpadOs ||
    isTabletAndroid ||
    isGenericMobile ||
    isTouchTabletPlatform
  );
}

export const desktopOnlyGuard: CanMatchFn = () => {
  const router = inject(Router);

  return isBlockedMobilePlatform() ? router.parseUrl('/demo-desktop') : true;
};
