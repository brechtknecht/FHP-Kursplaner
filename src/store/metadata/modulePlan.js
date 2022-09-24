export default {
  // Grundstudium
  new: {
    basicStudyPeriod: {
      elementares_gestalten: {
        title: "Ⅰ/1 Gestaltungsgrundlagen",
        elementares_gestalten: {
          title: "Elementares Gestalten",
          modules:[{
            id: "11EG-B",
            title: "Basics",
            subtitle: "Grundlegende Darstellungstechniken",
            colorCode: "#E7E8E9",
            category: "Elementares Gestalten"
          },{
            id: "11EG-K",
            title: "Kontext",
            subtitle: "Wahrnehmung und Differenzierung",
            colorCode: "#E7E8E9",
            category: "Elementares Gestalten"
          },{
            id: "11EG-P",
            title: "Prozess",
            subtitle: "Gestaltungsabläufe und Methoden",
            colorCode: "#E7E8E9",
            category: "Elementares Gestalten"
          }]
        },
        atelier : {
            title: "Atelier",
            modules: [{
              id: "11AT",
              title: "Atelier",
              subtitle: "",
              colorCode: "#E7E8E9",
              category: "Atelier"
            }]
        }
      },
      entwurfsgrundlagen: {
        title: "Ⅰ/2 Entwurfsgrundlagen",
        interfacedesign: {
          title: "Interface",
          modules: [{
            id: "12EId-MK",
            title: "Mensch + Kontext",
            colorCode: "#D8F0F4",
            subtitle: "Nutzer*innen zentrierte Analyse von Anwendungskontexten",
            category: "Entwurfsgrundlagen"
          },
          {
            id: "12EId-MP",
            title: "Methoden + Prozesse",
            colorCode: "#D8F0F4",
            subtitle: "Methodische Entwicklungsprozesse für interaktive Systeme",
            category: "Entwurfsgrundlagen"
          },
          {
            id: "12EId-FI",
            title: "Form + Interaktion",
            colorCode: "#D8F0F4",
            subtitle: "Konzeption und Entwurf von User-Interfaces",
            category: "Entwurfsgrundlagen"
          },
          {
            id: "12EId-AD",
            title: "Algorithmen + Daten",
            colorCode: "#D8F0F4",
            subtitle: "Gestaltung mit Daten und Algorithmen, Programmierung",
            category: "Entwurfsgrundlagen"
          }]
        },
        kommunikationsdesign: {
          title: "Kommunikation",
          modules: [{
            id: "12EKd-SA",
            title: "Schrift + Ausdruck",
            colorCode: "#EDF3DA",
            subtitle: "Gestaltung von und mit Schrift",
            category: "Kommunikationsdesign"
          },
          {
            id: "12EKd-BW",
            title: "Bild + Wirkung",
            colorCode: "#EDF3DA",
            subtitle: "Bildproduktion und Rezeption",
            category: "Kommunikationsdesign"
          },
          {
            id: "12EKd-FN",
            title: "Formate + Narration",
            colorCode: "#EDF3DA",
            subtitle: "Publikationsformate",
            category: "Kommunikationsdesign"
          },
          {
            id: "12EKd-ZA",
            title: "Zeichen + Ansprache",
            colorCode: "#EDF3DA",
            subtitle: "Kommunikationssysteme",
            category: "Kommunikationsdesign"
          }]
        },
        produktdesign: {
          title: "Produkt",
          modules:[{
            id: "12EPd-TP",
            title: "Technik + Produkt",
            colorCode: "#CFE4BC",
            subtitle: "Produktion und Produktentwicklung",
            category: "Produktdesign"
          },
          {
            id: "12EPd-FZ",
            title: "Form + Zweck",
            colorCode: "#CFE4BC",
            subtitle: "Ästhetische Grundlagen der Stilentwicklung",
            category: "Produktdesign"
          },
          {
            id: "12EPd-RK",
            title: "Raum + Kontext",
            colorCode: "#CFE4BC",
            subtitle: "Synergien der gestalterischen Kommunikation",
            category: "Produktdesign"
          },
          {
            id: "12EPd-OI",
            title: "Objekt + Intention",
            colorCode: "#CFE4BC",
            subtitle: "Strategie und Praxis der Produktentstehung",
            category: "Produktdesign"
          }]
        }
      },
      theorie: {
        title: "Ⅰ/3 Theorie",
        modules: [{
          id: "13Th-DMT",
          title: "Design-/Medientheorie",
          colorCode: "#E7E8E9",
          subtitle: "",
          category: "Theorie"
        },
        {
          id: "13Th-DKG",
          title: "Design-/Kulturgeschichte",
          colorCode: "#E7E8E9",
          subtitle: "",
          category: "Theorie"
        },
        {
          id: "13Th-DMR",
          title: "Designmanagement und -recht",
          colorCode: "#E7E8E9",
          subtitle: "",
          category: "Theorie"
        }]
      },
      werkstatt: {
        title: "Ⅰ/4 Werkstattpraxis",
        modules: [{
          id: "14W-IL",
          title: "Interfacelabore",
          colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 128px, #B5D4D2 128px, #B5D4D2 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 64px, #B5D4D2 64px, #B5D4D2 128px)",
          subtitle: "Physical Computing, interaktive Systeme",
          category: "Werkstattpraxis"
        },
        {
          id: "14W-DL",
          title: "Drucklabore",
          colorCode: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 128px, #CEDAB7 128px, #CEDAB7 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 64px, #CEDAB7 64px, #CEDAB7 128px)",
          subtitle: "Prepress, Farbmanagement, FineArt-Print",
          category: "Werkstattpraxis"
        },
        {
          id: "14W-GL",
          title: "Grafiklabor",
          colorCode: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 128px, #CEDAB7 128px, #CEDAB7 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 64px, #CEDAB7 64px, #CEDAB7 128px)",
          subtitle: "Experimentelle Drucktechniken",
          category: "Werkstattpraxis"
        },
        {
          id: "14W-BW",
          title: "Buchbindewerkstatt",
          colorCode: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 128px, #CEDAB7 128px, #CEDAB7 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 64px, #CEDAB7 64px, #CEDAB7 128px)",
          subtitle: "",
          category: "Werkstattpraxis"
        },{
          id: "14W-FW",
          title: "Fotowerkstätten",
          colorCode: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 128px, #CEDAB7 128px, #CEDAB7 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 64px, #CEDAB7 64px, #CEDAB7 128px)",
          subtitle: "SW-Labor, Studio",
          category: "Werkstattpraxis"
        },{
          id: "14W-AV",
          title: "Audio-/Videowerkstätten",
          colorCode: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 128px, #CEDAB7 128px, #CEDAB7 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #EDF3DA, #EDF3DA 64px, #CEDAB7 64px, #CEDAB7 128px)",
          subtitle: "Studio, Schnitt",
          category: "Werkstattpraxis"
        },
        {
          id: "14W-MW",
          title: "Modellierwerkstatt",
          colorCode: "repeating-linear-gradient(-45deg, #CFE4BC, #CFE4BC 128px, #ADCD9A 128px, #ADCD9A 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #CFE4BC, #CFE4BC 64px, #ADCD9A 64px, #ADCD9A 128px)",
          subtitle: "Plastisches Gestalten",
          category: "Werkstattpraxis"
        },
        {
          id: "14W-AM",
          title: "Analoge Modellbauwerkstätten",
          subtitle: "Holz, Metall, Finish",
          colorCode: "repeating-linear-gradient(-45deg, #CFE4BC, #CFE4BC 128px, #ADCD9A 128px, #ADCD9A 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #CFE4BC, #CFE4BC 64px, #ADCD9A 64px, #ADCD9A 128px)",
          category: "Werkstattpraxis"
        },
        {
          id: "14W-DM",
          title: "Digitale Modellbauwerkstätten",
          colorCode: "repeating-linear-gradient(-45deg, #CFE4BC, #CFE4BC 128px, #ADCD9A 128px, #ADCD9A 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #CFE4BC, #CFE4BC 64px, #ADCD9A 64px, #ADCD9A 128px)",
          subtitle: "CAD, CAM",
          category: "Werkstattpraxis"
        }]
      },
      perspektive: {
        title: "Ⅰ/5 Perspektiven und Social Skills",
        modules: [{
          id: "15PSs-PW",
          title: "Projektwochen",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "",
          category: "Perspektiven und Social Skills"
        },
        {
          id: "15PSs-PO",
          title: "Projektorganisation",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "",
          category: "Perspektiven und Social Skills"
        },
        {
          id: "15PSs-FM",
          title: "Flex-Modul",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "",
          category: "Perspektiven und Social Skills"
        }]
      }
    },
    // Haupstudium
    mainStudyPeriod: {
    entwurf: {
      title: "II/1 Entwurf",
      design_als_spekulation: {
        title: "Design als Spekulation",
        modules: [{
          id: "21EId-S",
          title: "Interfacedesign als Spekulation",
          colorCode: "#D8F0F4",
          subtitle: "",
          category: "Design als Spekulation"
        },
        {
          id: "21EKd-S",
          title: "Kommunikationsdesign als Spekulation",
          colorCode: "#EDF3DA",
          subtitle: "",
          category: "Design als Spekulation"
        },
        {
          id: "21EPd-S",
          title: "Produktdesign als Spekulation",
          colorCode: "#CFE4BC",
          subtitle: "",
          category: "Design als Spekulation"
        }]
      },
      design_als_designforschung: {
        title: "Design als Designforschung",
        modules: [{
          id: "21EId-F",
          title: "Interfacedesign als Designforschung",
          colorCode: "#D8F0F4",
          subtitle: "",
          category: "Design als Designforschung"
        },
        {
          id: "21EKd-F",
          title: "Kommunikationsdesign als Designforschung",
          colorCode: "#EDF3DA",
          subtitle: "",
          category: "Design als Designforschung"
        },
        {
          id: "21EPd-F",
          title: "Produktdesign als Designforschung",
          colorCode: "#CFE4BC",
          subtitle: "",
          category: "Design als Designforschung"
        }]
      },
      design_als_kuenstlerische_praxis: {
        title: "Design als Künstlerische Praxis",
        modules: [{
          id: "21EId-K",
          title: "Interfacedesign als Künstlerische Praxis",
          colorCode: "#D8F0F4",
          subtitle: "",
          category: "Design als Künstlerische Praxis"
        },{
          id: "21EKd-K",
          title: "Kommunikationsdesign als Künstlerische Praxis",
          colorCode: "#EDF3DA",
          subtitle: "",
          category: "Design als Künstlerische Praxis"
        },{
          id: "21EPd-K",
          title: "Produktdesign als Künstlerische Praxis",
          colorCode: "#CFE4BC",
          subtitle: "",
          category: "Design als Künstlerische Praxis"
        }]
      },
      design_als_Problemlösung: {
        title: "Design als Problemlösung",
        modules: [{
          id: "21EId-P",
          title: "Interfacedesign als Problemlösung",
          colorCode: "#D8F0F4",
          subtitle: "",
          category: "Design als Problemlösung"
        },{
          id: "21EKd-P",
          title: "Kommunikationsdesign als Problemlösung",
          colorCode: "#EDF3DA",
          subtitle: "",
          category: "Design als Problemlösung"
        },{
          id: "21EPd-P",
          title: "Produktdesign als Problemlösung",
          colorCode: "#CFE4BC",
          subtitle: "",
          category: "Design als Problemlösung"
        }]
      },
      theorie: {
        title: "II/2 Theorie",
        modules: [{
          id: "22Th-DMT",
          title: "Design-/Medientheorie",
          colorCode: "#E7E8E9",
          subtitle: "",
          category: "Theorie"
        },{
          id: "22Th-DKG",
          title: "Design-/Kulturgeschichte",
          colorCode: "#E7E8E9",
          subtitle: "",
          category: "Theorie"
        },{
          id: "22Th-DMR",
          title: "Designmanagement und -recht",
          colorCode: "#E7E8E9",
          subtitle: "",
          category: "Theorie"
        }]
      },
      praxissemester: {
        title: "II/3 Praxissemester",
        modules: [{
          id: "23PS-P",
          title: "Praktikum",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "Voraussetzung siehe Modulbeschreibung",
          category: "Praxissemester"
        },{
          id: "23PS-PB",
          title: "Praxisbericht",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "Dokumentation und Präsentation",
          category: "Praxissemester"
        }]
      },
      perspektive: {
        title: "II/4 Perspektiven und Social Skills",
        modules: [{
          id: "24PSs-PW",
          title: "Projektwochen",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Perspektiven und Social Skills"
        },{
          id: "24PSs-FM",
          title: "Flex-Modul",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Perspektiven und Social Skills"
        },{
          id: "24PSs-T",
          title: "Tutorium",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Perspektiven und Social Skills"
        },{
          id: "24PSs-PO",
          title: "Projektorganisation",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Perspektiven und Social Skills"
        },{
          id: "24PSs-HT",
          title: "Handwerk/Technik",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "Vertiefung",
          category: "Perspektiven und Social Skills"
        },{
          id: "24PSs-AT",
          title: "Atelier",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          subtitle: "Vertiefung",
          category: "Perspektiven und Social Skills"
        }]
      }
    }
  },
    // Master
    masterStudyPeriod: {
      labor_entwurfsstrategien: {
        title: "III/1 Labor-/Entwurfsstrategien",
        modules: [{
          id: "31LE-S",
          title: "Spezialisierung",
          colorCode: "#E7E8E9",
          category: "Labor-/Entwurfsstrategien"
        },{
          id: "31LE-R",
          title: "Reflexion",
          colorCode: "#E7E8E9",
          category: "Labor-/Entwurfsstrategien"
        }]
      },
      thesisentwicklung: {
        title: "III/2 Thesisentwicklung",
        modules: [{
          id: "32TE-WD",
          title: "Wissenschaftsmethodik + Designforschung",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Thesisentwicklung"
        },{
          id: "32TE-DA",
          title: "Designdiskurs + Argumentation",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Thesisentwicklung"
        }]
      },
      didaktik: {
        title: "III/3 Didaktik",
        modules: [{
          id: "33D-TM",
          title: "Tutoring/Mentoring",
          colorCode: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 128px, #E7E8E9 128px, #E7E8E9 256px)",
          colorCodeModulePlan: "repeating-linear-gradient(-45deg, #FFFFFF, #FFFFFF 64px, #E7E8E9 64px, #E7E8E9 128px)",
          category: "Didaktik"
        }]
      }
    }
  } ,
  // old: {
  //   basicStudyPeriod: {
  //     elementares_gestalten: {
  //       title: "I/1 Gestaltungsgrundlagen",
  //       elementares_gestalten: {
  //         title: "Elementares Gestalten",
  //         modules: [{
  //           id: "PO 2013 11EG-B",
  //           title: "Basics",
  //           colorCode: "#E7E8E9",
  //           subtitle: "Grundlagenkurs"
  //         },{
  //           id: "PO 2013 11EG-K",
  //           title: "Kontext",
  //           colorCode: "#E7E8E9",
  //           subtitle: "Grundlagenkurs"
  //         },{
  //           id: "PO 2013 11EG-P",
  //           title: "Prozess",
  //           colorCode: "#E7E8E9",
  //           subtitle: "Grundlagenkurs"
  //         }]
  //       },
  //       atelier: {
  //         title: "Atelier",
  //         modules: [{
  //           id: "PO 2013 11At-Z",
  //           title: "Atelier",
  //           colorCode: "#E7E8E9",
  //         },{
  //           id: "PO 2013 11At-F",
  //           title: "Atelier",
  //           colorCode: "#E7E8E9"
  //         }]
  //       }
  //     },
  //     fachorientierung: {
  //       title: "I/2 Fachorientierung",
  //       interfacedesign: {
  //         title: "Interfacedesign",
  //         modules: [{
  //           id: "PO 2013 12FOId-PI",
  //           title: "Physical- &Virtual Interfaces",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         }, {
  //           id: "PO 2013 12FOId-VI",
  //           title: "Visual Interfacedesign",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         }, {
  //           id: "PO 2013 12FOId-XD",
  //           title: "Interaction Design",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         }, {
  //           id: "PO 2013 12FOId-SI",
  //           title: "Software Interfaces",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         }, {
  //           id: "PO 2013 12FOId-AM",
  //           title: "Advanced Media",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         }]
  //       },
  //       kommunikationsdesign: {
  //         title: "Kommunikationsdesign",
  //         modules: [{
  //           id: "PO 2013 12FOKd-IL",
  //           title: "Illustration",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 12FOKd-TD",
  //           title: "Type Design",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 12FOKd-AD",
  //           title: "Advertising Design",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 12FOKd-FG",
  //           title: "Fotografie",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }, {
  //           id: "PO 2013 12FOKd-MG",
  //           title: "Motiongraphics",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }, {
  //           id: "PO 2013 12FOKd-TY",
  //           title: "Typografie",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }, {
  //           id: "PO 2013 12FOKd-CD",
  //           title: "Corporate Design",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }, {
  //           id: "PO 2013 12FOKd-GD",
  //           title: "Grafikdesign",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }, {
  //           id: "PO 2013 12FOKd-DM",
  //           title: "Digitale Medien",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }]
  //       },
  //       produktdesign: {
  //         title: "Produktdesign",
  //         modules: [{
  //           id: "PO 2013 12FOPd-ID",
  //           title: "Industrialdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         }, {
  //           id: "PO 2013 12FOPd-PU",
  //           title: "Produkt- & Umweltdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         }, {
  //           id: "PO 2013 12FOPd-DP",
  //           title: "Produktdesign mit digitalen Medien",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         }, {
  //           id: "PO 2013 12FOPd-PD",
  //           title: "Produktdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         }, {
  //           id: "PO 2013 12FOPd-RA",
  //           title: "Raum- & Ausstellungsdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         }]
  //       }
  //     },
  //     theorie: {
  //       title: "I/3 Theorie",
  //       modules: [{
  //         id: "PO 2013 13Th-DMT",
  //         title: "Design-/Medien-theorie",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 13Th-DKG",
  //         title: "Designgeschichte",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 13Th-DMR",
  //         title: "Designmanagement",
  //         colorCode: "#E7E8E9"
  //       }]
  //     },
  //     werkstatt: {
  //       title: "I/4 Werkstatt",
  //       modules: [{
  //         id: "PO 2013 14W4D-IL",
  //         title: "Interface-Labor",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)",
  //         subtitle: "Interfacedesign — Werkstatt"
  //       }, {
  //         id: "PO 2013 14W3D-TV",
  //         title: "Technologie / Visualisierung",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W2D-FL",
  //         title: "Fotolabor/-studio",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W2D-DP",
  //         title: "Druck / Prepress",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W2D-WV",
  //         title: "Weiterverarbeitung Druck",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W3D-MW",
  //         title: "Modellierwerkstatt",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W4D-AV",
  //         title: "Audio- /Video-Lab",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W3D-DM",
  //         title: "Digitaler Modellbau",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 14W4D-SC",
  //         title: "Software / CAD",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }]
  //     },
  //     projekte: {
  //       title: "I/5 Projektarbeiten",
  //       modules: [{
  //         id: "PO 2013 15PP-PW",
  //         title: "Projektwochen",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 15PP-PA",
  //         title: "Projektarbeit",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }, {
  //         id: "PO 2013 15PP-KF",
  //         title: "Komplementärfach / „Flex“",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }]
  //     },
  //     kolloquium: {
  //       title: "I/6 Kolloquium",
  //       modules: [{
  //         id: "PO 2013 16-KOL",
  //         title: "Kolloquium",
  //         colorCode: "#E7E8E9"
  //       }]
  //     }
  //   },
  //   // Haupstudium
  //   mainStudyPeriod: {
  //     entwurf: {
  //       title: "II/1 Entwurf",
  //       entwurf_projekt_interfacedesign: {
  //         title: "Entuwrf/Projekt Interfacedesign",
  //         modules: [{
  //           id: "PO 2013 21P-Id",
  //           title: "Projekt Id",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         }]
  //       },
  //       entwurf_projekt_kommunikationsdesign: {
  //         title: "Entuwrf/Projekt Kommunikationsdesign",
  //         modules: [{
  //           id: "PO 2013 21P-Kd",
  //           title: "Projekt Kd",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         }]
  //       },
  //       entwurf_projekt_produktdesign: {
  //         title: "Entuwrf/Projekt Produktdesign",
  //         modules: [{
  //           id: "PO 2013 21P-Pd",
  //           title: "Projekt Pd",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         }]
  //       },
  //       entwurf_fachvertiefung_interfacedesign: {
  //         title: "Entuwrf/Fachvertiefung Interfacedesign",
  //         modules: [{
  //           id: "PO 2013 21FVId-PI",
  //           title: "Physical- &Virtual Interfaces",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         },{
  //           id: "PO 2013 21FVId-XD",
  //           title: "Interaction Design",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         },{
  //           id: "PO 2013 21FVId-SI",
  //           title: "Software Interfaces",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign"
  //         },{
  //           id: "PO 2013 21FVId-VI",
  //           title: "Visual Interfacedesign",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign" 
  //         },{
  //           id: "PO 2013 21FVId-AM",
  //           title: "Advanced Media",
  //           colorCode: "#D8F0F4",
  //           subtitle: "Interfacedesign" 
  //         }]
  //       },
  //       entwurf_fachvertiefung_kommunikationsdesign: {
  //         title: "Entuwrf/Fachvertiefung Kommunikationsdesign",
  //         modules: [{
  //           id: "PO 2013 21FVKd-TY",
  //           title: "Typografie",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 21FVKd-TD",
  //           title: "Type Design",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 21FVKd-GD",
  //           title: "Grafikdesign",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 21FVKd-IL",
  //           title: "Illustration",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"  
  //         },{
  //           id: "PO 2013 21FVKd-FG",
  //           title: "Fotografie",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"  
  //         },{
  //           id: "PO 2013 21FVKd-AD",
  //           title: "Advertising Design",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 21FVKd-CI",
  //           title: "Corporate Identity",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"
  //         },{
  //           id: "PO 2013 21FVKd-MG",
  //           title: "Motion Graphics",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"  
  //         },{
  //           id: "PO 2013 21FVKd-DM",
  //           title: "Digitale Medien",
  //           colorCode: "#EDF3DA",
  //           subtitle: "Kommunikationsdesign"  
  //         }]
  //       },
  //       entwurf_fachvertiefung_produktdesign: {
  //         title: "Entuwrf/Fachvertiefung Produktdesign",
  //         modules: [{
  //           id: "PO 2013 21FVPd-PD",
  //           title: "Produktdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         },{
  //           id: "PO 2013 21FVPd-PU",
  //           title: "Produkt- & Umweltdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         },{
  //           id: "PO 2013 21FVPd-ID",
  //           title: "Industrialdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign"
  //         },{
  //           id: "PO 2013 21FVPd-RA",
  //           title: "Raum- & Ausstellungsdesign",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign" 
  //         },{
  //           id: "PO 2013 21FVPd-DP",
  //           title: "Produktdesign mit digitalen Medien",
  //           colorCode: "#CFE4BC",
  //           subtitle: "Produktdesign" 
  //         }]
  //       }
  //     },
  //     theorie: {
  //       title: "II/2 Theorie",
  //       modules: [{
  //         id: "PO 2013 22Th-DMT",
  //         title: "Design-/Medien-theorie",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 22Th-DKG",
  //         title: "Designgeschichte",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 22Th-DKGR",
  //         title: "Designmanagement und -recht",
  //         colorCode: "#E7E8E9"
  //       }]
  //     },
  //     praxis_perspektive: {
  //       title: "II/3 Praxis & Perspektive",
  //       modules: [{
  //         id: "PO 2013 23PP-PS",
  //         title: "Praxissemester",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       },{
  //         id: "PO 2013 23PP-PB",
  //         title: "Bericht",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       },{
  //         id: "PO 2013 23PP-KF",
  //         title: "Komplementärfach / „Flex“",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       },{
  //         id: "PO 2013 23PP-HT",
  //         title: "Handwerk / Technik",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       },{
  //         id: "PO 2013 23PP-PW",
  //         title: "Projektwochen",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       },{
  //         id: "PO 2013 23PP-PA",
  //         title: "Projektarbeit",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }]
  //     },
  //     bachelor: {
  //       title: "II/4 Bachelor",
  //       modules: [{
  //         id: "PO 2013 24-BA",
  //         title: "Bachelor-Arbeit, Bachelor-Prüfung",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       }]
  //     }
  //   },
  //   // Master
  //   masterStudyPeriod: {
  //     labor_entwurfsstrategien: {
  //       title: "III/1 Labor/Entwurfsstrategien",
  //       modules: [{
  //         id: "PO 2013 31LE-BDV",
  //         title: "Bild, Dramaturgie, Visualität",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       },{
  //         id: "PO 2013 31LE-III",
  //         title: "Identität, Information, Inszenierung",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       },{
  //         id: "PO 2013 31LE-OMM",
  //         title: "Objekt, Maschine, Material",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       },{
  //         id: "PO 2013 31LE-REV",
  //         title: "Raum, Ereignis, Vermittlung",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       },{
  //         id: "PO 2013 31LE-MTS",
  //         title: "Mobilität, Transport, Service",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       },{
  //         id: "PO 2013 31LE-DOP",
  //         title: "Dialog, Oberfläche, Prozess",
  //         colorCode: "repeating-linear-gradient(-45deg, #D8F0F4, #D8F0F4 10px, #CFE4BC 10px, #CFE4BC 20px, #EDF3DA 20px, #EDF3DA 30px)"
  //       }]
  //     },
  //     theorie: {
  //       title: "III/2 Theorie",
  //       modules: [{
  //         id: "PO 2013 32Th-DKGRT",
  //         title: "Design-/Medien-theorie",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 32Th-DKG",
  //         title: "Designgeschichte",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 32Th-DKGR",
  //         title: "Designmanagement und -recht",
  //         colorCode: "#E7E8E9"
  //       },{
  //         id: "PO 2013 32Th-TE",
  //         title: "Thesisentwicklung",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }]
  //     },
  //     tutorium: {
  //       title: "III/3 Tutorium",
  //       modules: [{
  //         id: "PO 2013 33-TU",
  //         title: "Tutoring",
  //         colorCode: "repeating-linear-gradient(45deg, #E7E8E9, #E7E8E9 20px, #FFFFFF 18px, #FFFFFF 30px)"
  //       }]
  //     },
  //     master_thesis: {
  //       title: "III/4 Master-Thesis",
  //       modules: [{
  //         id: "PO 2013 34-MA",
  //         title: "Masterarbeit",
  //         colorCode: "repeating-linear-gradient(-45deg, #A8D9E0, #A8D9E0 10px, #7ABF77 10px, #7ABF77 20px, #C6D858 20px, #C6D858 30px)"
  //       }]
  //     }
  //   }
  // } 
}