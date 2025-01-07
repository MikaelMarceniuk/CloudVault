'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormSchema = z.infer<typeof formSchema>

const SignInForm: React.FC = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const eWatcher = form.watch('email')
  const pwdWatcher = form.watch('email')

  console.log('eWatcher: ', eWatcher)
  console.log('pwdWatcher: ', pwdWatcher)

  const submitHandler = form.handleSubmit((data) => {
    console.log('SignInForm.data: ', data)
  })

  return (
    <Card className="mx-4 mt-12 max-w-sm">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Insert your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">
              <LogIn />
              Login
            </Button>

            <Separator />
            <div className="flex justify-evenly">
              <Button
                type="button"
                onClick={() => console.log('SignIn with Google provider')}
              >
                <Image
                  src="/google-icon.svg"
                  alt="Google Icon"
                  width={16}
                  height={16}
                />
              </Button>
              <Button
                type="button"
                onClick={() => console.log('SignIn with Github provider')}
              >
                <Image
                  src="/github-icon-white.svg"
                  alt="Github Icon"
                  width={16}
                  height={16}
                />
              </Button>
              <Button
                type="button"
                onClick={() => console.log('SignIn with Discord provider')}
              >
                <Image
                  src="/discord-icon.svg"
                  alt="Discord Icon"
                  width={16}
                  height={16}
                />
              </Button>
            </div>

            <Separator />
            <div className="flex items-center justify-center flex-wrap">
              <span>Don&apos;t have an account?</span>
              <Button
                type="button"
                variant="link"
                asChild
              >
                <Link href="/sign-up">Go to Sign-Up page</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
