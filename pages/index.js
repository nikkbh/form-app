import Head from "next/head";
import Image from "next/image";
import formImage from "../public/form.png";
import {useFormik} from 'formik';
import * as Yup from "yup";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

export default function Home() {

  const router = useRouter();

  // Formik logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "India",
      terms: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(10, 'Name must be at less than 10 characters').required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      terms: Yup.array().required("Terms of service must be checked")
    }),
    onSubmit: (values) => {
      console.log(values);
      router.push({pathname: '/success', query: values});
    }
  });

  return (
    <m.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute w-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="bg-white flex rounded-lg w-1/2 font-latoRegular">
          <div className="flex-1 text-gray-700 p-20">
            <h1 className="text-3xl pb-2 font-latoBold">
              Let&apos;s get started👋
            </h1>
            <p>
              Join our E-learning platform today and unlock over 500+ courses
              and digital assets ready to download
            </p>
            <div className="mt-6">
              <div className="pb-4">
                <label
                  htmlFor="name"
                  className={`block font-latoBold text-sm pb-2 ${formik.touched.name && formik.errors.name ? 'text-red-400': ''}`}
                >
                  { formik.touched.name && formik.errors.name ? formik.errors.name : "Name"}
                </label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="pb-4">
                <label
                  htmlFor="email"
                  className={`block font-latoBold text-sm pb-2 ${formik.touched.email && formik.errors.email ? 'text-red-400': ''}`}
                >
                  { formik.touched.email && formik.errors.email ? formik.errors.email : "Email"}
                </label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="pb-4">
                <label
                  htmlFor="country"
                  className="block font-latoBold text-sm pb-2"
                >
                  Country
                </label>
                <select
                  name="country"
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                >
                  <option>India</option>
                  <option>US</option>
                  <option>UK</option>
                  <option>Spain</option>
                </select>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="terms"
                  className={`block font-latoBold text-sm pb-2 ${formik.touched.terms && formik.errors.terms ? 'text-red-400': ''}`}
                >
                  { formik.touched.terms && formik.errors.terms ? formik.errors.terms : "Terms of service"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    className="h-5 w-5 text-teal-500 border-2 focus:border-teal-500 focus:ring-teal-500"
                    onChange={formik.handleChange}
                  />
                  <p className="text-sm font-latoBold text-gray-500">
                    I agree to the Terms and Service that my data will be taken
                    and sold.
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
              >
                Start learning today!
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            <Image src={formImage} fill alt="form-learn" className="object-cover rounded-lg"/>
          </div>
        </form>
      </main>
    </m.div>
  );
}
