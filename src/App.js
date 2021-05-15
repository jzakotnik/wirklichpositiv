import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import { createMuiTheme } from "@material-ui/core/styles";

import parse from "csv-parse";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://github.com/jzakotnik/wirklichpositiv">
        Impressum, Infos und Github
      </Link>{" "}
      - Jure Zakotnik {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FEFFFB 30%, #FFEEF3 90%)",
  },
  productParameters: {
    display: "flex",
    flexDirection: "row",
  },
  resultProbabilities: {
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: "1px",
    spacing: "1px",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  labels: {
    padding: "5px",
  },
}));

function App() {
  const classes = useStyles();
  const defaultInfected = 150;
  const [products, setProducts] = useState([
    { productname: "Standard", specifity: 80, sensitivity: 98 },
  ]);
  const [selectedProduct, setSelectedProduct] = useState({
    productname: "Standard",
    specifity: 98,
    sensitivity: 80,
  });
  const [infected, setInfected] = useState(defaultInfected);
  const [probabilityFalsePositive, setProbabilityFalsePositive] =
    useState("20");
  const [probabilityFalseNegative, setProbabilityFalseNegative] =
    useState("20");

  function valuetext(value) {
    return `${value}`;
  }

  const calcFalsePositive = () => {
    //for clarity, this follows the example from RKI:
    //debugger;
    const totalPeople = 100000;
    const notInfected = totalPeople - infected;
    const infectedPositiveTest = (infected * selectedProduct.sensitivity) / 100;
    const infectedNegativeTest =
      infected * (1 - selectedProduct.sensitivity / 100);
    const notInfectedPositiveTest =
      notInfected * (1 - selectedProduct.specifity / 100);
    const notInfectedNegativeTest =
      (selectedProduct.specifity / 100) * notInfected;
    const positiveprobability =
      infectedPositiveTest / (infectedPositiveTest + notInfectedPositiveTest);
    const negativeprobability =
      infectedNegativeTest / (infectedNegativeTest + notInfectedNegativeTest);
    const dataset = {
      specifity: selectedProduct.specifity,
      sensitivity: selectedProduct.sensitivity,
      infected: infected,
      notInfected: notInfected,
      infectedPositiveTest: infectedPositiveTest,
      infectedNegativeTest: infectedNegativeTest,
      notInfectedPositiveTest: notInfectedPositiveTest,
      positiveprobability: positiveprobability * 100,
      negativeprobability: negativeprobability * 100,
    };
    console.log(dataset);
    setProbabilityFalsePositive((positiveprobability * 100).toFixed(1));
    setProbabilityFalseNegative((negativeprobability * 100).toFixed(5));
  };

  useEffect(() => {
    console.log("Starting web app and loading csv..");
    const newProducts = [...products];

    fetch(process.env.PUBLIC_URL + "/antigentests.csv")
      // Retrieve its body as ReadableStream
      .then((response) => response.text())
      .then((txt) => {
        console.log(txt);
        parse(
          txt,
          {
            delimiter: ";",
          },
          (err, output) => {
            //console.log(output);
            output.map((p) => {
              //skip first line
              if (p[2] != "Hersteller") {
                newProducts.push({
                  productname: p[3] + " - " + p[1],
                  specifity: parseFloat(p[6].replace(",", ".")),
                  sensitivity: parseFloat(p[5].replace(",", ".")),
                });
              }
              return true;
            });
          }
        );
      });
    setProducts(newProducts);
    setInfected(defaultInfected);
  }, []);

  useEffect(() => {
    //console.log("Refreshing calculation");
    calcFalsePositive();
    return () => {};
  }, [selectedProduct, infected]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <div className={classes.paper}>
          <Typography component="h2" variant="h5">
            Bin ich wirklich Corona-positiv?
          </Typography>
          <Avatar className={classes.avatar}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h4" variant="h7">
            Welcher Antigen-Test?
          </Typography>
          <div className={classes.typography}>
            <Autocomplete
              id="combo-box-demo"
              options={products}
              getOptionLabel={(option) => option.productname}
              fullWidth
              disableClearable
              onChange={(event, newValue) => {
                console.log(newValue);
                setSelectedProduct(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Antigen-Test-Hersteller"
                  variant="outlined"
                />
              )}
            />
            <div className={classes.productParameters}>
              <TextField
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name="sensitivity"
                label="Sensitivität"
                id="sensitivity"
                value={selectedProduct.sensitivity}
              />
              <TextField
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name="specificity"
                label="Spezifität"
                id="specificity"
                value={selectedProduct.specifity}
              />
            </div>
            <Typography component="h4" variant="h7">
              Wieviele Infizierte pro 100.000?
            </Typography>
            <Slider
              defaultValue={defaultInfected}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={20}
              max={1000}
              onChange={(event, newValue) => {
                setInfected(newValue);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              name="infected"
              label="Infizierte pro 100.000 Menschen"
              id="infected"
              value={infected}
            />
            <div>
              <Typography component="h4" variant="h7">
                Ich habe ein positives Testergebnis: Wie wahrscheinlich bin ich
                akut infiziert?
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name="Wahrscheinlichkeit"
                label="Wahrscheinlichkeit"
                id="probability"
                value={probabilityFalsePositive + " %"}
              />
              <Typography component="h4" variant="h7">
                Ich habe ein negatives Testergebnis: Wie wahrscheinlich bin ich
                doch akut infiziert?
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name="Wahrscheinlichkeit negativ"
                label="Wahrscheinlichkeit"
                id="probabilit_negative"
                value={probabilityFalseNegative + " %"}
              />
            </div>
            <Typography component="h4" variant="h7">
              Worum geht es?
            </Typography>
            <Typography component="p" variant="p">
              Wie in der{" "}
              <a href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Infografik_Antigentest_PDF.html">
                RKI Infografik
              </a>{" "}
              schön dargestellt, gibt es bei ungezielten Tests eine
              Wahrscheinlichkeit, dass man trotz positivem Antigen-Corona-Test
              nicht infiziert ist. Sie hängt von den Eigenschaften des Tests ab
              und der Anzahl der Infizierten in der Bevölkerung. Die Berechnung
              dieser Wahrscheinlichkeit lässt sich hier nachvollziehen. Viel
              Spaß!
            </Typography>
          </div>
        </div>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
