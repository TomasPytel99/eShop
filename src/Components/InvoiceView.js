import React from 'react';
import ReactPDF, { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import '../Styles/InvoiceView.css';


Font.register({
  family: 'Noto Sans',
  fonts: [
    { src: require('../Fonts/NotoSans-VariableFont_wdth,wght.ttf'), fontWeight: 'normal'},
    { src: require('../Fonts/NotoSans-Bold.ttf'), fontWeight: 'bold' },
  ],
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    marginBottom: 5
  },
  paragraph: {
    fontSize: 10,
    fontFamily: 'Noto Sans'
  },
  boldParagraph: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: 'bold'
  },
  image: {
    width: 130,
    height: 46,
    marginRight: 40
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  topColumn: {
    flexDirection: 'column',
  },
  column: {
    flexDirection: 'column',
    width: '50%'
  },
  boldHeader: {
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5
  },
  columnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'green'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row'
    //flexDirection: 'row'
  },
  tabledHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    fontFamily: 'Noto Sans'
  },
  tableCell: {
    fontSize: 10,
    flex: 1,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    justifyContent: 'center'
  },
  productCode: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  productName: {
    flex: 3
  },
  productAmount: {
    flex: 1
  },
  productPrice: {
    flex: 1
  },
  productImage: {
    maxWidth: 55,
    maxHeight: 40,
    height: 'auto',
    paddingRight: 15
  },
  productNameFont: {
    fontSize: 10,
  },
  productPropWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightAlign: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  lineAbove: {
    borderTopWidth: 1,
    borderTopColor: '#000'
  }
});

// Create Document Component
const Invoice = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.row}>
          <Image style={styles.image} src="/Images/Ehop.png"></Image>
          <View style={styles.column}>
            <Text style={styles.header}>Faktúra č. {data.orderId}</Text>
            <View style={styles.columnRow}>
              <View style={styles.topColumn}>
                <Text style={styles.boldParagraph}>Dátum vystavenia:</Text>
              </View>
              <View style={styles.topColumn}>
                <Text style={styles.paragraph}>{data.date.substring(0.10)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.columnRow}>
            <View style={styles.column}>
              <Text style={styles.boldHeader}>Predávajúci</Text>
              <Text style={styles.boldParagraph}>Názov spoločnosti:</Text>
              <Text style={styles.boldParagraph}>IČO:</Text>
              <Text style={styles.boldParagraph}>Adresa:</Text>
              <Text style={styles.boldParagraph}>PSČ:</Text>
              <Text style={styles.boldParagraph}>Email:</Text>
              <Text style={styles.boldParagraph}>Tel. č.:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.boldHeader}> </Text>
              <Text style={styles.paragraph}>Solfegio s.r.o.</Text>
              <Text style={styles.paragraph}>26546878</Text>
              <Text style={styles.paragraph}>Hurbanova 2291/7, Čadca</Text>
              <Text style={styles.paragraph}>02201</Text>
              <Text style={styles.paragraph}>solfegio@solfegio.sk</Text>
              <Text style={styles.paragraph}>+421 948 302 005</Text>
            </View>
          </View>
          <View style={styles.columnRow}>
            <View style={styles.column}>
              <Text style={styles.boldHeader}>Kupujúci</Text>
              {
                (data.ico)?
                (
                  <>
                    <Text style={styles.boldParagraph}>Názov spoločnosti:</Text>
                    <Text style={styles.boldParagraph}>IČO:</Text>
                  </>
                ):(
                  <Text style={styles.boldParagraph}>Meno:</Text>
                )
              }
              <Text style={styles.boldParagraph}>Adresa:</Text>
              <Text style={styles.boldParagraph}>PSČ:</Text>
              <Text style={styles.boldParagraph}>Email:</Text>
              <Text style={styles.boldParagraph}>Tel. č.:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.boldHeader}> </Text>
              {
                (data.ico)?
                (
                  <>
                    <Text style={styles.paragraph}>{data.companyName} {data.companyType}</Text>
                    <Text style={styles.paragraph}>{data.ico}</Text>
                  </>
                ):(
                  <Text style={styles.paragraph}>{data.name} {data.surname}</Text>
                )
              }
              <Text style={styles.paragraph}>{data.address}, {data.city}</Text>
              <Text style={styles.paragraph}>{data.psc}</Text>
              <Text style={styles.paragraph}>{data.email}</Text>
              <Text style={styles.paragraph}>+{data.phone}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tabledHeader}>
            <Text style={[styles.tableCell, styles.productCode]}>Kód             produktu</Text>
            <Text style={[styles.tableCell, styles.productName]}>Názov produktu</Text>
            <Text style={[styles.tableCell, styles.productAmount]}>Množstvo</Text>
            <Text style={[styles.tableCell, styles.productPrice]}>Pôvodná cena</Text>
            <Text style={[styles.tableCell, styles.productPrice]}>Zľava %</Text>
            <Text style={[styles.tableCell, styles.productPrice]}>Po zľave</Text>
          </View>
          {
            data.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, styles.productCode]}>
                  <View style={styles.productPropWrapper}>
                  <Text style={styles.productNameFont}>{item.Id_produktu}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.productName]}>
                  <View style={styles.productNameWrapper}>
                    {/*<Image style={styles.productImage} src={item.obrazok}></Image>*/}
                    <Text style={styles.productNameFont}>{item.Nazov_produktu}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.productAmount]}>
                  <View style={styles.productPropWrapper}>
                    <Text style={styles.productNameFont}>{item.amount}x</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.productPrice]}>
                  <View style={styles.productPropWrapper}>
                    <Text style={styles.productNameFont}>{item.Aktualna_cena} €</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.productPrice]}>
                  <View style={styles.productPropWrapper}>
                    <Text style={styles.productNameFont}>{item.Zlava}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.productPrice]}>
                  <View style={styles.productPropWrapper}>
                    <Text style={styles.productNameFont}>{item.Aktualna_cena - item.Aktualna_cena/100*item.Zlava} €</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </View>
      <View style={styles.section}>
          <View style={styles.columnRow}>
            <View style={styles.column}>
              <Text style={styles.paragraph}>Doprava - {data.transportMethod.optionName}</Text>
              <Text style={styles.paragraph}>Spôsob platby - {data.paymentMethod.paymentName}</Text>
            </View>
            <View style={styles.rightAlign}>
              <Text style={styles.paragraph}>{data.transportMethod.optionPrice} €</Text>
              <Text style={styles.paragraph}>{data.paymentMethod.paymentPrice} €</Text>
            </View>
          </View>
          <View style={[styles.columnRow,styles.lineAbove]}>
            <View style={styles.column}>
              <Text style={styles.boldHeader}>Celkom</Text>
            </View>
            <View style={styles.rightAlign}>
              <Text style={styles.boldHeader}>{data.totalPrice} €</Text>
            </View>
          </View>
      </View>
    </Page>
  </Document>
);

export {Invoice};

const InvoiceView = () => {
  const orderData = JSON.parse(localStorage.getItem('lastOrder'));
  return (
    <div className='pdfDownloadWrapper container-fluid'>
      <div>
        <i className="bi bi-emoji-smile"></i>
        <h3>Ďakujeme za váš nákup</h3>
        <h5>Vaša objednávka bola zaznamenaná</h5>
      </div>
      <PDFDownloadLink document={<Invoice data={orderData}/>} fileName="faktura.pdf" className='py-2 px-3 pdfDownloadLink'>Stiahnuť fakúru</PDFDownloadLink>
    </div>
  );
};

export default InvoiceView;
