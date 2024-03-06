const brands = {
  Peugeot: {
    font: "'Peugeot New', sans-serif",
    color: "#0074e8",
    tagline: "Motion & Emotion",
    buttonColor: "#0074e8",
    headerColor: "#FFFFFF",
    tableStyle: {
      table: {
        border: 'none',
        borderCollapse: 'collapse',
      },

      th: {
        backgroundColor: 'black',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: '14px',
        color: '#fff',
        fontFamily: 'Peugeot New',
        wordWrap: 'break-word',
        marginLeft: '100px',
      },
      td: {
        height: '40px',
        justifyContent: 'center',
        alignItems: 'start',
        border: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        fontSize: '14px',
        color: '#000',
        fontFamily: 'Peugeot New',
        fontWeight: '400',
        lineHeight: '24px',
        wordWrap: 'break-word',
      },
      pagination: {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        padding: '10px 0px',
        fontSize: '12px',
        color: '#0074e8',
      },
      search: {
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '18px 0px',
        fontSize: '12px',
        color: '#0074e0',
      },
    },
    buttonStyle: {
      type: 'button',
      className: 'btn btn-info rounded',
      style: {
        padding: '5px 10px',
        fontSize: '16px',
        backgroundColor: '#0074e8',
        color: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'left',
        gap: 10,
        display: 'inline-flex',
        border: 'none',
      },
      onMouseEnter: (event) => {
        event.target.style.background = 'black';
      },
      onMouseLeave: (event) => {
        event.target.style.background = '#0074e8';
      },
    },
  },

  Citroen: {
    font: "'Citroen Type', sans-serif",
    color: "green",
    tagline: "Wir leben Autos",
    buttonColor: "black",
    headerColor: "white",
    tableStyle: {
      table: {
        border: 'none',
        borderCollapse: 'collapse',
      },
      th: {
        backgroundColor: '#3B3938',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '20px',
        paddingLeft: '40px',
        fontWeight: '700',
        fontSize: '20px',
        color: 'white',
        fontFamily: 'Citroen Type',
        wordWrap: 'break-word',
        width: 'var(--width)',

      },
      td: {
        height: '20px',
        justifyContent: 'center',
        alignItems: 'start',
        fontWeight: '500',
        gap: '35px',
        border: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        fontSize: '18px',
        color: '#3B3938',
        fontFamily: 'Citroen Type',
        lineHeight: '20px',
        padding: '7px 10px',
        paddingLeft: '40px',
      },
      pagination: {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        padding: '10px 0px',
        fontSize: '12px',
        color: '#0074e8',
      },
      search: {
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '10px 0px',
        color: '#787B80',
        fontSize: '14px',
        fontFamily: 'Citroen Type',
        fontWeight: '400',
        wordWrap: 'break-word',
      },
    },
    buttonStyle: {
      type: 'button',
      className: 'btn ',
      style: {
        padding: '5px 20px',
        fontSize: '18px',
        backgroundColor: '#57718A',
        color: 'white',
        fontWeight: '500',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex',
        borderRadius: '100px',

      },
      onMouseEnter: (event) => {
        event.target.style.background = 'black';
      },
      onMouseLeave: (event) => {
        event.target.style.background = '#57718A';
      },
    },
  },

  Opel: {
    font: "'Opel Next', sans-serif",
    color: "rgba(247, 255, 20, 0.6)",
    tagline: "Wir leben Autos",
    buttonColor: "black",
    headerColor: "white",
    tableStyle: {
      table: {
        border: 'none',
        borderCollapse: 'collapse',
      },
      th: {
        backgroundColor: 'black',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '20px',
        fontWeight: '500',
        fontSize: '24px',
        color: 'white',
        fontFamily: 'Opel Next',
        wordWrap: 'break-word',
        width: 'var(--width)',
        textAlign: 'center',
      },
      td: {
        height: '40px',
        justifyContent: 'center',
        alignItems: 'start',
        fontWeight: '400',
        gap: '35px',
        border: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        fontSize: '18px',
        color: '#787B80',
        fontFamily: 'Opel Next',
        lineHeight: '24px',
      },
      pagination: {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        padding: '10px 0px',
        fontSize: '12px',
        color: '#0074e8',
      },
      search: {
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '10px 0px',
        color: '#787B80',
        fontSize: '14px',
        fontFamily: 'Opel Next',
        fontWeight: '400',
        wordWrap: 'break-word',
      },
    },
    buttonStyle: {
      type: 'button',
      className: 'btn ',
      style: {
        padding: '5px 10px',
        fontSize: '12px',
        backgroundColor: 'black',
        color: 'white',
        width: '100%',
        height: '100%',
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 11,
        paddingBottom: 11,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex',
        borderRadius: '0px',
      },
      onMouseEnter: (event) => {
        event.target.style.background = 'Yellow';
        event.target.style.color = 'black';
      },
      onMouseLeave: (event) => {
        event.target.style.background = 'black';
        event.target.style.color = 'white';
      },
    },
  },
  Dsautomobiles: {
    font: "'DS Automobiles', sans-serif",
    color: "#1A1B1B",
    tagline: "",
    buttonColor: "#FFFFFF",
    headerColor: "#FFFFFF",
    tableStyle: {
      table: {
        border: 'none',
        borderCollapse: 'collapse',
      },
      th: {
        backgroundColor: '#1A1B1B',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '10px 10px',
        fontWeight: '400',
        fontSize: '20px',
        color: 'white',
        fontFamily: 'DS Automobiles',
        wordWrap: 'break-word',
      },
      td: {
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '35px',
        border: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        fontSize: '18px',
        color: '#1A1B1B',
        fontFamily: 'DS Automobiles',
        fontWeight: '400',
        lineHeight: '24px',
        wordWrap: 'break-word',
      },
      pagination: {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        padding: '10px 0px',
        fontSize: '12px',
        color: '#0074e8',
      },
      search: {
        border: '0.50px solid #ADAEB2',
        borderBottom: '1px solid #787B80',
        padding: '10px',
        fontSize: '14px',
        color: '#787B80',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        position: 'relative',
        flexDirection: 'column',
        alignSelf: 'stretch',
        boxSizing: 'border-box',
      },
    },
    buttonStyle: {
      type: 'button',
      className: 'btn btn-info rounded btn-submit',
      style: {
        height: '100%',
        padding: '16px 24px',
        background: '#1A1B1B',
        border: 'none',
        borderColor: '#1A1B1B',
        borderRadius: '100px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        color: 'white',
        fontSize: '16px',
        fontFamily: "'DS Automobiles'",
        fontWeight: 400,
        wordWrap: 'break-word',
      },
      onMouseEnter: (event) => {
        event.target.style.background = '#9D8C83';
      },
      onMouseLeave: (event) => {
        event.target.style.background = '#1A1B1B';
      },
    },
  },
  Admin: {
    font: "'Peugeot New', sans-serif",
    color: "#0074e8",
    tagline: "Motion & Emotion",
    buttonColor: "#0074e8",
    headerColor: "#FFFFFF",
    tableStyle: {
      table: {
        border: 'none',
        borderCollapse: 'collapse',
      },

      th: {
        backgroundColor: 'black',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: '14px',
        color: '#fff',
        fontFamily: 'Peugeot New',
        wordWrap: 'break-word',
        marginLeft: '100px',
      },
      td: {
        height: '40px',
        justifyContent: 'center',
        alignItems: 'start',
        border: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        fontSize: '14px',
        color: '#000',
        fontFamily: 'Peugeot New',
        fontWeight: '400',
        lineHeight: '24px',
        wordWrap: 'break-word',
      },
      pagination: {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        padding: '10px 0px',
        fontSize: '12px',
        color: '#0074e8',
      },
      search: {
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '18px 0px',
        fontSize: '12px',
        color: '#0074e0',
      },
    },
    buttonStyle: {
      type: 'button',
      className: 'btn btn-info rounded',
      style: {
        padding: '5px 10px',
        fontSize: '16px',
        backgroundColor: '#0074e8',
        color: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'left',
        gap: 10,
        display: 'inline-flex',
        border: 'none',
      },
      onMouseEnter: (event) => {
        event.target.style.background = 'black';
      },
      onMouseLeave: (event) => {
        event.target.style.background = '#0074e8';
      },
    },
  },
};




