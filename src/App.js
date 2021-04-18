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

import parse from "csv-parse";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Impressum "}
      <Link color="inherit" href="https://zakotnik.de">
        Jure Zakotnik
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function App() {
  const classes = useStyles();
  const defaultInfected = 150;
  const [products, setProducts] = useState([
    { productname: "Standard", specifity: 80, sensitivity: 95 },
  ]);
  const [selectedProduct, setSelectedProduct] = useState({
    productname: "Standard",
    specifity: 80,
    sensitivity: 95,
  });
  const [infected, setInfected] = useState(defaultInfected);
  const [probabilityFalsePositive, setProbabilityFalsePositive] = useState(
    "20%"
  );

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
    const probability = infectedPositiveTest / notInfectedPositiveTest;
    const dataset = {
      specifity: selectedProduct.specifity,
      sensitivity: selectedProduct.sensitivity,
      infected: infected,
      notInfected: notInfected,
      infectedPositiveTest: infectedPositiveTest,
      infectedNegativeTest: infectedNegativeTest,
      notInfectedPositiveTest: notInfectedPositiveTest,
      probability: probability,
    };
    console.log(dataset);
    setProbabilityFalsePositive(Math.round(probability * 100));
  };

  useEffect(() => {
    console.log("Starting web app and loading csv..");
    const newProducts = [...products];

    fetch(".//antigentests.csv")
      // Retrieve its body as ReadableStream
      .then((response) => response.text())
      .then((txt) => {
        parse(
          txt,
          {
            delimiter: ";",
          },
          (err, output) => {
            console.log(output);
            output.map((p) => {
              newProducts.push({
                productname: p[3] + " - " + p[1],
                specifity: parseFloat(p[10].replace(",", ".")),
                sensitivity: parseFloat(p[12].replace(",", ".")),
              });
            });
          }
        );
      });
    setProducts(newProducts);
  }, [products.join(";")]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalHospitalIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bin ich wirklich Corona-positiv?
        </Typography>
        <Divider />
        <Typography component="h2" variant="h5">
          Hersteller
        </Typography>

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
              label="Antigen Test Hersteller"
              variant="outlined"
            />
          )}
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          name="sensitivity"
          label="Sensitivität"
          id="sensitivity"
          value={selectedProduct.sensitivity}
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          name="specificity"
          label="Spezifität"
          id="specificity"
          value={selectedProduct.specifity}
        />
        <Typography component="h2" variant="h5">
          Infizierte pro 100.000
        </Typography>
        <Slider
          defaultValue={defaultInfected}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={5}
          marks
          min={20}
          max={600}
          onChange={(event, newValue) => {
            setInfected(newValue);
            calcFalsePositive();
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          name="Wahrscheinlichkeit"
          label="Wahrscheinlichkeit"
          id="probability"
          value={probabilityFalsePositive}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
