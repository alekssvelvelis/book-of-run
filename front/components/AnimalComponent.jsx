import React from 'react';
import { Text } from 'react-native';

const AnimalComponent = ({ name }) => {
  return (
    <Text>
      The name of the animal is: {name}
    </Text>
  );
};

export default AnimalComponent;
