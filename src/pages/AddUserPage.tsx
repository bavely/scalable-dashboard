import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { User } from "@/types"
import { useUsersStore } from '../hooks/useUsersStore';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const userSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  website: z
    .string()
    .min(1, { message: "Website is required." })
    .url({ message: "Website must be a valid URL. (e.g. https://example.com)" }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    suite: z.string().min(1, { message: "Suite is required." }),
    city: z.string().min(1, { message: "City is required." }),
    zipcode: z.string().min(1, { message: "Zipcode is required." }),
    geo: z.object({
      lat: z.string().min(1, { message: "Latitude is required." }),
      lng: z.string().min(1, { message: "Longitude is required." }),
    }),
  }),
  company: z.object({
    name: z
      .string()
      .min(2, { message: "Company name must be at least 2 characters." }),
    catchPhrase: z
      .string()
      .min(2, { message: "Catch phrase must be at least 2 characters." }),
    bs: z.string().min(2, { message: "BS must be at least 2 characters." }),
  }),
})

type UserFormValues = z.infer<typeof userSchema>

export default function AddUserPage() {
  const { addUser } = useUsersStore();
  const navigate = useNavigate();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      phone: "",
      website: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    },
  })

  const onSubmit = useCallback((values: UserFormValues) => {
    const newUser: User = {
      id: uuidv4(),
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      address: values.address,
      company: values.company,
      website: values.website,
    }
 
    addUser(newUser);
    form.reset();
    toast.success("User added successfully, redirecting to users list...");
    setTimeout(() => {
      navigate("/users");
    }, 2500);
  }, [addUser, form, navigate]);

  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-muted/50 rounded-xl p-6"
          noValidate
        >
          {/* User Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input aria-label="username" data-testid="username" placeholder="johndoe" {...field}  className="bg-white"/>
                  </FormControl>
                  <FormDescription>
                    Public display username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input aria-label="name" data-testid="name" placeholder="John Doe" {...field} className="bg-white"/>
                  </FormControl>
                  <FormDescription>Full name of the user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input aria-label="email" data-testid="email" placeholder="john@example.com" {...field} className="bg-white"/>
                  </FormControl>
                  <FormDescription>Contact email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input aria-label="phone" data-testid="phone" placeholder="+1 555-123-4567" {...field} className="bg-white"/>
                  </FormControl>
                  <FormDescription>Phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Website<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input aria-label="website" data-testid="website" placeholder="https://example.com" {...field} className="bg-white"/>
                  </FormControl>
                  <FormDescription>User's website or URL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="street" data-testid="street" placeholder="123 Main St" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.suite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suite<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="suite" data-testid="suite" placeholder="Apt. 4B" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="city" data-testid="city" placeholder="Los Angeles" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="zipcode" data-testid="zipcode" placeholder="90001" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Geo */}
            <div className="mt-6">
              <h3 className="text-md font-medium mb-2">Geo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.geo.lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input aria-label="latitude" data-testid="latitude" placeholder="34.0522" {...field} className="bg-white"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.geo.lng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-2">Longitude<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                          <Input aria-label="longitude" data-testid="longitude" placeholder="-118.2437" {...field} className="bg-white"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="company-name" data-testid="company-name" placeholder="Acme Corp" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.catchPhrase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catch Phrase<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="catch-phrase" data-testid="catch-phrase" placeholder="Innovate your world" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company.bs"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>BS<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input aria-label="bs" data-testid="bs"  placeholder="empower synergistic solutions" {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button id="submit" data-testid="submit" aria-label="submit" type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}


