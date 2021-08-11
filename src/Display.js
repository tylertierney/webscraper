import { VStack, Text, Flex, Link, Button, Icon } from "@chakra-ui/react";
import "./display.css";
import "./app.css";
import { AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";

const Display = ({ doc, filterArray }) => {
  const createListItem = (text, link) => {
    return (
      <Flex
        border="1px"
        m="10px 0"
        p="10px"
        direction="column"
        justify="center"
        align="flex-start"
        backgroundColor="whiteAlpha.900"
        borderRadius="5px"
        transition="0.15s ease-in-out"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Text>
          <Link
            href={link}
            target="_blank"
            _hover={{ textDecoration: "none" }}
            fontWeight="bold"
          >
            {text}&nbsp;
          </Link>
        </Text>
        <Flex alignSelf="flex-end" justify="center" align="center">
          <Text userSelect="none" fontSize="sm">
            Share:&nbsp;
          </Text>
          <Button
            size="sm"
            outline="none !important"
            boxShadow="none !important"
          >
            <Link
              href={
                "https://www.linkedin.com/shareArticle?mini=true&url=" + link
              }
              target="_blank"
              outline="none !important"
              boxShadow="none !important"
            >
              <Icon
                as={AiFillLinkedin}
                w={8}
                h={8}
                outline="none !important"
                boxShadow="none !important"
                color="blue.800"
              ></Icon>
            </Link>
          </Button>
          <Button
            size="sm"
            outline="none !important"
            boxShadow="none !important"
          >
            <Link
              href={"https://twitter.com/intent/tweet?url=" + link}
              target="_blank"
              outline="none !important"
              boxShadow="none !important"
            >
              <Icon
                as={AiFillTwitterSquare}
                w={8}
                h={8}
                color="blue.300"
                outline="none !important"
                boxShadow="none !important"
              ></Icon>
            </Link>
          </Button>
        </Flex>
      </Flex>
    );
  };
  const ul = doc.body.children[0].children[0].children[2].children[1];

  let newList = [];
  for (let i = 0; i < ul.children.length; i++) {
    let href = ul.children[i].children[0].href;
    let link = href.substr(href.indexOf("/en"), href.length);
    link = "https://lite.cnn.com" + link;
    let text = ul.children[i].children[0].innerText;
    if (filterArray.length > 0) {
      filterArray.forEach((filter) => {
        if (text.toLowerCase().includes(filter.toLowerCase())) {
          newList.push(createListItem(text, link));
        }
      });
    } else {
      newList.push(createListItem(text, link));
    }
  }

  // console.log(doc.body.children[0].children[0]);

  return (
    <Flex maxW="90vw" direction="column" justify="center" align="center">
      <VStack className="resultsContainer" justify="center" align="center">
        <Text
          color="whiteAlpha.700"
          alignSelf="baseline"
          // className={newList.length > 0 ? "visible" : "hidden"}
        >{`Results (${newList.length}):`}</Text>
        <Flex direction="column">{newList}</Flex>
      </VStack>
    </Flex>
  );
};

export default Display;
