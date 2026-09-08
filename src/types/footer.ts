import { NavLinkItem } from './header';

export interface FooterData {
  id?: number;
  documentId?: string;
  description?: string;
  column1Title?: string;
  column1Links?: NavLinkItem[];
  column2Title?: string;
  column2Links?: NavLinkItem[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterButtonText?: string;
  copyrightText?: string;
  twitterUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}
