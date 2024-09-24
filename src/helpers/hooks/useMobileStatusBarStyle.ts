/* Framework imports -------------------------------------------------------- */
import { useEffect } from 'react'

/* Type declarations -------------------------------------------------------- */
/**
 * - The `default` setting has a white background with black text and symbols.
 * - The `black` setting has a black background and black text and symbols,
 *   making it appear completely black.
 *   If you do not use the status bar meta tag,
 *   this is what status bar will look like.
 * - The `black-translucent` setting has white text and symbols,
 *   and will take the same background color as the body of your web app.
 *   Unfortunately, the text color will remain white
 *   even if you use a light background color.
 *
 * f set to default or black, the web content is displayed below the status bar.
 * If set to black-translucent, the web content is displayed on the entire screen,
 * partially obscured by the status bar.
 *
 * The default value is default.
 *
 * See : https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
 */
type IOSStatusBarTheme = 'black-translucent' | 'black' | 'default'

/* Internal variables ------------------------------------------------------- */
const IOS_STATUS_BAR_STYLE_TAG_NAME = 'apple-mobile-web-app-status-bar-style'
const IOS_WEB_APP_CAPABLE_TAG_NAME = 'apple-mobile-web-app-capable'

/* Mobile status bar style helper functions --------------------------------- */
const setIOSStatusBarTheme = (pStatusBarTheme: IOSStatusBarTheme = 'default'): void => {
  const headElement: HTMLHeadElement = document.getElementsByTagName('head')[0]
  let lStatusBarThemeMetaTag: HTMLMetaElement | null = document.querySelector(`meta[name=${IOS_STATUS_BAR_STYLE_TAG_NAME}]`)
  let lWebAppCapableMetaTag: HTMLMetaElement | null = document.querySelector(`meta[name=${IOS_WEB_APP_CAPABLE_TAG_NAME}]`)

  if (lWebAppCapableMetaTag === null) {
    lWebAppCapableMetaTag = document.createElement<'meta'>('meta')
    lWebAppCapableMetaTag.setAttribute(
      'name',
      IOS_WEB_APP_CAPABLE_TAG_NAME,
    )

    headElement.appendChild(lWebAppCapableMetaTag)
  }

  if (lWebAppCapableMetaTag.content !== 'yes') {
    lWebAppCapableMetaTag.setAttribute(
      'content',
      'yes',
    )
  }

  if (lStatusBarThemeMetaTag === null) {
    lStatusBarThemeMetaTag = document.createElement<'meta'>('meta')
    lStatusBarThemeMetaTag.setAttribute(
      'name',
      IOS_STATUS_BAR_STYLE_TAG_NAME,
    )

    headElement.appendChild(lStatusBarThemeMetaTag)
  }

  lStatusBarThemeMetaTag.setAttribute(
    'content',
    pStatusBarTheme,
  )
}

/* useMobileStatusBarStyle hook --------------------------------------------- */
export const useMobileStatusBarStyle = (pStatusBarTheme: IOSStatusBarTheme = 'default'): void => {
  useEffect(() => {
    setIOSStatusBarTheme(pStatusBarTheme)
  }, [ pStatusBarTheme ])
}
