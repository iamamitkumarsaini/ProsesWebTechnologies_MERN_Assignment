import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Skeleton,
  useToast,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllUserData, getAllUserData } from "../Redux/action";
import "../Styles/Homepage.css";

function Homepage() {
  const [emptyArr, setEmptyArr] = useState([0, 0, 0, 0, 0, 0]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const isLoading = useSelector((state) => state.isLoading);

  const toast = useToast();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteAllUserData(id)).then((res) => {
      if (res.payload[0].message === "User deleted Successfully") {
        toast({
          title: res.payload[0].message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        dispatch(getAllUserData());
      }
    });
  };

  useEffect(() => {
    dispatch(getAllUserData());
  }, []);
  return (
    <Stack p={4} spacing={4}>
      <Stack>
        <Heading fontSize={"24px"} fontWeight={500}>
          All User Data
        </Heading>
        <Box alignSelf={"flex-end"}>
          <Link to={"/add/user"}>
            <Button maxW={"160px"} colorScheme="teal">
              Add new User
            </Button>
          </Link>
        </Box>
      </Stack>

      <Stack display={["none", "none", "block"]}>
        <TableContainer>
          <Table size={["sm", "sm", "sm", "md"]}>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Mobile Number</Th>
                <Th>Address</Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <Tbody>
                {emptyArr.map((elem, index) => (
                  <Tr height={"40px"} key={index}>
                    <Td>
                      <Skeleton height={"10px"} width={"120px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"10px"} width={"170px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"10px"} width={"110px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"10px"} width={"250px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"10px"} width={"120px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"10px"} width={"120px"} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            ) : (
              <Tbody>
                {userData?.map((elem) => (
                  <Tr key={elem._id} verticalAlign={"top"}>
                    <Td>{elem.username}</Td>
                    <Td>{elem.email}</Td>
                    <Td>{elem.mobileNum}</Td>
                    <Td>
                      <Box className="wrap-text">{elem.address}</Box>
                    </Td>
                    <Td>
                      <Button
                        h={"35px"}
                        borderRadius={8}
                        fontSize={"16px"}
                        fontWeight={400}
                        letterSpacing={0.6}
                        colorScheme="blue"
                        width={"90px"}
                        onClick={() => handleEdit(elem._id)}
                      >
                        Edit
                      </Button>
                    </Td>

                    <Td>
                      <Button
                        h={"35px"}
                        borderRadius={8}
                        fontSize={"16px"}
                        width={"90px"}
                        fontWeight={400}
                        letterSpacing={0.6}
                        colorScheme="red"
                        onClick={() => handleDelete(elem._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Stack>

      <Stack display={["block", "block", "none"]}>
        {isLoading ? (
          <Stack>
            {emptyArr.map((elem, index) => (
              <Stack
                key={index}
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRadius={12}
                p={4}
                spacing={2}
              >
                <Stack spacing={2}>
                  <HStack color={"GrayText"} fontSize={["16px"]}>
                    <Text>Username:</Text>
                    <Box mt={1} style={{ color: "black" }}>
                      <Skeleton height={"10px"} width={"120px"} />
                    </Box>
                  </HStack>

                  <HStack color={"GrayText"} fontSize={["16px"]}>
                    <Text>Email:</Text>
                    <Box mt={1} style={{ color: "black" }}>
                      <Skeleton height={"10px"} width={"180px"} />
                    </Box>
                  </HStack>

                  <HStack color={"GrayText"} fontSize={["16px"]}>
                    <Text>Mobile Number:</Text>
                    <Box mt={1} style={{ color: "black" }}>
                      <Skeleton height={"10px"} width={"120px"} />
                    </Box>
                  </HStack>

                  <HStack color={"GrayText"} fontSize={["16px"]}>
                    <Text>Address:</Text>
                    <Box mt={1} style={{ color: "black" }}>
                      <Skeleton height={"10px"} width={"250px"} />
                    </Box>
                  </HStack>

                  <Flex
                    color={"GrayText"}
                    fontSize={["16px"]}
                    gap={[2, 4]}
                    alignSelf={"center"}
                  >
                    <Box mt={1} style={{ color: "black" }}>
                      <Skeleton height={"10px"} width={"90px"} />
                    </Box>
                    <Box mt={1} style={{ color: "black" }}>
                      <Skeleton height={"10px"} width={"90px"} />
                    </Box>
                  </Flex>
                </Stack>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Stack spacing={4}>
            {userData?.map((elem) => (
              <Stack
                key={elem._id}
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                borderRadius={12}
                p={4}
                spacing={6}
              >
                <Stack spacing={2}>
                  <Text color={"GrayText"} fontSize={["16px"]}>
                    Username:&nbsp;
                    <span style={{ color: "black" }}>{elem.username}</span>
                  </Text>

                  <Text color={"GrayText"} fontSize={["16px"]}>
                    Email:&nbsp;
                    <span style={{ color: "black" }}>{elem.email}</span>
                  </Text>

                  <Text color={"GrayText"} fontSize={["16px"]}>
                    Mobile Number:&nbsp;
                    <span style={{ color: "black" }}>{elem.mobileNum}</span>
                  </Text>

                  <Text color={"GrayText"} fontSize={["16px"]}>
                    Address:&nbsp;
                    <span style={{ color: "black" }}>{elem.address}</span>
                  </Text>
                </Stack>

                <Flex gap={[2, 4]} alignSelf={"center"}>
                  <Button
                    h={"35px"}
                    borderRadius={8}
                    fontSize={"16px"}
                    fontWeight={400}
                    letterSpacing={0.6}
                    colorScheme="blue"
                    width={"90px"}
                    onClick={() => handleEdit(elem._id)}
                  >
                    Edit
                  </Button>

                  <Button
                    h={"35px"}
                    borderRadius={8}
                    fontSize={"16px"}
                    fontWeight={400}
                    letterSpacing={0.6}
                    colorScheme="red"
                    width={"90px"}
                    onClick={() => handleDelete(elem._id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Homepage;
