import React, { useState } from "react";
import Papa from "papaparse";
import ToggleSwitch from "../form/toggleCheckbox.js";
import StudentCSVReader from "../../api/csv-reader.js";

const allowedExtensions = ["csv"];

const ImportFile = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    if (e.target.files && e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile.name.split(".").pop()?.toLowerCase();

      if (fileExtension !== allowedExtensions[0]) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = () => {
    // If user clicks the parse button without a file we show an error
    if (!file) return alert("Enter a valid file");

    // Initialize a reader which allows user to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      if (target?.result && typeof target.result === "string") {
        const csv = Papa.parse(target.result, {
          header: true,
          skipEmptyLines: true,
        });
        const parsedData: unknown[] = csv?.data;
        if (parsedData.length > 0) {
          setData(parsedData);
        } else {
          alert("The CSV file is empty or only contains headers.");
        }
      } else {
        alert("Failed to read the file content.");
      }
    };

    // Error handling for FileReader
    reader.onerror = () => {
      alert("An error occurred while reading the file.");
      reader.abort();
    };

    reader.readAsText(file);
  };

  const csvReader = StudentCSVReader();

  const handleSaveCSV = async () => {
    try {
      const response = await csvReader.mutateAsync({ data: data });
      console.log(response, "response from csv");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="page-wrapper">
      <h3>Read CSV file in React</h3>
      <div className="container">
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
        </label>
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <button onClick={handleParse}>Parse</button>
        </div>
        {data.length && (
          <div style={{ marginTop: "3rem" }}>
            <table>
              <thead>
                <th>Name</th>
                <th>Symbol Number</th>
                <th>Semester</th>
                <th>Section</th>
              </thead>
              <tbody>
                {data &&
                  data.map((e, i) => (
                    <tr key={i} className="item">
                      <td>{e.name}</td>
                      <td>{e.symbolno}</td>
                      <td>{e.semester}</td>
                      <td>{e.section}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              type="button"
              style={{ marginTop: "20px" }}
              onClick={handleSaveCSV}
            >
              Save Data
            </button>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportFile;
