import { DOCUMENT_TITLE } from '../consts';

export const setDocumentTitle = (title: string) => {
  document.title = `${title} | ${DOCUMENT_TITLE}`;
}
