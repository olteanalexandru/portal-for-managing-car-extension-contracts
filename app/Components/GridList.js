

/**
 * Creates a table using Grid.js library and returns the table container element.
 * @returns {HTMLElement} The table container element.
 */


let refreshBtnTrigger = () => {
  const refBtn = document.getElementById("refresh-button");
  refBtn.click();
};

const createTable = (brand, filterCriteria = {}, language) => {
  const brandInfo = brands[brand];
  if (!language) {
    language = currentLanguage;
  }
  const filteredData = data.filter((row) => {
    let matches = true;
    if (filterCriteria.model) {
      matches = matches && row[12] === filterCriteria.model;
    }

    //version is a boolean so if it were to pass as false it would be filtered out so we need to check if it is null
    if (filterCriteria.version !== undefined && filterCriteria.version !== null) {
      matches = matches && row[8] === filterCriteria.version;

    }
    if (filterCriteria.startdate) {
      let inputDate = new Date(filterCriteria.startdate);
      let rowDate = new Date(row[6]);

      matches = matches && rowDate >= inputDate;
    }
    if (filterCriteria.enddate) {
      let inputDate = new Date(filterCriteria.enddate);
      let rowDate = new Date(row[6]);
      matches = matches && rowDate <= inputDate;
    }
    return matches;
  });

  let tableContainer = document.createElement('div');
  tableContainer.id = 'table-container';

  // Apply brand-specific styles
  tableContainer.style.padding = '0px';
  tableContainer.style.margin = '0px';
  tableContainer.style.border = 'none';
  tableContainer.style.borderColor = 'white';

  tableContainer.style.fontFamily = brandInfo.font;
  tableContainer.style.color = brandInfo.color;

  const getStatusSpan = (status) => {
    let translatedStatus = translations[language]['In Progress'];
    let bgColor = '#FFC80A';

    if (status && status.trim() !== '') {
      translatedStatus = columnTranslations[language][status.trim()] || translatedStatus; // default to 'In Progress' if status doesn't match 'Completed' or 'Declined'
      switch (status.trim()) {
        case 'Completed':
          bgColor = '#107C10';
          break;
        case 'DECLINED':
        case 'Declined':
          bgColor = '#A4262C';
          break;
        default:
          bgColor = 'rgba(0, 0, 0, 0.4)';
      }
    }

    return gridjs.h(
      'span',
      {
        style: {
          padding: '5px 40px',
          fontSize: '12px',
          borderRadius: '100px',
          backgroundColor: bgColor,
          color: 'white',
          fontWeight: '700',
          textTransform: 'uppercase',
          wordWrap: 'break-word',
        },
      },
      translatedStatus
    );
  };


  // Language translations (will be moved to a separate file)
  const translations = {
    en: {
      search: {
        placeholder: 'Search...',
      },
      pagination: {
        previous: 'Previous',
        next: 'Next',
        'showing': 'Showing',
        'results': 'results',
        'of': ' of ',
        'to': ' to'
      },
      noRecordsFound: 'Nessun record trovato.',
      'In Progress': 'In Progress',
      'See more': 'See more',
      'Completed': 'Completed',
      'Declined': 'Declined',
    },
    it: {
      search: {
        placeholder: 'Cerca...',
      },
      pagination: {
        previous: 'Precedente',
        next: 'Successivo',
        showing: 'Mostrando',
        results: 'risultati',
        of: ' di ',
        to: ' a '
      },
      noRecordsFound: 'Nessun record trovato.',
      'In Progress': 'In corso',
      'See more': 'Vedi di più',
      'Completed': 'Completato',
      'Declined': 'Rifiutato',
    },
    fr: {
      search: {
        placeholder: ' Recherche...',
      },
      pagination: {
        previous: 'Précédent',
        next: 'Suivant',
        'showing': 'Affichage des résultats',
        'results': 'résultats',
        'of': ' sur ',
        'to': ' à'
      },
      noRecordsFound: 'Aucun enregistrement trouvé.',
      'In Progress': 'En cours',
      'See more': 'Voir plus',

    },
    de: {
      search: {
        placeholder: ' Suche...',
      },
      pagination: {
        previous: 'Zurück',
        next: 'Nächster',
        'showing': 'Anzeige von Ergebnissen.',
        'results': 'Ergebnisse',
        'of': ' von ',
        'to': ' bis'

      },
      noRecordsFound: 'Keine Datensätze gefunden',
      'In Progress': 'In arbeit',
      'See more': 'Mehr sehen',

    },
  };

  const columnTranslations = {
    en: {
      'Request number': 'Request number',
      'Customer Name': 'Customer Name',
      Model: 'Model',
      VIN: 'VIN',
      Date: 'Date',
      Status: 'Status',
      'In Progress': 'In Progress',
      'Completed': 'Completed',
      'Declined': 'Declined',
      'DECLINED': 'Declined',
    },
    it: {
      'Request number': 'Numero di richiesta',
      'Customer Name': 'Nome del cliente',
      Model: 'Modello',
      VIN: 'VIN',  // VIN is a vehicle identification number, typically not translated.
      Date: 'Data',
      Status: 'Stato',
      'In Progress': 'In corso',
      'Completed': 'Completato',
      'Declined': 'Rifiutato',
      'DECLINED': 'Rifiutato',
    },
    fr: {
      'Request number': 'Numéro de demande',
      'Customer Name': 'Nom du client',
      Model: 'Modèle',
      VIN: 'VIN',
      Date: 'Date',
      Status: 'Statut',
      'In Progress': 'En cours',
      'Completed': 'Terminé',
      'Declined': 'Refusé',
      'DECLINED': 'Refusé',
    },
    de: {
      'Request number': 'Anfragenummer',
      'Customer Name': 'Kundenname',
      Model: 'Modell',
      VIN: 'VIN',
      Date: 'Datum',
      Status: 'Status',
      'In Progress': 'In arbeit',
      'Completed': 'Erledigt',
      'Declined': 'Abgelehnt',
      'DECLINED': 'Abgelehnt',
    },
  };

  const grid = new gridjs.Grid({
    columns: [
      { id: 'type', name: ''},
      { id: 'customerName', name: columnTranslations[language]['Customer Name'] },
      { id: 'model', name: columnTranslations[language].Model },
      { id: 'vin', name: columnTranslations[language].VIN },
      { id: 'date', name: columnTranslations[language].Date },
      {
        id: 'status',
        name: columnTranslations[language].Status,
        formatter: (cell) => getStatusSpan(cell),
      },
      {
        id: 'actions',
        name: gridjs.h(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
            },
          },
          [
            ' ',
            gridjs.h(
              'button',
              {
                className: 'btn btn-refresh rounded',
                id: "refresh-button",
                style: {
                  border: 'none',
                  background: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  fontSize: '12px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                },
                onClick: async () => {
                  try {
                    //class gridjs-container displays none
                    document.getElementsByClassName('gridjs-container')[0].style.display = 'none';
                    const loadingElement = document.getElementById('loading');
                    loadingElement.style.display = 'block';
                    await acquireToken(tokenRequest);
                    // Update the grid
                    grid.forceRender();
                    // Update the table container element
                    let newTableContainer = await createTable(brand, filterCriteria, language);
                    tableContainer.parentNode.replaceChild(newTableContainer, tableContainer);
                    tableContainer = newTableContainer;
                    // Update the filter criteria
                    filterCriteria.model = document.getElementById('model')?.value || filterCriteria.model;
                    filterCriteria.version = document.getElementById('version')?.value || filterCriteria.version;
                    filterCriteria.startdate = document.getElementById('startdate')?.value || filterCriteria.startdate;
                    filterCriteria.enddate = document.getElementById('enddate')?.value || filterCriteria.enddate;
                    document.getElementsByClassName('gridjs-container')[0].style.display = 'block';
                    loadingElement.style.display = 'none';
                  } catch (error) {
                    console.error(error);
                  }
                },
              },
              gridjs.h('i', { className: 'fa fa-refresh' })
            ),
          ]
        ),
        formatter: (cell, row) => {
          if (row.cells[3].data === 'Completed') {
            return gridjs.h(
              'div',
              {
                style: {
                  fontWeight: 'bold',
                  color: 'grey',
                },
              },
              'Locked'
            );
          } else {
            return gridjs.h(
              'div',
              { style: { display: 'flex', gap: '10px' } },
              [
                gridjs.h(
                  'button',
                  {
                    ...brandInfo.buttonStyle,

                    ...brandInfo.buttonStyle.brandHoverBehavior,

                    onClick: () => {
                      const SeeMoreform = document.getElementById('see-more-modal');
                      //scroll to the top of the current page
                      window.scrollTo(0, 0);

                      if (row && row.cells) {
                        const rowData = row.cells.map((cell) => cell.data);
                        SeeMoreform.dataset.rowId = rowData[rowData.length - 1]; // rowData[rowData.length - 1] is the ID
                        fillFormWithData(SeeMoreform.dataset.rowId).then(() => {
                          SeeMoreModal.show();
                        });
                      } else {
                        console.error('Row data is not available');
                      }
                    },
                  },
                  translations[language]['See more']
                ),
              ]
            );
          }
        },
      },
    ],

    data: filteredData.sort((a, b) => b[0] - a[0]).map((row) => [
      row[8] ?  translator.translateForKey("grid.data.contractType_Extension") : translator.translateForKey("grid.data.contractType_Contract"),
      row[2],
      row[12],
      row[16],
      (() => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(row[13]).toLocaleString(undefined, options);
      })(),
      row[23],
      row[0]
    ]),

    search: true,
    language: translations[language],
    pagination: {
      enabled: true,
      limit: 10,
      summary: true
    },
    row: {
      style: (record) => {
        return {
          fontFamily: brandInfo.font,
          color: brandInfo.color,
          borderLeft: 'none',
          borderRight: 'none',
          border: 'none',
          borderCollapse: 'collapse',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        };
      },
    },
    style: brandInfo.tableStyle,
    className: {
      footer: 'experimental-classname',
    },
  });

  // Create the wrapper
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';

  // Append the table container to the wrapper
  wrapper.appendChild(tableContainer);

  // Render the grid
  grid.render(tableContainer);

  return wrapper;
};
