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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserPlus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})

type FormSchema = z.infer<typeof formSchema>

const SignUpForm: React.FC = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    console.log('SignUpForm.data: ', data)
  })

  const confirmPwdWatcher = form.watch('confirmPassword')
  useEffect(() => {
    const pwd = form.getValues('password')
    if (confirmPwdWatcher != pwd) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords must match.',
      })
    }
  }, [confirmPwdWatcher])

  return (
    <Card className="mx-4 mt-12 max-w-sm">
      <CardHeader>
        <CardTitle>Welcome to CloudVault!</CardTitle>
        <CardDescription>
          To create your account, insert the informations requested below
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormDescription>
                    The email will not be used for marketing purposes.
                  </FormDescription>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm your password</FormLabel>
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
              <UserPlus />
              Create account
            </Button>
            <Separator />
            <div className="flex items-center justify-center flex-wrap">
              <span>Already have an account?</span>
              <Button
                type="button"
                variant="link"
                asChild
              >
                <Link href="/sign-in">Go to Sign-In page</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignUpForm
