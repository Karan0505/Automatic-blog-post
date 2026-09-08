export interface NavLinkItem {
  id?: number;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface HeaderData {
  id?: number;
  documentId?: string;
  siteName?: string;
  siteSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  navLinks?: NavLinkItem[];
}
