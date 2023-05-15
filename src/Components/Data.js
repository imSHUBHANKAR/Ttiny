import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import './Data.css';


// import { Button } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
const Data = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.terriblytinytales.com/test.txt"
      );
      const text = response.data;

      //Now we are finding th frequency of each and every words from text file
      const words = text.split(/\s+/);
      const frequencyMap = {};
      words.forEach((word) => {
        if (!frequencyMap[word]) {
          frequencyMap[word] = 1;
        } else {
          frequencyMap[word]++;
        }
      });

      // Now Sorting the words based on their frequency of occurrence and selecting the top 20
      const sortedWords = Object.keys(frequencyMap).sort(
        (a, b) => frequencyMap[b] - frequencyMap[a]
      );
      const top20Words = sortedWords.slice(0, 20);

      // Creating the data for the histogram plot
      const plotData = [
        {
          x: top20Words,
          y: top20Words.map((word) => frequencyMap[word]),
          type: "bar"
        }
      ];

      setData(plotData); // Setting the state with the plot data
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCSV = () => {
    if (!data) return;

    //  now Convert the histogram  into CSV file
    const csv = `${data[0].x.join()}\n${data[0].y.join(",")}`;

    // Creating a temporary link and triggering the download
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.download = "histogram_data.csv";
    link.click();
  };

  return (
    <div>
      <button className="btn1" onClick={fetchData}>Submit</button>
      {data && <Plot data={data} />}
      {data && <button className="btn2" onClick={downloadCSV} varient="contained" sx={{m:2}} endIcon={<CloudDownloadOutlinedIcon/>}>Export (csv)</button>}
    </div>
  );
};

export default Data;