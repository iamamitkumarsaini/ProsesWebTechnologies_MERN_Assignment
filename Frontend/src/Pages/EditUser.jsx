import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Textarea,
  HStack,
  Text,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleUserData,
  patchAllUserData,
  postAllUserData,
} from "../Redux/action";

function EditUser() {
  const [username, setUsername] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isMobileNumEmpty, setIsMobileNumEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);

  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.singleUser);
  const navigate = useNavigate();
  const { id } = useParams();

  const toast = useToast();

  const mobilePattern = /^[1-9]\d{0,9}$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    dispatch(getSingleUserData(id)).then((res) => {
      setUsername(res.payload[0].username);
      setMobileNum(res.payload[0].mobileNum.toString());
      setEmail(res.payload[0].email);
      setAddress(res.payload[0].address);
    });
  }, []);

  const isValidMobileNumber = (mobileNumber) => {
    return mobilePattern.test(mobileNumber);
  };

  const isValidEmail = (email) => {
    return emailPattern.test(email);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase());
    setIsUsernameEmpty(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
    setIsEmailEmpty(false);
  };

  const handleMobileNumber = (e) => {
    setMobileNum(e.target.value);
    setIsMobileNumEmpty(false);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setIsAddressEmpty(false);
  };

  const submitFormData = () => {
    if (username.trim() === "") {
      setIsUsernameEmpty(true);
    }

    if (email.trim() === "") {
      setIsEmailEmpty(true);
    }

    if (mobileNum.toString().trim() === "") {
      setIsMobileNumEmpty(true);
    }

    if (address.trim() === "") {
      setIsAddressEmpty(true);
    } else if (!isValidMobileNumber(mobileNum) || mobileNum.length !== 10) {
      toast({
        title: "Not a valid Mobile Number",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else if (!isValidEmail(email)) {
      toast({
        title: "Not a valid Email",
        description: "It Should be a valid Email",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      const payload = { username, email, mobileNum, address };
      dispatch(patchAllUserData(id, payload)).then((res) => {
        if (res.payload[0].message === "User Details Updated successfully") {
          toast({
            title: res.payload[0].message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast({
            title: res.payload[0].message,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    }
  };

  return (
    <Stack
      width={["90%", "70%", "40%", "30%"]}
      m={"auto"}
      spacing={4}
      mt={6}
      pb={[6, 4, 0]}
    >
      <Heading fontSize={"24px"} fontWeight={500}>
        Update a existing User
      </Heading>
      <FormControl isInvalid={isUsernameEmpty}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="username"
          fontSize={"16px"}
        />
        {isUsernameEmpty && (
          <FormHelperText color={"red.500"}>
            Username is required
          </FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={isEmailEmpty}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="user@example.com"
          fontSize={"16px"}
        />
        {isEmailEmpty && (
          <FormHelperText color={"red.500"}>Email is required</FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={isMobileNumEmpty}>
        <FormLabel>Mobile Number</FormLabel>
        <Input
          type="tel"
          value={mobileNum}
          maxLength={"10"}
          minLength={"10"}
          onChange={handleMobileNumber}
          placeholder="Minimun of 10 digits"
          fontSize={"16px"}
        />
        {isMobileNumEmpty && (
          <FormHelperText color={"red.500"}>
            Mobile Number is required
          </FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={isAddressEmpty}>
        <FormLabel>Address</FormLabel>
        <Textarea
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Full Address"
          fontSize={"16px"}
        />
        {isAddressEmpty && (
          <FormHelperText color={"red.500"}>Address is required</FormHelperText>
        )}
      </FormControl>

      <Button colorScheme="blue" onClick={submitFormData}>
        Add
      </Button>
      <HStack fontSize={"16px"} spacing={"7px"}>
        <Text>Go to</Text>
        <Link color={"blue"} href="/">
          Homepage
        </Link>
        <Text>from here</Text>
      </HStack>
    </Stack>
  );
}

export default EditUser;
