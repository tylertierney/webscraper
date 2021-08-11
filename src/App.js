import { useState } from "react";
import Display from "./Display";
import "./app.css";
import {
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Tag,
  TagCloseButton,
  TagLabel,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";

const App = () => {
  const [responseData, setResponseData] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [filterArray, setFilterArray] = useState([]);

  const getWebData = async () => {
    // Using Fetch along with a site called AllOrigins.win in order to bypass CORS policy

    await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "http://lite.cnn.com/en"
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => setResponseData(data.contents));
  };

  getWebData();
  const parser = new DOMParser();
  const doc = parser.parseFromString(responseData, "text/html");

  const addToFilterArray = (currentFilter) => {
    if (currentFilter) {
      setFilterArray([...filterArray, currentFilter]);
      setCurrentFilter("");
    }
  };

  const removeItemFromFilterArray = (e, filterTag) => {
    setFilterArray([...filterArray].filter((word) => word !== filterTag));
  };

  const filterTags = () => {
    return filterArray.map((filter, index) => {
      return (
        <Tag key={index}>
          <TagLabel>{filter}</TagLabel>
          <TagCloseButton
            onClick={(e) => removeItemFromFilterArray(e, filter)}
            boxShadow="none !important"
            outline="none !important"
          />
        </Tag>
      );
    });
  };

  document.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      addToFilterArray(currentFilter);
    }
  });

  const getTodaysDate = () => {
    let date = new Date().toLocaleString();
    let comma = date.indexOf(",");
    return date.substr(0, comma);
  };

  return (
    <div className="fullPageContainer">
      <div className="headerImageDiv"></div>
      <div className="headerTextContainer">
        <Heading size="xl" color="white">
          CNN DAILY WEB SCRAPER
        </Heading>
        <Heading size="sm" color="white">
          Search CNN stories from today,
          <Text display="inline" color="red.500">
            {` ${getTodaysDate()}`}
          </Text>
        </Heading>
      </div>
      <div className="bodyContainer">
        <div className="inputGroupContainer">
          <InputGroup w="90vw">
            <Input
              value={currentFilter}
              placeholder="Filter e.g. 'Florida', 'Biden'..."
              onChange={(e) => setCurrentFilter(e.target.value)}
              className="filterInput"
              focusBorderColor="inherit"
              backgroundColor="white"
            />
            <InputRightAddon
              color="white"
              children="Apply"
              className="applyBtn"
              backgroundColor="blue.500"
              onClick={() => addToFilterArray(currentFilter)}
            />
          </InputGroup>
          <HStack
            spacing={4}
            minW="90vw"
            p="10px"
            className={
              filterArray.length > 0
                ? "filterTags visible"
                : "filterTags hidden"
            }
            wrap="wrap"
          >
            <Text color="white" p="2">{`Active filters:`}</Text>
            <HStack spacing={4}>{filterTags()}</HStack>
          </HStack>
        </div>
        <Flex w="100vw" direction="column" justify="center" align="center">
          <Display doc={doc} filterArray={filterArray} />
        </Flex>
      </div>
    </div>
  );
};

export default App;
