import { Box, Container, Stack, Text, useColorModeValue, Link } from '@chakra-ui/react';
  export default function Footer() {
    return (
      <Box
        bgGradient="linear(to-r, red.400,orange.400)"
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={4} direction={{ base: 'column', md: 'row' }} spacing={4} justify={{ base: 'center', md: 'space-between' }} align={{ base: 'center', md: 'center' }}>
          <Text fontSize="2xl" color='white'>Foodie by Samir Haque</Text>
          <Link href="https://github.com/samirrh" fontSize="2xl" color='white' target='_blank'>
            Github Source Code
          </Link>
        </Container>
      </Box>
    );
  }