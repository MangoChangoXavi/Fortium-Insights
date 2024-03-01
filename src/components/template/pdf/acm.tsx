"use client";
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { type RouterOutputs } from "~/utils/api";
import { GTQ, getAge } from "~/utils/functions";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    fontFamily: "Helvetica",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    marginLeft: 20,
    marginBottom: 8,
    fontSize: 14,
    color: "#9baacf",
  },
  twoColumnsSection: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    width: "50%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 30,
    fontWeight: "ultrabold",
    letterSpacing: 1,
  },
  orderNumber: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 10,
    color: "#ef5350",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 10,
    letterSpacing: 1,
    marginBottom: 20,
  },
  signaturesSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginLeft: 20,
    marginBottom: 8,
    fontSize: 14,
    color: "#9baacf",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginLeft: 20,
    marginBottom: 8,
    fontSize: 14,
    color: "white",
    lineHeight: 0.8,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#2A93D5",
  },
  signatureCustomer: {
    width: 150,
    height: 100,
  },
  dpiImage: {
    alignSelf: "center",
    width: "80%",
    maxHeight: "300px",
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "90vh",
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottom: "1px solid #2A93D5",
  },
});

// Create Document Component
type ACMGetById = RouterOutputs["acm"]["read"];
function ACMPDF({ acm }: { acm: ACMGetById }) {
  if (!acm) return null;
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.headerWrapper}>
            <View style={[styles.headerSection]}>
              <View style={styles.title}>
                <Text>Solicitud de compra</Text>
              </View>
              <View style={styles.orderNumber}>
                <Text>No. {acm.id}</Text>
              </View>
              <View style={styles.subtitle}>
                <Text>Datos Generales</Text>
              </View>
            </View>
            <View style={[styles.headerSection, { marginRight: 20 }]}>
              <Text style={{ color: "#2A93D5" }}>Fecha:</Text>
              <Text>{acm.createdAt.toDateString()}</Text>
            </View>
          </View>
          {/* lastname */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Direccion:</Text>
            <Text>{acm.address}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ACMPDF;
