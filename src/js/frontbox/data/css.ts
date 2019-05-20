const root  : Element               = document.querySelector( ':root' );
const CSS   : CSSStyleDeclaration   = window.getComputedStyle( root );

export const breakpointsDefault = {
   desktop:    Number( CSS.getPropertyValue("--desktop") ),
   tablet:     Number( CSS.getPropertyValue("--tablet") ),
   fablet:     Number( CSS.getPropertyValue("--fablet") ),
   mobile:     Number( CSS.getPropertyValue("--mobile") ),
}

export const breakpointsHeader = {
   desktop:    Number( CSS.getPropertyValue("--headerDesktop") ),
   tablet:     Number( CSS.getPropertyValue("--headerTablet") ),
   fablet:     Number( CSS.getPropertyValue("--headerFablet") ),
   mobile:     Number( CSS.getPropertyValue("--headerMobile") ),
}