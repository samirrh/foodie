import { Box, Image, Badge, Link, HStack, Spacer, SimpleGrid } from "@chakra-ui/react";
import IngredientModal from './IngredientModal';
import ShareModal from './ShareModal';

const Recipe = ({ recipe }) => {
  const { label, image, url, ingredients } = recipe.recipe;

  return (
  <Box centerContent maxW="md" borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Image w='100%' src={image} alt={label}/>
      <Box p="4">
        <HStack>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {label}
        </Box>
        <Spacer/>
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            <Link href={url} target="_blank" rel="noopener noreferrer">URL</Link>
          </Badge>
        </Box>
        </HStack>
        <SimpleGrid columns={2} spacing={6} mt={2}>
          <IngredientModal ingredients={ingredients}/>
          <ShareModal label={label} url={url}/>
        </SimpleGrid>
      </Box>
    </Box>
    // </div>
  );
};

export default Recipe;