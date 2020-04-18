const func = () => {
  const table = document.querySelector('.func__table-body'),
        rows = table.querySelectorAll('.func__row'),
        inputs = [
          document.querySelector('input[data-name="code"]'),
          document.querySelector('input[data-name="desc"]'),
          document.querySelector('input[data-name="kt"]'),
          document.querySelector('input[data-name="pos"]'),
          document.querySelector('input[data-name="group"]'),
          document.querySelector('input[data-name="avalible"]')
        ];

  rows.forEach((row, index) => {
    const rowObj = {
      index,
      checked: row.querySelector('.func__checkbox-cell').checked ? true : false,
      code: row.querySelector('.func__cell_code').textContent.toLowerCase(),
      desc: row.querySelector('.func__cell_desc').textContent.toLowerCase(),
      kt: row.querySelector('div[data-name="kt"]').textContent.toLowerCase(),
      pos: row.querySelector('div[data-name="pos"]').textContent.toLowerCase(),
      group: row.querySelector('div[data-name="group"]').textContent.toLowerCase(),
      avalible: row.querySelector('div[data-name="avalible"]').textContent.toLowerCase(),
      filtered: true,
      hide: () => row.style.display = 'none',
      show: () => row.style.display = 'flex'
    };
    scope.list.push(rowObj);
  });

  const showAll = () => {
    scope.list.forEach(row => {
      row.filtered = true;
      row.show();
    });
  }
  const hideFalse = () => {
    scope.list.forEach(row => {
      !row.filtered && row.hide();
    })
  }
  const toFilter = () => {
    let {listFilter, list, isListFiltered} = scope;
    showAll();
    isListFiltered = false;
    for (let term in listFilter) {
      if (listFilter[term] !== '') {
        isListFiltered = true;
        list.forEach(row => {
          if (row.filtered) {
            if (!row[term].includes(listFilter[term])) row.filtered = false;
          }
        });
      }
    }
    isListFiltered && hideFalse();
  }

  inputs.forEach(input => input.addEventListener('keyup', () => {
    scope.listFilter[input.getAttribute('data-name')] = input.value.toLowerCase();
    toFilter();
  }));

  const mainCheckbox = document.querySelector('#func-header-row'),
        checkboxes = document.querySelector('.func__table-body').querySelectorAll('.func__checkbox-real');

  mainCheckbox.addEventListener('click', () => {
    if (mainCheckbox.checked) {
      checkboxes.forEach(input => input.checked = true);
    } else {
      checkboxes.forEach(input => input.checked = false);
    }
  });
  const roolUpTabs = (wrap) => {
    const btn = wrap.querySelector('.icon-angle-up'),
          prefix = wrap.getAttribute('class').substring(0, wrap.getAttribute('class').indexOf('__')),
          header = wrap.querySelector(`.${prefix}__header`);
    const lowPart = [...wrap.children].filter(node => node !== header);
    let isOpen = true;

    btn.addEventListener('click', () => {
      if (isOpen) {
        btn.style.transform = 'rotateZ(180deg)';
        lowPart.forEach(section => section.style.display = 'none');
        isOpen = false;
      } else {
        btn.style.transform = 'rotateZ(0deg)';
        lowPart.forEach(section => section.style.display = 'flex');
        isOpen = true;
      }
    });
  }

  roolUpTabs(document.querySelector('.func__wrap'));
  roolUpTabs(document.querySelector('.list__wrap'));
}

document.querySelector('.func') && func();