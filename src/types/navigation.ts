/**
 * Shared navigation types.
 * Used by the off-canvas menu and (later) the desktop header / footer columns.
 */

export type SocialPlatform =
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'pinterest'
  | 'instagram';

export interface NavItem {
  /** Display label shown in the menu */
  label: string;
  /** Destination path (internal route or absolute URL) */
  href: string;
  /**
   * If present, the row renders an accordion toggle in addition to the label link.
   * Matching the original Genesis theme: only one sub-menu open at a time.
   */
  children?: NavItem[];
}

export interface SocialLink {
  /** Identifier used to pick the matching icon */
  name: SocialPlatform;
  /** Target URL — http(s) links open in a new tab */
  href: string;
}