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
type ReservationGetById = RouterOutputs["reservation"]["get"];
function TReservationPDF({ reservation }: { reservation: ReservationGetById }) {
  if (!reservation) return null;
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
                <Text>No. {reservation.id}</Text>
              </View>
              <View style={styles.subtitle}>
                <Text>Datos Generales</Text>
              </View>
            </View>
            <View style={[styles.headerSection, { marginRight: 20 }]}>
              <Text style={{ color: "#2A93D5" }}>Fecha:</Text>
              <Text>{reservation.createdAt.toDateString()}</Text>
              <Text style={{ color: "#2A93D5" }}>Lote:</Text>
              <Text>{reservation.lot.identifier}</Text>
            </View>
          </View>
          {/* lastname */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Apellidos Completos:</Text>
            <Text>
              {reservation.lastname} {reservation.secondlastname}
            </Text>
          </View>
          {/* name */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Nombres Completos:</Text>
            <Text>
              {reservation.firstname} {reservation.secondname}
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.twoColumnsSection}>
              {/* birthdate */}
              <Text style={{ color: "#2A93D5" }}>Fecha de Nacimiento:</Text>
              <Text>{reservation.birthdate.toDateString()}</Text>
            </View>
            <View style={styles.twoColumnsSection}>
              {/* age */}
              <Text style={{ color: "#2A93D5" }}>Edad:</Text>
              <Text>{getAge(reservation.birthdate.toDateString())} Años</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.twoColumnsSection}>
              {/* status */}
              <Text style={{ color: "#2A93D5" }}>Estado Civil:</Text>
              <Text style={{ textTransform: "capitalize" }}>
                {reservation.civilStatus}
              </Text>
            </View>
            <View style={styles.twoColumnsSection}>
              {/* citizenship */}
              <Text style={{ color: "#2A93D5" }}>Nacionalidad:</Text>
              <Text>{reservation.citizenship}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.twoColumnsSection}>
              {/* dpi */}
              <Text style={{ color: "#2A93D5" }}>DPI:</Text>
              <Text>{reservation.dpi}</Text>
            </View>
            <View style={styles.twoColumnsSection}>
              {/* NIT */}
              <Text style={{ color: "#2A93D5" }}>NIT:</Text>
              <Text>{reservation.nit}</Text>
            </View>
          </View>
          <View style={styles.section}>
            {/* address */}
            <Text style={{ color: "#2A93D5" }}>Dirección:</Text>
            <Text>{reservation.address}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.twoColumnsSection}>
              {/* profession */}
              <Text style={{ color: "#2A93D5" }}>Profesión:</Text>
              <Text>{reservation.profession}</Text>
            </View>
            <View style={styles.twoColumnsSection}>
              {/* phone */}
              <Text style={{ color: "#2A93D5" }}>Teléfono:</Text>
              <Text>{reservation.phone}</Text>
            </View>
          </View>
          <View style={styles.section}>
            {/* workaddress */}
            <Text style={{ color: "#2A93D5" }}>Dirección de Trabajo:</Text>
            <Text>{reservation.workaddress}</Text>
          </View>
          <View style={styles.section}>
            {/* workphone */}
            <Text style={{ color: "#2A93D5" }}>Teléfono de Trabajo:</Text>
            <Text>{reservation.workphone}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.subtitle}>
            <Text>Propiedad</Text>
          </View>
          {/* project */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Proyecto:</Text>
            <Text>El Naranjo</Text>
          </View>
          {/* property and area */}
          <View style={styles.section}>
            <View style={styles.twoColumnsSection}>
              <Text style={{ color: "#2A93D5" }}>Lote:</Text>
              <Text>{reservation.lot.identifier}</Text>
            </View>
            <View style={styles.twoColumnsSection}>
              <Text style={{ color: "#2A93D5" }}>Área:</Text>
              <Text>{reservation.lot.totalArea?.toString()} mts2</Text>
            </View>
          </View>
          {/* Boundary */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Colindancias:</Text>
            <Text>{reservation.lot.boundaries}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.subtitle}>
            <Text>Condiciones de Pago</Text>
          </View>
          {/* price */}
          <View style={styles.section}>
            <View style={styles.twoColumnsSection}>
              <Text style={{ color: "#2A93D5" }}>Precio:</Text>
              <Text>
                {GTQ.format(reservation.lot.price as unknown as number)}
              </Text>
            </View>
          </View>
          {/* interest */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>
              El valor de la propiedad es precio de contado si quisiera un
              crédito de mediano plazo se le cargara el:{" "}
              {reservation.interest.toString()}% de interés
            </Text>
          </View>
          {/* reservation */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Reserva:</Text>
            <Text>
              {GTQ.format(reservation.reservationPrice as unknown as number)}
            </Text>
            {reservation.reservationNumber && (
              <Text>
                {reservation.reservationNumber} pagos de{" "}
                {GTQ.format(reservation.reservationQuota as unknown as number)}
              </Text>
            )}
          </View>
          {/* downpayment */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Enganche:</Text>
            <Text>
              {GTQ.format(reservation.downpaymentPrice as unknown as number)}
            </Text>
            {reservation.downpaymentNumber && (
              <Text>
                {reservation.downpaymentNumber} pagos de{" "}
                {GTQ.format(reservation.downPaymentQuota as unknown as number)}
              </Text>
            )}
          </View>
          {/* fecha */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Fecha de enganche:</Text>
            <Text>{reservation.downpaymentDate.toLocaleDateString()}</Text>
          </View>
          {/* payday */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Que se pagaran el:</Text>
            <Text>{reservation.payday}</Text>
            <Text style={{ color: "#2A93D5" }}> de cada mes</Text>
          </View>
          {/* observation */}
          <View style={styles.section}>
            <Text style={{ color: "#2A93D5" }}>Observaciones:</Text>
            <Text>{reservation.reservationComments}</Text>
            <Text>{reservation.downpaymentComments}</Text>
          </View>

          <View style={styles.signaturesSection}>
            {reservation.signatureUrl && (
              <Image
                style={styles.signatureCustomer}
                source={reservation.signatureUrl}
              />
            )}
            <Text>Firma del Cliente</Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.subtitle}>
            <Text>Dpi Frontal</Text>
          </View>
          {reservation.frontDpiUrl && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image style={styles.dpiImage} source={reservation.frontDpiUrl} />
          )}

          <View style={styles.subtitle}>
            <Text>Dpi Trasero</Text>
          </View>
          {reservation.backDpiUrl && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image style={styles.dpiImage} source={reservation.backDpiUrl} />
          )}
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.subtitle}>
            <Text>Foto del cliente</Text>
          </View>
          {reservation.customerImageUrl && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              style={styles.dpiImage}
              source={reservation.customerImageUrl}
            />
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default TReservationPDF;
