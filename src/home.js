import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import image from "./bg.png";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import { Helmet } from 'react-helmet';

var fs = require('fs').promises;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: 'black',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  },
  d1: {
    border: '1px solid red'
  },
  tablenew: {
    backgroundColor: 'black'
  }
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0, num = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };


  const fill = (name, confidence) => {
    var x1 = document.getElementById("data2").insertRow(0);
    var cell1 = x1.insertCell(0);
    var cell2 = x1.insertCell(1);
    cell1.innerHTML = name;
    cell2.innerHTML = confidence;
  };

  const clearData2 = () => {
    //setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    fill(data.class, confidence);
  };

  // const handle = () => {
  //   localStorage.setItem("myObj", myObj_serialized);
  // }

  // let myObj = { data };
  // let myObj_serialized = JSON.stringify(myObj);

  // localStorage.setItem("myObj", myObj_serialized);
  // //console.log(localStorage);

  // let myObj_deserialized = JSON.parse(localStorage.getItem("myObj"));
  // console.log(myObj_deserialized);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);



  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };
  const Export = () => {
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("data1");

    /* Declaring array variable */
    var rows = [];

    //iterate through rows of table
    for (var i = 0, row; row = table.rows[i]; i++) {
      //rows would be accessed using the "row" variable assigned in the for loop
      //Get each cell value/column from the row
      var column1 = row.cells[0].innerText;
      var column2 = row.cells[1].innerText;

      /* add a new records in the array */
      rows.push(
        [
          column1,
          column2
        ]
      );

    }
    var csvContent = "data:text/csv;charset=utf-8,";
    /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
    rows.forEach(function (rowArray) {
      row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    /* create a hidden <a> DOM node and set its download attribute */
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "PLANT_DISEASE_LIST.csv");
    document.body.appendChild(link);
    /* download the data file named "Stock_Price_Report.csv" */
    link.click();
  }



  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }




  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Plant-Disease-Detector
          </Typography>
          <div className={classes.grow} />
          <Avatar src={cblogo}></Avatar>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a plant leaf to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}

              {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell id="Classname" component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell id="Percent" align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} >
              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData2} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
          {/* <ColorButton variant="contained" color="primary" component="span" size="large" onClick={Export}>
            Download file
          </ColorButton> */}
        </Grid>


      </Container>

      <div class="tablenew" align="center" style={{ backgroundColor: "skyblue", width: "140px", border: "2px solid antiquewhite", margin: "auto", borderRadius: "12px", height: "auto" }}>
        <Helmet>
          <link rel="stylesheet" href="CSS.css" />
        </Helmet>
        <table id="data1">
          <thead>
            <tr>
              <th> Name </th>
              <th> Cofidence </th>
            </tr>
          </thead>
          <tbody class="d1" id="data2" style={{ backgroundColor: "brown", color: "antiquewhite", margin: "100px" }}>
          </tbody>
        </table>
        {/* <button onClick={Export}> Click Here to Download Your List !!!! </button> */}
        <ColorButton variant="contained" align="center" style={{ backgroundColor: "antiquewhite", color: "blue" }} color="primary" component="span" size="small" onClick={Export}>
          Download file
        </ColorButton>
      </div>


    </React.Fragment>
  );
};


