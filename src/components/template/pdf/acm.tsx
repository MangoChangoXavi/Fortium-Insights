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

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#e4dede",
    fontFamily: "Helvetica",
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "90vh",
  },

  section: {
    fontSize: 14,
    color: "#003049",
    padding: "45px",
    width: "100%",
    height: "99vh",
    display: "flex",
    alignItems: "center",  // Center vertically
  },


  title: {
    fontSize: 30,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 30,
    fontWeight: "bold",
    letterSpacing: 1,
    margin: "10px",
  },

  textItem: {
    fontSize: 16,
    margin: "10px",
  },

  banner: {
    width: "100%",
    height: " 100%",
    marginTop: "0%",
    margin: "40px",

    // backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    padding: "50px",
  },


  time: {
    position: "absolute",
    right: 20,
    bottom: 10,
    fontSize: 16,

  },


  satellitalImageStyle: {
    alignSelf: "center",
    width: "80%",
    maxHeight: "300px",
    margin: "5%"
  },

  Background: {
    position: 'absolute',
    minWidth: '100%',
    maxHeight: '100%',
    opacity: 0.2,
    height: '100%',
    width: '100%'
  },

  Header: {
    backgroundColor: "#003049",
    width: "100%",
    height: "50px"
  },

  Table: {
    marginTop: "10px",
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "column",
    fontSize: "15px",
  },

  Tableth: {
    color: "#6f727c",
    padding: "15px"
  },
  StyleForAcmValues: {
    
    fontWeight: "bold",
    fontSize: "15px",
    color: "black", 
    marginTop: "5",
   
  },

  SectionBanner: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    padding: "20px",
    marginTop: "50px",
  },

  professionalText: {
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 15,
    color: "#333", // Color de texto principal
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
       {/*start  One Page */}
       <Page size="A4" style={styles.page}
          orientation="portrait"
        >
          <Image
            style={styles.Background}
            source={"https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          />

          {/* Header */}
          <View style={styles.section}>
            <View style={styles.banner}>
              <Text style={styles.title}>Infome de valoracion</Text>
              <Text style={styles.textItem}>Preparado por</Text>
              {/* disable inline lint */}
              <Image
                style={styles.satellitalImageStyle}
                source={"https://www.techosdigitales.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e62cdbb1.webp&w=256&q=75"} />
              <Text style={styles.title}>{acm.address}</Text>
            </View>

            <View style={styles.time}>
              <Text style={styles.textItem}>Fecha:</Text>
              <Text>{acm.createdAt.toDateString()}</Text>
            </View>
          </View>
        </Page>
        {/* Final One Page */}
        {/*start Two Page */}
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.section}>
            <Image
              style={styles.satellitalImageStyle}
              source={"https://www.techosdigitales.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e62cdbb1.webp&w=256&q=75"} />

            <Text style={styles.professionalText}>
              Techo Digitales, formada por un equipo de profesionales exitosos con amplia experiencia en el ámbito inmobiliario, surge para abordar la necesidad de brindar soluciones rápidas y efectivas a personas y empresas que enfrentan situaciones complicadas en relación con sus propiedades. En un esfuerzo por ofrecer una alternativa eficaz y cómoda, hemos desarrollado un producto que facilita la venta de propiedades de manera ágil, sin que ello implique pérdida de tiempo o dinero.

              En Techo Digitales, contamos con un equipo altamente cualificado y multidisciplinario, conscientes de las diversas situaciones que pueden surgir tanto para individuos como para entidades jurídicas. Nos comprometemos a resolver todas las dudas que puedan surgir durante este proceso y a guiar a nuestros clientes sin incurrir en costos adicionales.
            </Text>
          </View>
        </Page>
        {/* {Final Two Page} */}
        <Page style={styles.page}>
          <View style={styles.Header}>
            <Text style={{ color: "#fff", margin: "5px" }}>
              Valoracion creada el {acm.createdAt.toDateString()}
            </Text>
          </View>
          <View>
            <Text style={{ margin: "5px", fontSize: "25px" }}>Informacion de la propiedad</Text>
            <Text style={{ margin: "5px", fontSize: "20px" }}>{acm.address}</Text>
          </View>
          {/* <Image
              style={styles.satellitalImageStyle}
              source={acm.satellitalImageUrl} /> */}

          <View style={styles.Table}>
            <Text style={styles.Tableth}>
              Tipografía:  
              <Text style={styles.StyleForAcmValues}> {acm.buildingType}</Text>
            </Text>
            <Text style={styles.Tableth}>
              habitaciones:     
              <Text style={styles.StyleForAcmValues}> {acm.numberOfRooms}</Text>
            </Text>
            <Text style={styles.Tableth}>
              baños:  
              <Text style={styles.StyleForAcmValues}> {acm.numberOfBathrooms}</Text>
            </Text>
            <Text style={styles.Tableth}>
              Metros construidos:  
              <Text style={styles.StyleForAcmValues}> {acm.totalArea} m2</Text>
            </Text>
            <Text style={styles.Tableth}>
              Plants:  
              <Text style={styles.StyleForAcmValues}>
                  {acm.numberOfParkingLots}</Text>
            </Text>
          </View>
        </Page>
        {/* similar properties page */}
        <Page style={styles.page}>
          <View style={styles.section}>
            
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ACMPDF;