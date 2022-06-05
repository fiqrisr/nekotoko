import React from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';

export const Login = () => {
  return (
    <Container size={430} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Poppins, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        NekoToko POS
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="hi@email.com" required />
        <PasswordInput label="Password" placeholder="*****" required mt="md" />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};
