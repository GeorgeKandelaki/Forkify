import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupPreview('next', curPage);

    // Last page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupPreview('prev', curPage);

    // Other page
    if (curPage < numPages) {
      return [
        this._generateMarkupPreview('prev', curPage),
        this._generateMarkupPreview('next', curPage),
      ].join('');
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupPreview(type, page) {
    if (type === 'prev')
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
    `;

    if (type === 'next')
      return `
         <button data-goto="${
           page + 1
         }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${page + 1}</span>
        </button>

    `;
  }
}

export default new PaginationView();
