/*
 * Copyright 2021 Canopy Pte Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// export const isMobile = () => window.innerWidth <= 425;
// export const getDeviceType = () => {
//     return isMobile() ? 'mobile' : 'desktop';
// };

import { useMediaQuery } from "@chakra-ui/react";

export const checkForMobile = () => {
  const deviceType = getDeviceType();
  return deviceType === "mobile";
};
export const checkForMobileOrTablet = () => {
  const deviceType = getDeviceType();
  return deviceType === "mobile" || deviceType === "tablet";
};
// export const isTablet = () =>
//     useMediaQuery('(min-width: 768px) and (max-width: 991px)')?.[0];
// export const isDesktop = () =>
//     useMediaQuery('(min-width: 992px) and (max-width: 1199px)')?.[0];
// export const isLargeMonitor = () =>
//     useMediaQuery('(min-width: 1200px) and (max-width: 1919px)')?.[0];
// export const isWideMonitor = () =>
//     useMediaQuery('(min-width: 1200px) and (max-width: 1919px)')?.[0];

export const getDeviceType = () => {
  // const [
  //     isMobile,
  //     isTablet,
  //     isDesktop,
  //     isLargeMonitor,
  //     isWideMonitor,
  // ] = useMediaQuery([
  //     '(max-width: 767px)',
  //     '(min-width: 768px) and (max-width: 991px)',
  //     '(min-width: 992px) and (max-width: 1199px)',
  //     '(min-width: 1200px) and (max-width: 1919px)',
  //     '(min-width: 1200px) and (max-width: 1919px)',
  // ]);
  try {
    // if (isMobile) {
    //     return 'mobile';
    // }
    // if (isTablet) {
    //     return 'tablet';
    // }
    return "desktop";
  } catch (error) {
    console.log(error);
    return "desktop";
  }
};
