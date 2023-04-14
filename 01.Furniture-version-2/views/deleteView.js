import { del } from '../api.js';
import page from '../node_modules/page/page.mjs';

export function onClick(e) {
  const confirmDeletion = confirm(
    'Are you sure you want delete this furniture'
  );

  if (confirmDeletion) {
    del(`/data/catalog/${e.target.id}`);
    page.redirect('/');
  }
}