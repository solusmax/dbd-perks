import { DOCUMENT_TITLE } from '../consts';
import i18next from 'i18next';

export const setDocumentTitle = (title: string) => {
  document.title = `${title} | ${DOCUMENT_TITLE}`;
}

export const changeLanguage = (language: string) => {
  void i18next.changeLanguage(language);
};
