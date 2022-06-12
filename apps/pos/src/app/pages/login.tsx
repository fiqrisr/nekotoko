import React from 'react';
import { useLogin } from '@pankod/refine-core';
import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

interface ILoginForm {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const { mutate: login, isLoading } = useLogin<ILoginForm>();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = (values: typeof form.values) => login(values);

  return (
    <Container size={430} my={40}>
      <Text
        align="center"
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
        sx={(theme) => ({
          fontFamily: `Poppins, ${theme.fontFamily}`,
          fontWeight: 900,
          fontSize: 32,
        })}
      >
        NekoToko POS
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="user"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="*****"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" loading={isLoading} type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
